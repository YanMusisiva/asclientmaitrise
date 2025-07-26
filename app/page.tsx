"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import SuiviModal from "@/components/SuiviModal";
import ModalVideoPlayer from "@/components/ModalVideoPlayer";
import CommentModal from "@/components/CommentModal";

// Cours à la une (vidéo unique)
const featuredCourses = [
  {
    title: "Pensée Critique & Résolution de Problèmes",
    teacher: "TED-Ed",
    image: "/critical-thinking.jpg",
    videoUrl: "https://www.youtube.com/watch?v=dItUGF8GdTw",
  },
  {
    title: "Compétences Numériques & Programmation",
    teacher: "freeCodeCamp.org",
    image: "/digital-skills.jpg",
    videoUrl: "https://www.youtube.com/watch?v=8PopR3x-VMY",
  },
  {
    title: "Esprit d’Entreprise & Innovation",
    teacher: "Y Combinator",
    image: "/entrepreneurship.jpg",
    videoUrl: "https://www.youtube.com/watch?v=CBYhVcO4WgI",
  },
  {
    title: "Développement Durable & Écologie",
    teacher: "Kurzgesagt – In a Nutshell",
    image: "/sustainability.jpg",
    videoUrl: "https://www.youtube.com/watch?v=3Pkb65rwZVI",
  },
  {
    title: "Communication Interculturelle",
    teacher: "TED",
    image: "/intercultural.jpg",
    videoUrl: "https://www.youtube.com/watch?v=YMyofREc5Jk",
  },
  {
    title: "Santé Mentale & Bien-être",
    teacher: "Psych2Go",
    image: "/mental-health.jpg",
    videoUrl: "https://www.youtube.com/watch?v=1Evwgu369Jw",
  },
  {
    title: "Recherche Scientifique & Méthodologie",
    teacher: "CrashCourse",
    image: "/scientific-method.jpg",
    videoUrl: "https://www.youtube.com/watch?v=KZaCy5Z87FA",
  },
  {
    title: "Éthique & Citoyenneté",
    teacher: "The School of Life",
    image: "/ethics.jpg",
    videoUrl: "https://www.youtube.com/watch?v=joCOWaaTzvM",
  },
  {
    title: "Leadership & Intelligence Emotionnelle",
    teacher: "Daniel Goleman / Big Think",
    image: "/leadership.jpg",
    videoUrl: "https://www.youtube.com/watch?v=Y7m9eNoB3NU",
  },
  {
    title: "Littératie Financière & Économie",
    teacher: "Graham Stephan",
    image: "/financial-literacy.jpg",
    videoUrl: "https://www.youtube.com/watch?v=F3QpgXBtDeo",
  },

  {
    title: "Intelligence Artificielle / Prompt Engineering",
    teacher: "ForwardFuture AI",
    image: "/ai-prompt.jpg",
    videoUrl: "https://www.youtube.com/watch?v=uDIW34h8cmM", // Prompt Engineering Guide – From Beginner to Advanced
  },
  {
    title: "Création de contenu (YouTube, TikTok, blog)",
    teacher: "Think Media",
    image: "/content.jpg",
    videoUrl: "https://www.youtube.com/watch?v=IBmgnV1j0o8", // YouTube Growth strategy tutorial
  },
  {
    title: "Récapitulatif The Millionaire Fastlane",
    teacher: "The White Coat Investor (MJ DeMarco)",
    image: "/fastlane.jpg",
    videoUrl: "https://www.youtube.com/watch?v=x_GMokHeHmQ",
  },

  {
    title: "Atelier 2 – Être efficace en cuisine !",
    teacher: "Vanessa Daigle (Vimeo, français)",
    image: "/course_notech7.jpg",
    videoUrl: "https://vimeo.com/1010328351",
  },

  {
    title: "Marketing / Dropshipping expliqué (Un Créatif)",
    teacher: "Un Créatif (YouTube, français)",
    image: "/course_notech9.jpg",
    videoUrl: "https://www.youtube.com/@UnCreatif",
  },
  {
    title: "Économie vulgarisée (Stupid Economics)",
    teacher: "Stupid Economics (YouTube, français)",
    image: "/course_notech10.jpg",
    videoUrl: "https://www.youtube.com/c/StupidEconomics",
  },

  {
    title: "Développement Web (Frontend + Backend)",
    teacher: "freeCodeCamp.org",
    image: "/dev-web.jpg",
    videoUrl: "https://www.youtube.com/watch?v=ZxKM3DCV2kE", // Learn Full Stack Web Dev from Scratch
  },

  {
    title: "Design UI/UX & No‑Code (Figma, Webflow)",
    teacher: "Flux Academy",
    image: "/uiux.jpg",
    videoUrl: "https://www.youtube.com/watch?v=3Q6iW01G3h0", // Example popular UI/UX tutorial
  },
  {
    title: "Marketing Digital & Growth Hacking",
    teacher: "Neil Patel",
    image: "/marketing.jpg",
    videoUrl: "https://www.youtube.com/watch?v=2iQKcZQ-P2I", // Example Social Media marketing crash course
  },
  {
    title: "Développement Mobile (Flutter / React Native)",
    teacher: "freeCodeCamp.org",
    image: "/mobile-dev.jpg",
    videoUrl: "https://www.youtube.com/watch?v=1JWqfjcYenA", // Full Flutter course
  },
  {
    title: "Création de business en ligne (e‑commerce, SaaS)",
    teacher: "Oberlo",
    image: "/ecommerce.jpg",
    videoUrl: "https://www.youtube.com/watch?v=U3m1YfNnqfE", // How to start e-commerce tutorial
  },
  {
    title: "Automatisation & Productivité (Python, Zapier)",
    teacher: "Automation Step by Step",
    image: "/automation.jpg",
    videoUrl: "https://www.youtube.com/watch?v=HJutL1aDrVE", // Zapier & Python automation guide
  },

  {
    title: "DevOps & Cloud (AWS, Docker, CI/CD)",
    teacher: "TechWorld with Nana",
    image: "/devops.jpg",
    videoUrl: "https://www.youtube.com/watch?v=Fy9k_L9hlso", // Docker & Kubernetes full course
  },
  {
    title: "Analyse de données / SQL / Excel / Power BI",
    teacher: "freeCodeCamp.org",
    image: "/data-analysis.jpg",
    videoUrl: "https://www.youtube.com/watch?v=r6TeOHZPeUQ", // SQL full tutorial for beginners
  },
];

