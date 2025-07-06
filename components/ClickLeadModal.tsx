"use client";

import { useState } from "react";
import { leadSchema } from "../lib/leadSchema";

interface ClickLeadModalProps {
  elementName: string;
  onClose: () => void;
}

export default function ClickLeadModal({ elementName, onClose }: ClickLeadModalProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const validation = leadSchema.safeParse({ email, elementName });
    if (!validation.success) {
      setMessage(validation.error.errors[0].message);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/clicklead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validation.data),
      });
      const data = await res.json();
      setMessage(data.message);
      setEmail("");
    } catch (error) {
      console.error(error);
      setMessage("Erreur lors de l'envoi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4">Recevoir plus d&apos;infos sur &quot;{elementName}&quot;</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            placeholder="Votre email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border p-2 rounded w-full"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded w-full"
          >
            {loading ? "Envoi..." : "Envoyer"}
          </button>
        </form>
        {message && <p className="mt-3 text-center text-sm">{message}</p>}
        <button
          onClick={onClose}
          className="mt-4 text-sm underline text-center w-full"
        >
          Fermer
        </button>
      </div>
    </div>
  );
}

export const metadata = {
  title: "Modal - Click Lead",
  description: "Modal for capturing click leads with email.",
};