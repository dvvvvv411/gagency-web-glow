-- Add employment_type column to job_applications table
ALTER TABLE public.job_applications 
ADD COLUMN employment_type text NOT NULL DEFAULT 'minijob' CHECK (employment_type IN ('minijob', 'teilzeit', 'vollzeit'));