
-- Remove the health_insurance_number column since we're no longer collecting it
ALTER TABLE employment_contracts DROP COLUMN health_insurance_number;

-- Rename pension_insurance_number to social_security_number to match the form
ALTER TABLE employment_contracts RENAME COLUMN pension_insurance_number TO social_security_number;
