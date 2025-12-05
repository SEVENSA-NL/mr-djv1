import { Testimonial } from '@/components/video/VideoTestimonial';

export const videoTestimonials: Testimonial[] = [
  {
    id: 'testimonial-001',
    name: 'Lisa & Tom van den Berg',
    role: 'Bruidspaar',
    eventType: 'bruiloft',
    videoUrl: '/assets/videos/testimonial-001.mp4',
    quote: 'De DJ voelde perfect aan wat de gasten wilden horen. De dansvloer was vanaf het eerste nummer tot het einde bomvol. Onze gasten praten er nóg over!',
    rating: 5,
  },
  {
    id: 'testimonial-002',
    name: 'Sarah & Mark Jansen',
    role: 'Bruidspaar',
    eventType: 'bruiloft',
    videoUrl: '/assets/videos/testimonial-002.mp4',
    quote: 'De live saxofonist tijdens onze eerste dans was echt het hoogtepunt van de avond. Kippenvel moment! Iedereen was onder de indruk.',
    rating: 5,
  },
  {
    id: 'testimonial-003',
    name: 'Peter Smits',
    role: 'Event Manager',
    company: 'Philips Health',
    eventType: 'bedrijfsfeest',
    videoUrl: '/assets/videos/testimonial-003.mp4',
    quote: 'Super professioneel en volledig ontzorgd. Van ceremonie tot afterparty alles geregeld. Wij konden gewoon genieten van onze dag!',
    rating: 5,
  },
  {
    id: 'testimonial-004',
    name: 'Emma & David de Vries',
    role: 'Bruidspaar',
    eventType: 'bruiloft',
    videoUrl: '/assets/videos/testimonial-004.mp4',
    quote: 'Mister DJ maakte van onze bruiloft een onvergetelijke ervaring. De perfecte mix van professionele uitvoering en persoonlijke aandacht.',
    rating: 5,
  },
  {
    id: 'testimonial-005',
    name: 'Peter van Dijk',
    role: 'Jarige',
    eventType: 'feest',
    videoUrl: '/assets/videos/testimonial-001.mp4',
    quote: 'Mijn 50e verjaardag werd perfect! De DJ speelde precies de goede mix van oude hits en nieuwe tracks. Iedereen heeft gedanst tot het einde.',
    rating: 5,
  },
  {
    id: 'testimonial-006',
    name: 'Linda Bakker',
    role: 'Organisator 80s Party',
    eventType: 'feest',
    videoUrl: '/assets/videos/testimonial-002.mp4',
    quote: 'Themafeest 80s/90s was geweldig! De DJ kwam zelfs in outfit en heeft de hele avond spot-on gedraaid. Mega succesvol feest!',
    rating: 5,
  },
  {
    id: 'testimonial-007',
    name: 'Mark Hendrikx',
    role: 'Jarige',
    eventType: 'feest',
    videoUrl: '/assets/videos/testimonial-003.mp4',
    quote: 'Tuinfeest voor mijn verjaardag was super! Van chille middag muziek tot knallende avond. De DJ voelde perfect aan wanneer de vibe kon omhoog.',
    rating: 5,
  },
];

// Filter testimonials by event type
export const getTestimonialsByType = (eventType: 'bruiloft' | 'bedrijfsfeest' | 'feest'): Testimonial[] => {
  return videoTestimonials.filter((t) => t.eventType === eventType);
};

// Get all wedding testimonials
export const weddingTestimonials = getTestimonialsByType('bruiloft');

// Get all corporate testimonials
export const corporateTestimonials = getTestimonialsByType('bedrijfsfeest');

// Get all party testimonials
export const partyTestimonials = getTestimonialsByType('feest');
