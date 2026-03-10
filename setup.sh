#!/bin/bash
# ============================================================
# setup.sh — Sécurisation complète d'un VPS vierge
# À exécuter en ROOT immédiatement après la première connexion
# ============================================================
set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

ok()   { echo -e "${GREEN}[OK]${NC} $1"; }
info() { echo -e "${BLUE}[INFO]${NC} $1"; }
warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }
err()  { echo -e "${RED}[ERREUR]${NC} $1"; exit 1; }

WARNINGS_FINAL=()
add_warning() { WARNINGS_FINAL+=("$1"); }

npm_audit_check() {
  local DIR=$1
  local FIX_FLAGS=${2:-""}
  local LABEL=${3:-"$DIR"}
  info "npm audit : $LABEL..."
  AUDIT_JSON=$(sudo -u "$APP_USER" bash -c "cd $DIR && npm audit --json 2>/dev/null" || echo "{}")
  TOTAL=$(echo "$AUDIT_JSON" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('metadata',{}).get('vulnerabilities',{}).get('total',0))" 2>/dev/null || echo "0")
  HIGH=$(echo "$AUDIT_JSON" | python3 -c "import sys,json; d=json.load(sys.stdin); v=d.get('metadata',{}).get('vulnerabilities',{}); print(v.get('high',0)+v.get('critical',0))" 2>/dev/null || echo "0")
  if [ "$TOTAL" = "0" ]; then
    ok "npm audit $LABEL : aucune vulnérabilité"
    return
  fi
  if [ "$HIGH" -gt "0" ]; then
    warn "npm audit $LABEL : $TOTAL vulnérabilités dont $HIGH HIGH/CRITICAL — tentative de fix automatique..."
    sudo -u "$APP_USER" bash -c "cd $DIR && npm audit fix $FIX_FLAGS --silent" 2>/dev/null || true
    AUDIT2=$(sudo -u "$APP_USER" bash -c "cd $DIR && npm audit --json 2>/dev/null" || echo "{}")
    HIGH2=$(echo "$AUDIT2" | python3 -c "import sys,json; d=json.load(sys.stdin); v=d.get('metadata',{}).get('vulnerabilities',{}); print(v.get('high',0)+v.get('critical',0))" 2>/dev/null || echo "?")
    TOTAL2=$(echo "$AUDIT2" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('metadata',{}).get('vulnerabilities',{}).get('total',0))" 2>/dev/null || echo "?")
    if [ "$HIGH2" = "0" ]; then
      ok "npm audit fix $LABEL appliqué — plus de HIGH/CRITICAL (reste $TOTAL2 LOW/MODERATE)"
    else
      warn "npm audit $LABEL : $HIGH2 HIGH/CRITICAL non corrigées après fix"
      add_warning "npm audit $LABEL : $HIGH2 vulnérabilités HIGH/CRITICAL non corrigées — à traiter impérativement"
    fi
  else
    warn "npm audit $LABEL : $TOTAL vulnérabilités LOW/MODERATE (aucun HIGH/CRITICAL)"
  fi
}

check_service() {
  local SVC=$1
  local LABEL=${2:-$SVC}
  if ! systemctl is-active --quiet "$SVC"; then
    warn "$LABEL : service inactif après installation"
    add_warning "$LABEL : service inactif — relance : systemctl restart $SVC"
  fi
}

[ "$EUID" -ne 0 ] && err "Lance ce script en root : sudo bash setup.sh"

echo ""
echo "============================================================"
echo "  SETUP SÉCURITÉ VPS — $(date '+%Y-%m-%d %H:%M')"
echo "============================================================"
echo ""

# ── Collecte des infos ────────────────────────────────────────
echo -e "${YELLOW}=== Configuration initiale ===${NC}"
echo ""
read -p "Nom de domaine (ex: mandev.fr) : "                    DOMAIN
read -p "Port SSH personnalisé (ex: 2222) : "                 SSH_PORT
read -p "Nom du user applicatif (ex: deploy) : "              APP_USER
read -p "Nom de la base de données MySQL : "                   DB_NAME
read -p "URL SSH du repo GitHub (ex: git@github.com:user/repo.git) : " REPO_URL
read -p "Serveur SMTP (ex: smtp.gmail.com) : "                 SMTP_HOST
read -p "Port SMTP (ex: 587) : "                               SMTP_PORT
read -p "Adresse email expéditeur : "                          SMTP_FROM
read -p "Email destinataire alertes [ENTRÉE = même adresse] : " ALERT_EMAIL_INPUT
ALERT_EMAIL="${ALERT_EMAIL_INPUT:-$SMTP_FROM}"
read -s -p "Mot de passe email expéditeur : "                  SMTP_PASS
echo ""
echo ""
echo -e "${YELLOW}=== Cloudflare Turnstile (CAPTCHA anti-bot) ===${NC}"
echo "  → Créer un site sur https://dash.cloudflare.com > Turnstile"
echo "  → Type : Invisible ou Managed"
read -p "Turnstile Site Key  (NEXT_PUBLIC_TURNSTILE_SITE_KEY) : " TURNSTILE_SITE_KEY
read -p "Turnstile Secret Key (TURNSTILE_SECRET_KEY) : "          TURNSTILE_SECRET_KEY

