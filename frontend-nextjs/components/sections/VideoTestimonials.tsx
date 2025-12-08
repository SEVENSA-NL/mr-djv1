'use client';

/* eslint-disable react/no-unescaped-entities */
import { useMemo, useRef, useState } from 'react';
import { Play, Pause, Loader2, Sparkles } from 'lucide-react';
import { filterTestimonials, type VideoTestimonial } from '@/data/videoTestimonials';
import { trackEvent } from '@/lib/analytics/trackEvent';
import { trackMediaEngagement } from '@/lib/analytics/media';

type Props = {
  eventType?: 'bruiloft' | 'bedrijfsfeest' | 'feest';
  title?: string;
  subtitle?: string;
};

export default function VideoTestimonials({ eventType, title, subtitle }: Props) {
  const testimonials = useMemo(() => filterTestimonials(eventType), [eventType]);
  const [active, setActive] = useState<VideoTestimonial | null>(testimonials[0] ?? null);
  const [loading, setLoading] = useState(false);
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  if (!testimonials.length) return null;

  const handlePlay = () => {
    setPlaying(true);
    trackEvent('video_play', { id: active?.id, eventType: active?.eventType, ga4_event: 'video_play' });
    trackMediaEngagement('video', active?.id || 'unknown', 'play');
  };

  const handlePause = () => {
    setPlaying(false);
    trackEvent('video_pause', { id: active?.id, ga4_event: 'video_pause' });
    trackMediaEngagement('video', active?.id || 'unknown', 'pause');
  };

  const handleSelect = (item: VideoTestimonial) => {
    setActive(item);
    setPlaying(false);
    setLoading(true);
    trackEvent('video_select', { id: item.id, eventType: item.eventType, ga4_event: 'video_select' });
    trackMediaEngagement('video', item.id, 'select');
  };

  const handleComplete = (video: HTMLVideoElement) => {
    setPlaying(false);
    const duration = Math.round(video.duration || 0);
    trackMediaEngagement('video', active?.id || 'unknown', 'complete', duration);
    trackEvent('video_complete', { id: active?.id, duration, ga4_event: 'video_complete' });
  };

  return (
    <section className="bg-neutral-dark text-neutral-light">
      <div className="mx-auto max-w-6xl px-6 py-12 lg:py-16">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="eyebrow text-secondary inline-flex items-center gap-2">
              <Sparkles className="h-4 w-4" /> Video testimonials
            </p>
            <h2 className="text-3xl font-bold sm:text-4xl">{title || 'Zie en hoor onze impact'}</h2>
            <p className="body-secondary mt-2 text-neutral-gray-200">
              {subtitle || 'Echte bruiloften, corporate events en private parties – gefilmd en gedeeld.'}
            </p>
          </div>
          <div className="flex flex-wrap gap-2 text-sm">
            {['bruiloft', 'bedrijfsfeest', 'feest'].map((type) => (
              <button
                key={type}
                onClick={() => {
                  const fallback = filterTestimonials(type as any)[0] ?? active!;
                  handleSelect(fallback);
                  trackMediaEngagement('video', fallback.id, 'filter_select');
                }}
                className={`rounded-full border px-3 py-1 transition ${
                  eventType === type ? 'border-secondary text-secondary' : 'border-white/20 text-neutral-gray-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2 overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-subtle">
                {active ? (
                  <div className="relative aspect-video">
                    {loading && (
                      <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/40">
                        <Loader2 className="h-8 w-8 animate-spin text-white" />
                      </div>
                    )}
                    <video
                      ref={videoRef}
                      key={active.id}
                      src={active.videoUrl}
                      className="h-full w-full object-cover"
                      controls
                      onPlay={handlePlay}
                      onPause={handlePause}
                      onLoadedData={() => setLoading(false)}
                      onLoadStart={() => setLoading(true)}
                      onEnded={(event) => handleComplete(event.currentTarget)}
                    />
                  </div>
                ) : (
                  <div className="flex min-h-[300px] items-center justify-center text-neutral-gray-300">
                    Geen video beschikbaar
              </div>
            )}
            {active && (
              <div className="p-4 sm:p-6">
                <p className="text-sm text-neutral-gray-200 italic">“{active.quote}”</p>
                <div className="mt-3 text-sm font-semibold">
                  {active.name}
                  {active.role ? ` — ${active.role}` : ''} {active.company ? `, ${active.company}` : ''}
                </div>
              </div>
            )}
              <div className="flex items-center gap-3 px-4 py-3 sm:px-6">
                <button
                  onClick={() => {
                    const video = videoRef.current;
                    if (!video) return;
                    video.paused ? video.play() : video.pause();
                  }}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-neutral-dark shadow-lg transition hover:bg-primary-dark cta"
                >
                  {playing ? (
                    <>
                      <Pause className="h-4 w-4" /> Pause
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4" /> Play
                  </>
                )}
              </button>
              <span className="text-xs uppercase tracking-[0.15em] text-neutral-gray-300">
                {active?.eventType}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            {testimonials.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSelect(item)}
                className={`w-full rounded-2xl border px-4 py-3 text-left transition hover:border-primary hover:bg-white/5 ${
                  active?.id === item.id ? 'border-primary bg-white/10' : 'border-white/10 bg-white/5'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold text-neutral-light">{item.name}</div>
                  <span className="text-xs text-neutral-gray-300">{item.eventType}</span>
                </div>
                <p className="mt-2 line-clamp-2 text-sm text-neutral-gray-200">{item.quote}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
