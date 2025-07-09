
-- Create a table for Resend configuration
CREATE TABLE public.resend_config (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  sender_email TEXT NOT NULL,
  sender_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS) to ensure only admins can manage Resend config
ALTER TABLE public.resend_config ENABLE ROW LEVEL SECURITY;

-- Create policy that allows admins to manage Resend configuration
CREATE POLICY "Admins can manage resend config" 
  ON public.resend_config 
  FOR ALL 
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger to update the updated_at column
CREATE TRIGGER update_resend_config_updated_at 
  BEFORE UPDATE ON public.resend_config 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert default configuration
INSERT INTO public.resend_config (sender_email, sender_name) 
VALUES ('onboarding@resend.dev', 'Bewerbungsteam');