echo ""
echo -e "${YELLOW}=== Cloudflare Origin Certificate (SSL 15 ans) ===${NC}"
echo "  → dash.cloudflare.com > $DOMAIN > SSL/TLS > Origin Server > Create Certificate"
echo "  → Key type : RSA (2048) | Hostnames : $DOMAIN *.$DOMAIN | Validity : 15 years"
echo "  → Clique Create, copie les deux blocs ci-dessous"
echo ""
echo -e "${BLUE}[INFO]${NC} Colle le certificat (Origin Certificate) puis appuie sur Ctrl+D :"
mkdir -p /etc/ssl/cloudflare
cat > /etc/ssl/cloudflare/cert.pem
echo -e "${BLUE}[INFO]${NC} Colle la clé privée (Private Key) puis appuie sur Ctrl+D :"
cat > /etc/ssl/cloudflare/key.pem
chmod 644 /etc/ssl/cloudflare/cert.pem
chmod 600 /etc/ssl/cloudflare/key.pem
ok "Certificat Cloudflare Origin sauvegardé"

echo ""
info "Génération automatique des mots de passe forts (56 caractères)..."
GEN_PASS() { openssl rand -base64 42; }
ROOT_PASS=$(GEN_PASS)
DEPLOY_PASS=$(GEN_PASS)
DB_ROOT_PASS=$(GEN_PASS)
DB_APP_PASS=$(GEN_PASS)
JWT_SECRET=$(openssl rand -base64 64 | tr -d '\n')

echo ""
echo -e "${RED}╔══════════════════════════════════════════════════════════════╗${NC}"
echo -e "${RED}║  SAUVEGARDE OBLIGATOIRE — copie dans Bitwarden MAINTENANT   ║${NC}"
echo -e "${RED}╚══════════════════════════════════════════════════════════════╝${NC}"
echo ""
echo "  Mot de passe ROOT            : $ROOT_PASS"
echo "  Mot de passe $APP_USER       : $DEPLOY_PASS"
echo "  Mot de passe MySQL root      : $DB_ROOT_PASS"
echo "  Mot de passe MySQL $APP_USER : $DB_APP_PASS"
echo "  JWT_SECRET                   : $JWT_SECRET"
echo ""
read -p "Appuie sur ENTRÉE une fois tout sauvegardé dans Bitwarden... "

echo ""
echo -e "${RED}╔══════════════════════════════════════════════════════════════╗${NC}"
echo -e "${RED}║  ACTION REQUISE MAINTENANT — Pare-feu IONOS                  ║${NC}"
echo -e "${RED}╚══════════════════════════════════════════════════════════════╝${NC}"
echo ""
echo "  Dans l'espace client IONOS → Serveur → Pare-feu réseau :"
echo "  Ajouter une règle entrante pour le port $SSH_PORT/TCP"
echo "  (Sans ça, la connexion SSH sur le nouveau port sera bloquée)"
echo ""
read -p "Port $SSH_PORT ajouté dans le pare-feu IONOS ? (o/n) : " FW_OK
[[ "$FW_OK" != "o" && "$FW_OK" != "O" ]] && warn "N'oublie pas d'ouvrir le port $SSH_PORT dans IONOS avant de tester SSH !"

echo ""
echo -e "${YELLOW}Clé SSH publique pour le user $APP_USER${NC}"
echo "  (colle ta clé ed25519 publique, ex: ssh-ed25519 AAAA... mon-pc)"
read -p "  Clé SSH : " SSH_PUBKEY

[ -z "$DOMAIN" ]      && err "Domaine requis"
[ -z "$SSH_PORT" ]    && err "Port SSH requis"
[ -z "$APP_USER" ]    && err "User requis"
[ -z "$DB_NAME" ]     && err "Nom de base de données requis"
[ -z "$REPO_URL" ]    && err "URL repo requis"
[ -z "$SSH_PUBKEY" ]  && err "Clé SSH requise"
[ -z "$ALERT_EMAIL" ] && err "Email alertes requis"

echo ""
info "Récapitulatif :"
info "  Domaine=$DOMAIN | Port SSH=$SSH_PORT | User=$APP_USER | DB=$DB_NAME | Alertes→$ALERT_EMAIL"
read -p "C'est correct ? (o/n) : " CONFIRM
[[ "$CONFIRM" != "o" && "$CONFIRM" != "O" ]] && err "Annulé."

USER_HOME="/home/$APP_USER"
ENV_FILE="/var/www/QCM-Patentino/quiz-backend/.env"

# ── 1. Mots de passe ──────────────────────────────────────────
echo ""
echo -e "${YELLOW}=== [1/13] Mots de passe ===${NC}"
echo "root:$ROOT_PASS" | chpasswd
ok "Mot de passe root changé"

if ! id "$APP_USER" &>/dev/null; then
  useradd -m -s /bin/bash "$APP_USER"
  ok "User $APP_USER créé"
fi
echo "$APP_USER:$DEPLOY_PASS" | chpasswd
ok "Mot de passe $APP_USER changé"

