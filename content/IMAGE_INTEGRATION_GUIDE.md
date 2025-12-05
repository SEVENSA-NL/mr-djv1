# Mr-DJ Marketing Images - Integration Guide

Generated: 2025-12-05T05:15:00Z

## Summary

This guide explains how to integrate the 40 AI-generated marketing images and 21 wedding photos into the Mr-DJ website.

---

## Image Assets Overview

### 1. AI-Generated Marketing Images (40 images)
**Location:** `/srv/apps/mr-djv1/assets/marketing-images/`

#### Categories:
- **Wedding DJ** (Bruiloft): 10 images
- **Corporate Events** (Bedrijfsfeesten): 10 images
- **Party DJ** (Feesten): 10 images
- **General Marketing** (Algemeen): 10 images

#### Formats Available:
- **JPG**: Original high-quality (5.09 MB total, 90% quality)
- **WebP**: Optimized for web (2.27 MB total, 85% quality, 55.5% smaller)

#### Specifications:
- Model: FLUX.1 [dev] by Black Forest Labs
- Resolution: 1920x1080 (16:9 aspect ratio)
- Style: Professional event photography
- Quality: Commercial-grade, high-converting imagery

### 2. Real Wedding Photos (21 images)
**Location:** `/srv/apps/mr-djv1/assets/photos/`

Files: `bruiloft-001.jpg` through `bruiloft-021.jpg` (42.5 MB total)

---

## Integration Strategy

### Homepage

**Hero Section:**
```html
<!-- Use sunset DJ image for emotional impact -->
<img src="/assets/marketing-images/generalMarketing/generalMarketing-08.webp"
     alt="Professional DJ at outdoor sunset event - Mr-DJ"
     width="1920" height="1080"
     loading="eager" />
```

**Service Cards:**
```html
<!-- Wedding Service -->
<img src="/assets/marketing-images/weddingDJ/weddingDJ-01.webp"
     alt="Elegant wedding reception with professional DJ setup"
     loading="lazy" />

<!-- Corporate Service -->
<img src="/assets/marketing-images/corporateEvent/corporateEvent-01.webp"
     alt="Professional DJ at corporate networking event"
     loading="lazy" />

<!-- Party Service -->
<img src="/assets/marketing-images/partyDJ/partyDJ-01.webp"
     alt="Energetic party DJ with dancing crowd"
     loading="lazy" />
```

---

### Service Pages

#### Wedding DJ Page (Bruiloft DJ)

**Hero Image:**
- Primary: `weddingDJ-01.webp` - Elegant setup with white/gold decor
- Alt: `weddingDJ-07.webp` - Outdoor sunset reception

**Gallery (Recommended Order):**
1. `weddingDJ-01.webp` - Professional setup at elegant reception
2. `weddingDJ-02.webp` - DJ with bride & groom dancing
3. `weddingDJ-03.webp` - Dance floor filled with celebrating guests
4. `weddingDJ-05.webp` - First dance with romantic lighting
5. `weddingDJ-08.webp` - Guests celebrating on dance floor
6. `weddingDJ-07.webp` - Outdoor sunset reception
7. `weddingDJ-10.webp` - Cocktail hour with elegant DJ setup

**Real Photos Gallery:**
Use `/assets/photos/bruiloft-001.jpg` through `bruiloft-021.jpg` for authentic testimonial section

**SEO Alt Text Examples:**
```
"Professional DJ setup at elegant Dutch wedding reception"
"Wedding DJ mixing music while bride and groom dance"
"Packed wedding dance floor with professional lighting"
"First dance at wedding with Mr-DJ entertainment"
```

#### Corporate Events Page (Bedrijfsfeesten)

**Hero Image:**
- Primary: `corporateEvent-01.webp` - Professional networking event
- Alt: `corporateEvent-03.webp` - Corporate awards ceremony

**Gallery (Recommended Order):**
1. `corporateEvent-01.webp` - Business networking with DJ
2. `corporateEvent-02.webp` - Company party with employees dancing
3. `corporateEvent-03.webp` - Corporate awards ceremony
4. `corporateEvent-04.webp` - Conference after-party
5. `corporateEvent-06.webp` - Product launch party
6. `corporateEvent-08.webp` - Corporate gala dinner
7. `corporateEvent-09.webp` - Tech company party

**SEO Alt Text Examples:**
```
"Professional DJ at corporate networking event in Netherlands"
"Company party DJ with branded corporate event setup"
"Corporate awards ceremony with elegant DJ lighting"
"Business conference after-party DJ entertainment"
```

#### Party DJ Page (Feest DJ)

**Hero Image:**
- Primary: `partyDJ-01.webp` - Energetic party with hands up
- Alt: `partyDJ-05.webp` - Nightclub-style with laser lights

