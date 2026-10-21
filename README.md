# Stratégie RSO — Wallah We Can

Site statique (HTML, CSS, JavaScript) qui présente les résultats du mémoire :
diagnostic de maturité RSO, matrice de matérialité, axes stratégiques,
feuille de route et tableau de bord de 23 indicateurs.

Aucune installation ni compilation n'est nécessaire.

## Déployer gratuitement sur Vercel

**Option 1 — sans ligne de commande**
1. Créer un compte gratuit sur https://vercel.com (connexion avec GitHub possible).
2. Mettre ce dossier dans un dépôt GitHub (bouton « Add file > Upload files »).
3. Sur Vercel : « Add New… > Project », choisir le dépôt, laisser « Framework Preset : Other », cliquer « Deploy ».
4. Le site est en ligne en moins d'une minute à une adresse du type `https://nom-du-projet.vercel.app`.

**Option 2 — en ligne de commande**
```bash
npm i -g vercel
cd site-rso-wallah-we-can
vercel --prod
```

## Tester en local
Ouvrir `index.html` dans un navigateur, ou lancer `npx serve .` dans le dossier.

## Modifier le contenu
- Textes : `index.html`
- Données (scores, enjeux, axes, feuille de route, indicateurs) : `data.js`
- Couleurs et mise en page : `styles.css`
- Images : dossier `assets/`

Pensez à remplacer les champs `[Prénom NOM]` dans la section « Crédits ».
