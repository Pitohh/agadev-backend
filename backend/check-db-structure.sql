-- Vérifie les colonnes des tables
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name IN ('projects', 'news') 
ORDER BY table_name, ordinal_position;

-- Vérifie quelques lignes
SELECT 'projects' as table_name, id, title_fr, cover_image_url FROM projects LIMIT 3;
SELECT 'news' as table_name, id, title_fr, cover_image_url FROM news LIMIT 3;
