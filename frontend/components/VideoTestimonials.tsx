import React from 'react';
import VideoTestimonial, { Testimonial } from './video/VideoTestimonial';
import { videoTestimonials } from '../data/testimonials';

interface VideoTestimonialsProps {
  testimonials?: Testimonial[];
  autoplay?: boolean;
  loop?: boolean;
  showControls?: boolean;
  eventType?: 'bruiloft' | 'bedrijfsfeest' | 'feest';
}

/**
 * VideoTestimonials - Wrapper component for video testimonials
 *
 * Features:
 * - Displays video testimonials with play controls
 * - Supports filtering by event type
 * - Falls back to text testimonials if videos are missing
 * - Tracks PostHog events for video interactions
 */
const VideoTestimonials: React.FC<VideoTestimonialsProps> = ({
  testimonials,
  autoplay = false,
  loop = false,
  showControls = true,
  eventType,
}) => {
  // Filter testimonials by event type if specified
  const filteredTestimonials = React.useMemo(() => {
    if (testimonials) {
      return testimonials;
    }

    if (eventType) {
      return videoTestimonials.filter((t) => t.eventType === eventType);
    }

    return videoTestimonials;
  }, [testimonials, eventType]);

  // If no testimonials available, return null
  if (filteredTestimonials.length === 0) {
    return null;
  }

  return (
    <VideoTestimonial
      testimonials={filteredTestimonials}
      autoplay={autoplay}
      loop={loop}
      showControls={showControls}
    />
  );
};

export default VideoTestimonials;
