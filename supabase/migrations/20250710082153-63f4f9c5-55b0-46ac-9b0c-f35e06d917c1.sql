
-- Create storage policy to allow anonymous uploads to id-documents bucket
CREATE POLICY "Anyone can upload ID documents"
  ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'id-documents');
