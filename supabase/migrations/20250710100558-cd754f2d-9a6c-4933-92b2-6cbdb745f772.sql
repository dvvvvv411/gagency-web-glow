
-- Add foreign key constraint between appointments and job_applications
ALTER TABLE public.appointments 
ADD CONSTRAINT appointments_application_id_fkey 
FOREIGN KEY (application_id) REFERENCES public.job_applications(id);
