// Données issues du mémoire « Stratégie RSO fondée sur l'ISO 26000 — cas de Wallah We Can »
window.RSO = {
  /* ------------------------------------------------------------------
     PARAMÈTRES À METTRE À JOUR PAR LE RÉFÉRENT RSO
     - miseAJour : date de la dernière mise à jour des données (AAAA-MM-JJ)
     - lancement : date de lancement officiel de la démarche (AAAA-MM-JJ),
       ou null tant qu'elle n'est pas fixée. Dès qu'elle est renseignée,
       les échéances s'affichent en dates réelles et les actions non
       réalisées dont l'échéance est dépassée passent « En retard ».
     ------------------------------------------------------------------ */
  meta: {
    miseAJour: "2026-10-22",
    lancement: null,
    credits: {
      auteur: "[Prénom NOM]",
      encadrant: "[Mme / M. Prénom NOM]",
      maitreStage: "[Mme / M. Prénom NOM]",
      developpeurs: "[Prénoms NOMS]",
    },
  },

  domaines: [
    { nom: "Gouvernance et redevabilité", court: "Gouvernance", score: 4, note: "Chartes publiées, états financiers audités, déclarations de dons ; décisions stratégiques centralisées." },
    { nom: "Droits de l'Homme et protection de l'enfance", court: "Droits / protection", score: 4, note: "Politique de protection de l'enfance formalisée et intégrée aux projets." },
    { nom: "Conditions de travail internes", court: "Conditions de travail", score: 3, note: "Charte de bonne conduite publiée ; politique RH globale et cadre des bénévoles à formaliser." },
    { nom: "Environnement : pratiques", court: "Environnement (pratiques)", score: 4, note: "Énergie solaire, agriculture durable, valorisation des ressources locales." },
    { nom: "Environnement : mesure", court: "Environnement (mesure)", score: 2, note: "Indicateurs non systématisés ; pas de politique environnementale à l'échelle de l'organisation." },
    { nom: "Loyauté des pratiques", court: "Loyauté", score: 4, note: "États audités, conventions, procédures financières formalisées." },
    { nom: "Bénéficiaires", court: "Bénéficiaires", score: 4, note: "Projets co-construits à partir des besoins ; pas de retour standardisé des bénéficiaires." },
    { nom: "Communautés et développement local", court: "Communautés", score: 4, note: "Partenariats institutionnels, emplois locaux, ancrage territorial." },
    { nom: "Intégration RSO globale", court: "Intégration RSO", score: 3, note: "Pratiques nombreuses mais pas de système RSO piloté de façon transversale." },
  ],
  niveaux: ["", "Initial", "Émergent", "En développement", "Intégré", "Exemplaire"],

  enjeux: [
    { code: "E1", nom: "Pilotage et reporting RSO intégré", pp: 4.6, mission: 4.5, axe: 1 },
    { code: "E2", nom: "Mesure et preuve de l'impact social", pp: 4.8, mission: 4.7, axe: 4 },
    { code: "E3", nom: "Protection de l'enfance à grande échelle", pp: 4.9, mission: 4.4, axe: 2 },
    { code: "E4", nom: "Politique RH et cadre du bénévolat", pp: 3.6, mission: 4.2, axe: 2 },
    { code: "E5", nom: "Mesure environnementale (CO₂, eau, déchets)", pp: 3.9, mission: 3.8, axe: 3 },
    { code: "E6", nom: "Retour structuré des bénéficiaires", pp: 4.2, mission: 4.0, axe: 4 },
    { code: "E7", nom: "Partage de la gouvernance et continuité", pp: 3.8, mission: 4.6, axe: 1 },
    { code: "E8", nom: "Diversification des ressources", pp: 3.7, mission: 4.1, axe: 1 },
    { code: "E9", nom: "Achats responsables", pp: 2.6, mission: 2.9, axe: 3 },
    { code: "E10", nom: "Suivi de l'égalité femmes-hommes", pp: 3.0, mission: 3.1, axe: 2 },
    { code: "E11", nom: "Empreinte du fonctionnement interne", pp: 2.3, mission: 2.4, axe: 3 },
    { code: "E12", nom: "Redevabilité envers les entreprises partenaires", pp: 4.4, mission: 3.9, axe: 1 },
  ],

  axes: [
    { n: 1, court: "Pilotage RSO", nom: "Pilotage RSO et valorisation de l'impact", couleur: "#16264A", iso: "6.2 · 6.6", odd: "16, 17",
      objectif: "Publier d'ici 12 mois un premier rapport RSO structuré selon l'ISO 26000, avec un reporting dédié aux partenaires.",
      actions: ["Nommer le référent RSO", "Installer le comité de pilotage RSO", "Définir les 23 indicateurs", "Rédiger et publier le rapport annuel", "Standardiser la fiche de suivi des partenaires"] },
    { n: 2, court: "Capital humain", nom: "Capital humain et conditions de travail dignes", couleur: "#E4572E", iso: "6.3 · 6.4", odd: "5, 8",
      objectif: "Formaliser d'ici 9 mois la politique RH et la charte des bénévoles, applicables à la cohorte de l'Ambassade de l'Enfance.",
      actions: ["Rédiger la charte des bénévoles", "Créer le livret d'accueil", "Instaurer les entretiens annuels", "Suivre les indicateurs d'égalité", "Former 100 % des jeunes diplômés avant déploiement"] },
    { n: 3, court: "Environnement", nom: "Excellence environnementale documentée", couleur: "#2F7D4F", iso: "6.5 · 6.6", odd: "7, 12, 13",
      objectif: "Publier d'ici 6 mois un premier bilan environnemental annuel.",
      actions: ["Collecter kWh, CO₂, surfaces et eau", "Rédiger la politique environnementale", "Lancer le bilan carbone", "Construire une grille d'achats responsables"] },
    { n: 4, court: "Impact territorial", nom: "Dialogue avec les parties prenantes et impact territorial", couleur: "#7A5195", iso: "6.3 · 6.7 · 6.8", odd: "1, 3, 4, 5, 10",
      objectif: "Recueillir d'ici 6 mois le retour des bénéficiaires des quatre projets en Tunisie.",
      actions: ["Concevoir un questionnaire par projet", "Former les équipes de terrain", "Construire un cadre logique par projet", "Lancer une étude SROI sur GreenSchool"] },
  ],

  /* ------------------------------------------------------------------
     FEUILLE DE ROUTE
     statut : "À lancer" | "En cours" | "Réalisée" | "En retard"
     debut / fin : en mois après le lancement
     budget : montant estimé en TND, ou null si non estimé
     ------------------------------------------------------------------ */
  feuille: [
    { axe: 1, action: "Nommer le référent RSO et installer le comité de pilotage", debut: 0, fin: 3, responsable: "Président-fondateur", indicateur: "Comité installé ; 4 réunions par an", budget: null, statut: "À lancer" },
    { axe: 1, action: "Définir et documenter les 23 indicateurs", debut: 1, fin: 4, responsable: "Référent RSO", indicateur: "Fiches indicateurs validées par le comité", budget: null, statut: "À lancer" },
    { axe: 1, action: "Fiche de suivi standard des partenaires ; mise à jour du dossier de partenariat", debut: 3, fin: 6, responsable: "Référent RSO", indicateur: "100 % des partenaires destinataires", budget: null, statut: "À lancer" },
    { axe: 1, action: "Rédiger et publier le premier rapport RSO annuel", debut: 6, fin: 12, responsable: "Référent RSO", indicateur: "Rapport publié sur le site", budget: null, statut: "À lancer" },
    { axe: 2, action: "Actualiser la politique de protection de l'enfance et intégrer un dispositif de signalement", debut: 0, fin: 3, responsable: "Référent RSO et responsable administrative", indicateur: "Politique actualisée ; part de l'équipe formée", budget: null, statut: "À lancer" },
    { axe: 2, action: "Former les 250 jeunes diplômés à la protection de l'enfance avant déploiement", debut: 0, fin: 6, responsable: "Référent RSO et chefs de projet", indicateur: "100 % de la cohorte formée", budget: null, statut: "À lancer" },
    { axe: 2, action: "Charte des bénévoles, livret d'accueil et entretiens annuels", debut: 4, fin: 9, responsable: "Responsable administrative", indicateur: "Charte publiée ; taux d'entretiens réalisés", budget: null, statut: "À lancer" },
    { axe: 2, action: "Prévention des risques psychosociaux et suivi de la charge de travail", debut: 6, fin: 12, responsable: "Référent RSO", indicateur: "Satisfaction des équipes ≥ 4/5", budget: null, statut: "À lancer" },
    { axe: 3, action: "Premier bilan environnemental annuel (kWh, CO₂, surfaces, eau)", debut: 1, fin: 6, responsable: "Chefs de projet GreenSchool", indicateur: "Bilan publié ; CO₂ calculé", budget: null, statut: "À lancer" },
    { axe: 3, action: "Rédiger et publier la politique environnementale", debut: 5, fin: 9, responsable: "Référent RSO", indicateur: "Politique en ligne", budget: null, statut: "À lancer" },
    { axe: 3, action: "Grille d'évaluation des fournisseurs selon des critères RSE", debut: 8, fin: 12, responsable: "Responsable administrative", indicateur: "Nombre de fournisseurs évalués", budget: null, statut: "À lancer" },
    { axe: 4, action: "Questionnaires de satisfaction sur les quatre projets", debut: 2, fin: 6, responsable: "Référent RSO et chefs de projet", indicateur: "Satisfaction ≥ 4/5 ; nombre de répondants", budget: null, statut: "À lancer" },
    { axe: 4, action: "Cadre logique d'impact pour chaque projet", debut: 4, fin: 10, responsable: "Référent RSO et chefs de projet", indicateur: "Quatre cadres logiques validés", budget: null, statut: "À lancer" },
    { axe: 4, action: "Étude SROI sur GreenSchool", debut: 9, fin: 18, responsable: "Référent RSO et équipe", indicateur: "Rapport SROI publié", budget: null, statut: "À lancer" },
  ],

  /* ------------------------------------------------------------------
     23 INDICATEURS
     ref / actuel : valeur affichée, ou null si non disponible
     refStatut / actuelStatut :
       "declare"  = donnée déclarée par l'association
       "constate" = constaté lors du diagnostic (mémoire)
       "mesure"   = mesuré selon la méthode de l'indicateur
     historique : [{ date: "AAAA-MM", valeur: nombre }] pour tracer l'évolution
     ------------------------------------------------------------------ */
  kpi: [
    { axe: 1, nom: "Réunions du comité de pilotage RSO", unite: "Nombre / an", frequence: "Trimestrielle", ref: "0", refStatut: "constate", cible: "4 par an", actuel: null, source: "Comptes rendus", responsable: "Référent RSO" },
    { axe: 1, nom: "Publication du rapport RSO annuel", unite: "Oui/Non", frequence: "Annuelle", ref: "Non", refStatut: "constate", cible: "1 rapport publié", actuel: null, source: "Site officiel", responsable: "Référent RSO" },
    { axe: 1, nom: "Part de l'équipe sensibilisée à la RSO", unite: "%", frequence: "Semestrielle", ref: null, cible: "≥ 80 %", actuel: null, source: "Registres de participation", responsable: "Référent RSO" },
    { axe: 1, nom: "Indicateurs RSO suivis régulièrement", unite: "Nombre", frequence: "Trimestrielle", ref: "0", refStatut: "constate", cible: "23", actuel: null, source: "Tableau de bord", responsable: "Référent RSO" },
    { axe: 1, nom: "Audit financier indépendant réalisé", unite: "Oui/Non", frequence: "Annuelle", ref: "Oui (2020-2024)", refStatut: "declare", cible: "1 audit par an", actuel: null, source: "Rapport d'audit publié", responsable: "Responsable administrative et financière" },
    { axe: 1, nom: "Documents de gouvernance diffusés ou mis à jour", unite: "Nombre", frequence: "Annuelle", ref: null, cible: "+1 document", actuel: null, source: "Site officiel", responsable: "Référent RSO" },
    { axe: 1, nom: "Partenaires recevant un rapport périodique", unite: "%", frequence: "Semestrielle", ref: null, cible: "100 %", actuel: null, source: "Fiches de suivi", responsable: "Référent RSO" },
    { axe: 2, nom: "Taux de renouvellement des bénévoles", unite: "%", frequence: "Annuelle", ref: null, cible: "< 25 %", actuel: null, source: "Registre des bénévoles", responsable: "Responsable administrative" },
    { axe: 2, nom: "Satisfaction des équipes", unite: "Score /5", frequence: "Semestrielle", ref: null, cible: "≥ 4/5", actuel: null, source: "Questionnaire interne", responsable: "Référent RSO" },
    { axe: 2, nom: "Taux de réalisation des entretiens annuels", unite: "%", frequence: "Annuelle", ref: null, cible: "100 %", actuel: null, source: "Registre des entretiens", responsable: "Responsable administrative" },
    { axe: 2, nom: "Répartition femmes-hommes des équipes", unite: "%", frequence: "Annuelle", ref: null, cible: "Documentée et publiée", actuel: null, source: "Données RH", responsable: "Responsable administrative" },
    { axe: 2, nom: "Jeunes diplômés formés à la protection avant déploiement", unite: "%", frequence: "Annuelle", ref: null, cible: "100 %", actuel: null, source: "Registres de formation", responsable: "Chefs de projet" },
    { axe: 3, nom: "Production d'énergie solaire", unite: "kWh / an", frequence: "Annuelle", ref: null, cible: "+10 % vs année précédente", actuel: null, source: "Relevés des compteurs", responsable: "Chefs de projet GreenSchool", note: "Cumul affiché par l'association : 750 000 kWh. La production annuelle reste à mesurer." },
    { axe: 3, nom: "Émissions de CO₂ évitées", unite: "t CO₂", frequence: "Annuelle", ref: null, cible: "Calculées et publiées", actuel: null, source: "Bilan carbone documenté", responsable: "Chefs de projet GreenSchool" },
    { axe: 3, nom: "Surface en agriculture durable", unite: "ha", frequence: "Annuelle", ref: "≈ 65", refStatut: "declare", cible: "65 ha maintenus", actuel: null, source: "Rapports GreenSchool", responsable: "Chefs de projet GreenSchool" },
    { axe: 3, nom: "Réduction de la consommation de papier", unite: "%", frequence: "Annuelle", ref: null, cible: "-20 % vs référence", actuel: null, source: "Achats", responsable: "Responsable administrative" },
    { axe: 4, nom: "Bénéficiaires directs des projets", unite: "Nombre", frequence: "Trimestrielle", ref: "Plus de 9 000 enfants", refStatut: "declare", cible: "+15 % vs année précédente", actuel: null, source: "Rapports de projet", responsable: "Chefs de projet" },
    { axe: 4, nom: "Satisfaction des bénéficiaires", unite: "Score /5", frequence: "Semestrielle", ref: null, cible: "≥ 4/5", actuel: null, source: "Questionnaires", responsable: "Référent RSO et chefs de projet" },
    { axe: 4, nom: "Emplois créés ou maintenus", unite: "Nombre", frequence: "Annuelle", ref: "150", refStatut: "declare", cible: "≥ 150", actuel: null, source: "Rapports de projet", responsable: "Chefs de projet" },
    { axe: 4, nom: "Valeur sociale par dinar investi (SROI)", unite: "Ratio", frequence: "Annuelle", ref: null, cible: "Calculé et publié", actuel: null, source: "Étude SROI", responsable: "Référent RSO" },
    { axe: 4, nom: "Jeunes diplômés formés et déployés (Ambassade de l'Enfance)", unite: "Nombre", frequence: "Annuelle", ref: "0", refStatut: "constate", cible: "250", actuel: null, source: "Rapports de projet", responsable: "Chef de projet Ambassade de l'Enfance" },
    { axe: 4, nom: "Part des filles dans Crescendo", unite: "%", frequence: "Annuelle", ref: "54 %", refStatut: "declare", cible: "≥ 50 %", actuel: null, source: "Rapports Crescendo", responsable: "Cheffe de projet Crescendo" },
    { axe: 4, nom: "Produits Ecolibree vendus et offerts", unite: "Nombre", frequence: "Trimestrielle", ref: null, cible: "Ratio 1:1 publié", actuel: null, source: "Rapports Ecolibree", responsable: "Cheffe de projet Ecolibree" },
  ],
};
