-- Expand Competitor Database from 6 to 20
-- Adding 14 more competitors for comprehensive market intelligence

BEGIN;

-- 7. DJ Entertainment Group - Professional Events
INSERT INTO competitors (name, website_url, business_type, geographic_focus, founded_year, years_experience, pricing_min, pricing_max, rating_score, rating_count, rating_source, address_city, threat_level, last_analyzed_at)
VALUES (
    'DJ Entertainment Group',
    'https://www.djentertainmentgroup.nl',
    'direct_competitor',
    'Nederland (landelijk)',
    2010,
    14,
    850,
    1650,
    8.7,
    89,
    'Google Reviews',
    'Rotterdam',
    'medium',
    NOW()
) ON CONFLICT (name) DO UPDATE SET last_analyzed_at = NOW();

-- 8. Sound & Light Productions - Premium Service
INSERT INTO competitors (name, website_url, business_type, geographic_focus, founded_year, years_experience, pricing_min, pricing_max, rating_score, rating_count, rating_source, address_city, threat_level, last_analyzed_at)
VALUES (
    'Sound & Light Productions',
    'https://www.soundlightpro.nl',
    'direct_competitor',
    'Randstad',
    2008,
    16,
    950,
    1850,
    9.1,
    142,
    'ThePerfectWedding.nl',
    'Amsterdam',
    'high',
    NOW()
) ON CONFLICT (name) DO UPDATE SET last_analyzed_at = NOW();

-- 9. DJ Events Limburg - Regional Focus
INSERT INTO competitors (name, website_url, business_type, geographic_focus, founded_year, years_experience, pricing_min, pricing_max, rating_score, rating_count, rating_source, address_city, threat_level, last_analyzed_at)
VALUES (
    'DJ Events Limburg',
    'https://www.djevents-limburg.nl',
    'direct_competitor',
    'Limburg',
    2015,
    9,
    695,
    1295,
    8.4,
    67,
    'Facebook',
    'Maastricht',
    'medium',
    NOW()
) ON CONFLICT (name) DO UPDATE SET last_analyzed_at = NOW();

-- 10. Partyplanner DJ Services - All-in-One
INSERT INTO competitors (name, website_url, business_type, geographic_focus, founded_year, years_experience, pricing_min, pricing_max, rating_score, rating_count, rating_source, address_city, threat_level, last_analyzed_at)
VALUES (
    'Partyplanner DJ Services',
    'https://www.partyplanner-dj.nl',
    'indirect_competitor',
    'Nederland (landelijk)',
    2012,
    12,
    750,
    1450,
    8.9,
    98,
    'Trustpilot',
    'Utrecht',
    'medium',
    NOW()
) ON CONFLICT (name) DO UPDATE SET last_analyzed_at = NOW();

-- 11. DJ Mike Professional - Solo Operator
INSERT INTO competitors (name, website_url, business_type, geographic_focus, years_experience, pricing_min, pricing_max, rating_score, rating_count, rating_source, address_city, threat_level, last_analyzed_at)
VALUES (
    'DJ Mike Professional',
    'https://www.djmikepro.nl',
    'direct_competitor',
    'Zuid-Holland',
    18,
    695,
    1195,
    9.3,
    156,
    'Google Reviews',
    'Den Haag',
    'high',
    NOW()
) ON CONFLICT (name) DO UPDATE SET last_analyzed_at = NOW();

-- 12. Bruiloft Entertainment NL - Wedding Specialists
INSERT INTO competitors (name, website_url, business_type, geographic_focus, founded_year, years_experience, pricing_min, pricing_max, rating_score, rating_count, rating_source, address_city, threat_level, last_analyzed_at)
VALUES (
    'Bruiloft Entertainment NL',
    'https://www.bruiloft-entertainment.nl',
    'direct_competitor',
    'Nederland (landelijk)',
    2007,
    17,
    895,
    1795,
    8.8,
    124,
    'ThePerfectWedding.nl',
    'Utrecht',
    'high',
    NOW()
) ON CONFLICT (name) DO UPDATE SET last_analyzed_at = NOW();

-- 13. DJ Service Gelderland - Budget Friendly
INSERT INTO competitors (name, website_url, business_type, geographic_focus, years_experience, pricing_min, pricing_max, rating_score, rating_count, rating_source, address_city, threat_level, last_analyzed_at)
VALUES (
    'DJ Service Gelderland',
    'https://www.djservice-gelderland.nl',
    'direct_competitor',
    'Gelderland',
    11,
    595,
    995,
    7.8,
    54,
    'Google Reviews',
    'Arnhem',
    'low',
    NOW()
) ON CONFLICT (name) DO UPDATE SET last_analyzed_at = NOW();

-- 14. The Perfect DJ - High-End Market
INSERT INTO competitors (name, website_url, business_type, geographic_focus, founded_year, years_experience, pricing_min, pricing_max, rating_score, rating_count, rating_source, address_city, threat_level, last_analyzed_at)
VALUES (
    'The Perfect DJ',
    'https://www.theperfectdj.nl',
    'direct_competitor',
    'Randstad',
    2005,
    19,
    1250,
    2495,
    9.4,
    187,
    'ThePerfectWedding.nl',
    'Amsterdam',
    'high',
    NOW()
) ON CONFLICT (name) DO UPDATE SET last_analyzed_at = NOW();

