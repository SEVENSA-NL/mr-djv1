#!/usr/bin/env node

/**
 * Generate sitemap.xml for Vite/React static build
 * Includes all core pages, service pages, and 100 city pages
 */

const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://mr-dj.sevensa.nl';
const OUTPUT_PATH = path.join(__dirname, '../public/sitemap.xml');
const REGIONS_PATH = path.join(__dirname, '../content/regions.json');

// Load city data
const regions = JSON.parse(fs.readFileSync(REGIONS_PATH, 'utf8'));
const cities = regions.cities || [];

console.log(`🗺️  Generating sitemap for ${SITE_URL}`);
console.log(`📍 Found ${cities.length} cities in regions.json`);

// Get current date in ISO format
const lastmod = new Date().toISOString().split('T')[0];

// Core pages with priorities
const corePages = [
  { url: '/', changefreq: 'weekly', priority: '1.0' },
  { url: '/diensten', changefreq: 'monthly', priority: '0.9' },
  { url: '/pakketten', changefreq: 'monthly', priority: '0.9' },
  { url: '/contact', changefreq: 'monthly', priority: '0.8' },
];

// Service pages (high priority - newly optimized)
const servicePages = [
  { url: '/diensten/bruiloft-dj', changefreq: 'weekly', priority: '0.95' },
  { url: '/diensten/bedrijfsfeest-dj', changefreq: 'weekly', priority: '0.95' },
  { url: '/diensten/feest-dj', changefreq: 'weekly', priority: '0.95' },
];

// Generate city pages
const cityPages = cities.map(city => ({
  url: `/regio/${city.slug}`,
  changefreq: 'monthly',
  priority: '0.7'
}));

// Combine all pages
const allPages = [...corePages, ...servicePages, ...cityPages];

// Generate XML
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${SITE_URL}${page.url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

// Write sitemap
fs.writeFileSync(OUTPUT_PATH, xml, 'utf8');

console.log(`✅ Generated sitemap with ${allPages.length} URLs`);
console.log(`   - Core pages: ${corePages.length}`);
console.log(`   - Service pages: ${servicePages.length}`);
console.log(`   - City pages: ${cityPages.length}`);
console.log(`📄 Saved to: ${OUTPUT_PATH}`);

// Generate summary report
const report = {
  generated_at: new Date().toISOString(),
  site_url: SITE_URL,
  total_urls: allPages.length,
  breakdown: {
    core: corePages.length,
    services: servicePages.length,
    cities: cityPages.length
  },
  sample_urls: allPages.slice(0, 10).map(p => `${SITE_URL}${p.url}`)
};

const reportPath = path.join(__dirname, '../public/sitemap-report.json');
fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf8');

console.log(`📊 Report saved to: ${reportPath}`);
console.log('');
console.log('🎯 Next steps:');
console.log('   1. Run: npm run build');
console.log('   2. Verify sitemap at: /sitemap.xml');
console.log('   3. Submit to Google: https://www.google.com/ping?sitemap=' + SITE_URL + '/sitemap.xml');
console.log('   4. Submit to Bing: https://www.bing.com/ping?sitemap=' + SITE_URL + '/sitemap.xml');