# Droits sudo limités au monitoring pour APP_USER
cat > /etc/sudoers.d/$APP_USER-monitoring << EOF
$APP_USER ALL=(ALL) NOPASSWD: /usr/bin/fail2ban-client status, /usr/bin/fail2ban-client status *, /usr/sbin/ufw status, /bin/systemctl status *
EOF
chmod 440 /etc/sudoers.d/$APP_USER-monitoring
ok "Droits sudo monitoring configurés pour $APP_USER"

# ── 2. Clé SSH ────────────────────────────────────────────────
echo ""
echo -e "${YELLOW}=== [2/13] Clé SSH ===${NC}"
mkdir -p "$USER_HOME/.ssh"
echo "$SSH_PUBKEY" > "$USER_HOME/.ssh/authorized_keys"
chmod 700 "$USER_HOME/.ssh"
chmod 600 "$USER_HOME/.ssh/authorized_keys"
chown -R "$APP_USER:$APP_USER" "$USER_HOME/.ssh"
ok "Clé SSH configurée pour $APP_USER"
> /root/.ssh/authorized_keys 2>/dev/null || true
ok "Clés SSH root vidées"

# ── 3. Mise à jour système ────────────────────────────────────
echo ""
echo -e "${YELLOW}=== [3/13] Mise à jour système ===${NC}"
apt update -qq && apt upgrade -y -qq
apt install -y -qq curl git ufw fail2ban unattended-upgrades logrotate \
  gnupg2 msmtp msmtp-mta rkhunter lynis clamav clamav-freshclam auditd audispd-plugins
ok "Système à jour"

# ── 4. Firewall UFW ───────────────────────────────────────────
echo ""
echo -e "${YELLOW}=== [4/13] Firewall UFW ===${NC}"
ufw --force reset
ufw default deny incoming
ufw default allow outgoing
ufw allow "$SSH_PORT/tcp" comment "SSH"
ufw allow 80/tcp           comment "HTTP"
ufw allow 443/tcp          comment "HTTPS"
ufw deny 3000/tcp          comment "Block frontend direct"
ufw deny 3001/tcp          comment "Block backend direct"
ufw deny 3306/tcp          comment "Block MySQL direct"
ufw deny out 3333          comment "Block mining pool"
ufw deny out 4444          comment "Block mining pool"
ufw deny out 14444         comment "Block mining pool"
ufw deny out 45560         comment "Block mining pool"
ufw deny out 3032          comment "Block mining pool"
ufw deny out 7777          comment "Block mining pool"
ufw --force enable
ok "UFW configuré (SSH:$SSH_PORT, 80, 443 — MySQL/backend bloqués)"

# ── 5. SSH Hardening ──────────────────────────────────────────
echo ""
echo -e "${YELLOW}=== [5/13] Durcissement SSH ===${NC}"
cp /etc/ssh/sshd_config /etc/ssh/sshd_config.bak.$(date +%Y%m%d)

cat > /etc/ssh/sshd_config.d/99-hardening.conf << EOF
Port $SSH_PORT
PermitRootLogin no
PasswordAuthentication no
PubkeyAuthentication yes
ChallengeResponseAuthentication no
UsePAM no
X11Forwarding no
MaxAuthTries 2
LoginGraceTime 20
AllowUsers $APP_USER
ClientAliveInterval 300
ClientAliveCountMax 2
EOF

# Ubuntu 24+ utilise systemd socket activation — override du port dans le socket
mkdir -p /etc/systemd/system/ssh.socket.d
cat > /etc/systemd/system/ssh.socket.d/override.conf << EOF
[Socket]
ListenStream=
ListenStream=0.0.0.0:$SSH_PORT
ListenStream=[::]:$SSH_PORT
EOF

sshd -t && systemctl daemon-reload && systemctl restart ssh.socket && systemctl restart ssh
ok "SSH durci (port $SSH_PORT, clé uniquement, AllowUsers $APP_USER)"
echo ""
warn "IMPORTANT : teste la connexion SSH dans un NOUVEAU terminal avant de continuer !"
echo -e "${YELLOW}Commande à utiliser :${NC}"
echo "  ssh -i ~/.ssh/id_ed25519 -p $SSH_PORT $APP_USER@$(curl -s ifconfig.me 2>/dev/null || hostname -I | awk '{print $1}')"
echo ""
read -p "Connexion SSH testée et fonctionnelle ? (o/n) : " SSH_OK
[[ "$SSH_OK" != "o" && "$SSH_OK" != "O" ]] && err "Règle le problème SSH avant de continuer."
echo ""
warn "Pense à supprimer le port 22 dans le pare-feu IONOS dès que SSH sur port $SSH_PORT est confirmé !"
add_warning "IONOS pare-feu : supprimer la règle port 22 (garder seulement port $SSH_PORT)"

# ── 6. Kernel Hardening ───────────────────────────────────────
echo ""
echo -e "${YELLOW}=== [6/13] Kernel Hardening ===${NC}"
cat > /etc/sysctl.d/99-hardening.conf << 'EOF'
net.ipv4.tcp_syncookies = 1
net.ipv4.conf.all.rp_filter = 1
net.ipv4.conf.default.rp_filter = 1
net.ipv4.icmp_echo_ignore_broadcasts = 1
net.ipv4.conf.all.accept_redirects = 0
net.ipv6.conf.all.accept_redirects = 0
net.ipv4.conf.all.send_redirects = 0
net.ipv4.conf.all.accept_source_route = 0
net.ipv6.conf.all.accept_source_route = 0
net.ipv4.conf.all.log_martians = 1
kernel.randomize_va_space = 2
kernel.dmesg_restrict = 1
kernel.kptr_restrict = 2
fs.suid_dumpable = 0
EOF
sysctl -p /etc/sysctl.d/99-hardening.conf > /dev/null 2>&1
ok "Kernel hardening appliqué"

