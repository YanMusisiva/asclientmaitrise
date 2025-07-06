import { NextRequest, NextResponse } from "next/server";
import ClickLead from "../../../models/ClickLead";
import dbConnect from "../../../utils/db";
import nodemailer from "nodemailer";
import { z } from "zod";
import { getEmailContent } from "../../../lib/emailTemplates";
import { notifyTelegram } from "../../../lib/notifyTelegram";

const leadSchema = z.object({
  email: z.string().email(),
  elementName: z.string().min(1),
});

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();

    const parsed = leadSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ message: "Invalid data", errors: parsed.error.flatten() }, { status: 400 });
    }

    const { email, elementName } = parsed.data;

    // Enregistrement dans MongoDB
    const lead = new ClickLead({ email, elementName });
    await lead.save();

    // Notification Telegram
    // Après await lead.save();

    await notifyTelegram(`📩 *Nouveau lead capturé*:
    *Email:* ${email}
    *Element:* ${elementName}
    *Date:* ${new Date().toLocaleString()}`);

    // Email selon l'élément cliqué
    const { subject, html } = getEmailContent(elementName);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Ton Nom" <${process.env.SMTP_USER}>`,
      to: email,
      subject,
      html,
    });
    return NextResponse.json({ message: "Lead enregistré et email envoyé." });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export const dynamic = "force-dynamic"; // Pour éviter le cache
export const revalidate = 0; // Pas de revalidation pour cette route