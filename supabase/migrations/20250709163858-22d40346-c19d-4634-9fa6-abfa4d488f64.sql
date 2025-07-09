
-- Create policy to allow anonymous users to read accepted applications for appointment booking
CREATE POLICY "Anyone can view accepted applications for booking" 
  ON public.job_applications 
  FOR SELECT 
  USING (status = 'angenommen' AND accepted_at IS NOT NULL);
