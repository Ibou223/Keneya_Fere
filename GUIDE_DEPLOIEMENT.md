# Guide de déploiement et d'utilisation de l'application KENEYA FERE

## Introduction

KENEYA FERE est une application web de santé responsive qui offre plusieurs fonctionnalités essentielles pour améliorer l'accès aux services de santé et aux informations médicales. Cette application a été développée avec Next.js, React et Tailwind CSS pour garantir une expérience utilisateur optimale sur tous types d'appareils.

## Fonctionnalités principales

1. **Répertoire numérique des structures de santé**
   - Liste des établissements de santé (CSCom, CsRef, Hôpitaux, CHU, Laboratoires, Pharmacies)
   - Géolocalisation basée sur la position de l'utilisateur
   - Filtrage par type d'établissement et recherche

2. **Fiche médicale personnelle**
   - Informations personnelles de santé
   - Carnet de vaccination
   - Historique des visites médicales
   - Résultats d'analyses avec possibilité de capture photo

3. **Conseils médicaux en vidéos**
   - Vidéos éducatives classées par catégories
   - Système de recherche
   - Lecteur vidéo intégré

4. **Trousse de secours virtuelle**
   - Guides illustrés des gestes de premiers secours
   - Vidéos explicatives
   - Recherche par type d'urgence

## Prérequis pour le déploiement

- Node.js (version 14.x ou supérieure)
- npm ou yarn
- Accès à un service d'hébergement (Vercel, Netlify, ou serveur personnel)

## Instructions de déploiement

### Option 1: Déploiement local (pour tests)

1. Clonez le dépôt de l'application:
   ```
   git clone [URL_DU_REPO] keneya-fere
   cd keneya-fere
   ```

2. Installez les dépendances:
   ```
   npm install
   ```

3. Lancez le serveur de développement:
   ```
   npm run dev
   ```

4. Accédez à l'application via votre navigateur à l'adresse: `http://localhost:3000`

### Option 2: Déploiement sur Vercel (recommandé)

1. Créez un compte sur [Vercel](https://vercel.com) si vous n'en avez pas déjà un

2. Installez l'outil CLI Vercel:
   ```
   npm install -g vercel
   ```

3. Connectez-vous à votre compte Vercel:
   ```
   vercel login
   ```

4. Déployez l'application:
   ```
   cd keneya-fere
   vercel
   ```

5. Suivez les instructions à l'écran pour finaliser le déploiement

6. Une fois le déploiement terminé, Vercel vous fournira une URL pour accéder à votre application

### Option 3: Déploiement sur un serveur personnel

1. Construisez l'application pour la production:
   ```
   cd keneya-fere
   npm run build
   ```

2. Le dossier `.next` contient les fichiers de l'application compilée

3. Transférez les fichiers suivants sur votre serveur:
   - Dossier `.next`
   - Dossier `public`
   - Fichier `package.json`
   - Fichier `next.config.js`

4. Sur votre serveur, installez les dépendances:
   ```
   npm install --production
   ```

5. Démarrez l'application:
   ```
   npm start
   ```

## Guide d'utilisation

### Répertoire des structures de santé

1. Accédez à la page "Répertoire" depuis le menu principal
2. Autorisez l'accès à votre position géographique lorsque demandé
3. Utilisez les filtres pour affiner votre recherche par type d'établissement
4. Cliquez sur un marqueur sur la carte ou sur un établissement dans la liste pour voir ses détails

### Fiche médicale personnelle

1. Accédez à la page "Fiche Médicale" depuis le menu principal
2. Naviguez entre les différents onglets:
   - Informations personnelles: pour saisir vos données de santé générales
   - Carnet de vaccination: pour enregistrer vos vaccins et rappels
   - Visites médicales: pour consigner l'historique de vos consultations
   - Résultats d'analyses: pour stocker vos examens médicaux avec possibilité de prendre des photos

### Conseils médicaux

1. Accédez à la page "Conseils" depuis le menu principal
2. Parcourez les différentes catégories de conseils
3. Utilisez la barre de recherche pour trouver des vidéos spécifiques
4. Cliquez sur une vignette pour visionner la vidéo correspondante

### Trousse de secours virtuelle

1. Accédez à la page "Trousse de Secours" depuis le menu principal
2. Sélectionnez une situation d'urgence
3. Suivez les étapes détaillées avec images et vidéos
4. Utilisez la barre de recherche pour trouver rapidement une situation spécifique

## Remarques importantes

- L'application est entièrement responsive et s'adapte à tous les types d'écrans (ordinateurs, tablettes, smartphones)
- Les données médicales sont stockées localement sur l'appareil de l'utilisateur pour garantir la confidentialité
- En cas d'urgence réelle, il est toujours recommandé d'appeler les services d'urgence (SAMU: 15, Pompiers: 18, Numéro d'urgence européen: 112)

## Support technique

Pour toute question ou assistance technique, veuillez contacter:
- Email: support@keneyafere.ml
- Téléphone: +223 XX XX XX XX

---

© 2025 KENEYA FERE - Tous droits réservés
