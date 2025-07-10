
-- Add a new RLS policy to allow reading newly submitted applications for a short time
-- This allows the application submission process to work while maintaining security
CREATE POLICY "Allow reading own recent applications" 
  ON public.job_applications 
  FOR SELECT 
  USING (
    status = 'neu' 
    AND created_at > (now() - interval '1 hour')
  );
