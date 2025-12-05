#!/bin/bash

##
# Submit Sitemap to Google and Bing Search Engines
#
# This script pings Google and Bing to notify them of sitemap updates
##

SITE_URL="https://mr-dj.sevensa.nl"
SITEMAP_URL="${SITE_URL}/sitemap.xml"

echo "🗺️  Submitting sitemap to search engines..."
echo "Sitemap: $SITEMAP_URL"
echo ""

# Submit to Google
echo "📍 Submitting to Google..."
GOOGLE_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" \
  "https://www.google.com/ping?sitemap=${SITEMAP_URL}")

if [ "$GOOGLE_RESPONSE" = "200" ]; then
  echo "✅ Google: Successfully notified (HTTP $GOOGLE_RESPONSE)"
else
  echo "⚠️  Google: Response code $GOOGLE_RESPONSE"
fi

# Submit to Bing
echo "📍 Submitting to Bing..."
BING_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" \
  "https://www.bing.com/ping?sitemap=${SITEMAP_URL}")

if [ "$BING_RESPONSE" = "200" ]; then
  echo "✅ Bing: Successfully notified (HTTP $BING_RESPONSE)"
else
  echo "⚠️  Bing: Response code $BING_RESPONSE"
fi

echo ""
echo "✨ Sitemap submission complete!"
echo ""
echo "📊 Next steps:"
echo "1. Verify in Google Search Console: https://search.google.com/search-console"
echo "2. Verify in Bing Webmaster Tools: https://www.bing.com/webmasters"
echo ""
echo "📈 Sitemap includes:"
echo "   - 7 core pages (home, services, packages, contact)"
echo "   - 3 optimized service pages (bruiloft, bedrijfsfeest, feest)"
echo "   - 100 local SEO pages (cities across Netherlands)"
echo "   - Total: 107 URLs"
echo ""
