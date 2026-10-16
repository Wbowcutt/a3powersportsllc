import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { site } from "@/lib/site";

const MAX_PHOTO_SIZE = 4 * 1024 * 1024;
const ALLOWED_PHOTO_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function sanitizeFilename(name: string) {
  const base = name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 100);
  return base || "photo.jpg";
}

function clip(value: string, max: number) {
  return value.trim().slice(0, max);
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    if (clip(String(formData.get("company") ?? ""), 200)) {
      return NextResponse.json({ success: true });
    }

    const name = clip(String(formData.get("name") ?? ""), 200);
    const email = clip(String(formData.get("email") ?? ""), 320);
    const phone = clip(String(formData.get("phone") ?? ""), 40);
    const message = clip(String(formData.get("message") ?? ""), 5000);
    const photo = formData.get("photo");

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Enter a valid email address." },
        { status: 400 }
      );
    }

    let attachments: { filename: string; content: Buffer }[] | undefined;

    if (photo instanceof File && photo.size > 0) {
      if (!ALLOWED_PHOTO_TYPES.has(photo.type)) {
        return NextResponse.json(
          { error: "Photo must be a JPG, PNG, WebP, or GIF image." },
          { status: 400 }
        );
      }

      if (photo.size > MAX_PHOTO_SIZE) {
        return NextResponse.json(
          { error: "Photo must be 4 MB or smaller." },
          { status: 400 }
        );
      }

      const buffer = Buffer.from(await photo.arrayBuffer());
      attachments = [
        {
          filename: sanitizeFilename(photo.name),
          content: buffer,
        },
      ];
    }

    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_EMAIL;
    const fromEmail = process.env.RESEND_FROM_EMAIL;

    if (!apiKey || !toEmail || !fromEmail) {
      console.error("Resend contact form is not configured.");
      return NextResponse.json(
        {
          error: `The contact form isn't set up yet. Call or text ${site.contactName} at ${site.phone}.`,
        },
        { status: 500 }
      );
    }

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone);
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");
    const subjectName = name.replace(/[\r\n]+/g, " ");

    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: email,
      subject: `New message from ${subjectName} — ${site.legalName}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        phone ? `Phone: ${phone}` : "",
        "",
        "Message:",
        message,
        attachments ? "\n(A photo is attached.)" : "",
      ]
        .filter((line) => line !== "")
        .join("\n"),
      html: `
        <h2>New message for ${escapeHtml(site.legalName)}</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        ${phone ? `<p><strong>Phone:</strong> ${safePhone}</p>` : ""}
        <hr />
        <p>${safeMessage}</p>
        ${attachments ? "<p><em>A photo is attached.</em></p>" : ""}
      `,
      attachments,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "The message could not be sent. Please call or text instead." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please call or text instead." },
      { status: 500 }
    );
  }
}
