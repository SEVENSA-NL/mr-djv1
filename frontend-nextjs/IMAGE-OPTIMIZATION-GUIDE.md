# City Images Optimization Guide

## Overview
This guide explains how to optimize and manage images for the 100+ city pages in the Mister DJ website.

## Image Requirements

### City Hero Images
- **Location**: `/public/images/cities/{city-slug}-hero.jpg`
- **Dimensions**: 1200×630px (OG image size)
- **Format**: WebP preferred, JPG fallback
- **File Size**: < 200KB per image
- **Content**: City skyline, landmark, or DJ event venue

### Example Filenames
```
/public/images/cities/amsterdam-hero.jpg
/public/images/cities/rotterdam-hero.jpg
/public/images/cities/utrecht-hero.jpg
/public/images/cities/eindhoven-hero.jpg
```

## Optimization Strategy

### Phase 1: Priority Cities (Top 20)
Focus on the largest/most important cities first:

1. Amsterdam
2. Rotterdam
3. Den Haag
4. Utrecht
5. Eindhoven
6. Groningen
7. Tilburg
8. Almere
9. Breda
10. Nijmegen
11. Enschede
12. Haarlem
13. Arnhem
14. Zaanstad
15. Amersfoort
16. Apeldoorn
17. 's-Hertogenbosch
18. Maastricht
19. Leiden
20. Dordrecht

### Phase 2: Secondary Cities (21-50)
Medium-sized cities with good traffic potential.

### Phase 3: Remaining Cities (51-100)
Can use generic/fallback images or stock photos.

## Image Sources

### Free Stock Photos
1. **Unsplash** - https://unsplash.com/s/photos/netherlands-city
2. **Pexels** - https://www.pexels.com/search/dutch%20city/
3. **Pixabay** - https://pixabay.com/images/search/netherlands/

### Custom Photography
- Hire local photographer per city
- Take photos at actual events in each city
- Use drone photography for skylines

### AI-Generated Images
- Midjourney: "Dutch city [name] skyline at night, professional photography"
- DALL-E: "Modern skyline of [city], Netherlands, golden hour"
- Stable Diffusion: City-specific prompts

## Optimization Tools

### Automated Optimization
```bash
# Install Sharp for Node.js image processing
npm install sharp

# Batch convert to WebP
for file in images/cities/*.jpg; do
  npx sharp -i "$file" -o "${file%.jpg}.webp" -f webp -q 85
done

# Resize to 1200x630
npx sharp -i input.jpg -o output.jpg -w 1200 -h 630 -f cover
```

### Online Tools
1. **TinyPNG** - https://tinypng.com/ (batch compression)
2. **Squoosh** - https://squoosh.app/ (WebP conversion)
3. **ImageOptim** - https://imageoptim.com/ (Mac app)

## Next.js Image Component

### Already Implemented
The `CityHero` component uses Next.js Image:

```tsx
<Image
  src={`/images/cities/${city.slug}-hero.jpg`}
  alt={`${city.name} skyline`}
  fill
  className="object-cover opacity-20"
  priority
  sizes="100vw"
/>
```

### Benefits
- Automatic WebP conversion
- Lazy loading (except priority images)
- Responsive sizes
- Blur-up placeholder
- No CLS (Cumulative Layout Shift)

## Fallback Strategy

### Current Implementation
1. **Gradient Background**: Beautiful purple-to-indigo gradient
2. **Overlay**: Works without any images
3. **Progressive Enhancement**: Images enhance, not required

### Adding Fallbacks
```tsx
// In CityHero component
const [imageError, setImageError] = useState(false);

<Image
  src={`/images/cities/${city.slug}-hero.jpg`}
  onError={() => setImageError(true)}
  // ... other props
/>

{imageError && (
  <div className="absolute inset-0 bg-gradient-to-br from-purple-900 to-indigo-900" />
)}
```

## Batch Processing Script

### Create Image Processing Script
```javascript
// scripts/optimize-city-images.js
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = './raw-images';
const outputDir = './public/images/cities';

const cities = [
  'amsterdam', 'rotterdam', 'utrecht', // ... all 100
];

async function processImages() {
  for (const city of cities) {
    const inputPath = path.join(inputDir, `${city}.jpg`);
    const outputPath = path.join(outputDir, `${city}-hero.jpg`);

    if (fs.existsSync(inputPath)) {
      await sharp(inputPath)
        .resize(1200, 630, { fit: 'cover', position: 'center' })
        .jpeg({ quality: 85, progressive: true })
        .toFile(outputPath);

      // Also create WebP version
      await sharp(inputPath)
        .resize(1200, 630, { fit: 'cover', position: 'center' })
        .webp({ quality: 85 })
        .toFile(outputPath.replace('.jpg', '.webp'));

      console.log(`✅ Processed ${city}`);
    } else {
      console.log(`⚠️  Missing ${city}`);
    }
  }
}

processImages();
```

## Image Guidelines

### Content Guidelines
✅ **Good Images**:
- City skylines at golden hour
- Famous landmarks
- Modern architecture
- Event venues
- Nightlife scenes
- DJ equipment in urban setting

❌ **Avoid**:
- Low resolution images
- Heavily watermarked photos
- Non-representative generic images
- Copyrighted professional photos without license

### Technical Guidelines
- **Aspect Ratio**: 1200:630 (1.9:1)
- **Color Space**: sRGB
- **Compression**: 80-85% quality
- **Format**: WebP primary, JPG fallback
- **File Naming**: `{city-slug}-hero.jpg`

## SEO Optimization

### Image Alt Text
Already implemented with descriptive alt text:
```tsx
alt={`${city.name} skyline`}
```

### OG Images
Same images used for Open Graph:
```tsx
images: [{
  url: `/images/cities/${params.city}-hero.jpg`,
  width: 1200,
  height: 630,
  alt: `DJ ${city.name} - Mister DJ`,
}]
```

## Storage & CDN

### Current Setup
- Images in `/public/images/cities/`
- Served by Next.js static file server
- Automatically optimized on-the-fly

### Production Recommendations
1. **Cloudinary**: Automatic optimization + CDN
2. **Vercel Image Optimization**: Built-in with deployment
3. **imgix**: Advanced image manipulation
4. **CloudFront**: AWS CDN for static assets

## Performance Metrics

### Target Metrics
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

### Monitoring
```javascript
// Add to analytics
web-vitals library integration
Track per-city performance
Monitor image load times
```

## Checklist

### Pre-Launch
- [ ] Optimize top 20 city images
- [ ] Create WebP versions
- [ ] Test loading performance
- [ ] Validate alt text
- [ ] Check mobile rendering
- [ ] Test fallback gradients

### Post-Launch
- [ ] Monitor Core Web Vitals
- [ ] Add remaining city images progressively
- [ ] A/B test image styles
- [ ] Gather user feedback
- [ ] Update based on performance data

## Quick Commands

```bash
# Create images directory
mkdir -p public/images/cities

# Download sample images
wget https://example.com/amsterdam.jpg -O public/images/cities/amsterdam-hero.jpg

# Batch optimize
npm run optimize:images

# Check image sizes
du -sh public/images/cities/*

# Validate all images exist
node scripts/validate-city-images.js
```

## Resources

- Next.js Image Optimization: https://nextjs.org/docs/app/building-your-application/optimizing/images
- Web.dev Image Optimization: https://web.dev/fast/#optimize-your-images
- WebP Support: https://caniuse.com/webp

---

Last Updated: December 2025
Version: 1.0
