
-- Remove all existing policies for the id-documents bucket
DROP POLICY IF EXISTS "Anyone can upload ID documents" ON storage.objects;

-- Create a comprehensive policy that allows all operations on id-documents bucket
CREATE POLICY "Allow all operations on id-documents bucket"
  ON storage.objects
  FOR ALL
  USING (bucket_id = 'id-documents')
  WITH CHECK (bucket_id = 'id-documents');
