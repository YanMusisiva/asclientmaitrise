"use client";
import { useState } from "react";
import LandingElement from "@/components/LandingElement";
import NewsletterSection from "@/components/NewsletterSection";
import Image from "next/image";

export default function LandingPage() {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-[#0a2540] via-[#3b82f6] to-[#a78bfa] overflow-x-hidden">
      {/* Navbar Stripe-style */}
      <nav className="fixed top-0 left-0 w-full z-30 flex items-center justify-between px-6 md:px-16 py-4 bg-white/60 backdrop-blur-md shadow-sm">
        <div className="flex items-center gap-2">
          <Image 
            width={32}
            height={32}
           src="/logo.png"
            alt="Logo" className="h-8 w-8 rounded-full" />
          <span className="font-bold text-lg text-[#0a2540]">ClientMaitrise</span>
        </div>
        <div className="hidden md:flex gap-8 text-[#0a2540] font-medium">
          <a href="#services" className="hover:text-[#6366f1] transition">Services</a>
          <a href="#testimonials" className="hover:text-[#6366f1] transition">Témoignages</a>
          <a href="#whyus" className="hover:text-[#6366f1] transition">Pourquoi nous ?</a>
          <a href="#newsletter" className="hover:text-[#6366f1] transition">Newsletter</a>
        </div>
        <a
          href="#newsletter"
          className="hidden md:inline-block bg-[#6366f1] hover:bg-[#7c3aed] text-white px-6 py-2 rounded-full font-semibold shadow transition"
        >
          Commencer
        </a>
        {/* Burger menu mobile */}
        <button
          className="md:hidden flex flex-col gap-1"
          onClick={() => setNavOpen(!navOpen)}
          aria-label="Ouvrir le menu"
        >
          <span className="w-7 h-1 bg-[#0a2540] rounded"></span>
          <span className="w-7 h-1 bg-[#0a2540] rounded"></span>
          <span className="w-7 h-1 bg-[#0a2540] rounded"></span>
        </button>
        {navOpen && (
          <div className="absolute top-16 right-6 bg-white rounded-lg shadow-lg flex flex-col gap-4 p-6 md:hidden animate-fade-in">
            <a href="#services" onClick={() => setNavOpen(false)}>Services</a>
            <a href="#testimonials" onClick={() => setNavOpen(false)}>Témoignages</a>
            <a href="#whyus" onClick={() => setNavOpen(false)}>Pourquoi nous ?</a>
            <a href="#newsletter" onClick={() => setNavOpen(false)}>Newsletter</a>
          </div>
        )}
      </nav>

      {/* HERO Stripe-style */}
      <section className="relative z-10 flex flex-col md:flex-row items-center justify-between pt-32 md:pt-40 pb-20 px-6 md:px-16">
        <div className="flex-1 max-w-xl animate-slide-left">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight drop-shadow">
            Attirez plus de clients <span className="text-[#a78bfa]">en ligne</span> <br />et sur le terrain
          </h1>
          <p className="text-lg md:text-2xl text-white/90 mb-8">
            Boostez votre visibilité, générez des prospects qualifiés et transformez votre présence digitale en succès commercial.
          </p>
          <a
            href="#services"
            className="bg-[#6366f1] hover:bg-[#7c3aed] text-white px-8 py-4 rounded-full font-semibold shadow-lg transition text-lg"
          >
            Découvrir nos services
          </a>
        </div>
        <div className="flex-1 flex justify-center mt-12 md:mt-0 animate-slide-right">
          <Image
            width={480}
            height={480}
            src="/hero-illustration.png"
            alt="Illustration"
            className="w-[350px] md:w-[480px] rounded-3xl shadow-2xl border-4 border-white/30"
          />
        </div>
      </section>

      {/* SERVICES Stripe-style */}
      <section
        id="services"
        className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 px-6 md:px-16 mb-32"
      >
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-8 animate-slide-left border border-[#e0e7ef] hover:scale-105 transition">
          <LandingElement
            name="Formation Next.js Pro"
            description="Apprends à créer des applications performantes avec Next.js."
            image="/formation-nextjs.jpg"
          />
        </div>
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-8 animate-fade-in border border-[#e0e7ef] hover:scale-105 transition">
          <LandingElement
            name="Audit SEO Gratuit"
            description="Obtiens un rapport complet sur le SEO de ton site gratuitement."
            image="/audit-seo.jpg"
          />
        </div>
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-8 animate-slide-right border border-[#e0e7ef] hover:scale-105 transition">
          <LandingElement
            name="Consultation Gratuite"
            description="Discute gratuitement de ton projet et reçois des conseils personnalisés."
            image="/consultation.jpg"
          />
        </div>
      </section>

      {/* POURQUOI NOUS CHOISIR Stripe-style */}
      <section
        id="whyus"
        className="relative z-10 py-24 px-6 md:px-16 bg-gradient-to-r from-white/80 to-white/60 rounded-3xl shadow-2xl mx-4 md:mx-16 mb-32 animate-fade-in"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#0a2540] mb-16 animate-slide-down">
          Pourquoi choisir notre équipe ?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex flex-col items-center text-center animate-slide-left">
            <div className="bg-[#6366f1]/10 rounded-full p-5 mb-4">
              <Image
                width={48}
                height={48}
               src="/expertise.png" 
               alt="" className="h-12" />
            </div>
            <h3 className="font-semibold text-xl text-[#6366f1]">Expertise reconnue</h3>
            <p className="text-[#0a2540]/80 mt-2">Des années d’expérience en web, SEO et marketing digital.</p>
          </div>
          <div className="flex flex-col items-center text-center animate-fade-in">
            <div className="bg-[#a78bfa]/10 rounded-full p-5 mb-4">
              <Image 
              width={48}
              height={48}
              src="/accompagnement.png" 
              alt="" className="h-12" />
            </div>
            <h3 className="font-semibold text-xl text-[#a78bfa]">Accompagnement sur-mesure</h3>
            <p className="text-[#0a2540]/80 mt-2">Des solutions adaptées à chaque étape de votre croissance.</p>
          </div>
          <div className="flex flex-col items-center text-center animate-slide-right">
            <div className="bg-[#3b82f6]/10 rounded-full p-5 mb-4">
              <Image 
              width={48}
              height={48}
              src="/resultats.png" 
              alt="" className="h-12" />
            </div>
            <h3 className="font-semibold text-xl text-[#3b82f6]">Résultats concrets</h3>
            <p className="text-[#0a2540]/80 mt-2">Des clients satisfaits et des résultats mesurables.</p>
          </div>
        </div>
      </section>

      {/* TÉMOIGNAGES Stripe-style */}
      <section
        id="testimonials"
        className="relative z-10 py-24 px-6 md:px-16 mb-32"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-16 animate-slide-down">
          Ils nous font confiance
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/90 rounded-2xl shadow-xl p-8 flex flex-col items-center animate-slide-left border-t-4 border-[#6366f1]">
            <p className="italic text-[#0a2540] mb-4 text-center">
              “Grâce à leur audit SEO, notre site a gagné en visibilité et nous avons doublé nos prospects !”
            </p>
            <div className="flex items-center gap-3 mt-4">
              <Image
                width={48}
                height={48}
               src="/client1.jpg" alt="" 
               className="h-12 w-12 rounded-full border-2 border-[#6366f1]" />
              <span className="font-semibold text-[#6366f1]">Sophie, entrepreneure</span>
            </div>
          </div>
          <div className="bg-white/90 rounded-2xl shadow-xl p-8 flex flex-col items-center animate-fade-in border-t-4 border-[#a78bfa]">
            <p className="italic text-[#0a2540] mb-4 text-center">
              “L’accompagnement personnalisé a fait toute la différence pour lancer mon activité !”
            </p>
            <div className="flex items-center gap-3 mt-4">
              <Image 
                width={48}
                height={48}
              src="/client2.jpg"
               alt="" className="h-12 w-12 rounded-full border-2 border-[#a78bfa]" />
              <span className="font-semibold text-[#a78bfa]">Karim, coach sportif</span>
            </div>
          </div>
          <div className="bg-white/90 rounded-2xl shadow-xl p-8 flex flex-col items-center animate-slide-right border-t-4 border-[#3b82f6]">
            <p className="italic text-[#0a2540] mb-4 text-center">
              “Des conseils concrets et des résultats rapides, je recommande à 100% !”
            </p>
            <div className="flex items-center gap-3 mt-4">
              <Image
              width={48}
              height={48} 
              src="/client3.jpg" 
              alt="" className="h-12 w-12 rounded-full border-2 border-[#3b82f6]" />
              <span className="font-semibold text-[#3b82f6]">Julie, commerçante</span>
            </div>
          </div>
        </div>
      </section>

      {/* NEWSLETTER Stripe-style */}
      <section
        id="newsletter"
        className="relative z-10 flex justify-center mb-32 animate-fade-in"
      >
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-10 w-full max-w-2xl">
          <NewsletterSection />
        </div>
      </section>

      {/* FOOTER Stripe-style */}
      <footer className="relative z-10 bg-[#0a2540] text-white py-10 px-6 md:px-16 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="Logo" className="h-8 w-8 rounded-full" />
          <span className="font-bold text-lg">MonBusiness</span>
        </div>
        <div className="text-sm text-blue-100">
          © {new Date().getFullYear()} MonBusiness. Tous droits réservés.
        </div>
        <div className="flex gap-4">
          <a href="#" className="hover:underline">Mentions légales</a>
          <a href="#" className="hover:underline">Contact</a>
        </div>
      </footer>

      {/* Animations CSS */}
      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-left {
          from { opacity: 0; transform: translateX(-60px);}
          to { opacity: 1; transform: translateX(0);}
        }
        @keyframes slide-right {
          from { opacity: 0; transform: translateX(60px);}
          to { opacity: 1; transform: translateX(0);}
        }
        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-40px);}
          to { opacity: 1; transform: translateY(0);}
        }
        .animate-fade-in { animation: fade-in 1s ease both; }
        .animate-slide-left { animation: slide-left 1s cubic-bezier(.4,0,.2,1) both; }
        .animate-slide-right { animation: slide-right 1s cubic-bezier(.4,0,.2,1) both; }
        .animate-slide-down { animation: slide-down 1s cubic-bezier(.4,0,.2,1) both; }
      `}</style>
    </main>
  );
}