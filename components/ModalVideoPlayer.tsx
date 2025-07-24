// ModalVideoPlayer.tsx (ou dans le même fichier pour commencer)
import React from "react";

type VideoSource = "youtube" | "vimeo" | "autre";

function getVideoSource(url: string): VideoSource {
  if (/youtube\.com|youtu\.be/.test(url)) return "youtube";
  if (/vimeo\.com/.test(url)) return "vimeo";
  return "autre";
}

function getEmbedUrl(url: string): string {
  const source = getVideoSource(url);
  if (source === "youtube") {
    const match = url.match(/(?:v=|\/embed\/|\.be\/)([a-zA-Z0-9_-]{11})/);
    const id = match ? match[1] : "";
    return `https://www.youtube.com/embed/${id}?autoplay=1`;
  }
  if (source === "vimeo") {
    const match = url.match(/vimeo\.com\/(\d+)/);
    const id = match ? match[1] : "";
    return `https://player.vimeo.com/video/${id}?autoplay=1`;
  }
  // Pour d'autres plateformes, on tente l'embed direct
  return url;
}

export default function ModalVideoPlayer({
  open,
  onClose,
  videoUrl,
  videoTitle,
}: {
  open: boolean;
  onClose: () => void;
  videoUrl: string;
  videoTitle: string;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="bg-black rounded-xl p-4 relative w-full max-w-2xl">
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-2xl text-white/60 hover:text-white"
          aria-label="Fermer"
        >
          ×
        </button>
        <div className="aspect-video w-full">
          <iframe
            width="100%"
            height="100%"
            src={getEmbedUrl(videoUrl)}
            title={videoTitle}
            allow="autoplay; encrypted-media"
            allowFullScreen
            className="w-full h-full rounded-lg"
          />
        </div>
        <div className="mt-4 text-white text-center font-bold text-lg">
          {videoTitle}
        </div>
      </div>
    </div>
  );
}