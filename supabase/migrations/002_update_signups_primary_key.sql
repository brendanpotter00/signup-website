-- Drop the existing primary key constraint on email
ALTER TABLE signups DROP CONSTRAINT signups_pkey;

-- Add a composite primary key on email and tag
-- This allows the same email to sign up for different projects
ALTER TABLE signups ADD CONSTRAINT signups_pkey PRIMARY KEY (email, tag);