**Gallery (Recommended Order):**
1. `partyDJ-01.webp` - Energetic private party with crowd dancing
2. `partyDJ-03.webp` - DJ at outdoor festival at sunset
3. `partyDJ-05.webp` - Nightclub-style party with lasers
4. `partyDJ-02.webp` - Birthday party celebration
5. `partyDJ-07.webp` - Graduation party
6. `partyDJ-09.webp` - New Year's Eve countdown
7. `partyDJ-10.webp` - Rooftop party with city skyline

**SEO Alt Text Examples:**
```
"Energetic party DJ with dancing crowd and colorful lighting"
"Outdoor festival DJ at sunset in Netherlands"
"Nightclub-style party with professional DJ and laser lights"
"Birthday party DJ with modern sound equipment"
```

---

### Blog Posts & Content

**Equipment/Technical Posts:**
- `generalMarketing-01.webp` - Professional CDJ players close-up
- `generalMarketing-02.webp` - DJ hands on mixer controls
- `generalMarketing-03.webp` - Modern DJ booth with LED screens
- `generalMarketing-06.webp` - DJ equipment with laptop setup

**Behind-the-Scenes Posts:**
- `generalMarketing-04.webp` - DJ preparing for event
- `generalMarketing-07.webp` - Sound check before event

**Inspirational/Lifestyle Posts:**
- `generalMarketing-08.webp` - DJ at sunset outdoor event
- `generalMarketing-09.webp` - Professional DJ portrait

**Branding Posts:**
- `generalMarketing-10.webp` - DJ equipment with Mr-DJ branding

---

### Gallery Component Example

```jsx
// React/Next.js Gallery Component
import Image from 'next/image';

const WeddingGallery = () => {
  const images = [
    {
      src: '/assets/marketing-images/weddingDJ/weddingDJ-01.webp',
      alt: 'Professional DJ setup at elegant wedding reception',
      category: 'setup'
    },
    {
      src: '/assets/marketing-images/weddingDJ/weddingDJ-02.webp',
      alt: 'DJ mixing at luxurious wedding with bride and groom',
      category: 'performance'
    },
    // ... add all images
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {images.map((img, idx) => (
        <div key={idx} className="relative aspect-video overflow-hidden rounded-lg">
          <Image
            src={img.src}
            alt={img.alt}
            width={1920}
            height={1080}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover hover:scale-105 transition-transform duration-300"
            loading={idx < 3 ? 'eager' : 'lazy'}
          />
        </div>
      ))}
    </div>
  );
};
```

---

## SEO Optimization

### File Naming Convention
All images follow descriptive naming:
- `weddingDJ-01.webp` → Wedding DJ service images
- `corporateEvent-01.webp` → Corporate event images
- `partyDJ-01.webp` → Party/festival images
- `generalMarketing-01.webp` → General marketing content

### Recommended Alt Text Structure
```
[Primary Subject] + [Context] + [Location/Brand]

Examples:
✅ "Professional DJ at elegant wedding reception - Mr-DJ"
✅ "Corporate event DJ with modern lighting setup in Netherlands"
✅ "Birthday party entertainment with professional sound equipment"

❌ "Image 1" (too generic)
❌ "wedding-dj-01" (not descriptive)
```

### Image Optimization Checklist

- [x] **WebP Format**: All 40 images converted (55.5% size reduction)
- [x] **Descriptive Filenames**: Clear, SEO-friendly naming
- [ ] **Alt Text**: Add to each implementation
- [ ] **Lazy Loading**: Implement for below-the-fold images
- [ ] **Responsive Srcsets**: Generate multiple sizes (1920w, 1280w, 640w, 320w)
- [ ] **Structured Data**: Add ImageObject schema markup
- [ ] **Social Meta Tags**: og:image and twitter:card

### Responsive Srcset Example
```html
<img
  srcset="
    /assets/marketing-images/weddingDJ/weddingDJ-01-320w.webp 320w,
    /assets/marketing-images/weddingDJ/weddingDJ-01-640w.webp 640w,
    /assets/marketing-images/weddingDJ/weddingDJ-01-1280w.webp 1280w,
    /assets/marketing-images/weddingDJ/weddingDJ-01.webp 1920w"
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  src="/assets/marketing-images/weddingDJ/weddingDJ-01.webp"
  alt="Professional DJ setup at elegant wedding reception"
  loading="lazy"
/>
```

### Schema Markup Example
```json
{
  "@context": "https://schema.org",
  "@type": "ImageGallery",
  "name": "Mr-DJ Wedding Photography Gallery",
  "description": "Professional wedding DJ services in Netherlands",
  "image": [
    {
      "@type": "ImageObject",
      "contentUrl": "https://mr-dj.nl/assets/marketing-images/weddingDJ/weddingDJ-01.webp",
      "description": "Professional DJ setup at elegant wedding reception",
      "width": "1920",
      "height": "1080"
    }
  ]
}
```

---

## Social Media Usage

### Instagram (Square Crop - 1080x1080)
Crop center of 16:9 images or use:
- Portrait shots: `generalMarketing-09.webp`
- Equipment close-ups: `generalMarketing-01.webp`, `generalMarketing-02.webp`
- Atmospheric shots: `generalMarketing-08.webp`

