"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import SuiviModal from "@/components/SuiviModal";
import ModalVideoPlayer from "@/components/ModalVideoPlayer";

const schoolCourses = [
  // ... (tes données schoolCourses inchangées)
  // Copie ici tout ton tableau schoolCourses
  {
    age: "2 à 4 ans",
    courses: [
      {
        title: "Découverte des couleurs",
        teacher: "Mme Sophie",
        image: "/scolaire-couleurs.jpg",
        videos: [
          { title: "Les couleurs primaires", url: "https://www.youtube.com/watch?v=vid1" },
          { title: "Jeu des couleurs", url: "https://www.youtube.com/watch?v=vid2" },
        ],
      },
      {
        title: "Comptines et chansons",
        teacher: "M. Paul",
        image: "/scolaire-chansons.jpg",
        videos: [
          { title: "Comptine du matin", url: "https://www.youtube.com/watch?v=vid3" },
          { title: "Chanson des animaux", url: "https://www.youtube.com/watch?v=vid4" },
        ],
      },
    ],
  },
  {
    age: "5 à 6 ans",
    courses: [
      {
        title: "Premiers chiffres",
        teacher: "Mme Clara",
        image: "/scolaire-chiffres.jpg",
        videos: [
          { title: "Compter jusqu'à 10", url: "https://www.youtube.com/watch?v=vid5" },
          { title: "Jeu des chiffres", url: "https://www.youtube.com/watch?v=vid6" },
        ],
      },
      {
        title: "Initiation à la lecture",
        teacher: "M. Alain",
        image: "/scolaire-lecture.jpg",
        videos: [
          { title: "Reconnaître les lettres", url: "https://www.youtube.com/watch?v=vid7" },
          { title: "Lire ses premiers mots", url: "https://www.youtube.com/watch?v=vid8" },
        ],
      },
    ],
  },
  {
    age: "7 à 8 ans",
    courses: [
      {
        title: "Découverte des sciences",
        teacher: "Mme Julie",
        image: "/scolaire-sciences.jpg",
        videos: [
          { title: "Les animaux", url: "https://www.youtube.com/watch?v=vid9" },
          { title: "Les plantes", url: "https://www.youtube.com/watch?v=vid10" },
        ],
      },
    ],
  },
  {
    age: "9 à 10 ans",
    courses: [
      {
        title: "Maths amusantes",
        teacher: "M. Pierre",
        image: "/scolaire-maths.jpg",
        videos: [
          { title: "Additions et soustractions", url: "https://www.youtube.com/watch?v=vid11" },
          { title: "Problèmes rigolos", url: "https://www.youtube.com/watch?v=vid12" },
        ],
      },
    ],
  },
  {
    age: "11 à 13 ans",
    courses: [
      {
        title: "Histoire facile",
        teacher: "Mme Léa",
        image: "/scolaire-histoire.jpg",
        videos: [
          { title: "Les grandes inventions", url: "https://www.youtube.com/watch?v=vid13" },
          { title: "La Préhistoire", url: "https://www.youtube.com/watch?v=vid14" },
        ],
      },
    ],
  },
  {
    age: "14 à 16 ans",
    courses: [
      {
        title: "Sciences et expériences",
        teacher: "M. Hugo",
        image: "/scolaire-experiences.jpg",
        videos: [
          { title: "Expérience sur l'eau", url: "https://www.youtube.com/watch?v=vid15" },
          { title: "La chimie amusante", url: "https://www.youtube.com/watch?v=vid16" },
        ],
      },
    ],
  },
  {
    age: "17 à 20 ans",
    courses: [
      {
        title: "Préparation au bac",
        teacher: "Mme Nadia",
        image: "/scolaire-bac.jpg",
        videos: [
          { title: "Méthodologie de révision", url: "https://www.youtube.com/watch?v=vid17" },
          { title: "Réussir l'oral", url: "https://www.youtube.com/watch?v=vid18" },
        ],
      },
    ],
  },
  {
    age: "21 à 23 ans",
    courses: [
      {
        title: "Orientation & carrière",
        teacher: "M. Laurent",
        image: "/scolaire-orientation.jpg",
        videos: [
          { title: "Choisir son métier", url: "https://www.youtube.com/watch?v=vid19" },
          { title: "Réussir son entretien", url: "https://www.youtube.com/watch?v=vid20" },
        ],
      },
    ],
  },
];



// Hook pour stagger effect sur tous les éléments de la page
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

export default function ScolairePage() {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalCourse, setModalCourse] = useState("");
    const [videoModal, setVideoModal] = useState<{ url: string; title: string } | null>(null);
  // On a besoin d'un index global pour chaque card
  const flatCourses = schoolCourses.flatMap((group) =>
    group.courses.map((course) => ({
      ...course,
      age: group.age,
    }))
  );
  const { refs, visible } = useStaggeredInView(flatCourses.length);

  let globalIdx = 0;

  return (
    
    <main className="min-h-screen bg-black text-white font-sans pb-20">
      <div className="pt-32 md:pt-40 pb-10 px-6 md:px-16 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-white tracking-tight">
          Parcours scolaire
        </h1>
        <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
          Découvrez des cours vidéo adaptés à chaque âge, pour progresser à votre rythme de 2 à 23 ans.
        </p>
      </div>
        <ModalVideoPlayer
            open={!!videoModal}
            onClose={() => setVideoModal(null)}
            videoUrl={videoModal?.url || ""}
            videoTitle={videoModal?.title || ""}
        />
      <SuiviModal open={modalOpen} onClose={() => setModalOpen(false)} courseTitle={modalCourse} onSuccess={()=>setModalOpen(false)}/>
      <div className="px-6 md:px-16">
        
        {schoolCourses.map((group) => (
          <section key={group.age} className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[#e86d5a]">{group.age}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {group.courses.map((course) => {
                const idx = globalIdx++;
                return (
                  <div
                    key={course.title}
                    ref={el => { refs.current[idx] = el; }}
                    data-idx={idx}
                    className={`bg-black/80 rounded-2xl shadow-xl border border-white/10 p-6 flex flex-col transition-all duration-700
                      ${visible[idx] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}
                    `}
                    style={{ transitionDelay: visible[idx] ? `${idx * 120}ms` : "0ms" }}
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
                        <h3 className="font-bold text-lg text-white">{course.title}</h3>
                        <p className="text-[#e86d5a] text-md">par {course.teacher}</p>
                      </div>
                    </div>
                    <ol className="mb-4">
                      {course.videos.map((video, i) => (
                        <li key={video.url} className="flex items-center gap-2 mb-2">
                          <span className="w-5 h-5 flex items-center justify-center rounded-full text-xs font-bold bg-[#e86d5a] text-white">
                            {i + 1}
                          </span>
                          <button
                            type="button"
                            onClick={() => setVideoModal({ url: video.url, title: video.title })}
                            className="underline bg-transparent border-0 p-0 m-0 text-left text-[#e86d5a] hover:text-white transition cursor-pointer"
                            >
                            {video.title}
                    </button>
                        </li>
                      ))}
                    </ol>
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
                );
              })}
            </div>
          </section>
        ))}
      </div>
      <style jsx global>{`
        .transition-all { transition-property: all; }
        .duration-700 { transition-duration: 700ms; }
      `}</style>
    </main>
  );
}