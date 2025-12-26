-- FIX URGENT POUR AGADEV
UPDATE projects 
SET cover_image_url = 'https://res.cloudinary.com/dovuamrec/image/upload/v1766515423/agadev/file_kawv7q.jpg',
    published = true,
    status = 'active',
    updated_at = NOW()
WHERE cover_image_url IS NULL OR cover_image_url = '' OR published = false;

UPDATE news 
SET cover_image_url = 'https://res.cloudinary.com/dovuamrec/image/upload/v1766515423/agadev/file_kawv7q.jpg',
    updated_at = NOW()
WHERE cover_image_url IS NULL OR cover_image_url = '';

-- Vérification
SELECT 'PROJETS' as type, COUNT(*) as total, 
       SUM(CASE WHEN cover_image_url LIKE '%cloudinary%' THEN 1 ELSE 0 END) as with_image,
       SUM(CASE WHEN published = true THEN 1 ELSE 0 END) as published
FROM projects
UNION ALL
SELECT 'NEWS' as type, COUNT(*) as total,
       SUM(CASE WHEN cover_image_url LIKE '%cloudinary%' THEN 1 ELSE 0 END) as with_image,
       SUM(CASE WHEN published = true THEN 1 ELSE 0 END) as published
FROM news;