### Facebook Cover (820x312)
Best wide shots:
- `weddingDJ-07.webp` - Outdoor sunset reception
- `partyDJ-03.webp` - Festival DJ at sunset
- `generalMarketing-08.webp` - DJ silhouette at sunset

### LinkedIn (1200x627)
Professional shots:
- `corporateEvent-01.webp` - Business networking
- `corporateEvent-03.webp` - Corporate awards ceremony
- `corporateEvent-08.webp` - Corporate gala dinner

---

## Performance Recommendations

### 1. Lazy Loading Strategy
```javascript
// Eager load (above fold, first 3 images)
loading="eager"
fetchpriority="high"

// Lazy load (below fold, remaining images)
loading="lazy"
```

### 2. Progressive Enhancement
```html
<picture>
  <!-- WebP for modern browsers -->
  <source srcset="/assets/marketing-images/weddingDJ/weddingDJ-01.webp" type="image/webp">

  <!-- JPG fallback -->
  <img src="/assets/marketing-images/weddingDJ/weddingDJ-01.jpg" alt="...">
</picture>
```

### 3. CDN Integration
Consider uploading to CDN for global delivery:
```
Original: https://mr-dj.nl/assets/marketing-images/...
CDN: https://cdn.mr-dj.nl/images/...
```

### 4. Image Preloading (Critical Images)
```html
<link rel="preload" as="image"
      href="/assets/marketing-images/generalMarketing/generalMarketing-08.webp"
      type="image/webp">
```

---

## Analytics & Testing

### Track Image Performance
```javascript
// Google Analytics 4 Event
gtag('event', 'image_view', {
  'image_category': 'wedding_dj',
  'image_name': 'weddingDJ-01',
  'format': 'webp'
});
```

### A/B Testing Recommendations
1. **Hero Image Variants**:
   - Test `generalMarketing-08.webp` vs `weddingDJ-01.webp`
   - Measure: Time on page, scroll depth, conversion rate

2. **Gallery Layouts**:
   - Grid vs Masonry vs Carousel
   - Measure: Click-through rate, engagement time

3. **CTA Placement**:
   - Above gallery vs Below gallery
   - Measure: Contact form submissions

---

## Deployment Checklist

### Pre-Launch
- [ ] Upload all WebP images to production server
- [ ] Generate responsive srcsets (320w, 640w, 1280w, 1920w)
- [ ] Add alt text to all images
- [ ] Implement lazy loading
- [ ] Test on mobile devices (iOS/Android)
- [ ] Test on major browsers (Chrome, Safari, Firefox, Edge)
- [ ] Verify WebP support fallbacks work

### Post-Launch
- [ ] Monitor Core Web Vitals (LCP should be < 2.5s)
- [ ] Check image load times in Page Speed Insights
- [ ] Verify images appear in Google Image Search (1-2 weeks)
- [ ] Monitor bounce rate on image-heavy pages
- [ ] A/B test different hero images
- [ ] Collect user feedback on image quality

### Ongoing Optimization
- [ ] Compress images further if LCP > 2.5s
- [ ] Add more images as library grows
- [ ] Update alt text based on SEO performance
- [ ] Refresh images every 6-12 months

---

## Quick Reference: Image-to-Page Mapping

| Page | Hero Image | Gallery Images (3-6) |
|------|-----------|---------------------|
| Homepage | `generalMarketing-08.webp` | `weddingDJ-01`, `corporateEvent-01`, `partyDJ-01` |
| Bruiloft DJ | `weddingDJ-01.webp` | `02, 03, 05, 07, 08, 10` |
| Bedrijfsfeest | `corporateEvent-01.webp` | `02, 03, 04, 06, 08, 09` |
| Feest DJ | `partyDJ-01.webp` | `02, 03, 05, 07, 09, 10` |
| About/Contact | `generalMarketing-09.webp` | `04, 07` |
| Blog (Equipment) | `generalMarketing-01.webp` | `02, 03, 06` |

---

## Support & Resources

### Image Locations
- **Marketing Images:** `/srv/apps/mr-djv1/assets/marketing-images/`
- **Wedding Photos:** `/srv/apps/mr-djv1/assets/photos/`
- **Usage Guide:** `/srv/apps/mr-djv1/assets/marketing-images/IMAGE_USAGE_GUIDE.md`
- **Integration Guide:** `/srv/apps/mr-djv1/content/IMAGE_INTEGRATION_GUIDE.md`

### Generation Details
- **Model Used:** FLUX.1 [dev] by Black Forest Labs
- **Generation Date:** 2025-12-05
- **Total Images:** 40 (all successful)
- **Success Rate:** 100%
- **Generation Time:** 2.76 minutes

### Contact
For questions about image usage or integration:
- Email: admin@sevensa.nl
- Documentation: This file

---

**Last Updated:** 2025-12-05T05:15:00Z
**Version:** 1.0
**Status:** Ready for Production
