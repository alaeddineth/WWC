# Stratégie RSO — Wallah We Can

Site statique (HTML, CSS, JavaScript) qui présente les résultats du mémoire et permet
de suivre la mise en œuvre de la stratégie RSO :

- tableau de bord (maturité, indicateurs, avancement des actions par axe) ;
- feuille de route interactive (responsable, échéance, budget, statut) ;
- 23 indicateurs avec référence, cible, dernière valeur, source et responsable,
  filtre par axe, export Excel (CSV) et PDF ;
- générateur de rapport RSO périodique, à enregistrer en PDF.

Aucune installation ni compilation n'est nécessaire.

## Mettre à jour les données (référent RSO)

Tout se trouve dans **`data.js`**. Sur GitHub : ouvrir le fichier, cliquer sur le crayon
(« Edit »), modifier, puis « Commit changes ». Vercel republie le site en une minute.

| Ce que vous voulez faire | Où, dans `data.js` |
| --- | --- |
| Changer la date de mise à jour | `meta.miseAJour: "2026-10-22"` |
| Fixer la date de lancement | `meta.lancement: "2027-01-01"` (les échéances deviennent des dates ; une action non réalisée dont l'échéance est dépassée passe automatiquement « En retard ») |
| Changer le statut d'une action | dans `feuille`, `statut: "À lancer"`, `"En cours"` ou `"Réalisée"` |
| Indiquer un budget | dans `feuille`, `budget: 5000` (en TND) |
| Saisir la dernière valeur d'un indicateur | dans `kpi`, `actuel: "3,8 / 5"` |
| Afficher l'évolution d'un indicateur | dans `kpi`, `historique: [{ date: "2027-03", valeur: 12 }, { date: "2027-06", valeur: 18 }]` |
| Renseigner les crédits | `meta.credits` |

Une valeur non disponible reste `null` : le site affiche alors « À mesurer ».
N'inscrivez jamais une valeur estimée comme si elle était mesurée.

## Limite volontaire

Le site est public : il ne contient aucune donnée interne ni personnelle.
Un espace privé avec connexion (rôles administrateur, référent RSO, chef de projet,
direction) nécessiterait une base de données et un service d'authentification
(par exemple Supabase), à ajouter dans une version ultérieure.

## Déployer sur Vercel

1. Mettre ces fichiers dans un dépôt GitHub (`index.html` à la racine).
2. Sur vercel.com : « Add New… > Project », choisir le dépôt, « Deploy ».