// Parcours multi-vidéos
const videoSeries = [
  {
    title: "Apprendre le Développement Web",
    teacher: "Jean Dupuis",
    image: "/web-course.jpg",
    videos: [
      {
        title: "Développement Web : C'est quoi ?",
        url: "https://www.youtube.com/watch?v=VfGW0Qiy2I0",
      },
      {
        title: "HTML & CSS en 1h - Cours complet débutant",
        url: "https://www.youtube.com/watch?v=ec8vSKJuZTk",
      },
      {
        title: "Apprendre JavaScript en 1h",
        url: "https://www.youtube.com/watch?v=jS4aFq5-91M",
      },
      {
        title: "Créer son premier site web portfolio",
        url: "https://www.youtube.com/watch?v=YtYT1Onfx-0",
      },
    ],
    progress: 0,
  },
  {
    title: "Pitch & Prise de Parole",
    teacher: "Laura Menet",
    image: "/pitch-course.jpg",
    videos: [
      {
        title: "Comment faire un bon pitch en 5 minutes",
        url: "https://www.youtube.com/watch?v=ecadAkswUqI",
      },
      {
        title: "Améliorer son éloquence naturellement",
        url: "https://www.youtube.com/watch?v=gl4K5M7T1HY",
      },
      {
        title: "Parler en public sans stress",
        url: "https://www.youtube.com/watch?v=5Peo-ivmupE",
      },
    ],
    progress: 0,
  },
  {
    title: "Jouer du Piano Facilement",
    teacher: "Claire Lemoine",
    image: "/piano-course.jpg",
    videos: [
      {
        title: "Comment lire une partition",
        url: "https://www.youtube.com/watch?v=hlrxDNBO03E",
      },
      {
        title: "Piano Débutant : Apprendre un morceau facilement",
        url: "https://www.youtube.com/watch?v=Ix9TtzS3J9c",
      },
      {
        title: "Méthode Hanon pour échauffement",
        url: "https://www.youtube.com/watch?v=FiDUOozLPRc",
      },
      {
        title: "Apprendre 'Let It Be' au piano (débutants)",
        url: "https://www.youtube.com/watch?v=ghXeZgF1YGo",
      },
    ],
    progress: 0,
  },
  {
    title: "Développer sa Créativité",
    teacher: "Julien Bouret",
    image: "/creativity-course.jpg",
    videos: [
      {
        title: "Débloquer sa créativité en 5 étapes",
        url: "https://www.youtube.com/watch?v=klg_s1X9FCw",
      },
      {
        title: "Design Thinking expliqué simplement",
        url: "https://www.youtube.com/watch?v=_r0VX-aU_T8",
      },
    ],
    progress: 0,
  },
];
function useVideoProgress(seriesKey: string) {
  const [progress, setProgress] = useState<number[]>([]);

  // Charger la progression depuis localStorage
  useEffect(() => {
    const saved = localStorage.getItem(`progress_${seriesKey}`);
    if (saved) {
      setProgress(JSON.parse(saved));
    }
  }, [seriesKey]);

  // Sauvegarder la progression
  useEffect(() => {
    localStorage.setItem(`progress_${seriesKey}`, JSON.stringify(progress));
  }, [progress, seriesKey]);

  // Marquer une vidéo comme vue
  const markAsWatched = (idx: number) => {
    setProgress((prev) =>
      prev.includes(idx) ? prev : [...prev, idx].sort((a, b) => a - b)
    );
  };

  return { progress, markAsWatched };
}

