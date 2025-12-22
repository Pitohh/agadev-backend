# 📁 COPIE VERS WSL UBUNTU

## Méthode 1: Via Windows Explorer (Recommandé - Plus simple)

1. Télécharger le dossier `agadev-fullstack` depuis Claude
2. Ouvrir Windows Explorer
3. Dans la barre d'adresse, taper:
   ```
   \\wsl.localhost\Ubuntu-24.04\home\kayto
   ```
4. Copier-coller le dossier `agadev-fullstack` ici

✅ **Terminé!** Le projet est maintenant dans votre WSL.

## Méthode 2: Via ligne de commande Windows

1. Télécharger le dossier `agadev-fullstack`
2. Ouvrir PowerShell ou CMD
3. Naviguer vers le dossier téléchargé:
   ```powershell
   cd C:\Users\VotreNom\Downloads\agadev-fullstack
   ```
4. Copier vers WSL:
   ```powershell
   xcopy /E /I . \\wsl.localhost\Ubuntu-24.04\home\kayto\agadev-fullstack
   ```

## Méthode 3: Via WSL Ubuntu terminal

1. Ouvrir WSL Ubuntu
2. Aller dans votre home:
   ```bash
   cd /home/kayto
   ```
3. Copier depuis Windows (si téléchargé dans Downloads):
   ```bash
   cp -r /mnt/c/Users/VotreNom/Downloads/agadev-fullstack ./
   ```

## Vérification

Dans WSL Ubuntu:
```bash
cd /home/kayto/agadev-fullstack
ls -la
```

Vous devriez voir:
```
backend/
frontend/
GUIDE_INSTALLATION.md
README.md
setup.sh
```

## Étape suivante

Une fois copié, suivez le [GUIDE_INSTALLATION.md](GUIDE_INSTALLATION.md) pour installer et configurer le projet.

Ou exécutez directement:
```bash
chmod +x setup.sh
./setup.sh
```
