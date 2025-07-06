import dbConnect from "../../../utils/db";
import Email from "../../../models/Email";
import nodemailer from "nodemailer";

const SITE_URL = "https://aselektrika-tek.vercel.app/"; // Remplace par ton vrai domaine
const DEFAULT_TITLE = "Bienvenue sur notre newsletter !";
const DEFAULT_MESSAGE =
  "Merci de vous être abonné à notre newsletter. Nous sommes ravis de vous compter parmi nous !";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

function getWelcomeHtml(email: string) {
  const unsubscribeLink = `${SITE_URL}/unsubscribe?email=${encodeURIComponent(
    email
  )}`;
  return `
    <div style="font-family:sans-serif;max-width:600px;margin:auto;">
      <h1 style="color:#2563eb;">${DEFAULT_TITLE}</h1>
      <p>${DEFAULT_MESSAGE}</p>
      <a href="${SITE_URL}" style="display:inline-block;padding:10px 20px;background:#2563eb;color:#fff;text-decoration:none;border-radius:5px;margin:20px 0;">Visiter notre site</a>
      <br/>
      <a href="${unsubscribeLink}" style="display:inline-block;padding:8px 16px;background:#e53e3e;color:#fff;text-decoration:none;border-radius:5px;margin:20px 0;font-size:14px;">Se désabonner</a>
      <p style="font-size:12px;color:#888;margin-top:40px;">
        Si vous ne souhaitez plus recevoir nos emails, cliquez sur le bouton "Se désabonner" ci-dessus.
      </p>
    </div>
  `;
}

export async function POST(req: Request) {
  await dbConnect();

  try {
    const { email } = await req.json();

    // Vérifie si l'email existe déjà
    const exists = await Email.findOne({ email });
    if (exists) {
      return new Response(
        JSON.stringify({ message: "Cet email est déjà abonné." }),
        { status: 409, headers: { "Content-Type": "application/json" } }
      );
    }

    const newEmail = new Email({ email });
    try {
      await newEmail.save();
    } catch (err: unknown) {
      // Gestion du cas où deux requêtes arrivent en même temps
      if (
        typeof err === "object" &&
        err !== null &&
        "code" in err &&
        (err as any).code === 11000
      ) {
        return new Response(
          JSON.stringify({ message: "Cet email est déjà abonné." }),
          { status: 409, headers: { "Content-Type": "application/json" } }
        );
      }
      throw err;
    }

    // Envoi automatique du mail de bienvenue (HTML)
    await transporter.sendMail({
      from: '"Newsletter AS ELEKTRIKA & TEK" <noreply@example.com>',
      to: email,
      subject: DEFAULT_TITLE,
      html: getWelcomeHtml(email),
    });

    return new Response(
      JSON.stringify({ message: "Subscription successful" }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ message: "Erreur serveur", error }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function GET() {
  await dbConnect();
  const emails = await Email.find();
  return new Response(JSON.stringify(emails), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}