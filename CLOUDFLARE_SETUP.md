# Configuration Cloudflare WAF

## 1. Créer un compte Cloudflare
https://dash.cloudflare.com/sign-up (gratuit)

## 2. Ajouter ton domaine
- "Add a site" → entrer `mandev.fr`
- Choisir le plan **Free**
- Cloudflare affiche tes enregistrements DNS actuels → vérifier qu'ils sont corrects

## 3. Changer les nameservers chez IONOS
Cloudflare donne deux nameservers (ex: `amos.ns.cloudflare.com`).
Dans l'espace client IONOS : Domaines → mandev.fr → Nameservers → remplacer par ceux de Cloudflare.
Propagation : 5 min à 48h.

## 4. Activer le proxy Cloudflare (orange cloud)
Dans DNS → s'assurer que les enregistrements A pointant vers `87.106.201.186` ont le proxy **activé** (icône nuage orange).
→ Le trafic passe par Cloudflare avant d'atteindre ton serveur. L'IP de ton VPS est masquée.

## 5. SSL/TLS
Settings → SSL/TLS → Mode : **Full (strict)**
(Certbot gère le SSL entre Cloudflare et ton serveur)

## 6. WAF — Règles de sécurité recommandées
Security → WAF → Create rule

### Règle 1 : Bloquer les bots connus malveillants
```
(cf.client.bot) and not (cf.verified_bot_category in {"Search Engine Crawler"})
```
Action : **Block**

### Règle 2 : Bloquer les pays à risque (optionnel)
```
(ip.geoip.country in {"CN" "RU" "KP" "IR"})
```
Action : **Challenge** (CAPTCHA Turnstile automatique)

### Règle 3 : Protéger login/signup
```
(http.request.uri.path contains "/api/users/login" or http.request.uri.path contains "/api/users/signup") and (cf.threat_score gt 10)
```
Action : **Challenge**

## 7. Rate Limiting Cloudflare (gratuit : 10k req/mois)
Security → WAF → Rate limiting rules

```
Chemin    : /api/users/login
Méthode   : POST
Seuil     : 5 requêtes / 1 minute
Action    : Block (durée 1h)
```
Idem pour `/api/users/signup`.

## 8. Bot Fight Mode
Security → Bots → **Bot Fight Mode** → ON (gratuit)

## 9. Under Attack Mode (si attaque en cours)
Security → Overview → "Under Attack Mode" → toutes les visites passent par un challenge Turnstile.

## 10. Turnstile (CAPTCHA invisible)
Turnstile → Add site
- Domaine : `mandev.fr`
- Type : **Managed** (invisible si comportement normal, challenge si suspect)
- Copier **Site Key** → `NEXT_PUBLIC_TURNSTILE_SITE_KEY` dans setup.sh
- Copier **Secret Key** → `TURNSTILE_SECRET_KEY` dans setup.sh

## Résultat final
- IP du VPS masquée derrière Cloudflare
- DDoS Layer 3/4 absorbé par Cloudflare
- WAF bloque SQLi, XSS, path traversal automatiquement
- Bots malveillants bloqués avant d'atteindre le serveur
- CAPTCHA Turnstile invisible sur login/signup
