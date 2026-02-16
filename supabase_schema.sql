-- KPR CAS Spark Database Schema
-- This SQL script creates all the necessary tables for the TEDx event management system

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==================== PARTICIPANTS TABLE ====================
CREATE TABLE IF NOT EXISTS participants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  date TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'registered' CHECK (status IN ('registered', 'attended', 'no-show')),
  certSent BOOLEAN DEFAULT FALSE,
  certSentDate TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for email lookup and date filtering
CREATE INDEX IF NOT EXISTS idx_participants_email ON participants(email);
CREATE INDEX IF NOT EXISTS idx_participants_date ON participants(date);
CREATE INDEX IF NOT EXISTS idx_participants_status ON participants(status);

-- ==================== SPEAKERS TABLE ====================
CREATE TABLE IF NOT EXISTS speakers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  image TEXT,
  bio TEXT,
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for ordering
CREATE INDEX IF NOT EXISTS idx_speakers_order ON speakers("order");

-- ==================== CERTIFICATES TABLE ====================
CREATE TABLE IF NOT EXISTS certificates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL DEFAULT 'Certificate of Participation',
  text TEXT NOT NULL DEFAULT 'In recognition of your enthusiasm, engagement, and commitment to spreading ideas worth sharing.',
  bgColor TEXT NOT NULL DEFAULT 'from-amber-50 to-yellow-50',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==================== CONTACT INFO TABLE ====================
CREATE TABLE IF NOT EXISTS contact_info (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  formLink TEXT NOT NULL,
  registrationLink TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==================== ABOUT INFO TABLE ====================
CREATE TABLE IF NOT EXISTS about_info (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL DEFAULT 'About TEDx KPRCAS',
  description TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==================== EVENTS TABLE ====================
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  date TEXT NOT NULL,
  description TEXT,
  location TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for date lookup
CREATE INDEX IF NOT EXISTS idx_events_date ON events(date);

-- ==================== STORAGE BUCKETS ====================
-- Note: These buckets should be created via Supabase dashboard or API
-- But here's the configuration for reference:
-- Bucket name: speaker-images
-- Public: Yes
-- File size limit: 10MB

-- ==================== INSERT DEFAULT DATA ====================

-- Insert default certificate design
INSERT INTO certificates (title, text, bgColor)
VALUES (
  'Certificate of Participation',
  'In recognition of your enthusiasm, engagement, and commitment to spreading ideas worth sharing.',
  'from-amber-50 to-yellow-50'
)
ON CONFLICT DO NOTHING;

-- Insert default contact info
INSERT INTO contact_info (email, phone, address, formLink, registrationLink)
VALUES (
  'contact@kprcas.edu.in',
  '+91-XXXX-XXXX-XX',
  'KPR College of Arts and Science, Coimbatore',
  'https://forms.gle/example',
  'https://forms.gle/example'
)
ON CONFLICT DO NOTHING;

-- Insert default about info
INSERT INTO about_info (title, description, content)
VALUES (
  'About TEDx KPRCAS',
  'TEDx is an independent event that brings people together to share a TED-like experience.',
  'In the spirit of ideas worth spreading, TED has created a program called TEDx.'
)
ON CONFLICT DO NOTHING;

-- ==================== ENABLE ROW LEVEL SECURITY ====================
ALTER TABLE participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE speakers ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE about_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Create policies to allow all access (you should customize this for production)
CREATE POLICY "Allow all access to participants" ON participants FOR ALL USING (true);
CREATE POLICY "Allow all access to speakers" ON speakers FOR ALL USING (true);
CREATE POLICY "Allow all access to certificates" ON certificates FOR ALL USING (true);
CREATE POLICY "Allow all access to contact_info" ON contact_info FOR ALL USING (true);
CREATE POLICY "Allow all access to about_info" ON about_info FOR ALL USING (true);
CREATE POLICY "Allow all access to events" ON events FOR ALL USING (true);

