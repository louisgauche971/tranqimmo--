# Tranqimmo — Prototype investisseurs

Site vitrine statique (HTML/CSS/JS) **très présentable** pour partenaires & investisseurs.

## Déploiement sur Vercel
1) Upload les fichiers sur GitHub  
2) Vercel → New Project → Import repository → Deploy

## Formulaire (sur Vercel)
Vercel ne traite pas les formulaires “sans serveur” par défaut.
- Recommandé : Formspree
  1) Crée un form sur formspree.io
  2) Remplace dans index.html : action="https://formspree.io/f/yourFormId"
- Sinon : bouton “Envoyer par email” (déjà inclus)

## À personnaliser
- Remplacer contact@tranqimmo.fr dans index.html + script.js
- Mettre votre lien Formspree
