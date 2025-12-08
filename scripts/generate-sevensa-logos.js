#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const https = require('https');
const Replicate = require('replicate');

const REPLICATE_API_KEY = process.env.REPLICATE_API_KEY;
const OUTPUT_DIR = '/tmp/sevensa-logos';

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const replicate = new Replicate({
  auth: REPLICATE_API_KEY,
});

// Logo configurations
const logos = [
  {
    id: 1,
    name: 'PSRA-Intelligence',
    prompt: 'Professional corporate logo design for PSRA Intelligence company. Modern minimalist geometric hexagon shape, teal and navy blue color palette, tech security theme, shield elements, clean vector style, white background, high contrast, professional branding',
    filename: 'psra-logo.png'
  },
  {
    id: 2,
    name: 'RentGuy-Cloud',
    prompt: 'Professional corporate logo design for RentGuy Cloud computing platform. Modern cloud and wave visual elements, turquoise and cyan blue gradient, AV equipment icons, clean minimalist vector style, white background, tech aesthetic, professional branding',
    filename: 'rentguy-logo.png'
  },
  {
    id: 3,
    name: 'WPCS-Studio',
    prompt: 'Professional creative agency logo for WPCS Studio. Geometric layout grid elements, warm orange and terracotta brown colors, minimalist square shapes, modern design aesthetic, white background, clean vector style, professional branding',
    filename: 'wpcs-logo.png'
  },
  {
    id: 4,
    name: 'Observability-Platform',
    prompt: 'Professional tech logo for Observability monitoring platform. Circular radar or target design, indigo and deep purple colors, data visualization theme, monitoring icons, clean minimalist vector style, white background, enterprise tech branding',
    filename: 'observability-logo.png'
  }
];

/**
 * Download image from URL
 */
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve(filepath);
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
}

/**
 * Generate a single logo
 */
async function generateLogo(logo, index, total) {
  console.log(`\n📸 [${index}/${total}] Generating: ${logo.name}`);
  console.log(`   Prompt: ${logo.prompt.substring(0, 80)}...`);

  try {
    const output = await replicate.run(
      "black-forest-labs/flux-schnell",
      {
        input: {
          prompt: logo.prompt,
          num_outputs: 1,
          aspect_ratio: "16:9",
          output_format: "png",
          output_quality: 95,
          disable_safety_checker: false
        }
      }
    );

    if (!output || !output[0]) {
      throw new Error('No output from Replicate');
    }

    const imageUrl = output[0];
    console.log(`   ✅ Generated: ${imageUrl}`);

    const filepath = path.join(OUTPUT_DIR, logo.filename);
    await downloadImage(imageUrl, filepath);
    console.log(`   💾 Saved: ${logo.filename}`);

    return {
      id: logo.id,
      name: logo.name,
      filename: logo.filename,
      filepath,
      url: imageUrl,
      success: true
    };

  } catch (error) {
    console.error(`   ❌ Error generating ${logo.name}:`, error.message);
    return {
      id: logo.id,
      name: logo.name,
      error: error.message,
      success: false
    };
  }
}

/**
 * Main execution
 */
async function main() {
  console.log('🚀 Sevensa Logo Generator');
  console.log('='.repeat(60));
  console.log(`📂 Output directory: ${OUTPUT_DIR}`);
  console.log(`🔑 API Key: ${REPLICATE_API_KEY.substring(0, 10)}...`);
  console.log(`📊 Logos to generate: ${logos.length}`);
  console.log('');

  const results = [];
  const startTime = Date.now();

  for (let i = 0; i < logos.length; i++) {
    const result = await generateLogo(logos[i], i + 1, logos.length);
    results.push(result);

    // Small delay between generations
    if (i < logos.length - 1) {
      console.log('   ⏸️  Waiting 5s...');
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }

  const endTime = Date.now();
  const duration = Math.ceil((endTime - startTime) / 1000);
  const successCount = results.filter(r => r.success).length;

  console.log('\n' + '='.repeat(60));
  console.log('📊 GENERATION COMPLETE');
  console.log('='.repeat(60));
  console.log(`✅ Successful: ${successCount}/${logos.length}`);
  console.log(`⏱️  Total time: ${duration}s`);
  console.log(`📂 Output: ${OUTPUT_DIR}`);
  console.log('');

  // Save manifest
  const manifest = {
    generated_at: new Date().toISOString(),
    total: logos.length,
    successful: successCount,
    duration_seconds: duration,
    results: results
  };

  const manifestPath = path.join(OUTPUT_DIR, 'manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(`📄 Manifest: ${manifestPath}`);
  console.log('\n✨ Done! Logos generated successfully!');

  return results;
}

main().catch(error => {
  console.error('\n❌ Fatal error:', error);
  process.exit(1);
});
