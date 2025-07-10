
-- Add desired_start_date column to employment_contracts table
ALTER TABLE public.employment_contracts 
ADD COLUMN desired_start_date date;
