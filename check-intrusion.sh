#!/bin/bash
# ============================================================
# check-intrusion.sh — Vérification rapide d'intrusion VPS
# Usage : bash check-intrusion.sh
# ============================================================

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

ok()   { echo -e "${GREEN}[OK]${NC} $1"; }
warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }
alert(){ echo -e "${RED}[ALERTE]${NC} $1"; ALERTS=$((ALERTS+1)); }
info() { echo -e "${BLUE}[INFO]${NC} $1"; }

ALERTS=0

echo ""
echo "============================================================"
echo -e "  CHECK INTRUSION VPS — $(date '+%Y-%m-%d %H:%M')"
echo "============================================================"
echo ""

# ── 1. Processus malveillants connus ─────────────────────────
echo -e "${BLUE}[1/9] Processus suspects...${NC}"
MALWARE=$(ps aux | grep -E "xmrig|kinsing|scanner|minerd|ccminer|cryptonight|stratum|monero" | grep -v grep)
if [ -n "$MALWARE" ]; then
  alert "Processus malveillant détecté !"
  echo "$MALWARE"
else
  ok "Aucun processus malveillant connu"
fi

# ── 2. CPU anormalement élevé ────────────────────────────────
echo -e "${BLUE}[2/9] Charge CPU...${NC}"
CPU=$(top -bn1 | grep "Cpu(s)" | awk '{print $2}' | cut -d. -f1 2>/dev/null || echo "0")
if [ "$CPU" -gt 80 ] 2>/dev/null; then
  alert "CPU à ${CPU}% — top 5 processus :"
  ps aux --sort=-%cpu | head -6 | tail -5
elif [ "$CPU" -gt 50 ] 2>/dev/null; then
  warn "CPU à ${CPU}% (élevé mais pas critique)"
  ps aux --sort=-%cpu | head -4 | tail -3
else
  ok "CPU à ${CPU}%"
fi

# ── 3. Crontabs (root + tous les users) ──────────────────────
echo -e "${BLUE}[3/9] Crontabs...${NC}"
ROOT_CRON=$(crontab -l 2>/dev/null)
SYSTEM_CRON=$(cat /etc/cron* /var/spool/cron/crontabs/* 2>/dev/null | grep -v "^#" | grep -v "^$")
SUSPECT_CRON=$(echo "$ROOT_CRON $SYSTEM_CRON" | grep -E "curl|wget|bash -c|/tmp/\.|/dev/shm|base64|python.*http|perl.*http" 2>/dev/null)
if [ -n "$SUSPECT_CRON" ]; then
  alert "Crontab suspect :"
  echo "$SUSPECT_CRON"
else
  ok "Crontabs propres"
fi

# ── 4. Fichiers cachés dans /tmp et /dev/shm ─────────────────
echo -e "${BLUE}[4/9] Fichiers suspects dans /tmp...${NC}"
HIDDEN=$(find /tmp /dev/shm /var/tmp -name ".*" -o -name "*.sh" -o -executable -type f 2>/dev/null | grep -v "^$")
# Exclure les fichiers connus légitimes
HIDDEN_FILTERED=$(echo "$HIDDEN" | grep -v "\.cpu_high_count" | grep -v "snap" | grep -v "systemd" \
  | grep -v "\.ICE-unix" | grep -v "\.X11-unix" | grep -v "\.XIM-unix" | grep -v "\.font-unix" \
  | grep -v "^$")
if [ -n "$HIDDEN_FILTERED" ]; then
  alert "Fichiers suspects dans /tmp :"
  echo "$HIDDEN_FILTERED"
else
  ok "Pas de fichier suspect dans /tmp"
fi

# ── 5. Clés SSH autorisées ───────────────────────────────────
echo -e "${BLUE}[5/9] Clés SSH autorisées...${NC}"
SSH_COUNT=0
for user_home in /root /home/*; do
  AUTH="$user_home/.ssh/authorized_keys"
  if [ -f "$AUTH" ]; then
    COUNT=$(grep -c "ssh-" "$AUTH" 2>/dev/null || echo 0)
    SSH_COUNT=$((SSH_COUNT + COUNT))
    info "$(basename $user_home) : $COUNT clé(s) — $AUTH"
    cat "$AUTH" 2>/dev/null | while read line; do
      [ -z "$line" ] && continue
      echo "    $line"
    done
  fi
done
[ "$SSH_COUNT" -eq 0 ] && ok "Aucune clé SSH (accès root par mot de passe uniquement)"

# ── 6. Ports en écoute ───────────────────────────────────────
echo -e "${BLUE}[6/9] Ports en écoute...${NC}"
PORTS=$(ss -tlnp | grep LISTEN)
UNEXPECTED=$(echo "$PORTS" | grep -vE ":80|:443|:3000|:3001|:22|:54231|:3306|:33060|127\.0\.0\.(53|54):53|lo:53" | grep -v "^State")
if [ -n "$UNEXPECTED" ]; then
  alert "Port inattendu en écoute :"
  echo "$UNEXPECTED"
else
  ok "Ports en écoute normaux"
fi
echo "$PORTS" | grep -v "^State" | awk '{print "    " $4}' | sort

# ── 7. Connexions réseau établies ────────────────────────────
echo -e "${BLUE}[7/9] Connexions établies...${NC}"
CONNS=$(ss -tnp | grep ESTAB)
SUSPECT_CONN=$(echo "$CONNS" | grep -vE ":54231|:22|:443|:80|:3306" | grep -v "^$")
echo "$CONNS" | grep -v "^$" | awk '{print "    " $4 " → " $5}'
if [ -n "$SUSPECT_CONN" ]; then
  warn "Connexions à vérifier :"
  echo "$SUSPECT_CONN"
else
  ok "Connexions normales"
fi

# ── 8. Fichiers .bashrc / .profile modifiés récemment ────────
echo -e "${BLUE}[8/9] Backdoors bashrc/profile...${NC}"
BACKDOOR=0
for f in /root/.bashrc /root/.profile /root/.bash_profile /home/*/.bashrc /home/*/.profile; do
  [ -f "$f" ] || continue
  SUSPECT=$(grep -E "curl|wget|bash.*http|nc |ncat |/tmp/\." "$f" 2>/dev/null)
  if [ -n "$SUSPECT" ]; then
    alert "Backdoor dans $f :"
    echo "$SUSPECT"
    BACKDOOR=1
  fi
done
[ "$BACKDOOR" -eq 0 ] && ok "Pas de backdoor dans bashrc/profile"

# ── 9. Dernières connexions SSH ──────────────────────────────
echo -e "${BLUE}[9/9] Dernières connexions SSH...${NC}"
last | head -10

# ── Résumé ───────────────────────────────────────────────────
echo ""
echo "============================================================"
if [ "$ALERTS" -eq 0 ]; then
  echo -e "${GREEN}  SERVEUR PROPRE — aucune intrusion détectée — $(date '+%Y-%m-%d %H:%M')${NC}"
else
  echo -e "${RED}  $ALERTS ALERTE(S) DÉTECTÉE(S) — AGIR IMMÉDIATEMENT${NC}"
  echo ""
  echo -e "${RED}  Procédure d'urgence :${NC}"
  echo "  1. Identifier le PID : ps aux | grep -E 'xmrig|kinsing'"
  echo "  2. Tuer : kill -9 <PID>"
  echo "  3. Chercher persistance : crontab -l, ~/.bashrc, /var/tmp"
  echo "  4. Changer tous les mots de passe"
  echo "  5. git pull + npm ci + pm2 restart all"
fi
echo "============================================================"
echo ""