# ── 7. msmtp ─────────────────────────────────────────────────
echo ""
echo -e "${YELLOW}=== [7/13] msmtp (alertes email) ===${NC}"
cat > /etc/msmtprc << EOF
defaults
auth           on
tls            on
tls_trust_file /etc/ssl/certs/ca-certificates.crt
logfile        /var/log/msmtp.log

account        alert
host           $SMTP_HOST
port           $SMTP_PORT
from           $SMTP_FROM
user           $SMTP_FROM
password       $SMTP_PASS

account default : alert
EOF
chmod 600 /etc/msmtprc
if echo "Test alerte msmtp — setup.sh VPS $(date)" | msmtp "$ALERT_EMAIL" 2>/dev/null; then
  ok "msmtp configuré — email test envoyé à $ALERT_EMAIL"
  read -p "  As-tu reçu l'email de test sur $ALERT_EMAIL ? (o/n) : " MAIL_OK
  [[ "$MAIL_OK" != "o" && "$MAIL_OK" != "O" ]] && add_warning "msmtp : email test non confirmé — vérifie spam, SMTP_HOST=$SMTP_HOST, mot de passe"
else
  warn "msmtp : email test échoué — vérifie les identifiants SMTP"
  add_warning "msmtp : email test échoué — vérifie SMTP_HOST=$SMTP_HOST, identifiants et mot de passe"
fi

# ── 8. Fail2ban ───────────────────────────────────────────────
echo ""
echo -e "${YELLOW}=== [8/13] Fail2ban ===${NC}"
cat > /etc/fail2ban/jail.local << EOF
[DEFAULT]
bantime  = 30d
findtime = 5m
maxretry = 3
banaction = iptables-multiport
destemail = $ALERT_EMAIL
sendername = Fail2ban VPS
mta = msmtp
action = %(action_mwl)s

[sshd]
enabled  = true
port     = $SSH_PORT
filter   = sshd
logpath  = /var/log/auth.log
maxretry = 2
bantime  = -1
findtime = 1h

[nginx-http-auth]
enabled  = true
logpath  = /var/log/nginx/error.log
maxretry = 3
bantime  = 30d

[nginx-botsearch]
enabled  = true
filter   = nginx-botsearch
logpath  = /var/log/nginx/access.log
maxretry = 2
bantime  = 30d

[nginx-limit-req]
enabled  = true
filter   = nginx-limit-req
logpath  = /var/log/nginx/error.log
maxretry = 5
bantime  = 7d
EOF
systemctl enable fail2ban -q && systemctl restart fail2ban
check_service fail2ban "Fail2ban"
ok "Fail2ban configuré (SSH : ban permanent 2 tentatives, nginx : ban 30j, alertes → $ALERT_EMAIL)"

# ── 9. CrowdSec ───────────────────────────────────────────────
echo ""
echo -e "${YELLOW}=== [9/13] CrowdSec ===${NC}"
if ! command -v cscli &>/dev/null; then
  curl -fsSL https://install.crowdsec.net | sh -s -- -y > /dev/null 2>&1
fi
apt install -y -qq crowdsec-firewall-bouncer-iptables 2>/dev/null || true
cscli collections install crowdsecurity/nginx -q 2>/dev/null || true
cscli collections install crowdsecurity/sshd -q 2>/dev/null || true
cscli collections install crowdsecurity/portscan -q 2>/dev/null || true
systemctl enable crowdsec -q && systemctl restart crowdsec
check_service crowdsec "CrowdSec"
ok "CrowdSec installé (nginx + sshd + portscan)"

# ── 10. MySQL ─────────────────────────────────────────────────
echo ""
echo -e "${YELLOW}=== [10/13] MySQL ===${NC}"
apt install -y -qq mysql-server

# Sécuriser MySQL (sans interaction)
mysql -e "ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '$DB_ROOT_PASS';" 2>/dev/null || \
mysql -u root -e "ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '$DB_ROOT_PASS';"
mysql -u root -p"$DB_ROOT_PASS" -e "DELETE FROM mysql.user WHERE User='';"
mysql -u root -p"$DB_ROOT_PASS" -e "DELETE FROM mysql.user WHERE User='root' AND Host NOT IN ('localhost', '127.0.0.1', '::1');"
mysql -u root -p"$DB_ROOT_PASS" -e "DROP DATABASE IF EXISTS test;"
mysql -u root -p"$DB_ROOT_PASS" -e "DELETE FROM mysql.db WHERE Db='test' OR Db='test\\_%';"