// type Course = {
//   title: string;
//   teacher: string;
//   image: string;
//   videoUrl: string;
// };

// function CourseSearchBar({ courses }: { courses: Course[] }) {
//   const [query, setQuery] = useState("");
//   const [result, setResult] = useState<Course | null>(null);

//   useEffect(() => {
//     if (!query) {
//       setResult(null);
//       return;
//     }
//     // Recherche simple par titre (case insensitive)
//     const bestMatch = courses.find((course) =>
//       course.title.toLowerCase().includes(query.toLowerCase())
//     );
//     setResult(bestMatch || null);
//   }, [query, courses]);

//   return (
//     <div className="w-full flex flex-col items-center mb-8">
//       <input
//         type="text"
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//         placeholder="Rechercher un cours..."
//         className="w-full max-w-md px-4 py-2 rounded-full border border-[#e86d5a] focus:outline-none focus:border-white bg-black/80 text-white mb-2"
//       />
//       {result ? (
//         <a
//           href="#featured"
//           className="mt-2 text-[#e86d5a] underline text-lg font-semibold hover:text-white transition"
//         >
//           {`Voir le cours : ${result.title}`}
//         </a>
//       ) : (
//         query && (
//           <span className="mt-2 text-white/60 text-lg font-semibold">
//             aucun résultat
//           </span>
//         )
//       )}
//     </div>
//   );
// }

// Utilisation dans ta page principale :
// <CourseSearchBar courses={featuredCourses} />

function useStaggeredInView(count: number) {
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const [visible, setVisible] = useState(Array(count).fill(false));

  useEffect(() => {
    if (typeof window === "undefined") return;
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = Number((entry.target as HTMLElement).dataset.idx);
          setVisible((v) => {
            const next = [...v];
            next[idx] = entry.isIntersecting;
            return next;
          });
        });
      },
      { threshold: 0.2 }
    );
    refs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [count]);
  return { refs, visible };
}

