
-- Delete employment contracts first (they reference appointments and applications)
DELETE FROM public.employment_contracts 
WHERE application_id IN (
  'f47d3f67-7c29-4a0f-8d45-1234567890ab',
  '9a2e8f3c-4b6d-8e9f-1234-567890abcdef',
  '7f3e9a2b-6c8d-4e5f-9876-543210fedcba',
  '3e8f7a2c-9b4d-6e8f-5432-109876543210',
  '8a4f2e9c-7b5d-3e6f-8765-432109876543',
  'b7d4f8a2-5c9e-6f3a-2109-876543210fed',
  '5f2a8e9c-4b7d-9e6f-6543-210987654321',
  '2e9f8a4c-6b3d-7e5f-4321-098765432109',
  '9c5a2f8e-3b6d-4e7f-3210-987654321098',
  'a8f3e9c5-7b2d-6e4f-2109-876543210987',
  '6e2f9a8c-4b5d-3e7f-1098-765432109876',
  '4f8a3e9c-2b6d-7e5f-0987-654321098765'
);

-- Delete appointments second (they reference applications)
DELETE FROM public.appointments 
WHERE application_id IN (
  'f47d3f67-7c29-4a0f-8d45-1234567890ab',
  '9a2e8f3c-4b6d-8e9f-1234-567890abcdef',
  '7f3e9a2b-6c8d-4e5f-9876-543210fedcba',
  '3e8f7a2c-9b4d-6e8f-5432-109876543210',
  '8a4f2e9c-7b5d-3e6f-8765-432109876543',
  'b7d4f8a2-5c9e-6f3a-2109-876543210fed',
  '5f2a8e9c-4b7d-9e6f-6543-210987654321',
  '2e9f8a4c-6b3d-7e5f-4321-098765432109',
  '9c5a2f8e-3b6d-4e7f-3210-987654321098',
  'a8f3e9c5-7b2d-6e4f-2109-876543210987',
  '6e2f9a8c-4b5d-3e7f-1098-765432109876',
  '4f8a3e9c-2b6d-7e5f-0987-654321098765'
);

-- Delete job applications last (no dependencies)
DELETE FROM public.job_applications 
WHERE id IN (
  'f47d3f67-7c29-4a0f-8d45-1234567890ab',
  '9a2e8f3c-4b6d-8e9f-1234-567890abcdef',
  '7f3e9a2b-6c8d-4e5f-9876-543210fedcba',
  '3e8f7a2c-9b4d-6e8f-5432-109876543210',
  '8a4f2e9c-7b5d-3e6f-8765-432109876543',
  'b7d4f8a2-5c9e-6f3a-2109-876543210fed',
  '5f2a8e9c-4b7d-9e6f-6543-210987654321',
  '2e9f8a4c-6b3d-7e5f-4321-098765432109',
  '9c5a2f8e-3b6d-4e7f-3210-987654321098',
  'a8f3e9c5-7b2d-6e4f-2109-876543210987',
  '6e2f9a8c-4b5d-3e7f-1098-765432109876',
  '4f8a3e9c-2b6d-7e5f-0987-654321098765'
);