# Créer la base et l'utilisateur applicatif (droits limités à cette base uniquement)
mysql -u root -p"$DB_ROOT_PASS" -e "CREATE DATABASE IF NOT EXISTS \`$DB_NAME\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
mysql -u root -p"$DB_ROOT_PASS" -e "CREATE USER IF NOT EXISTS '${APP_USER}'@'localhost' IDENTIFIED BY '$DB_APP_PASS';"
mysql -u root -p"$DB_ROOT_PASS" -e "GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, ALTER, INDEX, DROP, REFERENCES ON \`$DB_NAME\`.* TO '${APP_USER}'@'localhost';"
mysql -u root -p"$DB_ROOT_PASS" -e "FLUSH PRIVILEGES;"

# Bloquer MySQL depuis l'extérieur (bind uniquement sur localhost)
if ! grep -q "^bind-address" /etc/mysql/mysql.conf.d/mysqld.cnf 2>/dev/null; then
  echo "bind-address = 127.0.0.1" >> /etc/mysql/mysql.conf.d/mysqld.cnf
else
  sed -i 's/^bind-address.*/bind-address = 127.0.0.1/' /etc/mysql/mysql.conf.d/mysqld.cnf
fi
systemctl restart mysql
check_service mysql "MySQL"
ok "MySQL configuré (base: $DB_NAME, root séparé du user $APP_USER, bind: localhost uniquement)"

# ── 11. Node.js + PM2 + Nginx ─────────────────────────────────
echo ""
echo -e "${YELLOW}=== [11/13] Node.js + PM2 + Nginx ===${NC}"
if ! command -v node &>/dev/null; then
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash - > /dev/null 2>&1
  apt install -y -qq nodejs
fi
npm install -g pm2 -q
env PATH=$PATH:/usr/bin pm2 startup systemd -u "$APP_USER" --hp "$USER_HOME" > /dev/null 2>&1 || true
ok "Node.js $(node -v) et PM2 installés"

apt install -y -qq nginx

ok "Certificat Cloudflare Origin déjà installé (saisi au début du setup)"

cat > /etc/nginx/conf.d/security.conf << 'EOF'
server_tokens off;
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Permissions-Policy "camera=(), microphone=(), geolocation=()" always;
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://challenges.cloudflare.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://res.cloudinary.com; font-src 'self' data:; connect-src 'self' https://challenges.cloudflare.com; frame-src https://challenges.cloudflare.com; object-src 'none'; frame-ancestors 'none'; base-uri 'self';" always;

map $http_user_agent $blocked_agent {
  default           0;
  ~*masscan         1;
  ~*zgrab           1;
  ~*nikto           1;
  ~*sqlmap          1;
  ~*nmap            1;
  ~*python-requests 1;
  ~*go-http-client  1;
}
EOF

cat > /etc/nginx/sites-available/$DOMAIN << EOF
server {
    listen 80;
    server_name $DOMAIN;
    return 301 https://\$host\$request_uri;
}

server {
    listen 443 ssl;
    server_name $DOMAIN;

    ssl_certificate     /etc/ssl/cloudflare/cert.pem;
    ssl_certificate_key /etc/ssl/cloudflare/key.pem;
    ssl_protocols       TLSv1.2 TLSv1.3;
    ssl_ciphers         HIGH:!aNULL:!MD5;

    if (\$blocked_agent) { return 403; }

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }

    location /api/ {
        proxy_pass http://localhost:3001/;
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }

    location ~ /\. { deny all; }
    location ~ \.(env|git|sh|sql|bak)$ { deny all; }
}
EOF

ln -sf /etc/nginx/sites-available/$DOMAIN /etc/nginx/sites-enabled/$DOMAIN
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl enable nginx -q && systemctl reload nginx
ok "Nginx configuré pour $DOMAIN (SSL Cloudflare Origin)"

# ── 12. Clé deploy GitHub + clone + .env + Prisma + PM2 ──────
echo ""
echo -e "${YELLOW}=== [12/13] Déploiement projet ===${NC}"

mkdir -p /var/www
chown "$APP_USER:$APP_USER" /var/www

# Générer une clé SSH deploy pour l'accès GitHub
DEPLOY_KEY="$USER_HOME/.ssh/github_deploy"
sudo -u "$APP_USER" ssh-keygen -t ed25519 -C "deploy@$DOMAIN" -f "$DEPLOY_KEY" -N "" > /dev/null 2>&1
DEPLOY_KEY_PUB=$(cat "$DEPLOY_KEY.pub")

echo ""
echo -e "${RED}╔══════════════════════════════════════════════════════════════╗${NC}"
echo -e "${RED}║  ACTION REQUISE — Ajoute cette clé dans GitHub               ║${NC}"
echo -e "${RED}╚══════════════════════════════════════════════════════════════╝${NC}"
echo ""
echo "  Repo GitHub → Settings → Deploy keys → Add deploy key"
echo "  Title : deploy@$DOMAIN"
echo "  Key   : $DEPLOY_KEY_PUB"
echo ""
read -p "Clé ajoutée dans GitHub ? (o/n) : " KEY_OK
[[ "$KEY_OK" != "o" && "$KEY_OK" != "O" ]] && err "Ajoute la clé deploy avant de continuer."

# Configurer SSH pour utiliser la bonne clé avec GitHub
sudo -u "$APP_USER" bash -c "cat >> $USER_HOME/.ssh/config << 'SSHCONF'
Host github.com
  IdentityFile $DEPLOY_KEY
  IdentitiesOnly yes
SSHCONF"
chmod 600 "$USER_HOME/.ssh/config"

