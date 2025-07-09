
-- Create employment_contracts table to store employee data
CREATE TABLE public.employment_contracts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  appointment_id UUID REFERENCES public.appointments(id) NOT NULL,
  application_id UUID REFERENCES public.job_applications(id) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  -- Personal Information
  title TEXT,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  birth_date DATE NOT NULL,
  birth_place TEXT NOT NULL,
  nationality TEXT NOT NULL,
  address TEXT NOT NULL,
  postal_code TEXT NOT NULL,
  city TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  marital_status TEXT NOT NULL,
  
  -- Tax Information
  tax_id TEXT NOT NULL,
  tax_class TEXT NOT NULL,
  church_tax BOOLEAN NOT NULL DEFAULT false,
  health_insurance_company TEXT NOT NULL,
  health_insurance_number TEXT NOT NULL,
  pension_insurance_number TEXT NOT NULL,
  
  -- Bank Information
  bank_name TEXT NOT NULL,
  iban TEXT NOT NULL,
  bic TEXT NOT NULL,
  account_holder TEXT NOT NULL,
  
  -- ID Card Files
  id_front_file_path TEXT,
  id_back_file_path TEXT,
  
  status TEXT NOT NULL DEFAULT 'submitted',
  notes TEXT
);

-- Enable RLS
ALTER TABLE public.employment_contracts ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Admins can manage all employment contracts" 
  ON public.employment_contracts 
  FOR ALL 
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Anyone can create employment contracts" 
  ON public.employment_contracts 
  FOR INSERT 
  WITH CHECK (true);

-- Create trigger for updated_at
CREATE TRIGGER update_employment_contracts_updated_at
  BEFORE UPDATE ON public.employment_contracts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for ID card documents
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'id-documents',
  'id-documents',
  false,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/png', 'image/jpg', 'application/pdf']
);

-- Create storage policies for ID documents
CREATE POLICY "Admins can view all ID documents"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'id-documents' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Anyone can upload ID documents"
  ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'id-documents');

CREATE POLICY "Users can update their own ID documents"
  ON storage.objects
  FOR UPDATE
  USING (bucket_id = 'id-documents');
