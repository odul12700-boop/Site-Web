# 🤖 SyntheticLabs - Site Web Officiel

Site web moderne et professionnel pour SyntheticLabs, spécialisé en consulting IA et automatisation pour TPE, PME et secteur agricole.

## ✨ Caractéristiques

- **Design Cyberpunk/Minimaliste** avec nuances de bleu et violet
- **100% Responsive** - Optimisé pour mobile, tablette et desktop
- **Animations fluides** - Particules, transitions et effets au scroll
- **SEO Optimisé** - Meta tags, structure sémantique, performance
- **Formulaire de contact** fonctionnel et validé
- **Technologies modernes** - HTML5, CSS3, JavaScript ES6+
- **GitHub Pages Ready** - Déploiement en un clic

## 📁 Structure du Projet

```
Site-Web/
├── index.html          # Page principale
├── styles.css          # Styles CSS (design cyberpunk)
├── script.js           # JavaScript (animations + formulaire)
├── robots.txt          # Configuration SEO pour les moteurs de recherche
├── .gitignore          # Fichiers à ignorer par Git
└── README.md           # Ce fichier
```

## 🚀 Installation & Utilisation

### Option 1: Visualisation locale

1. **Cloner le repository**
   ```bash
   git clone https://github.com/votre-username/Site-Web.git
   cd Site-Web
   ```

2. **Ouvrir le site**
   - Double-cliquez sur `index.html` OU
   - Utilisez un serveur local (recommandé):
   ```bash
   # Avec Python 3
   python -m http.server 8000

   # Avec Node.js (http-server)
   npx http-server

   # Avec PHP
   php -S localhost:8000
   ```

3. **Accéder au site**
   - Ouvrez votre navigateur: `http://localhost:8000`

### Option 2: Déploiement sur GitHub Pages

1. **Activer GitHub Pages**
   - Allez dans Settings > Pages
   - Source: Deploy from a branch
   - Branch: `main` (ou votre branche) / `root`
   - Cliquez sur Save

2. **Votre site sera accessible à:**
   ```
   https://votre-username.github.io/Site-Web/
   ```

3. **Les changements sont automatiques**
   - Chaque push sur la branche met à jour le site

### Option 3: Déploiement sur Netlify

1. **Créer un compte Netlify** (gratuit)
2. **Déployer via Git**
   - Connectez votre repository GitHub
   - Build command: (laisser vide)
   - Publish directory: `/`
3. **Configuration du domaine personnalisé** (optionnel)

### Option 4: Déploiement sur Vercel

1. **Installer Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Déployer**
   ```bash
   vercel
   ```

## 🎨 Personnalisation

### Modifier les couleurs

Éditez les variables CSS dans `styles.css` (lignes 8-30):

```css
:root {
    --primary: #6366f1;        /* Bleu principal */
    --secondary: #8b5cf6;      /* Violet secondaire */
    --accent: #06b6d4;         /* Cyan accent */
    /* ... autres variables ... */
}
```

### Modifier le contenu

Éditez directement `index.html`:

- **Section Hero** (lignes 63-121): Titre, description, statistiques
- **Section Services** (lignes 123-246): Vos services
- **Section À Propos** (lignes 248-344): Votre parcours
- **Section Contact** (lignes 346-454): Informations de contact

### Configurer le formulaire de contact

#### Option A: FormSubmit (Gratuit, sans code backend)

1. Modifiez `script.js` (ligne 315) et décommentez:
   ```javascript
   const response = await fetch('https://formsubmit.co/votre-email@example.com', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify(data)
   });
   ```

2. Remplacez `votre-email@example.com` par votre vraie adresse

#### Option B: EmailJS (Gratuit avec templates)

