import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const body = await request.json();
    const { name, email, details, budget } = body;

    if (!name || !email || !details || !budget) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const { error } = await resend.emails.send({
      from: "Polar Stack Contact <contact@polarstack.dev>",
      to: process.env.CONTACT_EMAIL ?? "hello@polarstack.dev",
      replyTo: email,
      subject: `New project inquiry from ${name}`,
      html: `
        <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; background: #080C10; color: #e2e8f0; padding: 40px; border-radius: 12px;">
          <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 32px; padding-bottom: 24px; border-bottom: 1px solid rgba(61,220,176,0.15);">
            <div style="width: 36px; height: 36px; background: linear-gradient(135deg, #3DDCB0, #00B4D8); border-radius: 8px; display: flex; align-items: center; justify-content: center;">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 2C5 2 3 4 3 6.5C3 8 3.8 9.3 5 10.1V13H11V10.1C12.2 9.3 13 8 13 6.5C13 4 11 2 8 2Z" fill="white"/>
                <rect x="5.5" y="13" width="5" height="1.5" rx="0.75" fill="white"/>
              </svg>
            </div>
            <span style="font-weight: 700; font-size: 18px; color: white;">Polar<span style="color: #3DDCB0;">Stack</span></span>
          </div>

          <h2 style="color: white; font-size: 22px; margin-bottom: 24px; font-weight: 700;">New Project Inquiry</h2>

          <div style="background: rgba(13,17,23,0.8); border: 1px solid rgba(61,220,176,0.12); border-radius: 10px; padding: 20px; margin-bottom: 16px;">
            <div style="color: #64748b; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 6px;">Name</div>
            <div style="color: #e2e8f0; font-size: 15px;">${name}</div>
          </div>

          <div style="background: rgba(13,17,23,0.8); border: 1px solid rgba(61,220,176,0.12); border-radius: 10px; padding: 20px; margin-bottom: 16px;">
            <div style="color: #64748b; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 6px;">Email</div>
            <div style="color: #3DDCB0; font-size: 15px;">${email}</div>
          </div>

          <div style="background: rgba(13,17,23,0.8); border: 1px solid rgba(61,220,176,0.12); border-radius: 10px; padding: 20px; margin-bottom: 16px;">
            <div style="color: #64748b; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 6px;">Budget Range</div>
            <div style="color: #e2e8f0; font-size: 15px;">${budget}</div>
          </div>

          <div style="background: rgba(13,17,23,0.8); border: 1px solid rgba(61,220,176,0.12); border-radius: 10px; padding: 20px; margin-bottom: 32px;">
            <div style="color: #64748b; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 10px;">Project Details</div>
            <div style="color: #e2e8f0; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${details}</div>
          </div>

          <div style="color: #475569; font-size: 12px; text-align: center;">
            Sent via polarstack.dev contact form
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
