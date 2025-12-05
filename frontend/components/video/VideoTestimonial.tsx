'use client';

import React, { useState, useRef, useEffect } from 'react';
import styles from './VideoTestimonial.module.css';

export interface Testimonial {
  id: string;
  name: string;
  role: string; // e.g., "Bruid", "Event Manager", "CEO"
  company?: string;
  eventType: 'bruiloft' | 'bedrijfsfeest' | 'feest';
  videoUrl: string;
  thumbnail?: string;
  quote: string; // Short text quote for fallback/preview
  rating: number; // 1-5
}

interface VideoTestimonialProps {
  testimonials: Testimonial[];
  autoplay?: boolean;
  loop?: boolean;
  showControls?: boolean;
}

export const VideoTestimonial: React.FC<VideoTestimonialProps> = ({
  testimonials,
  autoplay = false,
  loop = false,
  showControls = true,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const currentTestimonial = testimonials[currentIndex];

  useEffect(() => {
    // Track video testimonial view
    if (typeof window !== 'undefined' && window.posthog) {
      window.posthog.capture('video_testimonial_viewed', {
        testimonial_id: currentTestimonial.id,
        testimonial_name: currentTestimonial.name,
        event_type: currentTestimonial.eventType,
        index: currentIndex,
        timestamp: new Date().toISOString(),
      });
    }
  }, [currentIndex, currentTestimonial]);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
      setHasUserInteracted(true);

      // Track play event
      if (typeof window !== 'undefined' && window.posthog) {
        window.posthog.capture('video_testimonial_played', {
          testimonial_id: currentTestimonial.id,
          testimonial_name: currentTestimonial.name,
          timestamp: new Date().toISOString(),
        });
      }
    }
  };

  const handlePause = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);

    // Track completion
    if (typeof window !== 'undefined' && window.posthog) {
      window.posthog.capture('video_testimonial_completed', {
        testimonial_id: currentTestimonial.id,
        testimonial_name: currentTestimonial.name,
        timestamp: new Date().toISOString(),
      });
    }

    // Auto-advance to next testimonial
    if (currentIndex < testimonials.length - 1) {
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
      }, 1000);
    }
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentIndex(index);
    setIsPlaying(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>💬 Wat Klanten Zeggen</h2>
        <p className={styles.subtitle}>Echte ervaringen van bruidsparen en bedrijven</p>
      </div>

      <div className={styles.videoContainer}>
        <div className={styles.mainVideo}>
          <video
            ref={videoRef}
            className={styles.video}
            poster={currentTestimonial.thumbnail}
            preload="metadata"
            playsInline
            loop={loop}
            onEnded={handleVideoEnd}
            controls={showControls && hasUserInteracted}
          >
            <source src={currentTestimonial.videoUrl} type="video/mp4" />
            Je browser ondersteunt geen HTML5 video.
          </video>

          {!isPlaying && (
            <button
              type="button"
              className={styles.playButton}
              onClick={handlePlay}
              aria-label="Video afspelen"
            >
              <svg
                className={styles.playIcon}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          )}

          <div className={styles.videoInfo}>
            <div className={styles.customerInfo}>
              <h3 className={styles.customerName}>{currentTestimonial.name}</h3>
              <p className={styles.customerRole}>
                {currentTestimonial.role}
                {currentTestimonial.company && ` • ${currentTestimonial.company}`}
              </p>
            </div>
            <div className={styles.rating}>
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className={i < currentTestimonial.rating ? styles.starFilled : styles.starEmpty}
                >
                  ⭐
                </span>
              ))}
            </div>
          </div>
        </div>

        {testimonials.length > 1 && (
          <div className={styles.thumbnails}>
            {testimonials.map((testimonial, index) => (
              <button
                key={testimonial.id}
                type="button"
                className={`${styles.thumbnail} ${index === currentIndex ? styles.thumbnailActive : ''}`}
                onClick={() => handleThumbnailClick(index)}
                aria-label={`Bekijk testimonial van ${testimonial.name}`}
              >
                <div
                  className={styles.thumbnailImage}
                  style={{ backgroundImage: `url(${testimonial.thumbnail || testimonial.videoUrl})` }}
                >
                  <div className={styles.thumbnailOverlay}>
                    <svg
                      className={styles.thumbnailPlayIcon}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                      />
                    </svg>
                  </div>
                </div>
                <div className={styles.thumbnailInfo}>
                  <span className={styles.thumbnailName}>{testimonial.name}</span>
                  <span className={styles.thumbnailRole}>{testimonial.role}</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Text quote fallback for accessibility & SEO */}
      <div className={styles.quoteContainer}>
        <blockquote className={styles.quote}>
          <p className={styles.quoteText}>"{currentTestimonial.quote}"</p>
          <footer className={styles.quoteAuthor}>
            — {currentTestimonial.name}, {currentTestimonial.role}
          </footer>
        </blockquote>
      </div>
    </div>
  );
};

export default VideoTestimonial;
