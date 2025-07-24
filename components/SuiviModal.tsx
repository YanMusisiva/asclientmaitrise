"use client";
import { useState } from "react";
import { useEffect } from "react";

interface SuiviModalProps {
  open: boolean;
  onClose: () => void;
  courseTitle: string;
  onSuccess?: () => void;
}

export default function SuiviModal({ open, onClose, courseTitle, onSuccess }: SuiviModalProps) {
    const [email, setEmail] = useState("");
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (open) {
            setSent(false);
            setEmail("");
            setError(null);
        }
    }, [open]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSending(true);
        setError(null);
        if (!/^[\w-.]+@[\w-]+\.[a-z]{2,}$/i.test(email)) {
            setError("Email invalide.");
            setSending(false);
            return;
        }
        try {
            // Envoi à ton backend (à adapter selon ton API)
            const res = await fetch("/api/suivi", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, course: courseTitle }),
            });
            if (!res.ok) throw new Error("Erreur lors de l'envoi");
            setSent(true);
            setEmail("");
            if (onSuccess) onSuccess();
        } catch  {
            setError("Impossible d'envoyer la demande.");
        }
        setSending(false);
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
                <h3 className="text-xl font-bold mb-4 text-[#e86d5a]">Suivi gratuit : {courseTitle}</h3>
                {sent ? (
                    <div className="text-green-400 font-semibold text-center">Merci, vous recevrez bientôt nos astuces !</div>
                ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <input
                            type="email"
                            placeholder="Votre email"
                            className="bg-white/10 border border-white/20 rounded px-4 py-2 text-white focus:outline-none"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                        <button
                            type="submit"
                            disabled={sending}
                            className="bg-[#e86d5a] hover:bg-white hover:text-[#e86d5a] text-white px-6 py-2 rounded-full font-semibold shadow transition border border-[#e86d5a] hover:border-white"
                        >
                            {sending ? "Envoi..." : "Demander le suivi gratuit"}
                        </button>
                        {error && <div className="text-red-400 text-sm">{error}</div>}
                    </form>
                )}
            </div>
        </div>
    );
}