// Composant pour une carte de parcours vidéo
function VideoSeriesCard({
  course,
  idx,
  refEl,
  visible,
  setVideoModal,
  setModalCourse,
  setModalOpen,
  modalOpen,
}: {
  course: (typeof videoSeries)[number];
  idx: number;
  refEl: (el: HTMLDivElement | null) => void;
  visible: boolean;
  setVideoModal: React.Dispatch<
    React.SetStateAction<{ url: string; title: string } | null>
  >;
  setModalCourse: React.Dispatch<React.SetStateAction<string>>;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  modalOpen: boolean;
}) {
  const { progress, markAsWatched } = useVideoProgress(course.title);
  return (
    <div
      key={course.title}
      ref={refEl}
      data-idx={idx}
      className={`bg-black/80 rounded-2xl shadow-xl border border-white/10 p-6 flex flex-col transition-all duration-700
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}
      `}
      style={{ transitionDelay: visible ? `${idx * 120}ms` : "0ms" }}
    >
      <div className="flex items-center gap-4 mb-4">
        <Image
          width={100}
          height={70}
          src={course.image}
          alt={course.title}
          className="rounded-xl object-cover w-[100px] h-[70px]"
        />
        <div>
          <h3 className="font-bold text-xl text-white">{course.title}</h3>
          <p className="text-[#e86d5a] text-md">par {course.teacher}</p>
        </div>
      </div>
      <ol className="mb-4">
        {course.videos.map((video, i) => (
          <li key={video.url} className="flex items-center gap-2 mb-2">
            <span
              className={`w-5 h-5 flex items-center justify-center rounded-full text-xs font-bold
              ${
                progress.includes(i)
                  ? "bg-[#e86d5a] text-white"
                  : "bg-white/10 text-white"
              }
            `}
            >
              {progress.includes(i) ? "✓" : i + 1}
            </span>
            <button
              type="button"
              onClick={() => {
                markAsWatched(i);
                setVideoModal({ url: video.url, title: video.title });
              }}
              className="underline bg-transparent border-0 p-0 m-0 text-left text-[#e86d5a] hover:text-white transition cursor-pointer"
            >
              {video.title}
            </button>
          </li>
        ))}
      </ol>
      <div className="w-full bg-white/10 rounded-full h-2 mb-2">
        <div
          className="bg-gradient-to-r from-[#e86d5a] to-white h-2 rounded-full"
          style={{
            width: `${(progress.length / course.videos.length) * 100}%`,
          }}
        ></div>
      </div>
      <span className="text-xs text-white/60">
        {progress.length}/{course.videos.length} vidéos vues
      </span>
      <button
        type="button"
        onClick={() => {
          const nextIdx =
            progress.length < course.videos.length
              ? course.videos.findIndex((_, i) => !progress.includes(i))
              : 0;
          markAsWatched(nextIdx);
          setVideoModal({
            url: course.videos[nextIdx].url,
            title: course.videos[nextIdx].title,
          });
        }}
        className="inline-block mt-4 bg-[#e86d5a] hover:bg-white hover:text-[#e86d5a] text-white px-6 py-2 rounded-full font-semibold shadow transition border border-[#e86d5a] hover:border-white"
      >
        {progress.length < course.videos.length ? "Continuer" : "Revoir"}
      </button>
      <button
        onClick={() => {
          setModalCourse(course.title);
          setModalOpen(true);
        }}
        disabled={modalOpen}
        className="mt-2 bg-[#e86d5a] hover:bg-white hover:text-[#e86d5a] text-white px-4 py-2 rounded-full font-semibold shadow transition border border-[#e86d5a] hover:border-white disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Suivi gratuit
      </button>
    </div>
  );
}

