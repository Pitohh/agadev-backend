// Script pour générer un hash de mot de passe
// Usage: node generate-password.js "VotreMotDePasse"

import bcrypt from 'bcryptjs';

const password = process.argv[2];

if (!password) {
  console.log('Usage: node generate-password.js "VotreMotDePasse"');
  process.exit(1);
}

const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync(password, salt);

console.log('\n========================================');
console.log('🔐 Hash généré avec succès!');
console.log('========================================\n');
console.log('Mot de passe:', password);
console.log('\nHash à insérer dans la DB:');
console.log(hash);
console.log('\n========================================\n');
console.log('SQL Query pour mettre à jour:');
console.log(`UPDATE admin_users SET password_hash = '${hash}' WHERE username = 'admin';`);
console.log('========================================\n');