# Tester la connexion GitHub
sudo -u "$APP_USER" ssh -T git@github.com -o StrictHostKeyChecking=no 2>&1 | grep -q "successfully authenticated" \
  && ok "Connexion GitHub vérifiée" \
  || warn "Connexion GitHub non confirmée — continue quand même"

# Cloner le repo
info "Clone du repo $REPO_URL..."
sudo -u "$APP_USER" git clone "$REPO_URL" /var/www/QCM-Patentino
ok "Repo cloné dans /var/www/QCM-Patentino"

# Créer le .env backend (encoder les caractères spéciaux du mot de passe pour l'URL)
DB_APP_PASS_ENCODED=$(python3 -c "import urllib.parse; print(urllib.parse.quote('${DB_APP_PASS}', safe=''))")
cat > /var/www/QCM-Patentino/quiz-backend/.env << EOF
NODE_ENV=production
PORT=3001
DATABASE_URL="mysql://${APP_USER}:${DB_APP_PASS_ENCODED}@localhost:3306/${DB_NAME}"
JWT_SECRET=${JWT_SECRET}
CORS_ORIGIN=https://${DOMAIN}
TURNSTILE_SECRET_KEY=${TURNSTILE_SECRET_KEY}
EOF
chmod 600 /var/www/QCM-Patentino/quiz-backend/.env
chown "$APP_USER:$APP_USER" /var/www/QCM-Patentino/quiz-backend/.env
ok ".env backend créé"

cat > /var/www/QCM-Patentino/quiz-frontend/.env.local << EOF
NEXT_PUBLIC_TURNSTILE_SITE_KEY=${TURNSTILE_SITE_KEY}
EOF
chmod 600 /var/www/QCM-Patentino/quiz-frontend/.env.local
chown "$APP_USER:$APP_USER" /var/www/QCM-Patentino/quiz-frontend/.env.local
ok ".env.local frontend créé (Turnstile site key)"

# Installer les dépendances backend + créer les tables
info "npm ci backend + prisma db push + seed..."
sudo -u "$APP_USER" bash -c "cd /var/www/QCM-Patentino/quiz-backend && npm ci --silent && npx prisma db push && npx prisma generate && npx prisma db seed && npm prune --omit=dev --silent"
ok "Tables MySQL créées, client Prisma généré et données insérées"
npm_audit_check "/var/www/QCM-Patentino/quiz-backend" "" "quiz-backend"

# Installer les dépendances frontend
info "npm ci frontend..."
sudo -u "$APP_USER" bash -c "cd /var/www/QCM-Patentino/quiz-frontend && npm ci --legacy-peer-deps --silent && npm run build --silent"
ok "Dépendances frontend installées"
npm_audit_check "/var/www/QCM-Patentino/quiz-frontend" "--legacy-peer-deps" "quiz-frontend"

# Lancer PM2
sudo -u "$APP_USER" bash -c "cd /var/www/QCM-Patentino/quiz-frontend && pm2 start npm --name quiz-frontend -- start"
sudo -u "$APP_USER" bash -c "cd /var/www/QCM-Patentino/quiz-backend  && pm2 start npm --name quiz-backend  -- start"
sudo -u "$APP_USER" pm2 save
ok "PM2 lancé (quiz-frontend + quiz-backend)"

# ── 13. Patchs auto + rkhunter + Lynis ───────────────────────
echo ""
echo -e "${YELLOW}=== [13/13] Patchs auto + audit final ===${NC}"

cat > /etc/apt/apt.conf.d/50unattended-upgrades-custom << 'EOF'
Unattended-Upgrade::Automatic-Reboot "false";
Unattended-Upgrade::Mail "root";
Unattended-Upgrade::Remove-Unused-Dependencies "true";
EOF
systemctl enable unattended-upgrades -q
ok "Patchs automatiques activés"

info "Initialisation rkhunter..."
rkhunter --update > /dev/null 2>&1 || true
rkhunter --propupd > /dev/null 2>&1 || true
echo "0 3 * * 0 root /usr/bin/rkhunter --check --skip-keypress --report-warnings-only | msmtp $ALERT_EMAIL" \
  > /etc/cron.d/rkhunter-weekly
ok "rkhunter configuré (scan hebdo → $ALERT_EMAIL)"

# ── Anti-cryptomining ─────────────────────────────────────────
info "Configuration anti-cryptomining..."

# /etc/hosts blackhole — domaines de mining connus
cat >> /etc/hosts << 'EOF'

# Blackhole mining pools
0.0.0.0 pool.minexmr.com
0.0.0.0 xmr.pool.minergate.com
0.0.0.0 xmr-eu1.nanopool.org
0.0.0.0 xmr-eu2.nanopool.org
0.0.0.0 xmr-us-east1.nanopool.org
0.0.0.0 mine.c3pool.com
0.0.0.0 rx.unmineable.com
0.0.0.0 stratum.slushpool.com
0.0.0.0 btc.f2pool.com
0.0.0.0 eth.f2pool.com
0.0.0.0 xmr.f2pool.com
0.0.0.0 mining.doge.pool.mn
EOF
ok "Blackhole DNS mining pools configuré (/etc/hosts)"

