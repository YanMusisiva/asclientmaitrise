"use client";
import { useState } from "react";

export default function CommentModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
     if (!name.trim() || !comment.trim()) {
    setError("Veuillez remplir tous les champs.");
    return;
  }
  if (name.length > 50 || comment.length > 500) {
    setError("Nom ou commentaire trop long.");
    return;
  }
  if (/[<>]/.test(name) || /[<>]/.test(comment)) {
    setError("Caractères invalides détectés.");
    return;
  }
    try {
      const res = await fetch("/api/commentaire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, comment }),
      });
      if (!res.ok) throw new Error("Erreur lors de l'envoi du commentaire.");
      setSent(true);
      setName("");
      setComment("");
    } catch (err: any) {
      setError(err.message || "Erreur inconnue.");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="bg-black text-white rounded-xl p-8 w-full max-w-md shadow-2xl border border-white/10 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-2xl text-white/60 hover:text-white"
          aria-label="Fermer"
        >
          ×
        </button>
        <h3 className="text-xl font-bold mb-4 text-[#e86d5a]">Laisser un commentaire</h3>
        {sent ? (
          <div className="text-green-400 font-semibold text-center">Merci pour votre commentaire !</div>
        ) : (
          <form onSubmit={handleSend} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Votre nom"
              className="bg-white/10 border border-white/20 rounded px-4 py-2 text-white focus:outline-none"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
            <textarea
              placeholder="Votre commentaire"
              className="bg-white/10 border border-white/20 resize-none rounded px-4 py-2 text-white focus:outline-none min-h-[80px]"
              value={comment}
              onChange={e => setComment(e.target.value)}
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-[#e86d5a] hover:bg-white hover:text-[#e86d5a] text-white px-6 py-2 rounded-full font-semibold shadow transition border border-[#e86d5a] hover:border-white"
            >
              {loading ? "Envoi..." : "Envoyer"}
            </button>
            {error && <div className="text-red-400 text-sm">{error}</div>}
          </form>
        )}
      </div>
    </div>
  );
}