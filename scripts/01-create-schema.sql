-- Create blogs table
CREATE TABLE IF NOT EXISTS blogs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content JSONB NOT NULL, -- Rich text content with blocks
  excerpt TEXT,
  featured_image_url TEXT,
  is_draft BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content JSONB NOT NULL,
  excerpt TEXT,
  featured_image_url TEXT,
  is_draft BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create games table
CREATE TABLE IF NOT EXISTS games (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content JSONB NOT NULL,
  excerpt TEXT,
  featured_image_url TEXT,
  is_draft BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE games ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (published content only)
CREATE POLICY "Public can read published blogs" ON blogs
  FOR SELECT USING (is_draft = false);

CREATE POLICY "Public can read published projects" ON projects
  FOR SELECT USING (is_draft = false);

CREATE POLICY "Public can read published games" ON games
  FOR SELECT USING (is_draft = false);

-- Create policies for admin access (authenticated users)
CREATE POLICY "Admin can manage blogs" ON blogs
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin can manage projects" ON projects
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin can manage games" ON games
  FOR ALL USING (auth.role() = 'authenticated');

-- Create indexes for better performance
CREATE INDEX idx_blogs_slug ON blogs(slug);
CREATE INDEX idx_blogs_is_draft ON blogs(is_draft);
CREATE INDEX idx_projects_slug ON projects(slug);
CREATE INDEX idx_projects_is_draft ON projects(is_draft);
CREATE INDEX idx_games_slug ON games(slug);
CREATE INDEX idx_games_is_draft ON games(is_draft);
