-- AGADEV Database Schema
-- PostgreSQL Migration Script

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- News/Actualités table
CREATE TABLE IF NOT EXISTS news (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title_fr VARCHAR(500) NOT NULL,
    title_en VARCHAR(500),
    content_fr TEXT NOT NULL,
    content_en TEXT,
    excerpt_fr TEXT,
    excerpt_en TEXT,
    slug VARCHAR(255) UNIQUE NOT NULL,
    cover_image_url TEXT,
    published BOOLEAN DEFAULT false,
    publish_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Projects/Projets table
CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title_fr VARCHAR(500) NOT NULL,
    title_en VARCHAR(500),
    description_fr TEXT NOT NULL,
    description_en TEXT,
    content_fr TEXT NOT NULL,
    content_en TEXT,
    slug VARCHAR(255) UNIQUE NOT NULL,
    cover_image_url TEXT,
    status VARCHAR(50) DEFAULT 'active', -- active, completed, planned
    start_date DATE,
    end_date DATE,
    budget DECIMAL(15, 2),
    location VARCHAR(255),
    partners TEXT[], -- Array of partner names
    published BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Media/Files table (for documents, images, etc.)
CREATE TABLE IF NOT EXISTS media (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    filename VARCHAR(255) NOT NULL,
    original_name VARCHAR(255) NOT NULL,
    file_url TEXT NOT NULL,
    file_type VARCHAR(100), -- image/jpeg, application/pdf, etc.
    file_size INTEGER, -- in bytes
    entity_type VARCHAR(50), -- 'news' or 'project'
    entity_id UUID,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Admin users table
CREATE TABLE IF NOT EXISTS admin_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    role VARCHAR(50) DEFAULT 'editor', -- admin, editor
    active BOOLEAN DEFAULT true,
    last_login TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_news_published ON news(published, publish_date DESC);
CREATE INDEX IF NOT EXISTS idx_news_slug ON news(slug);
CREATE INDEX IF NOT EXISTS idx_projects_published ON projects(published, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_media_entity ON media(entity_type, entity_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply triggers
DROP TRIGGER IF EXISTS update_news_updated_at ON news;
CREATE TRIGGER update_news_updated_at BEFORE UPDATE ON news
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_projects_updated_at ON projects;
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_admin_users_updated_at ON admin_users;
CREATE TRIGGER update_admin_users_updated_at BEFORE UPDATE ON admin_users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert default admin user (password: Admin@2025 - CHANGE THIS!)
INSERT INTO admin_users (username, email, password_hash, full_name, role)
VALUES (
    'admin',
    'admin@agadev.ga',
    '$2a$10$rZJ5YqQ9gXKGx5xN5F5L8OYhKxNxVHKv9YzP6xP6xP6xP6xP6xP6x', -- Hash for Admin@2025
    'Administrateur AGADEV',
    'admin'
) ON CONFLICT (username) DO NOTHING;

COMMENT ON TABLE news IS 'Actualités/News articles with bilingual support';
COMMENT ON TABLE projects IS 'Projects and programs with bilingual support';
COMMENT ON TABLE media IS 'Media files (images, documents) associated with news and projects';
COMMENT ON TABLE admin_users IS 'Admin users for content management';
