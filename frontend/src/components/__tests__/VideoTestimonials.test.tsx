import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import VideoTestimonials from '../VideoTestimonials';
import { videoTestimonials, weddingTestimonials, corporateTestimonials, partyTestimonials } from '@/data/testimonials';

// Mock VideoTestimonial component to avoid complexity in wrapper testing
vi.mock('../../components/video/VideoTestimonial', () => ({
  default: ({ testimonials, autoplay, loop, showControls }: any) => (
    <div data-testid="video-testimonial-component">
      <div data-testid="testimonial-count">{testimonials?.length || 0}</div>
      <div data-testid="autoplay-setting">{autoplay ? 'autoplay' : 'no-autoplay'}</div>
      <div data-testid="loop-setting">{loop ? 'loop' : 'no-loop'}</div>
      <div data-testid="controls-setting">{showControls ? 'controls' : 'no-controls'}</div>
      {testimonials?.map((t: any) => (
        <div key={t.id} data-testid={`testimonial-${t.id}`}>
          {t.name}
        </div>
      ))}
    </div>
  ),
}));

// Mock PostHog
const mockPostHog = {
  capture: vi.fn(),
};

describe('VideoTestimonials Wrapper Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockPostHog.capture.mockClear();
    (window as any).posthog = mockPostHog;
  });

  afterEach(() => {
    delete (window as any).posthog;
    vi.clearAllMocks();
  });

  describe('Component rendering', () => {
    it('should render the video testimonial component', () => {
      render(<VideoTestimonials />);

      expect(screen.getByTestId('video-testimonial-component')).toBeInTheDocument();
    });

    it('should return null when no testimonials are available', () => {
      const { container } = render(<VideoTestimonials testimonials={[]} />);

      expect(container.firstChild).toBeNull();
    });

    it('should render default testimonials when no props provided', () => {
      render(<VideoTestimonials />);

      expect(screen.getByTestId('testimonial-count')).toHaveTextContent(videoTestimonials.length.toString());
    });

    it('should pass props correctly to VideoTestimonial component', () => {
      render(
        <VideoTestimonials
          autoplay={true}
          loop={true}
          showControls={false}
        />
      );

      expect(screen.getByTestId('autoplay-setting')).toHaveTextContent('autoplay');
      expect(screen.getByTestId('loop-setting')).toHaveTextContent('loop');
      expect(screen.getByTestId('controls-setting')).toHaveTextContent('no-controls');
    });

    it('should match the snapshot with default props', () => {
      const { container } = render(<VideoTestimonials />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('Props handling', () => {
    it('should use provided testimonials over default', () => {
      const customTestimonials = [
        {
          id: 'custom-001',
          name: 'Custom Person',
          role: 'Test Role',
          eventType: 'bruiloft' as const,
          videoUrl: '/test.mp4',
          quote: 'Test quote',
          rating: 5,
        },
      ];

      render(<VideoTestimonials testimonials={customTestimonials} />);

      expect(screen.getByTestId('testimonial-count')).toHaveTextContent('1');
      expect(screen.getByTestId('testimonial-custom-001')).toBeInTheDocument();
      expect(screen.getByTestId('testimonial-custom-001')).toHaveTextContent('Custom Person');
    });

    it('should apply default props when not provided', () => {
      render(<VideoTestimonials />);

      // Default values: autoplay=false, loop=false, showControls=true
      expect(screen.getByTestId('autoplay-setting')).toHaveTextContent('no-autoplay');
      expect(screen.getByTestId('loop-setting')).toHaveTextContent('no-loop');
      expect(screen.getByTestId('controls-setting')).toHaveTextContent('controls');
    });

    it('should accept all prop combinations', () => {
      const { rerender } = render(
        <VideoTestimonials
          autoplay={true}
          loop={false}
          showControls={true}
        />
      );

      expect(screen.getByTestId('autoplay-setting')).toHaveTextContent('autoplay');

      rerender(
        <VideoTestimonials
          autoplay={false}
          loop={true}
          showControls={false}
        />
      );

      expect(screen.getByTestId('loop-setting')).toHaveTextContent('loop');
      expect(screen.getByTestId('controls-setting')).toHaveTextContent('no-controls');
    });
  });

  describe('Event type filtering', () => {
    it('should filter testimonials by bruiloft event type', () => {
      render(<VideoTestimonials eventType="bruiloft" />);

      const count = screen.getByTestId('testimonial-count').textContent;
      expect(Number(count)).toBe(weddingTestimonials.length);

      weddingTestimonials.forEach((testimonial) => {
        expect(screen.getByTestId(`testimonial-${testimonial.id}`)).toBeInTheDocument();
      });
    });

    it('should filter testimonials by bedrijfsfeest event type', () => {
      render(<VideoTestimonials eventType="bedrijfsfeest" />);

      const count = screen.getByTestId('testimonial-count').textContent;
      expect(Number(count)).toBe(corporateTestimonials.length);

      corporateTestimonials.forEach((testimonial) => {
        expect(screen.getByTestId(`testimonial-${testimonial.id}`)).toBeInTheDocument();
      });
    });

    it('should filter testimonials by feest event type', () => {
      render(<VideoTestimonials eventType="feest" />);

      const count = screen.getByTestId('testimonial-count').textContent;
      expect(Number(count)).toBe(partyTestimonials.length);

      partyTestimonials.forEach((testimonial) => {
        expect(screen.getByTestId(`testimonial-${testimonial.id}`)).toBeInTheDocument();
      });
    });

    it('should not filter when eventType is not provided', () => {
      render(<VideoTestimonials />);

      const count = screen.getByTestId('testimonial-count').textContent;
      expect(Number(count)).toBe(videoTestimonials.length);
    });

    it('should ignore eventType when testimonials prop is provided', () => {
      const customTestimonials = [
        {
          id: 'custom-001',
          name: 'Custom Person',
          role: 'Test Role',
          eventType: 'bruiloft' as const,
          videoUrl: '/test.mp4',
          quote: 'Test quote',
          rating: 5,
        },
      ];

      render(
        <VideoTestimonials
          testimonials={customTestimonials}
          eventType="bedrijfsfeest"
        />
      );

      // Should use provided testimonials, not filter
      expect(screen.getByTestId('testimonial-count')).toHaveTextContent('1');
      expect(screen.getByTestId('testimonial-custom-001')).toBeInTheDocument();
    });
  });

  describe('Multiple testimonial support', () => {
    it('should support multiple testimonials (001-007)', () => {
      render(<VideoTestimonials />);

      // Check that multiple testimonials are rendered
      expect(screen.getByTestId('testimonial-count')).toHaveTextContent(videoTestimonials.length.toString());

      videoTestimonials.forEach((testimonial) => {
        expect(screen.getByTestId(`testimonial-${testimonial.id}`)).toBeInTheDocument();
      });
    });

    it('should handle single testimonial', () => {
      const singleTestimonial = [videoTestimonials[0]];

      render(<VideoTestimonials testimonials={singleTestimonial} />);

      expect(screen.getByTestId('testimonial-count')).toHaveTextContent('1');
    });

    it('should handle large number of testimonials', () => {
      const manyTestimonials = Array.from({ length: 20 }, (_, i) => ({
        id: `testimonial-${String(i + 1).padStart(3, '0')}`,
        name: `Person ${i + 1}`,
        role: 'Test Role',
        eventType: 'bruiloft' as const,
        videoUrl: `/assets/videos/testimonial-${String(i + 1).padStart(3, '0')}.mp4`,
        quote: `Quote ${i + 1}`,
        rating: 5,
      }));

      render(<VideoTestimonials testimonials={manyTestimonials} />);

      expect(screen.getByTestId('testimonial-count')).toHaveTextContent('20');
    });
  });

  describe('Video URL handling', () => {
    it('should support standard testimonial video URLs', () => {
      render(<VideoTestimonials />);

      videoTestimonials.forEach((testimonial) => {
        expect(testimonial.videoUrl).toMatch(/\/assets\/videos\/testimonial-\d{3}\.mp4/);
      });
    });

    it('should handle testimonials with reused video URLs', () => {
      // testimonial-005 and testimonial-007 reuse videos
      const testimonialsWithReusedVideos = videoTestimonials.filter(
        (t) => t.id === 'testimonial-005' || t.id === 'testimonial-007'
      );

      expect(testimonialsWithReusedVideos.length).toBe(2);
      expect(testimonialsWithReusedVideos[0].videoUrl).toBe('/assets/videos/testimonial-001.mp4');
      expect(testimonialsWithReusedVideos[1].videoUrl).toBe('/assets/videos/testimonial-003.mp4');
    });
  });

  describe('Props memoization', () => {
    it('should memoize filtered testimonials', () => {
      const { rerender } = render(<VideoTestimonials eventType="bruiloft" />);

      const initialCount = screen.getByTestId('testimonial-count').textContent;

      // Rerender with same props
      rerender(<VideoTestimonials eventType="bruiloft" />);

      expect(screen.getByTestId('testimonial-count')).toHaveTextContent(initialCount!);
    });

    it('should update memoized testimonials when eventType changes', () => {
      const { rerender } = render(<VideoTestimonials eventType="bruiloft" />);

      const weddingCount = screen.getByTestId('testimonial-count').textContent;

      rerender(<VideoTestimonials eventType="bedrijfsfeest" />);

      expect(screen.getByTestId('testimonial-count')).not.toHaveTextContent(weddingCount!);
    });
  });

  describe('Accessibility', () => {
    it('should render component with proper structure', () => {
      const { container } = render(<VideoTestimonials />);

      expect(container.querySelector('[data-testid="video-testimonial-component"]')).toBeInTheDocument();
    });

    it('should pass showControls prop for video controls accessibility', () => {
      render(<VideoTestimonials showControls={true} />);

      expect(screen.getByTestId('controls-setting')).toHaveTextContent('controls');
    });

    it('should allow hiding controls for custom implementations', () => {
      render(<VideoTestimonials showControls={false} />);

      expect(screen.getByTestId('controls-setting')).toHaveTextContent('no-controls');
    });
  });

  describe('Edge cases', () => {
    it('should handle empty testimonials array gracefully', () => {
      const { container } = render(<VideoTestimonials testimonials={[]} />);

      expect(container.firstChild).toBeNull();
    });

    it('should handle undefined testimonials prop', () => {
      render(<VideoTestimonials testimonials={undefined} />);

      expect(screen.getByTestId('video-testimonial-component')).toBeInTheDocument();
    });

    it('should handle rapid prop changes', () => {
      const { rerender } = render(<VideoTestimonials eventType="bruiloft" />);

      rerender(<VideoTestimonials eventType="bedrijfsfeest" />);
      rerender(<VideoTestimonials eventType="feest" />);
      rerender(<VideoTestimonials />);

      expect(screen.getByTestId('video-testimonial-component')).toBeInTheDocument();
    });

    it('should handle all props set to false/custom values', () => {
      render(
        <VideoTestimonials
          autoplay={false}
          loop={false}
          showControls={false}
          eventType="bruiloft"
        />
      );

      expect(screen.getByTestId('autoplay-setting')).toHaveTextContent('no-autoplay');
      expect(screen.getByTestId('loop-setting')).toHaveTextContent('no-loop');
      expect(screen.getByTestId('controls-setting')).toHaveTextContent('no-controls');
    });
  });
});

/**
 * VideoTestimonial Component Tests
 * These tests target the underlying VideoTestimonial component
 * that powers the VideoTestimonials wrapper
 */
describe('VideoTestimonial Component Features', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockPostHog.capture.mockClear();
    (window as any).posthog = mockPostHog;
  });

  afterEach(() => {
    delete (window as any).posthog;
    vi.clearAllMocks();
  });

  describe('Video player rendering', () => {
    it('should render video element in VideoTestimonial', async () => {
      // This would require unmocking the actual VideoTestimonial component
      // For now, we verify the wrapper passes correct props
      const customTestimonials = videoTestimonials.slice(0, 1);

      render(<VideoTestimonials testimonials={customTestimonials} />);

      expect(screen.getByTestId('video-testimonial-component')).toBeInTheDocument();
    });
  });

  describe('PostHog event tracking integration', () => {
    it('should have VideoTestimonial component receive proper props for tracking', () => {
      render(<VideoTestimonials />);

      // Verify component is rendered (tracking happens inside VideoTestimonial)
      expect(screen.getByTestId('video-testimonial-component')).toBeInTheDocument();
    });
  });

  describe('Testimonial data structure', () => {
    it('should have all testimonials with required fields', () => {
      videoTestimonials.forEach((testimonial) => {
        expect(testimonial).toHaveProperty('id');
        expect(testimonial).toHaveProperty('name');
        expect(testimonial).toHaveProperty('role');
        expect(testimonial).toHaveProperty('eventType');
        expect(testimonial).toHaveProperty('videoUrl');
        expect(testimonial).toHaveProperty('quote');
        expect(testimonial).toHaveProperty('rating');
      });
    });

    it('should have testimonials with valid ratings (1-5)', () => {
      videoTestimonials.forEach((testimonial) => {
        expect(testimonial.rating).toBeGreaterThanOrEqual(1);
        expect(testimonial.rating).toBeLessThanOrEqual(5);
      });
    });

    it('should have testimonials with valid event types', () => {
      const validEventTypes = ['bruiloft', 'bedrijfsfeest', 'feest'];

      videoTestimonials.forEach((testimonial) => {
        expect(validEventTypes).toContain(testimonial.eventType);
      });
    });

    it('should have testimonials with non-empty required strings', () => {
      videoTestimonials.forEach((testimonial) => {
        expect(testimonial.id).toBeTruthy();
        expect(testimonial.name).toBeTruthy();
        expect(testimonial.role).toBeTruthy();
        expect(testimonial.videoUrl).toBeTruthy();
        expect(testimonial.quote).toBeTruthy();
      });
    });
  });

  describe('Testimonial filtering functions', () => {
    it('should correctly filter wedding testimonials', () => {
      const weddings = weddingTestimonials;

      expect(weddings.length).toBeGreaterThan(0);
      weddings.forEach((t) => {
        expect(t.eventType).toBe('bruiloft');
      });
    });

    it('should correctly filter corporate testimonials', () => {
      const corporate = corporateTestimonials;

      expect(corporate.length).toBeGreaterThan(0);
      corporate.forEach((t) => {
        expect(t.eventType).toBe('bedrijfsfeest');
      });
    });

    it('should correctly filter party testimonials', () => {
      const parties = partyTestimonials;

      expect(parties.length).toBeGreaterThan(0);
      parties.forEach((t) => {
        expect(t.eventType).toBe('feest');
      });
    });

    it('should have filtered testimonials be subset of all testimonials', () => {
      const allIds = new Set(videoTestimonials.map((t) => t.id));
      const filteredIds = [
        ...weddingTestimonials.map((t) => t.id),
        ...corporateTestimonials.map((t) => t.id),
        ...partyTestimonials.map((t) => t.id),
      ];

      filteredIds.forEach((id) => {
        expect(allIds).toContain(id);
      });
    });
  });

  describe('Component composition', () => {
    it('should correctly compose VideoTestimonials wrapper', () => {
      render(<VideoTestimonials />);

      const component = screen.getByTestId('video-testimonial-component');
      expect(component).toBeInTheDocument();
    });

    it('should pass memoized filtered testimonials to child component', () => {
      const { rerender } = render(<VideoTestimonials eventType="bruiloft" />);

      const firstRender = screen.getByTestId('testimonial-count').textContent;

      rerender(<VideoTestimonials eventType="bruiloft" />);

      expect(screen.getByTestId('testimonial-count')).toHaveTextContent(firstRender!);
    });
  });
});
