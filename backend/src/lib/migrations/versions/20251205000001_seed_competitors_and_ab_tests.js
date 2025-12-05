exports.up = async (knex) => {
  // ========================================
  // SEED COMPETITORS (Based on status-and-competitor-report-2025-10-17.md)
  // ========================================

  const competitors = [
    {
      name: 'DJ Company NL',
      slug: 'dj-company-nl',
      website_url: 'https://djcompany.nl',
      overall_score: 17,
      social_proof_score: 4,
      pricing_transparency_score: 5,
      video_content_score: 5,
      trust_signals_score: 3,
      strengths: JSON.stringify([
        'Strong local landing pages with video heroes',
        'Real-time price indications',
        'Excellent visual content',
        'Clear service differentiation'
      ]),
      weaknesses: JSON.stringify([
        'Missing deep persona stories',
        'Limited automation',
        'No interactive calculators',
        'Basic consent management'
      ]),
      learnings: JSON.stringify([
        'Introduce video hero variant',
        'Add price estimator widget for corporate leads',
        'Enhance local landing pages with video content'
      ]),
      last_analyzed_at: '2025-12-05',
      active: true
    },
    {
      name: 'Skyline Events',
      slug: 'skyline-events',
      website_url: 'https://skylineevents.nl',
      overall_score: 16,
      social_proof_score: 4,
      pricing_transparency_score: 5,
      video_content_score: 3,
      trust_signals_score: 4,
      strengths: JSON.stringify([
        'Transparent package comparator',
        'ROI calculator functionality',
        'Client portal demo available',
        'Strong trust signals (guarantees)'
      ]),
      weaknesses: JSON.stringify([
        'Less emphasis on personalization',
        'Basic cookie consent',
        'No real-time availability',
        'Limited video testimonials'
      ]),
      learnings: JSON.stringify([
        'Add interactive ROI calculator to pricing tables',
        'Link calculator to Config Dashboard for experiments',
        'Emphasize guarantee prominently'
      ]),
      last_analyzed_at: '2025-12-05',
      active: true
    },
    {
      name: 'Swinging.nl',
      slug: 'swinging-nl',
      website_url: 'https://swinging.nl',
      overall_score: 18,
      social_proof_score: 5,
      pricing_transparency_score: 4,
      video_content_score: 4,
      trust_signals_score: 5,
      strengths: JSON.stringify([
        'Extensive event journal + cases per industry',
        'Intensive retargeting flows',
        'Strong brand recognition',
        'Comprehensive content hub'
      ]),
      weaknesses: JSON.stringify([
        'Complex consent/onboarding',
        'No real-time availability',
        'Overwhelming content structure',
        'Slow page load times'
      ]),
      learnings: JSON.stringify([
        'Extend AvailabilityChecker with agenda sync',
        'Build content hub module',
        'Implement progressive profiling',
        'Industry-specific case studies'
      ]),
      last_analyzed_at: '2025-12-05',
      active: true
    },
    {
      name: 'La Vida Entertainment',
      slug: 'la-vida',
      website_url: 'https://lavidaent.nl',
      overall_score: 19,
      social_proof_score: 5,
      pricing_transparency_score: 4,
      video_content_score: 5,
      trust_signals_score: 5,
      strengths: JSON.stringify([
        'Extensive testimonials (claims 15,000+ guests)',
        'Strong social proof volume',
        'Professional video production',
        'Multiple trust signals'
      ]),
      weaknesses: JSON.stringify([
        'Pricing less transparent',
        'No interactive calculators',
        'Limited package comparisons'
      ]),
      learnings: JSON.stringify([
        'Increase testimonial volume significantly',
        'Add guest count claims',
        'Produce more video testimonials'
      ]),
      last_analyzed_at: '2025-12-05',
      active: true
    },
    {
      name: 'De Zingende DJ',
      slug: 'de-zingende-dj',
      website_url: 'https://dezingendedj.nl',
      overall_score: 18,
      social_proof_score: 5,
      pricing_transparency_score: 3,
      video_content_score: 5,
      trust_signals_score: 5,
      strengths: JSON.stringify([
        '22 video testimonials (highest in market)',
        'Unique selling proposition (singing DJ)',
        'Emotional engagement through video',
        'Authenticity proof'
      ]),
      weaknesses: JSON.stringify([
        'Less transparent pricing',
        'No package comparators',
        'Limited automation',
        'Niche positioning limits scale'
      ]),
      learnings: JSON.stringify([
        'Produce extensive video testimonial library',
        'Prioritize video over text testimonials',
        'Use video for emotional connection'
      ]),
      last_analyzed_at: '2025-12-05',
      active: true
    },
    {
      name: 'SKYFLY Entertainment',
      slug: 'skyfly',
      website_url: 'https://skyfly.nl',
      overall_score: 17,
      social_proof_score: 5,
      pricing_transparency_score: 4,
      video_content_score: 4,
      trust_signals_score: 4,
      strengths: JSON.stringify([
        '100% dansgarantie prominent',
        '99.3% recommendation rate displayed',
        'Strong guarantee messaging',
        'Professional presentation'
      ]),
      weaknesses: JSON.stringify([
        'Limited interactive elements',
        'No calculators or tools',
        'Basic personalization'
      ]),
      learnings: JSON.stringify([
        'Make guarantees more prominent',
        'Add percentage-based trust signals',
        'Create dedicated guarantee section'
      ]),
      last_analyzed_at: '2025-12-05',
      active: true
    }
  ];

  for (const competitor of competitors) {
    await knex('competitors').insert(competitor).onConflict('slug').ignore();
  }

  console.log(`✅ Seeded ${competitors.length} competitors`);

  // ========================================
  // SEED AB TESTS (Based on AB_TESTING_CONTENT_FRAMEWORK.md)
  // ========================================

  const abTests = [
    // TIER 1: CRITICAL TESTS (Q1 2026)
    {
      test_key: 'social_proof_volume',
      test_name: 'Social Proof Volume',
      hypothesis: 'More testimonials = higher trust = higher conversion',
      description: 'Test different volumes of testimonials to determine optimal trust-building quantity',
      gap_addressed: 'Mr. DJ ranks #6 in social proof (13/20 vs leaders\' 20/20)',
      tier: 1,
      priority_order: 1,
      effort_level: 'low',
      expected_lift_min: 12,
      expected_lift_max: 22,
      min_sample_size: 1200,
      estimated_duration_days: 75,
      primary_metric: 'lead_submitted',
      secondary_metrics: JSON.stringify(['time_on_page', 'scroll_depth', 'testimonial_clicks']),
      status: 'ready',
      posthog_flag_key: 'social_proof_volume',
      quarter: 'Q1 2026',
      risk_level: 1,
      implementation_cost: 0,
      competitor_insights: JSON.stringify(['La Vida: 15,000+ guests claim', 'SKYFLY: 99.3% recommend']),
      implementation_notes: 'Variant A: 3 testimonials (control), Variant B: 6 testimonials, Variant C: 10 testimonials + Google Reviews widget'
    },
    {
      test_key: 'video_testimonials',
      test_name: 'Video Testimonials',
      hypothesis: 'Video testimonials > text testimonials for trust-building',
      description: 'Test video vs text testimonials for emotional engagement and authenticity proof',
      gap_addressed: 'De Zingende DJ has 22 video testimonials, Mr. DJ has 0',
      tier: 1,
      priority_order: 2,
      effort_level: 'medium',
      expected_lift_min: 10,
      expected_lift_max: 20,
      min_sample_size: 1000,
      estimated_duration_days: 60,
      primary_metric: 'lead_submitted',
      secondary_metrics: JSON.stringify(['video_play_rate', 'video_completion_rate', 'time_watching_video']),
      status: 'ready',
      posthog_flag_key: 'video_testimonials',
      quarter: 'Q1 2026',
      risk_level: 2,
      implementation_cost: 2000.00,
      competitor_insights: JSON.stringify(['De Zingende DJ: 22 video testimonials', 'La Vida: Professional video production']),
      implementation_notes: 'Variant A: Text only, Variant B: 1 video (hero), Variant C: 3 videos (section), Variant D: Video+text hybrid'
    },
    {
      test_key: 'guarantee_prominence',
      test_name: 'Guarantee Prominence',
      hypothesis: 'More prominent guarantee = lower perceived risk = higher conversion',
      description: 'Test different levels of guarantee visibility and detail',
      gap_addressed: 'SKYFLY emphasizes "100% dansgarantie" + "99.3% recommend"',
      tier: 1,
      priority_order: 3,
      effort_level: 'low',
      expected_lift_min: 8,
      expected_lift_max: 15,
      min_sample_size: 800,
      estimated_duration_days: 50,
      primary_metric: 'lead_submitted',
      secondary_metrics: JSON.stringify(['scroll_to_guarantee', 'time_on_guarantee', 'faq_clicks_guarantee']),
      status: 'ready',
      posthog_flag_key: 'guarantee_prominence',
      quarter: 'Q1 2026',
      risk_level: 1,
      implementation_cost: 0,
      competitor_insights: JSON.stringify(['SKYFLY: 100% dansgarantie + 99.3% recommend prominent', 'Strong guarantees reduce perceived risk']),
      implementation_notes: 'Variant A: USP card only, Variant B: Badge in hero + USP, Variant C: Dedicated guarantee section with seal, Variant D: Money-back guarantee details'
    },
    {
      test_key: 'pricing_display_format',
      test_name: 'Pricing Display Format',
      hypothesis: 'Interactive pricing = higher engagement = higher conversion',
      description: 'Test different pricing presentation formats for engagement optimization',
      gap_addressed: 'Mr. DJ leads on pricing transparency (#1), but format can be optimized',
      tier: 1,
      priority_order: 4,
      effort_level: 'medium',
      expected_lift_min: 10,
      expected_lift_max: 18,
      min_sample_size: 1000,
      estimated_duration_days: 60,
      primary_metric: 'package_selected',
      secondary_metrics: JSON.stringify(['calculator_interactions', 'time_on_pricing', 'price_reveal_clicks']),
      status: 'ready',
      posthog_flag_key: 'pricing_display_format',
      quarter: 'Q1 2026',
      risk_level: 2,
      implementation_cost: 1500.00,
      competitor_insights: JSON.stringify(['Skyline Events: ROI calculator', 'Interactive elements increase engagement']),
      implementation_notes: 'Variant A: Table with 3 packages, Variant B: Comparison matrix with checkmarks, Variant C: Interactive calculator, Variant D: Price slider'
    },
    {
      test_key: 'cta_button_text',
      test_name: 'CTA Button Text',
      hypothesis: 'Action-oriented CTAs > generic CTAs for conversion',
      description: 'Test different CTA microcopy for urgency and action',
      gap_addressed: 'Generic CTAs underperform vs action-specific messaging',
      tier: 1,
      priority_order: 5,
      effort_level: 'low',
      expected_lift_min: 5,
      expected_lift_max: 12,
      min_sample_size: 600,
      estimated_duration_days: 40,
      primary_metric: 'cta_clicked',
      secondary_metrics: JSON.stringify(['lead_submitted', 'cta_hover_time', 'page_exit_after_cta']),
      status: 'ready',
      posthog_flag_key: 'cta_button_text',
      quarter: 'Q1 2026',
      risk_level: 1,
      implementation_cost: 0,
      competitor_insights: JSON.stringify(['Action-specific CTAs perform better across competitors']),
      implementation_notes: 'Variant A: "Bekijk pakketten", Variant B: "Plan gratis gesprek", Variant C: "Vraag offerte aan", Variant D: "Check beschikbaarheid"'
    },
    {
      test_key: 'faq_positioning',
      test_name: 'FAQ Positioning',
      hypothesis: 'Early FAQ placement reduces objections and increases conversion',
      description: 'Test FAQ section positioning for objection handling',
      gap_addressed: 'FAQs buried at bottom miss early-stage objection handling opportunity',
      tier: 1,
      priority_order: 6,
      effort_level: 'low',
      expected_lift_min: 6,
      expected_lift_max: 10,
      min_sample_size: 800,
      estimated_duration_days: 50,
      primary_metric: 'lead_submitted',
      secondary_metrics: JSON.stringify(['faq_clicks', 'faq_expansions', 'time_to_faq']),
      status: 'ready',
      posthog_flag_key: 'faq_positioning',
      quarter: 'Q1 2026',
      risk_level: 1,
      implementation_cost: 0,
      competitor_insights: JSON.stringify(['Top competitors place FAQs near pricing for objection handling']),
      implementation_notes: 'Variant A: Bottom of page (control), Variant B: After pricing, Variant C: Sidebar sticky, Variant D: Accordion above CTA'
    }
  ];

  for (const test of abTests) {
    const [testId] = await knex('ab_tests').insert(test).onConflict('test_key').ignore().returning('id');

    if (testId) {
      // Add variants for each test based on implementation notes
      const variants = getVariantsForTest(test.test_key);
      for (const variant of variants) {
        await knex('ab_test_variants').insert({
          ...variant,
          test_id: testId
        }).onConflict(['test_id', 'variant_key']).ignore();
      }
    }
  }

  console.log(`✅ Seeded ${abTests.length} A/B tests with variants`);
};

