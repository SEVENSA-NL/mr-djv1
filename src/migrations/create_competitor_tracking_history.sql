-- Competitor Tracking History Table
-- Stores daily tracking data for all 25 variables per competitor

CREATE TABLE IF NOT EXISTS competitor_tracking_history (
    id SERIAL PRIMARY KEY,
    competitor_id INTEGER NOT NULL REFERENCES competitors(id) ON DELETE CASCADE,
    tracked_at TIMESTAMP NOT NULL DEFAULT NOW(),
    variables JSONB NOT NULL DEFAULT '{}'::jsonb,
    success BOOLEAN DEFAULT true,
    error_message TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_cth_competitor_id ON competitor_tracking_history(competitor_id);
CREATE INDEX IF NOT EXISTS idx_cth_tracked_at ON competitor_tracking_history(tracked_at DESC);
CREATE INDEX IF NOT EXISTS idx_cth_competitor_tracked ON competitor_tracking_history(competitor_id, tracked_at DESC);

-- GIN index for JSONB queries
CREATE INDEX IF NOT EXISTS idx_cth_variables ON competitor_tracking_history USING GIN (variables);

-- View for latest tracking data
CREATE OR REPLACE VIEW v_latest_competitor_tracking AS
SELECT DISTINCT ON (competitor_id)
    cth.id,
    cth.competitor_id,
    c.name as competitor_name,
    c.website_url,
    cth.tracked_at,
    cth.variables,
    cth.success
FROM competitor_tracking_history cth
JOIN competitors c ON c.id = cth.competitor_id
WHERE cth.success = true
ORDER BY competitor_id, tracked_at DESC;

-- View for tracking changes over time
CREATE OR REPLACE VIEW v_competitor_tracking_changes AS
SELECT
    c.id as competitor_id,
    c.name,
    COUNT(cth.id) as total_tracks,
    MAX(cth.tracked_at) as last_tracked,
    COUNT(cth.id) FILTER (WHERE cth.success = true) as successful_tracks,
    COUNT(cth.id) FILTER (WHERE cth.success = false) as failed_tracks
FROM competitors c
LEFT JOIN competitor_tracking_history cth ON c.id = cth.competitor_id
WHERE c.status = 'active'
GROUP BY c.id, c.name
ORDER BY last_tracked DESC NULLS LAST;

-- Function to get variable history for a competitor
CREATE OR REPLACE FUNCTION get_competitor_variable_history(
    p_competitor_id INTEGER,
    p_variable VARCHAR,
    p_days INTEGER DEFAULT 30
)
RETURNS TABLE (
    tracked_at TIMESTAMP,
    value TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        cth.tracked_at,
        cth.variables->>p_variable as value
    FROM competitor_tracking_history cth
    WHERE cth.competitor_id = p_competitor_id
        AND cth.success = true
        AND cth.tracked_at >= NOW() - (p_days || ' days')::INTERVAL
        AND cth.variables ? p_variable
    ORDER BY cth.tracked_at DESC;
END;
$$ LANGUAGE plpgsql;

-- Function to detect significant changes
CREATE OR REPLACE FUNCTION detect_competitor_changes(
    p_competitor_id INTEGER,
    p_hours INTEGER DEFAULT 24
)
RETURNS TABLE (
    variable VARCHAR,
    old_value TEXT,
    new_value TEXT,
    changed_at TIMESTAMP
) AS $$
BEGIN
    RETURN QUERY
    WITH current_data AS (
        SELECT variables, tracked_at
        FROM competitor_tracking_history
        WHERE competitor_id = p_competitor_id AND success = true
        ORDER BY tracked_at DESC
        LIMIT 1
    ),
    previous_data AS (
        SELECT variables, tracked_at
        FROM competitor_tracking_history
        WHERE competitor_id = p_competitor_id
            AND success = true
            AND tracked_at < (SELECT tracked_at FROM current_data) - (p_hours || ' hours')::INTERVAL
        ORDER BY tracked_at DESC
        LIMIT 1
    )
    SELECT
        key::VARCHAR,
        prev.variables->>key as old_value,
        curr.variables->>key as new_value,
        curr.tracked_at as changed_at
    FROM current_data curr
    CROSS JOIN previous_data prev
    CROSS JOIN LATERAL jsonb_object_keys(curr.variables) as key
    WHERE (prev.variables->>key) IS DISTINCT FROM (curr.variables->>key);
END;
$$ LANGUAGE plpgsql;

-- Comments
COMMENT ON TABLE competitor_tracking_history IS 'Daily tracking history for all 25 competitor variables';
COMMENT ON COLUMN competitor_tracking_history.variables IS 'JSONB object containing all 25 tracked variables';
COMMENT ON FUNCTION get_competitor_variable_history IS 'Get historical values for a specific variable';
COMMENT ON FUNCTION detect_competitor_changes IS 'Detect changes in competitor data over specified time period';
