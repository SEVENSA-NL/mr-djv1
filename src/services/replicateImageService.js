/**
 * Replicate Image Generation Service
 * Generates high-converting DJ event images using Replicate's FLUX model
 */

const axios = require('axios');
const { logger } = require('../lib/logger');

class ReplicateImageService {
  constructor() {
    this.apiKey = process.env.REPLICATE_API_KEY;
    this.baseURL = 'https://api.replicate.com/v1';

    if (!this.apiKey) {
      logger.warn('[ReplicateImage] No API key configured - service disabled');
      this.enabled = false;
    } else {
      this.enabled = true;
      logger.info('[ReplicateImage] Service initialized');
    }
  }

  /**
   * Generate a single image using FLUX model
   */
  async generateImage(prompt, options = {}) {
    if (!this.enabled) {
      logger.error('[ReplicateImage] Service disabled - no API key');
      return { success: false, error: 'Service not configured' };
    }

    try {
      logger.info(`[ReplicateImage] Generating image: ${prompt.substring(0, 50)}...`);

      // Start prediction with FLUX Schnell (fast, high quality)
      const prediction = await axios.post(
        `${this.baseURL}/predictions`,
        {
          version: 'black-forest-labs/flux-schnell:bf60f5c9c78c2b5b54f87b02d52a4d3e82bb39e49adfd5b2f5b6a1c14b2e7ad6',
          input: {
            prompt: prompt,
            num_outputs: options.numOutputs || 1,
            aspect_ratio: options.aspectRatio || '16:9',
            output_format: 'jpg',
            output_quality: 90,
            num_inference_steps: options.steps || 4 // Fast generation
          }
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          },
          timeout: 10000
        }
      );

      const predictionId = prediction.data.id;
      logger.info(`[ReplicateImage] Prediction started: ${predictionId}`);

      // Poll for completion
      const result = await this.pollPrediction(predictionId);

      if (result.status === 'succeeded') {
        return {
          success: true,
          predictionId,
          imageUrl: result.output[0],
          prompt: prompt
        };
      } else {
        return {
          success: false,
          error: `Generation failed: ${result.status}`,
          predictionId
        };
      }
    } catch (error) {
      logger.error('[ReplicateImage] Generation failed:', {
        error: error.message,
        response: error.response?.data
      });

      return {
        success: false,
        error: error.message,
        details: error.response?.data
      };
    }
  }

  /**
   * Poll prediction status until complete
   */
  async pollPrediction(predictionId, maxAttempts = 30) {
    for (let i = 0; i < maxAttempts; i++) {
      const response = await axios.get(
        `${this.baseURL}/predictions/${predictionId}`,
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`
          }
        }
      );

      const status = response.data.status;

      if (status === 'succeeded' || status === 'failed' || status === 'canceled') {
        return response.data;
      }

      // Wait 2 seconds between polls
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    throw new Error('Prediction timed out');
  }

  /**
   * Generate images for Wedding DJ service
   */
  async generateWeddingDJImages() {
    const prompts = [
      "Professional DJ setup at an elegant wedding reception, white and gold decor, uplighting, romantic atmosphere, soft focus, high-end event photography style",
      "DJ mixing at luxurious wedding, bride and groom dancing in foreground, purple uplighting, modern DJ equipment, professional event photography",
      "Wedding dance floor filled with guests dancing, professional DJ booth with Mr-DJ branding, warm golden lighting, joyful atmosphere",
      "Elegant wedding ceremony transitioning to reception, DJ setup with subtle lighting, sophisticated venue, professional photography",
      "First dance at wedding with DJ in background, romantic lighting, elegant venue, professional event capture",
      "DJ headphones closeup at wedding, mixer controls, elegant wedding venue background, professional equipment",
      "Outdoor wedding reception at sunset, DJ booth setup, string lights, romantic atmosphere, golden hour photography",
      "Wedding guests celebrating on dance floor, professional DJ equipment visible, dynamic lighting, joy and energy",
      "Bride tossing bouquet with DJ and lighting setup in background, modern wedding venue, professional capture",
      "Wedding cocktail hour with background DJ setup, elegant venue, sophisticated lighting, luxury event photography"
    ];

    return await this.generateBatch(prompts, 'wedding-dj');
  }

  /**
   * Generate images for Corporate Event DJ service
   */
  async generateCorporateEventImages() {
    const prompts = [
      "Professional DJ at corporate event, business people networking, modern conference center, blue and white lighting, professional photography",
      "DJ booth at company party, employees dancing, branded corporate event, energetic atmosphere, modern venue",
      "Corporate awards ceremony with DJ and lighting, elegant ballroom, professional event setup, sophisticated atmosphere",
      "Business conference after-party, DJ mixing, networking crowd, modern urban venue, professional event photography",
      "Corporate team building event, DJ entertainment, outdoor venue, professional setup, engaged employees",
      "Product launch party with DJ, corporate branding visible, modern venue, professional lighting and setup",
      "Company anniversary celebration, DJ equipment setup, employees celebrating, elegant venue, professional capture",
      "Corporate gala dinner with DJ booth, formal attire, luxury venue, sophisticated lighting and atmosphere",
      "Tech company party, DJ with modern equipment, casual atmosphere, creative venue, energetic vibe",
      "Corporate holiday party, DJ setup with festive lighting, celebrating employees, professional venue"
    ];

    return await this.generateBatch(prompts, 'corporate-event');
  }

  /**
   * Generate images for Party/Festival DJ service
   */
  async generatePartyDJImages() {
    const prompts = [
      "Energetic DJ at private party, crowd dancing with hands up, colorful lighting, nightclub atmosphere, dynamic photography",
      "Birthday party DJ setup, guests celebrating, balloon decorations, modern venue, fun atmosphere",
      "DJ performing at outdoor festival, sunset background, crowd silhouettes, festival lighting, professional capture",
      "House party DJ setup, intimate venue, colorful LED lights, dancing guests, energetic atmosphere",
      "DJ mixing at nightclub-style party, laser lights, smoke effects, dancing crowd, dynamic photography",
      "Anniversary party with DJ, elegant venue, mixed age crowd dancing, professional lighting setup",
      "Graduation party DJ, young adults celebrating, modern venue, energetic atmosphere, professional photography",
      "Pool party DJ setup, outdoor venue, summer vibes, guests dancing, festive atmosphere",
      "New Year's Eve party DJ, countdown moment, confetti, celebrating crowd, dynamic lighting",
      "Private event DJ, rooftop venue, city skyline background, sunset lighting, sophisticated party atmosphere"
    ];

    return await this.generateBatch(prompts, 'party-dj');
  }

  /**
   * Generate images for Blog/Homepage/General use
   */
  async generateGeneralMarketingImages() {
    const prompts = [
      "Professional DJ equipment close-up, high-end CDJ players and mixer, studio lighting, commercial photography style",
      "DJ hands on mixer controls, bokeh background, professional equipment, artistic photography",
      "Modern DJ booth setup, LED screens, professional lighting rig, clean commercial photography",
      "DJ preparing for event, checking equipment, professional venue, behind-the-scenes style",
      "Aerial view of DJ booth at large event, crowd below, professional lighting design, epic scale",
      "DJ equipment and laptop setup, music production software visible, professional studio lighting",
      "Sound check before event, DJ testing equipment, empty venue, professional preparation",
      "DJ at sunset outdoor event, silhouette against golden sky, romantic atmosphere, artistic capture",
      "Professional DJ portrait with equipment, confident pose, studio lighting, commercial photography",
      "DJ equipment with Mr-DJ branding, professional setup, clean commercial product photography"
    ];

    return await this.generateBatch(prompts, 'general-marketing');
  }

  /**
   * Generate a batch of images with progress tracking
   */
  async generateBatch(prompts, category) {
    const results = [];

    logger.info(`[ReplicateImage] Starting batch generation: ${category} (${prompts.length} images)`);

    for (let i = 0; i < prompts.length; i++) {
      const prompt = prompts[i];
      logger.info(`[ReplicateImage] Generating ${category} image ${i + 1}/${prompts.length}`);

      const result = await this.generateImage(prompt, {
        aspectRatio: '16:9',
        steps: 4
      });

      results.push({
        category,
        index: i + 1,
        prompt,
        ...result
      });

      // Rate limiting: wait 1 second between requests
      if (i < prompts.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    const successful = results.filter(r => r.success).length;
    logger.info(`[ReplicateImage] Batch complete: ${successful}/${prompts.length} successful`);

    return {
      category,
      total: prompts.length,
      successful,
      results
    };
  }

  /**
   * Generate all 40 images for Mr-DJ services
   */
  async generateAllImages() {
    logger.info('[ReplicateImage] Starting full image generation suite (40 images)');

    const startTime = Date.now();

    const results = {
      timestamp: new Date(),
      categories: {}
    };

    // Generate all categories
    results.categories.weddingDJ = await this.generateWeddingDJImages();
    results.categories.corporateEvent = await this.generateCorporateEventImages();
    results.categories.partyDJ = await this.generatePartyDJImages();
    results.categories.generalMarketing = await this.generateGeneralMarketingImages();

    const duration = Date.now() - startTime;
    const totalSuccessful = Object.values(results.categories)
      .reduce((sum, cat) => sum + cat.successful, 0);

    results.summary = {
      totalImages: 40,
      successful: totalSuccessful,
      failed: 40 - totalSuccessful,
      durationMs: duration,
      durationMinutes: (duration / 60000).toFixed(2)
    };

    logger.info(`[ReplicateImage] All images generated: ${totalSuccessful}/40 successful in ${results.summary.durationMinutes} minutes`);

    return results;
  }

  /**
   * Download image from URL to local storage
   */
  async downloadImage(imageUrl, outputPath) {
    try {
      const response = await axios.get(imageUrl, {
        responseType: 'arraybuffer',
        timeout: 30000
      });

      const fs = require('fs');
      fs.writeFileSync(outputPath, response.data);

      return { success: true, path: outputPath };
    } catch (error) {
      logger.error('[ReplicateImage] Download failed:', error.message);
      return { success: false, error: error.message };
    }
  }
}

module.exports = new ReplicateImageService();
