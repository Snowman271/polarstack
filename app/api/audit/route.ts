import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const DECISION_MAKERS = [
  "CEO / Founder",
  "COO / Operations Manager",
  "CMO / Marketing Director",
  "Sales Director / Manager",
];

export async function POST(request: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const body = await request.json();
    const { name, email, phone, position } = body;

    if (!name || !email || !position) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const isDecisionMaker = DECISION_MAKERS.includes(position);
    const priority = isDecisionMaker ? "HIGH PRIORITY" : "STANDARD";
    const subjectTag = isDecisionMaker ? "🔥 Decision Maker" : "📋 Standard";

    const { error } = await resend.emails.send({
      from: "Polar Stack Audits <info@polar-stack.com>",
      to: process.env.CONTACT_EMAIL ?? "info@polar-stack.com",
      replyTo: email,
      subject: `${subjectTag} - Free Audit Request from ${name} (${position})`,
      html: `
        <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; background: #080C10; color: #e2e8f0; padding: 40px; border-radius: 12px;">

          <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 28px; padding-bottom: 20px; border-bottom: 1px solid rgba(61,220,176,0.15);">
            <div style="width: 36px; height: 36px; background: linear-gradient(135deg, #3DDCB0, #00B4D8); border-radius: 8px;"></div>
            <span style="font-weight: 700; font-size: 18px; color: white;">Polar<span style="color: #3DDCB0;">Stack</span> — Audit Request</span>
          </div>

          <!-- Priority badge -->
          <div style="display: inline-block; padding: 6px 14px; border-radius: 20px; margin-bottom: 24px; font-size: 12px; font-weight: 700; letter-spacing: 0.08em; ${
            isDecisionMaker
              ? "background: rgba(61,220,176,0.12); border: 1px solid rgba(61,220,176,0.4); color: #3DDCB0;"
              : "background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: #94a3b8;"
          }">
            ${priority} - ${isDecisionMaker ? "Deliver custom, high-effort audit" : "Standard audit - send report"}
          </div>

          <h2 style="color: white; font-size: 20px; margin: 0 0 20px; font-weight: 700;">
            ${isDecisionMaker ? "Decision maker requesting audit" : "New audit request"}
          </h2>

          <div style="background: rgba(13,17,23,0.8); border: 1px solid rgba(61,220,176,0.12); border-radius: 10px; padding: 20px; margin-bottom: 12px;">
            <div style="color: #64748b; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 5px;">Name</div>
            <div style="color: #e2e8f0; font-size: 15px; font-weight: 600;">${name}</div>
          </div>

          <div style="background: rgba(13,17,23,0.8); border: 1px solid rgba(61,220,176,0.12); border-radius: 10px; padding: 20px; margin-bottom: 12px;">
            <div style="color: #64748b; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 5px;">Position</div>
            <div style="color: ${isDecisionMaker ? "#3DDCB0" : "#e2e8f0"}; font-size: 15px; font-weight: 600;">${position}</div>
          </div>

          <div style="background: rgba(13,17,23,0.8); border: 1px solid rgba(61,220,176,0.12); border-radius: 10px; padding: 20px; margin-bottom: 12px;">
            <div style="color: #64748b; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 5px;">Email</div>
            <div style="color: #3DDCB0; font-size: 15px;">${email}</div>
          </div>

          ${phone ? `
          <div style="background: rgba(13,17,23,0.8); border: 1px solid rgba(61,220,176,0.12); border-radius: 10px; padding: 20px; margin-bottom: 24px;">
            <div style="color: #64748b; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 5px;">Phone</div>
            <div style="color: #e2e8f0; font-size: 15px;">${phone}</div>
          </div>
          ` : ""}

          <div style="padding: 16px; border-radius: 10px; ${
            isDecisionMaker
              ? "background: rgba(61,220,176,0.06); border: 1px solid rgba(61,220,176,0.2);"
              : "background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08);"
          }">
            <div style="color: ${isDecisionMaker ? "#3DDCB0" : "#64748b"}; font-size: 12px; font-weight: 600;">
              ${isDecisionMaker
                ? "Action: Prepare a custom, in-depth audit with specific recommendations. Reply personally."
                : "Action: Run standard audit and send automated report."
              }
            </div>
          </div>

          <div style="margin-top: 28px; color: #475569; font-size: 12px; text-align: center;">
            Submitted via polar-stack.com free audit form
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Failed to send" }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Audit API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