# Script de détection/réaction anti-mining
cat > /usr/local/bin/anti-mining-check.sh << SCRIPT
#!/bin/bash
ALERT_EMAIL="$ALERT_EMAIL"
LOG="/var/log/anti-mining.log"
CPU_COUNTER="/tmp/.cpu_high_count"
HOST=\$(hostname)

send_alert() {
  printf "Subject: [ALERTE VPS \$HOST] \$1\n\n\$2\n\nDate: \$(date)\nServeur: \$HOST" | msmtp "\$ALERT_EMAIL" 2>/dev/null || true
  echo "\$(date '+%Y-%m-%d %H:%M:%S') ALERTE: \$1" >> "\$LOG"
}

# 1. Processus de mining connus — kill immédiat
MINING_PROCS="xmrig|kinsing|minerd|cpuminer|cryptonight|xmr-stak|nbminer|t-rex|phoenixminer|lolminer|teamredminer|ethminer"
FOUND=\$(ps aux | grep -E "\$MINING_PROCS" | grep -v grep)
if [ -n "\$FOUND" ]; then
  PIDS=\$(echo "\$FOUND" | awk '{print \$2}' | tr '\n' ' ')
  NAMES=\$(echo "\$FOUND" | awk '{print \$11}' | tr '\n' ', ')
  kill -9 \$PIDS 2>/dev/null || true
  send_alert "MINER DÉTECTÉ ET TUÉS — \$NAMES" "Processus suspects tués automatiquement:\n\$FOUND\nPIDs: \$PIDS"
fi

# 2. Connexions sortantes vers ports de mining
MINING_PORTS="3333|4444|14444|45560|3032|7777|8888|9999"
MINING_CONNS=\$(ss -tnp 2>/dev/null | grep -E ":\b(\$MINING_PORTS)\b" | grep -v "127.0.0.1")
if [ -n "\$MINING_CONNS" ]; then
  PIDS=\$(echo "\$MINING_CONNS" | grep -oP 'pid=\K[0-9]+' | sort -u)
  for PID in \$PIDS; do
    PROC=\$(ps -p \$PID -o comm= 2>/dev/null || echo "inconnu")
    kill -9 \$PID 2>/dev/null || true
    send_alert "CONNEXION MINING BLOQUÉE — \$PROC" "Connexion sortante vers port mining:\n\$MINING_CONNS\nProcessus tué: \$PROC (PID \$PID)"
  done
fi

# 3. CPU élevé — compteur sur 3 cycles (15 min) avant alerte
CPU=\$(top -bn1 | grep -E "^%?Cpu|^Cpu" | head -1 | awk -F'[:,]' '{for(i=1;i<=NF;i++) if(\$i ~ /us/) {gsub(/ /,"",\$(i-1)); print int(\$(i-1)); exit}}')
CPU=\${CPU:-0}
if [ "\$CPU" -ge 80 ] 2>/dev/null; then
  COUNT=\$(cat "\$CPU_COUNTER" 2>/dev/null || echo "0")
  COUNT=\$((COUNT + 1))
  echo "\$COUNT" > "\$CPU_COUNTER"
  if [ "\$COUNT" -ge 3 ]; then
    TOP_PROCS=\$(ps aux --sort=-%cpu | head -6 | tail -5)
    send_alert "CPU ÉLEVÉ — \${CPU}% depuis \$((COUNT * 5)) min" "CPU à \${CPU}% depuis \$((COUNT * 5)) minutes.\n\nTop processus:\n\$TOP_PROCS"
    echo "0" > "\$CPU_COUNTER"
  fi
else
  echo "0" > "\$CPU_COUNTER"
fi
SCRIPT

chmod +x /usr/local/bin/anti-mining-check.sh
echo "*/5 * * * * root /usr/local/bin/anti-mining-check.sh" > /etc/cron.d/anti-mining
ok "Script anti-mining configuré (cron toutes les 5 min, kill auto + alertes)"

# auditd — tracer toute création de processus suspect
cat > /etc/audit/rules.d/anti-mining.rules << 'EOF'
-a always,exit -F arch=b64 -S execve -F exe=/usr/bin/xmrig -k mining
-a always,exit -F arch=b64 -S execve -F exe=/tmp/xmrig -k mining
-w /tmp -p x -k tmp_exec
-w /var/tmp -p x -k tmp_exec
-w /dev/shm -p x -k shm_exec
EOF
systemctl enable auditd -q && systemctl restart auditd 2>/dev/null || true
ok "auditd configuré (surveillance exécution dans /tmp, /var/tmp, /dev/shm)"

# ClamAV — mise à jour base + scan quotidien
systemctl stop clamav-freshclam 2>/dev/null || true
freshclam --quiet 2>/dev/null || true
systemctl enable clamav-freshclam -q 2>/dev/null || true
systemctl start clamav-freshclam 2>/dev/null || true
echo "0 2 * * * root clamscan -r /var/www /tmp /var/tmp --quiet --infected --log=/var/log/clamav-scan.log && [ -s /var/log/clamav-scan.log ] && cat /var/log/clamav-scan.log | msmtp $ALERT_EMAIL" > /etc/cron.d/clamav-daily
ok "ClamAV configuré (scan quotidien /var/www + /tmp → alerte si infection)"

