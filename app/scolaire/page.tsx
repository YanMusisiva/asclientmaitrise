"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import SuiviModal from "@/components/SuiviModal";
import ModalVideoPlayer from "@/components/ModalVideoPlayer";
import CommentModal from "@/components/CommentModal";

const schoolCourses = [
  {
    age: "2 à 4 ans",
    courses: [
      {
        title: "Découverte des couleurs",
        teacher: "Les Titounis",
        image: "/scolaire-couleurs.jpg",
        videos: [
          {
            title: "Les couleurs | comptine pour enfants",
            url: "https://www.youtube.com/watch?v=QQX3Z7zVztg",
          }, // :contentReference[oaicite:1]{index=1}
        ],
      },
      {
        title: "Comptines et chansons",
        teacher: "Titounis",
        image: "/scolaire-chansons.jpg",
        videos: [
          {
            title: "Chanson des enfants",
            url: "https://www.youtube.com/watch?v=xCDRcDm0FDQ",
          }, // :contentReference[oaicite:2]{index=2}
        ],
      },
    ],
  },
  {
    age: "5 à 6 ans",
    courses: [
      {
        title: "Premiers chiffres",
        teacher: "Chanson enfants",
        image: "/scolaire-chiffres.jpg",
        videos: [
          {
            title: "Les chiffres – apprendre à compter jusqu'à 10",
            url: "https://www.youtube.com/watch?v=EaZkjd-c-Kw",
          }, // :contentReference[oaicite:3]{index=3}
        ],
      },
      {
        title: "Initiation à la lecture",
        teacher: "Cycle2 Sciences",
        image: "/scolaire-lecture.jpg",
        videos: [
          {
            title: "Classer les êtres vivants (lecture cycle 2)",
            url: "https://www.youtube.com/watch?v=CHnqX-rVorg",
          }, // :contentReference[oaicite:4]{index=4}
        ],
      },
    ],
  },
  {
    age: "7 à 8 ans",
    courses: [
      {
        title: "Découverte des sciences",
        teacher: "Sciences + animaux & plantes",
        image: "/scolaire-sciences.jpg",
        videos: [
          {
            title: "Les animaux et plantes pour enfants",
            url: "https://www.youtube.com/watch?v=-iO_LdNR_80",
          }, // :contentReference[oaicite:5]{index=5}
        ],
      },
    ],
  },
  {
    age: "9 à 10 ans",
    courses: [
      {
        title: "Maths amusantes",
        teacher: "Chaîne Foufou (kids math)",
        image: "/scolaire-maths.jpg",
        videos: [
          {
            title: "Jeux de mathématiques cycle 3 – calcul mental CM1‑CM2",
            url: "https://www.youtube.com/watch?v=bT1-N9FNGU0",
          },
        ],
      },
    ],
  },
  {
    age: "11 à 13 ans",
    courses: [
      {
        title: "Histoire facile",
        teacher: "C’est pas sorcier",
        image: "/scolaire-histoire.jpg",
        videos: [
          {
            title: "Les origines des grandes inventions !",
            url: "https://www.youtube.com/watch?v=UslNWxZsQ54",
          }, // :contentReference[oaicite:7]{index=7}
        ],
      },
    ],
  },
  {
    age: "14 à 16 ans",
    courses: [
      {
        title: "Sciences et expériences",
        teacher: "Société Chimique de France",
        image: "/scolaire-experiences.jpg",
        videos: [
          {
            title: "Expériences de chimie amusante",
            url: "https://www.youtube.com/watch?v=klI756yGv5s",
          }, // :contentReference[oaicite:8]{index=8}
        ],
      },
    ],
  },
  {
    age: "17 à 20 ans",
    courses: [
      {
        title: "Préparation aux examens (méthodes efficaces)",
        teacher: "Stratégies d'étude",
        image: "/scolaire-examens.jpg",
        videos: [
          {
            title: "Comment RÉUSSIR un Examen en 3 JOURS (Guide No Bullsh*t)",
            url: "https://www.youtube.com/watch?v=jUDLKVRV0hs",
          },
        ],
      },
    ],
  },
  {
    age: "21 à 23 ans",
    courses: [
      {
        title: "Orientation & carrière",
        teacher: "Orient’Action",
        image: "/scolaire-orientation.jpg",
        videos: [
          {
            title: "Conseils orientation & carrière",
            url: "https://www.youtube.com/watch?v=cQIwYRKVXn0",
          }, // :contentReference[oaicite:10]{index=10}
        ],
      },
    ],
  },
];

// Hook pour stagger effect sur tous les éléments de la page

function useStaggeredInView(
  count: number,
  options?: { once?: boolean; enabled?: boolean }
) {
  const { once = false, enabled = true } = options || {};
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const [visible, setVisible] = useState(Array(count).fill(false));
  const triggeredOnce = useRef(Array(count).fill(false));

  useEffect(() => {
    if (typeof window === "undefined" || !enabled) return;

    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = Number((entry.target as HTMLElement).dataset.idx);
          if (entry.isIntersecting && (!once || !triggeredOnce.current[idx])) {
            triggeredOnce.current[idx] = true;
            setVisible((v) => {
              const next = [...v];
              next[idx] = true;
              return next;
            });
          }
        });
      },
      {
        threshold: 0.1, // plus rapide à déclencher
        rootMargin: "0px 0px -20% 0px", // déclenche légèrement avant que l’élément soit 100% visible
      }
    );

    refs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [count, enabled, once]);

  return { refs, visible };
}

export default function ScolairePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [commentModalOpen, setCommentModalOpen] = useState(false);
  const [modalCourse, setModalCourse] = useState("");
  const [videoModal, setVideoModal] = useState<{
    url: string;
    title: string;
  } | null>(null);
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
          Découvrez des cours vidéo adaptés à chaque âge, pour progresser à
          votre rythme de 2 à 23 ans.
        </p>
      </div>
      <ModalVideoPlayer
        open={!!videoModal}
        onClose={() => setVideoModal(null)}
        videoUrl={videoModal?.url || ""}
        videoTitle={videoModal?.title || ""}
      />
      <SuiviModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        courseTitle={modalCourse}
        onSuccess={() => setModalOpen(false)}
      />
      <div className="px-6 md:px-16">
        {schoolCourses.map((group) => (
          <section key={group.age} className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[#e86d5a]">
              {group.age}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {group.courses.map((course) => {
                const idx = globalIdx++;
                return (
                  <div
                    key={course.title}
                    ref={(el) => {
                      refs.current[idx] = el;
                    }}
                    data-idx={idx}
                    className={`bg-black/80 rounded-2xl shadow-xl border border-white/10 p-6 flex flex-col transition-all duration-700
                      ${
                        visible[idx]
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-12"
                      }
                    `}
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
                        <h3 className="font-bold text-lg text-white">
                          {course.title}
                        </h3>
                        <p className="text-[#e86d5a] text-md">
                          par {course.teacher}
                        </p>
                      </div>
                    </div>
                    <ol className="mb-4">
                      {course.videos.map((video, i) => (
                        <li
                          key={video.url}
                          className="flex items-center gap-2 mb-2"
                        >
                          <span className="w-5 h-5 flex items-center justify-center rounded-full text-xs font-bold bg-[#e86d5a] text-white">
                            {i + 1}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              setVideoModal({
                                url: video.url,
                                title: video.title,
                              })
                            }
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
      <style jsx global>{`
        .transition-all {
          transition-property: all;
        }
        .duration-700 {
          transition-duration: 700ms;
        }
      `}</style>
    </main>
  );
}
