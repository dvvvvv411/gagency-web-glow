
-- Update all employment contracts with 'reviewed' status to 'submitted'
UPDATE employment_contracts 
SET status = 'submitted', updated_at = now() 
WHERE status = 'reviewed';