function getVariantsForTest(testKey) {
  const variantConfigs = {
    social_proof_volume: [
      { variant_key: 'A', variant_name: 'Control (3 testimonials)', variant_description: 'Current state with 3 testimonials', is_control: true, traffic_allocation: 33.33 },
      { variant_key: 'B', variant_name: '6 Testimonials', variant_description: '2x testimonials for increased social proof', is_control: false, traffic_allocation: 33.33 },
      { variant_key: 'C', variant_name: '10 Testimonials + Google Reviews', variant_description: '10 testimonials plus Google Reviews widget', is_control: false, traffic_allocation: 33.34 }
    ],
    video_testimonials: [
      { variant_key: 'A', variant_name: 'Text Only (Control)', variant_description: 'Current text testimonials', is_control: true, traffic_allocation: 25 },
      { variant_key: 'B', variant_name: '1 Video Hero', variant_description: 'Single video testimonial in hero section', is_control: false, traffic_allocation: 25 },
      { variant_key: 'C', variant_name: '3 Video Section', variant_description: 'Dedicated section with 3 videos', is_control: false, traffic_allocation: 25 },
      { variant_key: 'D', variant_name: 'Video+Text Hybrid', variant_description: 'Video thumbnails with text that opens modal', is_control: false, traffic_allocation: 25 }
    ],
    guarantee_prominence: [
      { variant_key: 'A', variant_name: 'USP Card (Control)', variant_description: 'Guarantee in USP card only', is_control: true, traffic_allocation: 25 },
      { variant_key: 'B', variant_name: 'Badge + USP', variant_description: 'Badge in hero + USP section', is_control: false, traffic_allocation: 25 },
      { variant_key: 'C', variant_name: 'Dedicated Section', variant_description: 'Full guarantee section with seal and stats', is_control: false, traffic_allocation: 25 },
      { variant_key: 'D', variant_name: 'Money-Back Details', variant_description: 'Detailed money-back guarantee with terms', is_control: false, traffic_allocation: 25 }
    ],
    pricing_display_format: [
      { variant_key: 'A', variant_name: 'Table (Control)', variant_description: 'Standard 3-package table', is_control: true, traffic_allocation: 25 },
      { variant_key: 'B', variant_name: 'Comparison Matrix', variant_description: 'Feature comparison with checkmarks', is_control: false, traffic_allocation: 25 },
      { variant_key: 'C', variant_name: 'Interactive Calculator', variant_description: 'Select features to see dynamic price', is_control: false, traffic_allocation: 25 },
      { variant_key: 'D', variant_name: 'Price Slider', variant_description: 'Move slider to see package options', is_control: false, traffic_allocation: 25 }
    ],
    cta_button_text: [
      { variant_key: 'A', variant_name: 'Bekijk pakketten (Control)', variant_description: 'Generic view packages CTA', is_control: true, traffic_allocation: 25 },
      { variant_key: 'B', variant_name: 'Plan gratis gesprek', variant_description: 'Action: schedule free consultation', is_control: false, traffic_allocation: 25 },
      { variant_key: 'C', variant_name: 'Vraag offerte aan', variant_description: 'Action: request quote', is_control: false, traffic_allocation: 25 },
      { variant_key: 'D', variant_name: 'Check beschikbaarheid', variant_description: 'Action: check availability', is_control: false, traffic_allocation: 25 }
    ],
    faq_positioning: [
      { variant_key: 'A', variant_name: 'Bottom (Control)', variant_description: 'FAQs at bottom of page (current)', is_control: true, traffic_allocation: 25 },
      { variant_key: 'B', variant_name: 'After Pricing', variant_description: 'FAQs immediately after pricing section', is_control: false, traffic_allocation: 25 },
      { variant_key: 'C', variant_name: 'Sidebar Sticky', variant_description: 'Sticky sidebar FAQ throughout page', is_control: false, traffic_allocation: 25 },
      { variant_key: 'D', variant_name: 'Above CTA', variant_description: 'Accordion FAQ above main CTA', is_control: false, traffic_allocation: 25 }
    ]
  };

  return variantConfigs[testKey] || [];
}

exports.down = async (knex) => {
  await knex('ab_test_variants').del();
  await knex('ab_tests').del();
  await knex('competitors').del();
};
