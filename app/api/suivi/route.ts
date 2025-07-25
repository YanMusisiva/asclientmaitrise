import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const { email: rawEmail, course } = await req.json();
  const email = (rawEmail || "").trim();
  if (!/^[\w-.]+@[\w-]+\.[a-z]{2,}$/i.test(email)) {
    return new Response(JSON.stringify({ error: "Email invalide." }), {
      status: 400,
    });
  }

  // 1. Envoi du mail à l'utilisateur
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"AutoDidacte+" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `Bienvenue dans le suivi de ${course} – C'est parti !`,
      text: `👋 Bonjour,

Merci d'avoir choisi de progresser avec nous.

Vous venez d'accepter de recevoir des astuces sur le cours "${course}", et nous tenons à vous souhaiter la bienvenue dans ce suivi personnalisé. Nous allons faire de notre mieux pour que vous deveniez compétent dans ce cours, et cela gratuitement.

Vous recevrez régulièrement :
– Des résumés clairs et applicables
– Certaines vidéos gratuites de YouTube, Vimeo et autres
– Des astuces tirées de livres sur le sujet
– Des références pour approfondir si vous le souhaitez

Nous croyons que l'apprentissage doit être accessible à tous, et nous sommes heureux de vous accompagner dans cette aventure.

Il serait préférable d'avoir terminé le cours gratuit qui se trouve sur votre espace personnel pour tirer le meilleur parti des astuces que nous allons partager.

Accédez à votre espace ici pour commencer :
https://masterfree.com

À très vite pour la suite de votre progression dans "${course}",
L’équipe MasterFree
`,
      html: `
  <div style="background:#18181b;padding:48px 0;font-family:sans-serif;color:#fff;text-align:center;">
    <div style="background:#23232b;max-width:520px;margin:0 auto;border-radius:16px;padding:32px 24px;box-shadow:0 8px 32px #0004;">
      <img src="https://masterfree.com/logo-mc.png" alt="MasterFree" style="width:48px;height:48px;border-radius:50%;margin-bottom:16px;" />
      <h1 style="color:#e86d5a;font-size:1.8rem;margin-bottom:12px;">Bienvenue dans le suivi de ${course} !</h1>
      <p style="font-size:1.1rem;line-height:1.5;margin-bottom:24px;">
        👋 <b>Merci d'avoir choisi de progresser avec nous.</b>
      </p>
      <p style="font-size:1rem;line-height:1.5;margin-bottom:24px;">
        Vous venez d'accepter de recevoir des astuces sur le cours "<b>${course}</b>", et nous tenons à vous souhaiter la bienvenue dans ce suivi personnalisé.
      </p>
      <p style="font-size:1rem;line-height:1.5;margin-bottom:24px;">
        Nous allons faire de notre mieux pour que vous deveniez compétent dans ce cours, et cela <b>gratuitement</b>.
      </p>
      <div style="background:#fff1;border-radius:12px;padding:18px 14px;margin-bottom:24px;text-align:left;max-width:420px;margin-left:auto;margin-right:auto;">
        <b style="color:#e86d5a;">Vous recevrez régulièrement :</b>
        <ul style="margin:12px 0 0 18px;padding:0;font-size:1rem;line-height:1.5;">
          <li>✅ Des résumés clairs et applicables</li>
          <li>✅ Certaines vidéos gratuites de YouTube, Vimeo et autres</li>
          <li>✅ Des astuces tirées de livres sur le sujet</li>
          <li>✅ Des références pour approfondir si vous le souhaitez</li>
        </ul>
      </div>
      <p style="font-size:1rem;line-height:1.5;margin-bottom:24px;">
        Il serait préférable d'avoir terminé le cours gratuit disponible sur votre espace personnel pour tirer le meilleur parti de ce suivi.
      </p>
      <a href="https://masterfree.com" style="display:inline-block;background:#e86d5a;color:#fff;text-decoration:none;font-weight:bold;padding:14px 28px;border-radius:32px;font-size:1rem;margin-bottom:24px;">Accéder à mon espace</a>
      <p style="margin-top:24px;color:#aaa;font-size:0.95rem;line-height:1.4;">
        À très vite pour la suite de votre progression dans "<b>${course}</b>",<br>L’équipe MasterFree
      </p>
    </div>
  </div>
  `,
    });
  } catch {
    return new Response(
      JSON.stringify({ error: "Erreur lors de l'envoi de l'email" }),
      { status: 500 }
    );
  }

  // 2. Envoi à Telegram
  try {
    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID!;
    const text = `📩 Nouvelle demande de suivi\nCours : ${course}\nEmail : ${email}`;
    await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text,
        }),
      }
    );
  } catch {
    // Rien à faire ici, on ne veut pas bloquer l'envoi de l'email
    // console.error("Erreur lors de l'envoi à Telegram", e);
  }

  return new Response(JSON.stringify({ ok: true }), { status: 200 });
}
