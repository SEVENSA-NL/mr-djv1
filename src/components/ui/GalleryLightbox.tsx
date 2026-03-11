"use client";

import React, { useEffect, useCallback, useRef } from "react";
import Image from "next/image";

export interface GalleryLightboxItem {
  src: string;
  alt: string;
  type?: "image" | "video";
  poster?: string;
}

interface GalleryLightboxProps {
  images: GalleryLightboxItem[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export const GalleryLightbox: React.FC<GalleryLightboxProps> = ({
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    },
    [onClose, onPrev, onNext]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  // Pause video when navigating away or closing
  useEffect(() => {
    return () => {
      videoRef.current?.pause();
    };
  }, [currentIndex]);

  const item = images[currentIndex];
  if (!item) return null;
  const isVideo = item.type === "video";

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Galerij lightbox"
    >
      {/* Counter */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 rounded-full bg-gray-50 px-4 py-1.5 text-xs font-medium text-gray-700">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Close button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 text-gray-700 transition hover:bg-white/95 hover:text-gray-900"
        aria-label="Sluiten"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <path d="M5 5l10 10M15 5L5 15" />
        </svg>
      </button>

      {/* Previous button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 text-gray-700 transition hover:bg-white/95 hover:text-gray-900 md:left-6"
        aria-label="Vorige afbeelding"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12.5 15L7.5 10L12.5 5" />
        </svg>
      </button>

      {/* Next button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 text-gray-700 transition hover:bg-white/95 hover:text-gray-900 md:right-6"
        aria-label="Volgende afbeelding"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M7.5 5L12.5 10L7.5 15" />
        </svg>
      </button>

      {/* Content */}
      <div
        className="relative mx-16 max-h-[85vh] max-w-[90vw]"
        onClick={(e) => e.stopPropagation()}
      >
        {isVideo ? (
          <video
            ref={videoRef}
            src={item.src}
            poster={item.poster}
            controls
            autoPlay
            playsInline
            className="max-h-[85vh] w-auto rounded-lg"
          />
        ) : (
          <Image
            src={item.src}
            alt={item.alt}
            width={1200}
            height={800}
            sizes="90vw"
            className="max-h-[85vh] w-auto rounded-lg object-contain"
            priority
          />
        )}
      </div>
    </div>
  );
};
