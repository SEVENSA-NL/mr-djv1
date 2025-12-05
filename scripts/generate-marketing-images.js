#!/usr/bin/env node
/**
 * Generate 40 marketing images for Mr-DJ using Replicate API
 *
 * Usage:
 *   REPLICATE_API_KEY=r8_xxx node scripts/generate-marketing-images.js
 */

const fs = require('fs');
const path = require('path');
const replicateImageService = require('../src/services/replicateImageService');

// Output directory
const OUTPUT_DIR = path.join(__dirname, '../../mrdj-assets/generated');

async function main() {
  console.log('🎨 Mr-DJ Marketing Image Generation');
  console.log('====================================\n');

  // Check API key
  if (!process.env.REPLICATE_API_KEY) {
    console.error('❌ Error: REPLICATE_API_KEY environment variable not set');
    console.error('\nPlease set your Replicate API token:');
    console.error('  export REPLICATE_API_KEY=r8_your_token_here');
    console.error('\nGet your API token at: https://replicate.com/account/api-tokens');
    process.exit(1);
  }

  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  console.log(`📁 Output directory: ${OUTPUT_DIR}\n`);
  console.log('⏳ Starting generation of 40 images...');
  console.log('   This will take approximately 5-10 minutes\n');

  try {
    // Generate all images
    const results = await replicateImageService.generateAllImages();

    // Save metadata
    const metadataPath = path.join(OUTPUT_DIR, 'generation-results.json');
    fs.writeFileSync(metadataPath, JSON.stringify(results, null, 2));
    console.log(`\n💾 Metadata saved to: ${metadataPath}`);

    // Download all successful images
    console.log('\n📥 Downloading generated images...\n');

    for (const [categoryName, categoryData] of Object.entries(results.categories)) {
      const categoryDir = path.join(OUTPUT_DIR, categoryName);
      if (!fs.existsSync(categoryDir)) {
        fs.mkdirSync(categoryDir, { recursive: true });
      }

      for (const result of categoryData.results) {
        if (result.success && result.imageUrl) {
          const filename = `${categoryName}-${String(result.index).padStart(2, '0')}.jpg`;
          const outputPath = path.join(categoryDir, filename);

          console.log(`   Downloading: ${filename}`);
          const download = await replicateImageService.downloadImage(result.imageUrl, outputPath);

          if (download.success) {
            console.log(`   ✅ Saved: ${outputPath}`);
          } else {
            console.log(`   ❌ Failed: ${download.error}`);
          }
        }
      }
    }

    // Print summary
    console.log('\n' + '='.repeat(60));
    console.log('✨ Generation Complete!');
    console.log('='.repeat(60));
    console.log(`\n📊 Summary:`);
    console.log(`   Total Images: ${results.summary.totalImages}`);
    console.log(`   Successful: ${results.summary.successful}`);
    console.log(`   Failed: ${results.summary.failed}`);
    console.log(`   Duration: ${results.summary.durationMinutes} minutes`);
    console.log('\n📁 Images organized by category:');
    console.log(`   - Wedding DJ: ${results.categories.weddingDJ.successful}/10`);
    console.log(`   - Corporate Events: ${results.categories.corporateEvent.successful}/10`);
    console.log(`   - Party DJ: ${results.categories.partyDJ.successful}/10`);
    console.log(`   - General Marketing: ${results.categories.generalMarketing.successful}/10`);
    console.log(`\n📂 Output directory: ${OUTPUT_DIR}\n`);

    // Create usage report
    const report = generateUsageReport(results);
    const reportPath = path.join(OUTPUT_DIR, 'IMAGE_USAGE_GUIDE.md');
    fs.writeFileSync(reportPath, report);
    console.log(`📖 Usage guide created: ${reportPath}\n`);

  } catch (error) {
    console.error('\n❌ Generation failed:', error.message);
    process.exit(1);
  }
}

function generateUsageReport(results) {
  return `# Mr-DJ Marketing Images - Usage Guide

Generated: ${new Date().toISOString()}

## Summary

- **Total Images**: ${results.summary.totalImages}
- **Successful**: ${results.summary.successful}
- **Generation Time**: ${results.summary.durationMinutes} minutes

## Image Categories

### 1. Wedding DJ (10 images)

Location: \`generated/weddingDJ/\`

${results.categories.weddingDJ.results.map((r, i) => `
**wedding-dj-${String(i + 1).padStart(2, '0')}.jpg**
- Prompt: ${r.prompt}
- Use for: Wedding service pages, gallery, testimonials
- Status: ${r.success ? '✅ Available' : '❌ Failed'}
`).join('\n')}

### 2. Corporate Events (10 images)

Location: \`generated/corporateEvent/\`

${results.categories.corporateEvent.results.map((r, i) => `
**corporate-event-${String(i + 1).padStart(2, '0')}.jpg**
- Prompt: ${r.prompt}
- Use for: Corporate event pages, business client materials
- Status: ${r.success ? '✅ Available' : '❌ Failed'}
`).join('\n')}

### 3. Party DJ (10 images)

Location: \`generated/partyDJ/\`

${results.categories.partyDJ.results.map((r, i) => `
**party-dj-${String(i + 1).padStart(2, '0')}.jpg**
- Prompt: ${r.prompt}
- Use for: Party service pages, festival marketing
- Status: ${r.success ? '✅ Available' : '❌ Failed'}
`).join('\n')}

### 4. General Marketing (10 images)

Location: \`generated/generalMarketing/\`

${results.categories.generalMarketing.results.map((r, i) => `
**general-marketing-${String(i + 1).padStart(2, '0')}.jpg**
- Prompt: ${r.prompt}
- Use for: Blog posts, homepage, about page, social media
- Status: ${r.success ? '✅ Available' : '❌ Failed'}
`).join('\n')}

## Implementation Recommendations

### Homepage Hero
Use: \`general-marketing-08.jpg\` (DJ at sunset outdoor event)

### Service Pages
- Wedding: \`wedding-dj-01.jpg\` through \`wedding-dj-03.jpg\`
- Corporate: \`corporate-event-01.jpg\` through \`corporate-event-03.jpg\`
- Party: \`party-dj-01.jpg\` through \`party-dj-03.jpg\`

### Blog Posts
Use general-marketing images 01-07 for technical/educational content

### Social Media
All images are optimized for 16:9 aspect ratio (1920x1080)
Perfect for Instagram posts, Facebook covers, LinkedIn articles

## Image Optimization

All images are generated at high quality (90% JPEG) and 16:9 aspect ratio.

**Recommended next steps:**
1. Convert to WebP format for web performance
2. Generate responsive srcsets (1920w, 1280w, 640w, 320w)
3. Add proper alt text for SEO
4. Implement lazy loading

## License & Usage

These images were generated using Replicate's FLUX Schnell model.
Safe for commercial use in Mr-DJ marketing materials.

---
Generated by Mr-DJ Marketing Image Generation System
`;
}

// Run the script
main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