info "Audit Lynis final (peut prendre 2 min)..."
LYNIS_SCORE=$(lynis audit system --quiet 2>/dev/null | grep "Hardening index" | grep -oP '\d+' | head -1)
if [ -n "$LYNIS_SCORE" ]; then
  [ "$LYNIS_SCORE" -ge 80 ] \
    && ok "Lynis score : $LYNIS_SCORE/100 — Objectif atteint !" \
    || warn "Lynis score : $LYNIS_SCORE/100 — Objectif 80 non atteint"
fi

# Test API backend
sleep 3
API_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3001/module)
if [ "$API_STATUS" = "200" ]; then
  ok "API backend répond (HTTP 200)"
else
  warn "API backend ne répond pas (HTTP $API_STATUS)"
  add_warning "PM2 quiz-backend : API ne répond pas (HTTP $API_STATUS) — vérifie : su - $APP_USER -c 'pm2 logs quiz-backend'"
fi

FRONT_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000)
if [ "$FRONT_STATUS" = "200" ]; then
  ok "Frontend répond (HTTP 200)"
else
  warn "Frontend ne répond pas (HTTP $FRONT_STATUS)"
  add_warning "PM2 quiz-frontend : ne répond pas (HTTP $FRONT_STATUS) — vérifie : su - $APP_USER -c 'pm2 logs quiz-frontend'"
fi

# ── Résumé final ──────────────────────────────────────────────
echo ""
echo "============================================================"
if [ "${#WARNINGS_FINAL[@]}" -eq 0 ]; then
  echo -e "${GREEN} SETUP TERMINÉ — installation propre — $(date '+%Y-%m-%d %H:%M')${NC}"
  echo "============================================================"
  echo ""
  echo -e "${GREEN}  Aucune action requise.${NC}"
else
  echo -e "${RED} SETUP TERMINÉ AVEC AVERTISSEMENTS — $(date '+%Y-%m-%d %H:%M')${NC}"
  echo "============================================================"
  echo ""
  echo -e "${RED}╔══════════════════════════════════════════════════════════════╗${NC}"
  echo -e "${RED}║  ACTIONS REQUISES — À TRAITER IMPÉRATIVEMENT                ║${NC}"
  echo -e "${RED}╚══════════════════════════════════════════════════════════════╝${NC}"
  for w in "${WARNINGS_FINAL[@]}"; do
    echo -e "${RED}  ⚠ $w${NC}"
  done
fi
echo ""
echo "  Domaine     : https://$DOMAIN"
echo "  Port SSH    : $SSH_PORT"
echo "  User        : $APP_USER"
echo "  Base MySQL  : $DB_NAME"
if [ -n "$LYNIS_SCORE" ]; then
  if [ "$LYNIS_SCORE" -ge 80 ]; then
    echo -e "  Lynis score : ${GREEN}$LYNIS_SCORE/100 — objectif atteint${NC}"
  else
    echo -e "  Lynis score : ${RED}$LYNIS_SCORE/100 — objectif 80 non atteint${NC}"
    add_warning "Lynis score : $LYNIS_SCORE/100 — audit : lynis audit system --quick"
  fi
else
  echo    "  Lynis score : inconnu"
fi
echo ""
echo -e "${YELLOW}Vérifications :${NC}"
echo "  su - $APP_USER -c 'pm2 status'"
echo "  sudo fail2ban-client status"
echo "  sudo ufw status"
echo "  curl -s https://$DOMAIN | head -5"
echo "============================================================"
echo ""
echo -e "${YELLOW}╔══════════════════════════════════════════════════════════════╗${NC}"
echo -e "${YELLOW}║  ACTIONS POST-DÉPLOIEMENT (à faire manuellement)            ║${NC}"
echo -e "${YELLOW}╚══════════════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "${YELLOW}1. IONOS — Pare-feu réseau :${NC}"
echo "   → Ouvrir TCP 80  (HTTP  — requis pour Cloudflare proxy)"
echo "   → Ouvrir TCP 443 (HTTPS — requis pour Cloudflare proxy)"
echo "   → Supprimer la règle port 22 (si pas encore fait)"
echo "   → Garder seulement : port $SSH_PORT"
echo ""
echo -e "${YELLOW}2. Cloudflare — DNS :${NC}"
echo "   → dash.cloudflare.com > $DOMAIN > DNS"
echo "   → Ajouter enregistrement A : nom = qcm  cible = IP_DU_VPS  Proxied (orange)"
echo "   → (ou nom = @ pour la racine $DOMAIN)"
echo ""
echo -e "${YELLOW}3. Cloudflare — SSL/TLS :${NC}"
echo "   → dash.cloudflare.com > $DOMAIN > SSL/TLS > Overview"
echo "   → Mode : Full (strict)"
echo ""
echo -e "${YELLOW}4. Cloudflare — Turnstile (CAPTCHA) :${NC}"
echo "   → dash.cloudflare.com > Turnstile > sélectionner le widget"
echo "   → Ajouter les hostnames : $DOMAIN  et  qcm.$DOMAIN"
echo ""
echo -e "${GREEN}5. Cloudflare — Origin Certificate :${NC}"
echo "   ✓ Saisi au début du setup — /etc/ssl/cloudflare/cert.pem et key.pem"
echo ""
echo "============================================================"
