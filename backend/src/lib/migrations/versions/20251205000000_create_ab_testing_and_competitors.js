exports.up = async (knex) => {
  // ========================================
  // COMPETITORS TABLE
  // ========================================
  const hasCompetitors = await knex.schema.hasTable('competitors');
  if (!hasCompetitors) {
    await knex.schema.createTable('competitors', (table) => {
      table.increments('id').primary();
      table.string('name', 255).notNullable();
      table.string('slug', 255).notNullable().unique();
      table.string('website_url', 500);
      table.integer('overall_score').defaultTo(0).comment('Score out of 20');
      table.integer('social_proof_score').defaultTo(0);
      table.integer('pricing_transparency_score').defaultTo(0);
      table.integer('video_content_score').defaultTo(0);
      table.integer('trust_signals_score').defaultTo(0);
      table.jsonb('strengths').comment('Array of strength descriptions');
      table.jsonb('weaknesses').comment('Array of weakness descriptions');
      table.jsonb('learnings').comment('Array of actionable learnings');
      table.date('last_analyzed_at');
      table.boolean('active').defaultTo(true);
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());

      table.index(['slug'], 'idx_competitors_slug');
      table.index(['overall_score'], 'idx_competitors_score');
      table.index(['active'], 'idx_competitors_active');
    });
  }

  // ========================================
  // COMPETITOR FEATURES TABLE
  // ========================================
  const hasCompetitorFeatures = await knex.schema.hasTable('competitor_features');
  if (!hasCompetitorFeatures) {
    await knex.schema.createTable('competitor_features', (table) => {
      table.increments('id').primary();
      table.integer('competitor_id').unsigned().notNullable();
      table.string('feature_category', 100).notNullable().comment('e.g., social_proof, pricing, video');
      table.string('feature_name', 255).notNullable();
      table.text('feature_description');
      table.string('feature_type', 50).comment('has/missing/partial');
      table.integer('impact_score').defaultTo(0).comment('1-10 scale');
      table.jsonb('metadata').comment('Additional feature details');
      table.timestamp('analyzed_at').defaultTo(knex.fn.now());

      table.foreign('competitor_id').references('id').inTable('competitors').onDelete('CASCADE');
      table.index(['competitor_id'], 'idx_competitor_features_competitor');
      table.index(['feature_category'], 'idx_competitor_features_category');
    });
  }

  // ========================================
  // AB TESTS TABLE
  // ========================================
  const hasABTests = await knex.schema.hasTable('ab_tests');
  if (!hasABTests) {
    await knex.schema.createTable('ab_tests', (table) => {
      table.increments('id').primary();
      table.string('test_key', 255).notNullable().unique().comment('e.g., social_proof_volume');
      table.string('test_name', 255).notNullable();
      table.text('hypothesis').notNullable();
      table.text('description');
      table.string('gap_addressed', 500).comment('Which competitive gap this addresses');
      table.integer('tier').notNullable().comment('1=Critical, 2=High Impact, 3=Optimization');
      table.integer('priority_order').notNullable().comment('Order within tier');
      table.string('effort_level', 50).comment('low/medium/high');
      table.integer('expected_lift_min').comment('Minimum expected % lift');
      table.integer('expected_lift_max').comment('Maximum expected % lift');
      table.integer('min_sample_size').notNullable().comment('Minimum visitors per variant');
      table.integer('estimated_duration_days').comment('Days to reach significance');
      table.string('primary_metric', 255).notNullable().comment('e.g., lead_submitted');
      table.jsonb('secondary_metrics').comment('Array of secondary metrics');
      table.string('status', 50).defaultTo('draft').comment('draft/ready/running/paused/completed/archived');
      table.string('posthog_flag_key', 255).comment('Linked PostHog feature flag');
      table.date('start_date');
      table.date('end_date');
      table.date('scheduled_for');
      table.string('quarter', 10).comment('Q1 2026, Q2 2026, etc');
      table.integer('risk_level').defaultTo(1).comment('1=Low, 2=Medium, 3=High');
      table.decimal('implementation_cost', 10, 2).comment('Estimated cost in EUR');
      table.jsonb('competitor_insights').comment('Array of competitor references');
      table.text('implementation_notes');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());

      table.index(['test_key'], 'idx_ab_tests_key');
      table.index(['status'], 'idx_ab_tests_status');
      table.index(['tier', 'priority_order'], 'idx_ab_tests_priority');
      table.index(['quarter'], 'idx_ab_tests_quarter');
    });
  }

  // ========================================
  // AB TEST VARIANTS TABLE
  // ========================================
  const hasABTestVariants = await knex.schema.hasTable('ab_test_variants');
  if (!hasABTestVariants) {
    await knex.schema.createTable('ab_test_variants', (table) => {
      table.increments('id').primary();
      table.integer('test_id').unsigned().notNullable();
      table.string('variant_key', 50).notNullable().comment('A, B, C, D, E');
      table.string('variant_name', 255).notNullable();
      table.text('variant_description');
      table.boolean('is_control').defaultTo(false);
      table.decimal('traffic_allocation', 5, 2).defaultTo(50.00).comment('Percentage 0-100');
      table.jsonb('implementation_details').comment('Code snippets, component props, etc');
      table.integer('exposures').defaultTo(0);
      table.integer('conversions').defaultTo(0);
      table.decimal('conversion_rate', 5, 2).defaultTo(0);
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());

      table.foreign('test_id').references('id').inTable('ab_tests').onDelete('CASCADE');
      table.unique(['test_id', 'variant_key']);
      table.index(['test_id'], 'idx_ab_test_variants_test');
      table.index(['is_control'], 'idx_ab_test_variants_control');
    });
  }

  // ========================================
  // AB TEST RESULTS TABLE (Historical Snapshots)
  // ========================================
  const hasABTestResults = await knex.schema.hasTable('ab_test_results');
  if (!hasABTestResults) {
    await knex.schema.createTable('ab_test_results', (table) => {
      table.increments('id').primary();
      table.integer('test_id').unsigned().notNullable();
      table.integer('variant_id').unsigned().notNullable();
      table.date('snapshot_date').notNullable();
      table.integer('exposures').defaultTo(0);
      table.integer('conversions').defaultTo(0);
      table.decimal('conversion_rate', 5, 2).defaultTo(0);
      table.decimal('p_value', 8, 6).comment('Statistical significance');
      table.decimal('lift_percentage', 5, 2).comment('% improvement vs control');
      table.decimal('confidence_level', 5, 2).comment('Confidence % (95, 99, etc)');
      table.boolean('is_significant').defaultTo(false);
      table.boolean('is_winner').defaultTo(false);
      table.jsonb('secondary_metrics_data').comment('JSON with secondary metric values');
      table.text('notes');
      table.timestamp('created_at').defaultTo(knex.fn.now());

      table.foreign('test_id').references('id').inTable('ab_tests').onDelete('CASCADE');
      table.foreign('variant_id').references('id').inTable('ab_test_variants').onDelete('CASCADE');
      table.index(['test_id', 'snapshot_date'], 'idx_ab_test_results_test_date');
      table.index(['variant_id'], 'idx_ab_test_results_variant');
      table.index(['is_winner'], 'idx_ab_test_results_winner');
    });
  }
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('ab_test_results');
  await knex.schema.dropTableIfExists('ab_test_variants');
  await knex.schema.dropTableIfExists('ab_tests');
  await knex.schema.dropTableIfExists('competitor_features');
  await knex.schema.dropTableIfExists('competitors');
};
