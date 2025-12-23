import bcrypt from 'bcrypt';

// Choisis ton mot de passe ici
const password = "Admin@Gabon2024!";
const saltRounds = 10;

console.log("🔐 Génération du hash bcrypt...");
console.log("Mot de passe choisi:", password);

try {
  const hash = await bcrypt.hash(password, saltRounds);
  
  console.log("\n" + "=".repeat(60));
  console.log("✅ HASH GÉNÉRÉ AVEC SUCCÈS");
  console.log("=".repeat(60));
  console.log("Mot de passe:", password);
  console.log("Hash bcrypt:", hash);
  console.log("=".repeat(60));
  
  console.log("\n📋 INSTRUCTIONS :");
  console.log("1. Copie ce hash");
  console.log("2. Va dans ta base de données (Supabase/PostgreSQL)");
  console.log("3. Mets à jour la table admin_users:");
  console.log("   UPDATE admin_users SET password_hash = '" + hash + "'");
  console.log("   WHERE username = 'admin';");
  console.log("\n4. Teste avec:");
  console.log("   curl -X POST https://agadev-backend-production.up.railway.app/api/auth/login \\");
  console.log("     -H 'Content-Type: application/json' \\");
  console.log("     -d '{\"username\":\"admin\",\"password\":\"" + password + "\"}'");
} catch (err) {
  console.error("❌ Erreur:", err);
}
