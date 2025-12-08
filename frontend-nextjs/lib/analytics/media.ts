'use client';

import { trackEvent } from './trackEvent';

type MediaAction = 'play' | 'pause' | 'view' | 'select' | 'complete' | string;

export function trackMediaEngagement(mediaType: string, mediaId: string, action: MediaAction, durationSeconds?: number) {
  const payload = {
    media_type: mediaType,
    media_id: mediaId,
    action,
    duration_seconds: durationSeconds,
  };

  trackEvent('media_engagement', payload);
}
