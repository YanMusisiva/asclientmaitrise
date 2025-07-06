"use client";
import React, { useState } from "react";
const validateEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  return re.test(email);
};

const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!validateEmail(email)) {
      setError("Veuillez entrer une adresse e-mail valide.");
      return;
    }

    setLoading(true);
    const response = await fetch("../api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    setLoading(false);
    if (response.ok) {
      setSuccess("Inscription réussie !");
      setEmail("");
      setSent(true);
    } else {
      const data = await response.json();
      setError(
        data.message || "Erreur lors de l'inscription. Veuillez réessayer."
      );
    }
  };

  return (
    <section className="bg-white/80 backdrop-blur-xl border border-[#e0e7ef] rounded-2xl shadow-2xl p-10 w-full max-w-2xl mx-auto flex flex-col items-center">
      <h2 className="text-3xl md:text-4xl font-extrabold mb-3 text-[#0a2540] drop-shadow-sm">
        Restez informé
      </h2>
      <p className="mb-8 text-[#0a2540]/80 text-lg">
        Recevez nos conseils, actualités et offres exclusives directement dans votre boîte mail.
      </p>
      {sent ? (
        <div className="text-[#22c55e] font-semibold text-lg animate-fade-in">
          Merci pour votre inscription !
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col sm:flex-row items-center gap-4"
        >
          <input
            type="email"
            required
            placeholder="Votre adresse e-mail"
            className="flex-1 px-5 py-3 rounded-full border border-[#e0e7ef] focus:outline-none focus:ring-2 focus:ring-[#6366f1] bg-white/70 text-[#0a2540] font-medium shadow-sm transition"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-[#6366f1] hover:bg-[#7c3aed] text-white px-8 py-3 rounded-full font-semibold shadow-lg transition min-w-[140px]"
          >
            {loading ? "Envoi..." : "S'inscrire"}
          </button>
        </form>
      )}
      {error && (
        <p className="text-red-500 mt-4 text-center animate-fade-in">{error}</p>
      )}
      {success && (
        <p className="text-[#22c55e] mt-4 text-center animate-fade-in">{success}</p>
      )}
      <p className="text-xs text-[#0a2540]/50 mt-6 text-center">
        Nous respectons votre vie privée. Aucun spam.
      </p>
      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in { animation: fade-in 0.7s ease both; }
      `}</style>
    </section>
  );
};

export default NewsletterSection;