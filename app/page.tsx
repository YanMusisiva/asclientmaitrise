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
    title: "Photographie Créative",
    teacher: "Camille Laurent",
    image: "/course1.jpg",
    videoUrl: "https://www.youtube.com/watch?v=xxxxxxx",
  },
  {
    title: "Écriture de Scénario",
    teacher: "Jean Morel",
    image: "/course2.jpg",
    videoUrl: "https://www.youtube.com/watch?v=yyyyyyy",
  },
  {
    title: "Cuisine Gastronomique",
    teacher: "Paul Bocuse",
    image: "/course5.jpg",
    videoUrl: "https://www.youtube.com/watch?v=zzzzzzz",
  },
  {
    title: "Leadership Inspirant",
    teacher: "Marie Curie",
    image: "/course6.jpg",
    videoUrl: "https://www.youtube.com/watch?v=aaaaaaa",
  },
  {
    title: "Peinture Moderne",
    teacher: "Claude Monet",
    image: "/course7.jpg",
    videoUrl: "https://www.youtube.com/watch?v=bbbbbbb",
  },
];

// Parcours multi-vidéos
const videoSeries = [
  {
    title: "Devenir Développeur Web",
    teacher: "Sophie Martin",
    image: "/course3.jpg",
    videos: [
      { title: "Introduction", url: "https://www.youtube.com/watch?v=vid1" },
      { title: "HTML & CSS", url: "https://www.youtube.com/watch?v=vid2" },
      { title: "JavaScript", url: "https://www.youtube.com/watch?v=vid3" },
      { title: "Projet final", url: "https://www.youtube.com/watch?v=vid4" },
    ],
    progress: 1,
  },
  {
    title: "L’Art du Pitch",
    teacher: "Karim Benali",
    image: "/course4.jpg",
    videos: [
      { title: "Trouver son idée", url: "https://www.youtube.com/watch?v=vid5" },
      { title: "Structurer son discours", url: "https://www.youtube.com/watch?v=vid6" },
      { title: "Captiver l’audience", url: "https://www.youtube.com/watch?v=vid7" },
    ],
    progress: 0,
  },
  {
    title: "Maîtriser le Piano",
    teacher: "Ludwig Beethoven",
    image: "/course8.jpg",
    videos: [
      { title: "Bases du piano", url: "https://www.youtube.com/watch?v=vid8" },
      { title: "Accords et gammes", url: "https://www.youtube.com/watch?v=vid9" },
      { title: "Improvisation", url: "https://www.youtube.com/watch?v=vid10" },
      { title: "Performance", url: "https://www.youtube.com/watch?v=vid11" },
    ],
    progress: 2,
  },
  {
    title: "Créativité & Innovation",
    teacher: "Steve Jobs",
    image: "/course9.jpg",
    videos: [
      { title: "Penser différemment", url: "https://www.youtube.com/watch?v=vid12" },
      { title: "Innover au quotidien", url: "https://www.youtube.com/watch?v=vid13" },
    ],
    progress: 1,
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



export default function MasterclassLikePage() {
  const [navOpen, setNavOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalCourse, setModalCourse] = useState("");
  const [videoModal, setVideoModal] = useState<{ url: string; title: string } | null>(null);

  // Stagger effect pour featuredCourses
  const { refs: featuredRefs, visible: featuredVisible } = useStaggeredInView(featuredCourses.length);
  // Stagger effect pour videoSeries
  const { refs: seriesRefs, visible: seriesVisible } = useStaggeredInView(videoSeries.length);

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
          <Image src="/logo-mc.png" width={40} height={40} alt="Logo" className="rounded-full" />
          <span className="font-bold text-2xl tracking-tight text-white">MasterFree</span>
        </div>
        <nav className="hidden md:flex gap-10 text-white/90 font-medium text-lg">
          <a href="#featured" className="hover:text-[#e86d5a] transition">Cours à la une</a>
          <a href="#series" className="hover:text-[#e86d5a] transition">Parcours vidéo</a>
      
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
            <a href="#featured" onClick={() => setNavOpen(false)}>Cours à la une</a>
            <a href="#series" onClick={() => setNavOpen(false)}>Parcours vidéo</a>
            <Link  href="/scolaire" className="bg-[#e86d5a] text-white px-4 py-2 rounded-full mt-2 text-center">Parcours scolaire</Link>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="pt-32 md:pt-44 pb-20 px-6 md:px-16 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight tracking-tight text-white drop-shadow animate-slide-down">
          Apprenez des meilleurs.<br />
          <span className="text-[#e86d5a]">Gratuitement.</span>
        </h1>
        <p className="text-lg md:text-2xl text-white/80 mb-10 max-w-2xl animate-fade-in">
          Des cours exclusifs, des parcours immersifs, une expérience premium. Découvrez, inspirez-vous, progressez.
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
        <SuiviModal open={modalOpen} onClose={() => setModalOpen(false)} courseTitle={modalCourse} onSuccess={()=>setModalOpen(false)}/>
        <div className="flex flex-col gap-10">
          {featuredCourses.map((course, idx) => (
            <div
              key={course.title}
              ref={el => { featuredRefs.current[idx] = el; }}
              data-idx={idx}
              className={`flex flex-col md:flex-row items-center bg-black/80 rounded-2xl shadow-xl border border-white/10 overflow-hidden transition-all duration-700
                ${featuredVisible[idx] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}
              `}
              style={{ transitionDelay: featuredVisible[idx] ? `${idx * 120}ms` : "0ms" }}
            >
              <Image
                width={320}
                height={180}
                src={course.image}
                alt={course.title}
                className="object-cover w-full md:w-[320px] h-[180px] md:h-[180px]"
              />
              <div className="flex-1 p-6 flex flex-col items-start">
                <h3 className="font-bold text-2xl text-white mb-2">{course.title}</h3>
                <p className="text-[#e86d5a] text-lg mb-4">par {course.teacher}</p>
                <button
                  type="button"
                  onClick={() => setVideoModal({ url: course.videoUrl, title: course.title })}
                
              
                  className="bg-[#e86d5a] hover:bg-white hover:text-[#e86d5a] text-white px-6 py-2 rounded-full font-semibold shadow transition border border-[#e86d5a] hover:border-white"
                >
                  Regarder
                </button>
                 <button
                onClick={() => {
                    setModalCourse(course.title);
                    setModalOpen(true);
                }}
                disabled={modalOpen} // désactive tous les boutons si un modal est ouvert
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
  <SuiviModal open={modalOpen} onClose={() => setModalOpen(false)} courseTitle={modalCourse} onSuccess={() => setModalOpen(false)} />
  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
{videoSeries.map((course, idx) => {
   const { progress, markAsWatched } = useVideoProgress(course.title);
  return (
        <div
          key={course.title}
          ref={el => { seriesRefs.current[idx] = el; }}
          data-idx={idx}
          className={`bg-black/80 rounded-2xl shadow-xl border border-white/10 p-6 flex flex-col transition-all duration-700
            ${seriesVisible[idx] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}
          `}
          style={{ transitionDelay: seriesVisible[idx] ? `${idx * 120}ms` : "0ms" }}
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
                <span className={`w-5 h-5 flex items-center justify-center rounded-full text-xs font-bold
                  ${progress.includes(i) ? "bg-[#e86d5a] text-white" : "bg-white/10 text-white"}
                `}>
                  {progress.includes(i) ? "✓" : i + 1}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    markAsWatched(i); // Marque la vidéo comme vue
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
              style={{ width: `${(progress.length / course.videos.length) * 100}%` }}
            ></div>
          </div>
          <span className="text-xs text-white/60">{progress.length}/{course.videos.length} vidéos vues</span>
          <button
          type="button"
          onClick={() => {
            // Cherche la première vidéo non vue, sinon la première
            const nextIdx = progress.length < course.videos.length
              ? course.videos.findIndex((_, i) => !progress.includes(i))
              : 0;
            markAsWatched(nextIdx);
            setVideoModal({ url: course.videos[nextIdx].url, title: course.videos[nextIdx].title });
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
    })}
  </div>
</section>
     
{/* COMMENT MODAL & BUTTON */}
{(() => {
  
  return (
    <>
      <CommentModal open={modalOpen} onClose={() => setModalOpen(false)} />
      <div className="w-full flex justify-center py-8 bg-black/80 border-t border-white/10">
        <button
          onClick={() => setModalOpen(true)}
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
          <Image width={32} height={32} src="/logo-mc.png" alt="Logo" className="h-8 w-8 rounded-full" />
          <span className="font-bold text-lg">MasterFree</span>
        </div>
        <div className="text-sm text-white/60">
          © {new Date().getFullYear()} MasterFree. Tous droits réservés.
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
        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-40px);}
          to { opacity: 1; transform: translateY(0);}
        }
        .animate-fade-in { animation: fade-in 1s ease both; }
        .animate-slide-down { animation: slide-down 1s cubic-bezier(.4,0,.2,1) both; }
      `}</style>
    </main>
  );
}