# Ministère ECEL — application Android

Ce dossier contient tout pour obtenir l'APK **sans installer Android Studio** : GitHub le construit pour vous.

## 1. Configurer Firebase
Ouvrir `www/index.html` dans un éditeur de texte, repérer `const FIREBASE_CONFIG={apiKey:"",...}` et coller vos valeurs
(console Firebase > Paramètres du projet > Vos applications > Application web). Sans cela, l'application reste en mode local (un seul téléphone).

## 2. Envoyer sur GitHub
Créer un dépôt (privé) puis, dans ce dossier :
```
git init
git add .
git commit -m "Ministère ECEL Android"
git branch -M main
git remote add origin https://github.com/VOTRE-COMPTE/ministere-ecel.git
git push -u origin main
```
(ou « Add file > Upload files » sur le site GitHub en glissant tout le contenu du dossier, y compris `.github`).

## 3. Récupérer l'APK
Onglet **Actions** du dépôt : le travail « Construire l'APK » démarre seul (5 à 10 minutes).
Quand il est vert, l'APK est dans **Releases** (colonne de droite du dépôt) : fichier `Ministere-ECEL.apk`.
Télécharger sur le téléphone, ouvrir, autoriser « Installer des applications inconnues » si Android le demande.

## Mises à jour
Modifier `www/index.html`, pousser sur GitHub : une nouvelle version apparaît dans Releases. Elle s'installe par-dessus l'ancienne
(même clé de signature, `ecel.keystore`), sans perdre les données du téléphone.

## À savoir
- Les rappels de prière (22h, mardi/jeudi, vendredi, veillée du dernier vendredi) sont de vraies notifications Android : ils sonnent application fermée.
  Au premier lancement, accepter l'autorisation de notifications.
- Pour publier sur le Play Store, créez votre propre clé de signature privée et ne gardez pas `ecel.keystore` dans un dépôt public.
- Firebase : le domaine d'origine de l'application est `localhost` ; il est déjà autorisé par défaut pour la connexion par e-mail.

## Firebase (projet `minitere-ecel`)
Package Android : `ci.ecel.ministere`
Empreintes de la clé de signature (`ecel.keystore`), à renseigner dans Firebase si demandé :
- SHA-1 : `6A:05:FB:FA:80:D9:5E:A5:F8:45:66:79:3E:AD:D1:21:BC:8F:50:F5`
- SHA-256 : `55:81:89:C1:89:1E:D8:A2:2B:2C:9A:0B:93:B4:04:71:52:9D:31:3D:06:45:78:CA:D4:2E:11:55:50:10:18:B4`

1. Console > Paramètres du projet > Vos applications > **Ajouter une application > Android** : nom du package `ci.ecel.ministere`, coller le SHA-1 ci-dessus, enregistrer.
2. Télécharger `google-services.json` et le déposer **à la racine de ce dépôt** (à côté de package.json) : le workflow l'installe automatiquement.
3. Ajouter aussi une application **Web** (</>) et coller son `firebaseConfig` (apiKey, appId, messagingSenderId, storageBucket) dans `www/index.html`.
4. Authentication > Sign-in method > **E-mail/Mot de passe** > Activer.
5. Firestore Database > créer en mode production, puis publier `firestore.rules` (ou `firebase deploy --only firestore:rules`).

Équivalent en ligne de commande (firebase-tools) :
```
npm install -g firebase-tools
firebase login
firebase use minitere-ecel
firebase apps:create ANDROID "Ministère ECEL" --package-name ci.ecel.ministere
firebase apps:create WEB "Ministère ECEL Web"
firebase apps:sdkconfig WEB          # affiche le firebaseConfig à coller dans www/index.html
firebase deploy --only firestore:rules
```
