-- ==============================================================================
-- Supabase Storage Setup for ShopEase Product Imagery
-- Run in Supabase SQL Editor
-- ==============================================================================

-- 1. Create product-images storage bucket if it does not already exist
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'product-images',
  'product-images',
  true,
  5242880, -- 5MB limit
  ARRAY['image/png', 'image/jpeg', 'image/webp', 'image/avif', 'image/svg+xml']
)
ON CONFLICT (id) DO UPDATE SET public = true;

-- 2. Storage Policies for 'product-images' bucket
-- Everyone can view images
CREATE POLICY "Public Read Access for Product Images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'product-images');

-- Only admins can upload images
CREATE POLICY "Admins Can Upload Product Images"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'product-images'
    AND (
      EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid() AND role = 'admin'
      )
    )
  );

-- Only admins can delete images
CREATE POLICY "Admins Can Delete Product Images"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'product-images'
    AND (
      EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid() AND role = 'admin'
      )
    )
  );
