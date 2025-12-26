import dotenv from 'dotenv';
dotenv.config();

console.log('🔍 Vérification Cloudinary:');
console.log('CLOUDINARY_CLOUD_NAME:', process.env.CLOUDINARY_CLOUD_NAME ? '✓ Configuré' : '✗ Manquant');
console.log('CLOUDINARY_API_KEY:', process.env.CLOUDINARY_API_KEY ? '✓ Configuré' : '✗ Manquant');
console.log('CLOUDINARY_API_SECRET:', process.env.CLOUDINARY_API_SECRET ? '✓ Configuré' : '✗ Manquant');

if (process.env.CLOUDINARY_CLOUD_NAME && 
    process.env.CLOUDINARY_API_KEY && 
    process.env.CLOUDINARY_API_SECRET) {
  console.log('✅ Cloudinary est correctement configuré');
} else {
  console.log('❌ Cloudinary n\'est pas complètement configuré');
  console.log('📝 Pour configurer Cloudinary:');
  console.log('1. Crée un compte gratuit sur https://cloudinary.com');
  console.log('2. Trouve tes credentials dans le Dashboard');
  console.log('3. Ajoute-les dans le fichier .env');
}
