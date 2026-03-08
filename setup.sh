#!/bin/bash
# ============================================================
# setup.sh — Installation sécurisée du serveur VPS
# QCM Patentino — à exécuter en root sur un serveur vierge
# ============================================================
set -e

echo "=== [1/8] Mise à jour du système ==="
apt update && apt upgrade -y
apt install -y curl git ufw fail2ban unattended-upgrades logrotate

echo "=== [2/8] Firewall UFW ==="
ufw default deny incoming
ufw default allow outgoing
ufw allow 2222/tcp   # SSH port personnalisé
ufw allow 80/tcp
ufw allow 443/tcp
ufw --force enable
ufw status

echo "=== [3/8] SSH — désactivation des mots de passe ==="
sed -i 's/^#\?PasswordAuthentication.*/PasswordAuthentication no/' /etc/ssh/sshd_config
sed -i 's/^#\?PermitRootLogin.*/PermitRootLogin prohibit-password/' /etc/ssh/sshd_config
sed -i 's/^#\?PubkeyAuthentication.*/PubkeyAuthentication yes/' /etc/ssh/sshd_config
sed -i 's/^#\?Port .*/Port 2222/' /etc/ssh/sshd_config
sed -i 's/^#\?ChallengeResponseAuthentication.*/ChallengeResponseAuthentication no/' /etc/ssh/sshd_config
sed -i 's/^#\?UsePAM.*/UsePAM no/' /etc/ssh/sshd_config
# Test de la config avant de redémarrer
sshd -t && systemctl restart ssh
echo "SSH sécurisé (port 2222, clé uniquement)"

echo "=== [4/8] Fail2ban ==="
cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.conf.bak
cat > /etc/fail2ban/jail.local << 'EOF'
[DEFAULT]
bantime  = 30d
findtime = 10m
maxretry = 3
banaction = iptables-multiport

[sshd]
enabled  = true
port     = 2222
filter   = sshd
logpath  = /var/log/auth.log
maxretry = 3
bantime  = 30d

[nginx-http-auth]
enabled  = true
logpath  = /var/log/nginx/error.log
maxretry = 3
bantime  = 30d

[nginx-botsearch]
enabled  = true
filter   = nginx-botsearch
logpath  = /var/log/nginx/access.log
maxretry = 3
bantime  = 30d
EOF
systemctl enable fail2ban
systemctl restart fail2ban
echo "Fail2ban configuré (ban 30j, 3 tentatives)"

echo "=== [5/8] CrowdSec ==="
curl -fsSL https://install.crowdsec.net | sh
apt install -y crowdsec-firewall-bouncer-iptables
cscli collections install crowdsecurity/nginx
cscli collections install crowdsecurity/sshd
cscli collections install crowdsecurity/portscan
systemctl enable crowdsec
systemctl restart crowdsec
echo "CrowdSec installé avec collections nginx + sshd + portscan"

echo "=== [6/8] Node.js + PM2 ==="
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs
npm install -g pm2
echo "Node.js $(node -v) et PM2 installés"

echo "=== [7/8] Nginx + Certbot ==="
apt install -y nginx certbot python3-certbot-nginx
# Désactiver la version Nginx dans les headers
sed -i 's/^#\?\s*server_tokens.*/server_tokens off;/' /etc/nginx/nginx.conf
systemctl enable nginx
systemctl restart nginx
echo "Nginx installé (server_tokens off)"
echo "IMPORTANT : Lancer manuellement -> certbot --nginx -d mandev.fr"

echo "=== [8/8] Patchs de sécurité automatiques ==="
dpkg-reconfigure --priority=low unattended-upgrades
echo "unattended-upgrades configuré"

echo ""
echo "============================================================"
echo " Installation terminée. Étapes suivantes :"
echo ""
echo " 1. Vérifier que ta clé SSH est dans ~/.ssh/authorized_keys"
echo "    avant de te déconnecter !"
echo ""
echo " 2. Déployer le projet :"
echo "    git clone git@github.com:mounir-mansi/QCM-Patentino.git /var/www/QCM-Patentino"
echo "    chown -R deploy:deploy /var/www/QCM-Patentino"
echo ""
echo " 3. Configurer Nginx (voir nginx-quiz.conf)"
echo "    Puis : certbot --nginx -d mandev.fr"
echo ""
echo " 4. Créer le .env backend :"
echo "    /var/www/QCM-Patentino/quiz-backend/.env"
echo "    chmod 600 /var/www/QCM-Patentino/quiz-backend/.env"
echo ""
echo " 5. Lancer PM2 :"
echo "    cd /var/www/QCM-Patentino/quiz-frontend && npm ci && npm run build"
echo "    pm2 start npm --name quiz-frontend -- start"
echo "    cd /var/www/QCM-Patentino/quiz-backend && npm ci"
echo "    pm2 start npm --name quiz-backend -- start"
echo "    pm2 save && pm2 startup"
echo "============================================================"