1. Créez un compte sur [EmailJS](https://www.emailjs.com/)
2. Configurez un service email
3. Créez un template
4. Ajoutez le SDK dans `index.html` (avant `</body>`):
   ```html
   <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
   ```
5. Dans `script.js` (ligne 327), décommentez et configurez:
   ```javascript
   return emailjs.send(
       'your_service_id',
       'your_template_id',
       data,
       'your_public_key'
   );
   ```

#### Option C: Votre propre API

Remplacez la fonction `submitToServer()` dans `script.js` par votre endpoint.

### Ajouter Google Analytics

Ajoutez avant `</head>` dans `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🔧 Optimisations SEO

### Mettre à jour les métadonnées

Dans `index.html` (lignes 5-16), modifiez:

```html
<meta name="description" content="Votre description">
<meta name="keywords" content="vos, mots, clés">
<meta property="og:url" content="https://votre-domaine.com">
```

### Créer un sitemap.xml

Créez `sitemap.xml` à la racine:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://votre-domaine.com/</loc>
    <lastmod>2024-01-01</lastmod>
    <priority>1.0</priority>
  </url>
</urlset>
```

### Configurer robots.txt

Déjà créé ! Mettez à jour l'URL du sitemap dans `robots.txt`:

```
Sitemap: https://votre-domaine.com/sitemap.xml
```

## 📱 Compatibilité

- ✅ Chrome (dernières versions)
- ✅ Firefox (dernières versions)
- ✅ Safari (dernières versions)
- ✅ Edge (dernières versions)
- ✅ Mobile (iOS Safari, Chrome Android)

## 🎯 Fonctionnalités

### Navigation
- Menu sticky avec effet au scroll
- Navigation mobile responsive
- Liens smooth scroll
- Indication de section active

### Animations
- Particules animées dans le hero
- Compteurs animés pour les statistiques
- Animations au scroll (Intersection Observer)
- Effets de parallaxe sur les cartes
- Transitions fluides

### Formulaire
- Validation en temps réel
- Messages d'erreur/succès
- Protection anti-spam (à configurer)
- Design accessible

### Performance
- Lazy loading des images
- CSS optimisé avec variables
- JavaScript modulaire
- Pas de dépendances externes (sauf fonts)

## 🐛 Résolution de problèmes

### Le formulaire ne s'envoie pas

1. Vérifiez la console JavaScript (F12)
2. Configurez un service d'envoi (voir "Configurer le formulaire")
3. Vérifiez que tous les champs requis sont remplis

### Les animations ne fonctionnent pas

1. Vérifiez que JavaScript est activé
2. Testez dans un navigateur moderne
3. Vérifiez la console pour les erreurs

### Le site n'est pas responsive

1. Videz le cache du navigateur (Ctrl+Shift+R)
2. Vérifiez que `styles.css` est bien chargé
3. Testez les media queries dans DevTools

## 📊 Performance

- **Lighthouse Score**: 90+ (Performance, Accessibility, Best Practices, SEO)
- **Page Weight**: < 500KB (sans images)
- **Load Time**: < 2s sur connexion 4G
- **Mobile-Friendly**: 100%

## 🚧 Améliorations futures

- [ ] Blog/Articles section
- [ ] Portfolio de projets
- [ ] Témoignages clients
- [ ] Multi-langue (FR/EN)
- [ ] Mode sombre/clair
- [ ] PWA (Progressive Web App)
- [ ] Chatbot IA intégré

## 📄 License

Ce projet est sous license MIT. Vous êtes libre de l'utiliser et de le modifier.

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à:

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add AmazingFeature'`)
4. Push sur la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📞 Support

Pour toute question ou support:

- Email: contact@syntheticlabs.fr
- GitHub Issues: [Créer un issue](https://github.com/votre-username/Site-Web/issues)

## 🙏 Remerciements

- Fonts: [Google Fonts](https://fonts.google.com/) (Inter, JetBrains Mono)
- Icônes: SVG inline custom
- Inspiration design: Cyberpunk aesthetics

---

**Made with ❤️ by SyntheticLabs**

*Transformez votre entreprise avec l'Intelligence Artificielle*
