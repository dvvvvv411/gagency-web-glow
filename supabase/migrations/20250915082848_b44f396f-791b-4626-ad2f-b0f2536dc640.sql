-- Add api_key column to resend_config table
ALTER TABLE public.resend_config 
ADD COLUMN api_key TEXT;

-- Add comment for clarity
COMMENT ON COLUMN public.resend_config.api_key IS 'Resend API key stored from admin panel';