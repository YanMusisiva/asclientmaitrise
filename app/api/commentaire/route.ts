export async function POST(req: Request) {
  const body = await req.json();
  const name = (body.name || "").trim();
  const comment = (body.comment || "").trim();

  if (!name || !comment) {
    return new Response(JSON.stringify({ error: "Champs requis." }), { status: 400 });
  }
  if (name.length > 50 || comment.length > 500) {
    return new Response(JSON.stringify({ error: "Nom ou commentaire trop long." }), { status: 400 });
  }
  if (/[<>]/.test(name) || /[<>]/.test(comment)) {
    return new Response(JSON.stringify({ error: "Caractères invalides." }), { status: 400 });
  }

  // Récupère les variables d'environnement
  const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
  const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID!;

  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    return new Response(JSON.stringify({ error: "Configuration serveur manquante" }), { status: 500 });
  }

  const text = `📝 Nouveau commentaire\n👤 Nom: ${name}\n💬 Commentaire: ${comment}`;

  try {
    await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text,
      }),
    });
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ e: "Erreur lors de l'envoi à Telegram" }), { status: 500 });
  }
}