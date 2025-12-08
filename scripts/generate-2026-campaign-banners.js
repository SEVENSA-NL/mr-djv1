#!/usr/bin/env node

/**
 * Generate 48 Social Media Campaign Banners for 2026
 * Using Replicate FLUX.1 for high-quality AI-generated images
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const { execFile } = require('child_process');
const Replicate = require('replicate');

const REPLICATE_API_KEY = process.env.REPLICATE_API_KEY;
const CONTENT_PLAN_PATH = path.join(__dirname, '../content/social-media-content-plan-2026.json');
const OUTPUT_DIR = path.join(__dirname, '../assets/social-media/2026-campaigns');
const MISTER_DJ_LOGO_PATH = path.join(__dirname, '../assets/logo/misterdj-logo.png');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const replicate = new Replicate({
  auth: REPLICATE_API_KEY,
});

/**
 * Download image from URL with redirect + status handling
 */
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const args = ['-L', '--fail', '--silent', '--show-error', '-o', filepath, url];
    execFile('curl', args, (error) => {
      if (error) {
        fs.unlink(filepath, () => {});
        return reject(new Error(`curl download failed: ${error.message}`));
      }
      resolve(filepath);
    });
  });
}

/**
 * Generate a single campaign banner using Replicate FLUX.1
 */
async function generateCampaignBanner(campaign, index, total) {
  console.log(`\n📸 [${index}/${total}] Generating: ${campaign.theme}`);
  console.log(`   Month: ${campaign.month} Week ${campaign.week}`);

  try {
    // Enhanced prompt with Mister DJ logo requirement
    const enhancedPrompt = `${campaign.banner_prompt}.
    IMPORTANT: Include visible "Mister DJ" text/logo branding integrated naturally into the scene.
    Style: High quality professional event photography,
    Format: Instagram square 1:1 aspect ratio,
    Lighting: Professional event lighting,
    Colors: Vibrant but realistic,
    Composition: Centered and balanced for social media`;

    console.log(`   Prompt: ${campaign.banner_prompt.substring(0, 80)}...`);

    // Use FLUX.1 [schnell] for faster generation (or flux-dev for higher quality)
    const output = await replicate.run(
      "black-forest-labs/flux-schnell",
      {
        input: {
          prompt: enhancedPrompt,
          num_outputs: 1,
          aspect_ratio: "1:1",
          output_format: "png",
          output_quality: 90,
          disable_safety_checker: false
        }
      }
    );

    if (!output || !output[0]) {
      throw new Error('No output from Replicate');
    }

    const imageUrl = output[0];
    console.log(`   ✅ Generated: ${imageUrl}`);

    // Download the image
    const filename = `campaign-${String(campaign.id).padStart(2, '0')}-${campaign.month.toLowerCase()}-week${campaign.week}.png`;
    const filepath = path.join(OUTPUT_DIR, filename);

    await downloadImage(imageUrl, filepath);
    console.log(`   💾 Saved: ${filename}`);

    return {
      campaign_id: campaign.id,
      filename,
      filepath,
      url: imageUrl,
      theme: campaign.theme,
      month: campaign.month,
      week: campaign.week
    };

  } catch (error) {
    console.error(`   ❌ Error generating campaign ${campaign.id}:`, error.message);
    return {
      campaign_id: campaign.id,
      error: error.message,
      theme: campaign.theme
    };
  }
}

/**
 * Main execution
 */
async function main() {
  console.log('🚀 Mister DJ - 2026 Campaign Banner Generator');
  console.log('=' * 60);
  console.log(`📂 Output directory: ${OUTPUT_DIR}`);
  console.log(`🔑 Replicate API Key: ${REPLICATE_API_KEY.substring(0, 10)}...`);
  console.log('');

  // Load content plan
  const contentPlan = JSON.parse(fs.readFileSync(CONTENT_PLAN_PATH, 'utf8'));
  const campaigns = contentPlan.campaigns;

  console.log(`📅 Total campaigns to generate: ${campaigns.length}`);
  console.log(`⏱️  Estimated time: ${Math.ceil(campaigns.length * 15 / 60)} minutes (15s per image)`);
  console.log('');

  const results = [];
  const startTime = Date.now();

  // Process campaigns in batches to avoid rate limiting
  const BATCH_SIZE = 5;
  for (let i = 0; i < campaigns.length; i += BATCH_SIZE) {
    const batch = campaigns.slice(i, Math.min(i + BATCH_SIZE, campaigns.length));

    console.log(`\n📦 Processing batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(campaigns.length / BATCH_SIZE)}`);

    const batchResults = await Promise.all(
      batch.map((campaign, batchIndex) =>
        generateCampaignBanner(campaign, i + batchIndex + 1, campaigns.length)
      )
    );

    results.push(...batchResults);

    // Small delay between batches to avoid rate limiting
    if (i + BATCH_SIZE < campaigns.length) {
      console.log('\n   ⏸️  Waiting 10s before next batch...');
      await new Promise(resolve => setTimeout(resolve, 10000));
    }
  }

  const endTime = Date.now();
  const duration = Math.ceil((endTime - startTime) / 1000);

  // Generate report
  const successCount = results.filter(r => !r.error).length;
  const errorCount = results.filter(r => r.error).length;

  console.log('\n' + '='.repeat(60));
  console.log('📊 GENERATION COMPLETE');
  console.log('=' * 60);
  console.log(`✅ Successful: ${successCount}/${campaigns.length}`);
  console.log(`❌ Failed: ${errorCount}/${campaigns.length}`);
  console.log(`⏱️  Total time: ${duration}s (${Math.ceil(duration / 60)} minutes)`);
  console.log(`📂 Output: ${OUTPUT_DIR}`);

  // Save manifest
  const manifest = {
    generated_at: new Date().toISOString(),
    total_campaigns: campaigns.length,
    successful: successCount,
    failed: errorCount,
    duration_seconds: duration,
    results: results
  };

  const manifestPath = path.join(OUTPUT_DIR, 'generation-manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(`📄 Manifest saved: ${manifestPath}`);

  if (errorCount > 0) {
    console.log('\n⚠️  Some campaigns failed. Check the manifest for details.');
    console.log('   You can re-run this script to retry failed campaigns.');
  }

  console.log('\n✨ All done! Your 2026 campaign banners are ready to post!');
}

// Run if called directly
if (require.main === module) {
  main().catch(error => {
    console.error('\n❌ Fatal error:', error);
    process.exit(1);
  });
}

module.exports = { generateCampaignBanner };
