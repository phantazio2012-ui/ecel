// Charge ecel-seed-firestore.json dans Firestore (rôles, programme, prières, rotation des versets).
// Usage :
//   1) npm install firebase-admin
//   2) Console Firebase > Paramètres du projet > Comptes de service > "Générer une nouvelle clé privée"
//      -> enregistrer le fichier sous le nom  cle-service.json  dans ce dossier (ne jamais le partager ni le publier).
//   3) node seed.js
const admin = require('firebase-admin');
const data = require('./ecel-seed-firestore.json');
admin.initializeApp({ credential: admin.credential.cert(require('./cle-service.json')) });
const db = admin.firestore();
(async () => {
  const entries = Object.entries(data);
  for (let i = 0; i < entries.length; i += 400) {
    const batch = db.batch();
    entries.slice(i, i + 400).forEach(([path, doc]) => batch.set(db.doc(path), doc));
    await batch.commit();
  }
  console.log(entries.length + ' documents envoyés.');
})().catch(e => { console.error(e); process.exit(1); });