export default function MasterclassLikePage() {
  const [navOpen, setNavOpen] = useState(false);
  const [suiviModalOpen, setSuiviModalOpen] = useState(false);
  const [commentModalOpen, setCommentModalOpen] = useState(false);
  const [modalCourse, setModalCourse] = useState("");
  const [videoModal, setVideoModal] = useState<{
    url: string;
    title: string;
  } | null>(null);

  // Stagger effect pour featuredCourses
  const { refs: featuredRefs, visible: featuredVisible } = useStaggeredInView(
    featuredCourses.length
  );
  // Stagger effect pour videoSeries
  const { refs: seriesRefs, visible: seriesVisible } = useStaggeredInView(
    videoSeries.length
  );

  return (
    <main className="relative min-h-screen bg-black text-white font-sans overflow-x-hidden">
      {/* Background Hero Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/hero-bg.jpg"
          alt="Background"
          fill
          className="object-cover opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black/95" />
      </div>

      {/* Header */}
      <header className="w-full flex items-center justify-between px-6 md:px-16 py-6 bg-black/80 backdrop-blur-md border-b border-white/10 fixed top-0 left-0 z-30">
        <div className="flex items-center gap-3">
          <Image
            src="/logo-mc.png"
            width={40}
            height={40}
            alt="Logo"
            className="rounded-full"
          />
          <span className="font-bold text-2xl tracking-tight text-white">
            AutoDidacte+
          </span>
        </div>
        <nav className="hidden md:flex gap-10 text-white/90 font-medium text-lg">
          <a href="#featured" className="hover:text-[#e86d5a] transition">
            Cours à la une
          </a>
          <a href="#series" className="hover:text-[#e86d5a] transition">
            Parcours vidéo
          </a>
        </nav>

        <Link
          href="/scolaire"
          className="hidden md:inline-block bg-[#e86d5a] hover:bg-white hover:text-[#e86d5a] text-white px-6 py-2 rounded-full font-semibold shadow transition border border-[#e86d5a] hover:border-white"
        >
          Parcours scolaire
        </Link>
        {/* Burger menu mobile */}
        <button
          className="md:hidden flex flex-col gap-1"
          onClick={() => setNavOpen(!navOpen)}
          aria-label="Ouvrir le menu"
        >
          <span className="w-7 h-1 bg-white rounded"></span>
          <span className="w-7 h-1 bg-white rounded"></span>
          <span className="w-7 h-1 bg-white rounded"></span>
        </button>
        {navOpen && (
          <div className="absolute top-20 right-6 bg-black/95 rounded-lg shadow-lg flex flex-col gap-4 p-6 md:hidden animate-fade-in text-white border border-white/10">
            <a href="#featured" onClick={() => setNavOpen(false)}>
              Cours à la une
            </a>
            <a href="#series" onClick={() => setNavOpen(false)}>
              Parcours vidéo
            </a>
            <Link
              href="/scolaire"
              className="bg-[#e86d5a] text-white px-4 py-2 rounded-full mt-2 text-center"
            >
              Parcours scolaire
            </Link>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="pt-32 md:pt-44 pb-20 px-6 md:px-16 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight tracking-tight text-white drop-shadow animate-slide-down">
          Apprenez des meilleurs.
          <br />
          <span className="text-[#e86d5a]">Gratuitement.</span>
        </h1>
        <p className="text-lg md:text-2xl text-white/80 mb-10 max-w-2xl animate-fade-in">
          Des cours exclusifs, des parcours immersifs, une expérience premium.
          Découvrez, inspirez-vous, progressez.
        </p>
        <a
          href="#featured"
          className="bg-[#e86d5a] hover:bg-white hover:text-[#e86d5a] text-white px-10 py-4 rounded-full font-semibold shadow-lg transition text-lg border border-[#e86d5a] hover:border-white animate-fade-in"
        >
          Explorer les cours
        </a>
      </section>
      <ModalVideoPlayer
        open={!!videoModal}
        onClose={() => setVideoModal(null)}
        videoUrl={videoModal?.url || ""}
        videoTitle={videoModal?.title || ""}
      />
      {/* COURS À LA UNE */}
      <section id="featured" className="px-6 md:px-16 mb-24">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-10 animate-slide-down">
          Cours à la une
        </h2>
        <SuiviModal
          open={suiviModalOpen}
          onClose={() => setSuiviModalOpen(false)}
          courseTitle={modalCourse}
          onSuccess={() => setSuiviModalOpen(false)}
        />
        <div className="flex flex-col gap-10">
          {featuredCourses.map((course, idx) => (
            <div
              key={course.title}
              ref={(el) => {
                featuredRefs.current[idx] = el;
              }}
              data-idx={idx}
              className={`flex flex-col md:flex-row items-center bg-black/80 rounded-2xl shadow-xl border border-white/10 overflow-hidden transition-all duration-700
                ${
                  featuredVisible[idx]
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12"
                }
              `}
              style={{
                transitionDelay: featuredVisible[idx]
                  ? `${idx * 120}ms`
                  : "0ms",
              }}
            >
              <Image
                width={320}
                height={180}
                src={course.image}
                alt={course.title}
                className="object-cover w-full md:w-[320px] h-[180px] md:h-[180px]"
              />
              <div className="flex-1 p-6 flex flex-col items-start">
                <h3 className="font-bold text-2xl text-white mb-2">
                  {course.title}
                </h3>
                <p className="text-[#e86d5a] text-lg mb-4">
                  par {course.teacher}
                </p>
                <button
                  type="button"
                  onClick={() =>
                    setVideoModal({ url: course.videoUrl, title: course.title })
                  }
                  className="bg-[#e86d5a] hover:bg-white hover:text-[#e86d5a] text-white px-6 py-2 rounded-full font-semibold shadow transition border border-[#e86d5a] hover:border-white"
                >
                  Regarder
                </button>
                <button
                  onClick={() => {
                    setModalCourse(course.title);
                    setSuiviModalOpen(true);
                  }}
                  disabled={suiviModalOpen} // désactive tous les boutons si un modal est ouvert
                  className="mt-2 bg-[#e86d5a] hover:bg-white hover:text-[#e86d5a] text-white px-4 py-2 rounded-full font-semibold shadow transition border border-[#e86d5a] hover:border-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Suivi gratuit
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PARCOURS VIDÉO */}

      <section id="series" className="px-6 md:px-16 mb-24">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-10 animate-slide-down">
          Parcours vidéo
        </h2>
        <SuiviModal
          open={suiviModalOpen}
          onClose={() => setSuiviModalOpen(false)}
          courseTitle={modalCourse}
          onSuccess={() => setSuiviModalOpen(false)}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {videoSeries.map((course, idx) => (
            <VideoSeriesCard
              key={course.title}
              course={course}
              idx={idx}
              refEl={(el) => {
                seriesRefs.current[idx] = el;
              }}
              visible={seriesVisible[idx]}
              setVideoModal={setVideoModal}
              setModalCourse={setModalCourse}
              setModalOpen={setSuiviModalOpen}
              modalOpen={suiviModalOpen}
            />
          ))}
        </div>
      </section>

      {/* COMMENT MODAL & BUTTON */}
      {(() => {
        return (
          <>
            <CommentModal
              open={commentModalOpen}
              onClose={() => setCommentModalOpen(false)}
            />
            <div className="w-full flex justify-center py-8 bg-black/80 border-t border-white/10">
              <button
                onClick={() => setCommentModalOpen(true)}
                className="bg-[#e86d5a] hover:bg-white hover:text-[#e86d5a] text-white px-8 py-3 rounded-full font-semibold shadow transition border border-[#e86d5a] hover:border-white"
              >
                Laisser un commentaire
              </button>
            </div>
          </>
        );
      })()}

      {/* FOOTER */}
      <footer className="bg-black/90 text-white py-10 px-6 md:px-16 flex flex-col md:flex-row justify-between items-center gap-4 border-t border-white/10">
        <div className="flex items-center gap-2">
          <Image
            width={32}
            height={32}
            src="/logo-mc.png"
            alt="Logo"
            className="h-8 w-8 rounded-full"
          />
          <span className="font-bold text-lg">AutoDidacte+</span>
        </div>
        <div className="text-sm text-white/60">
          © {new Date().getFullYear()} AutoDidacte+. Tous droits réservés.
        </div>
        <div className="flex gap-4">
          <a href="#" className="hover:underline">
            Up
          </a>
        </div>
      </footer>

      {/* Animations CSS */}
      <style jsx global>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 1s ease both;
        }
        .animate-slide-down {
          animation: slide-down 1s cubic-bezier(0.4, 0, 0.2, 1) both;
        }
      `}</style>
    </main>
  );
}