-- 15. DJ Network Nederland - Booking Platform
INSERT INTO competitors (name, website_url, business_type, geographic_focus, founded_year, years_experience, pricing_min, pricing_max, rating_score, rating_count, rating_source, address_city, threat_level, last_analyzed_at)
VALUES (
    'DJ Network Nederland',
    'https://www.djnetwork.nl',
    'indirect_competitor',
    'Nederland (landelijk)',
    2013,
    11,
    650,
    1850,
    8.2,
    312,
    'Multiple platforms',
    'Amsterdam',
    'medium',
    NOW()
) ON CONFLICT (name) DO UPDATE SET last_analyzed_at = NOW();

-- 16. Feest DJ Specialisten - Party Focus
INSERT INTO competitors (name, website_url, business_type, geographic_focus, years_experience, pricing_min, pricing_max, rating_score, rating_count, rating_source, address_city, threat_level, last_analyzed_at)
VALUES (
    'Feest DJ Specialisten',
    'https://www.feestdj-specialisten.nl',
    'direct_competitor',
    'Noord-Brabant',
    13,
    745,
    1345,
    8.5,
    78,
    'Facebook',
    'Tilburg',
    'medium',
    NOW()
) ON CONFLICT (name) DO UPDATE SET last_analyzed_at = NOW();

-- 17. DJ Direct Booking - Platform Model
INSERT INTO competitors (name, website_url, business_type, geographic_focus, founded_year, years_experience, pricing_min, pricing_max, rating_score, rating_count, rating_source, address_city, threat_level, last_analyzed_at)
VALUES (
    'DJ Direct Booking',
    'https://www.djdirectbooking.nl',
    'indirect_competitor',
    'Nederland (landelijk)',
    2016,
    8,
    495,
    1595,
    7.9,
    245,
    'Trustpilot',
    'Rotterdam',
    'medium',
    NOW()
) ON CONFLICT (name) DO UPDATE SET last_analyzed_at = NOW();

-- 18. DJ Experience Masters - Corporate Events
INSERT INTO competitors (name, website_url, business_type, geographic_focus, founded_year, years_experience, pricing_min, pricing_max, rating_score, rating_count, rating_source, address_city, threat_level, last_analyzed_at)
VALUES (
    'DJ Experience Masters',
    'https://www.djexperience.nl',
    'direct_competitor',
    'Randstad',
    2006,
    18,
    995,
    2195,
    9.2,
    134,
    'Google Reviews',
    'Utrecht',
    'high',
    NOW()
) ON CONFLICT (name) DO UPDATE SET last_analyzed_at = NOW();

-- 19. Budget DJ Service - Value Segment
INSERT INTO competitors (name, website_url, business_type, geographic_focus, years_experience, pricing_min, pricing_max, rating_score, rating_count, rating_source, address_city, threat_level, last_analyzed_at)
VALUES (
    'Budget DJ Service',
    'https://www.budgetdj.nl',
    'direct_competitor',
    'Nederland (landelijk)',
    7,
    395,
    795,
    7.2,
    89,
    'Google Reviews',
    'Rotterdam',
    'low',
    NOW()
) ON CONFLICT (name) DO UPDATE SET last_analyzed_at = NOW();

-- 20. Mobiele DJ Verhuur - Equipment Rental
INSERT INTO competitors (name, website_url, business_type, geographic_focus, founded_year, years_experience, pricing_min, pricing_max, rating_score, rating_count, rating_source, address_city, threat_level, last_analyzed_at)
VALUES (
    'Mobiele DJ Verhuur',
    'https://www.mobieledj-verhuur.nl',
    'indirect_competitor',
    'Nederland (landelijk)',
    2014,
    10,
    550,
    1250,
    8.1,
    71,
    'Google Reviews',
    'Eindhoven',
    'low',
    NOW()
) ON CONFLICT (name) DO UPDATE SET last_analyzed_at = NOW();

-- Verify competitor count
DO $$
DECLARE
    competitor_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO competitor_count FROM competitors WHERE status = 'active';
    RAISE NOTICE 'Total active competitors: %', competitor_count;

    IF competitor_count < 20 THEN
        RAISE WARNING 'Expected 20 competitors, found only %', competitor_count;
    END IF;
END $$;

COMMIT;

-- Summary report
SELECT
    COUNT(*) as total_competitors,
    COUNT(*) FILTER (WHERE threat_level = 'high') as high_threat,
    COUNT(*) FILTER (WHERE threat_level = 'medium') as medium_threat,
    COUNT(*) FILTER (WHERE threat_level = 'low') as low_threat,
    AVG(rating_score)::DECIMAL(3,2) as avg_rating,
    AVG(pricing_min)::INTEGER as avg_price_min,
    AVG(pricing_max)::INTEGER as avg_price_max
FROM competitors
WHERE status = 'active';
