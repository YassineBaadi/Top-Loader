# 🧩 TOP-LOADER — Frontend (Next.js + Redux)

Bienvenue dans le dépôt du frontend du **TOP-LOADER**, une application e-commerce de cartes Pokémon permettant la navigation, l'achat, la collection, et l'ouverture de boosters.

## 🚀 Tech Stack

- **Framework principal** : [Next.js](https://nextjs.org/)
- **Langage** : JavaScript (ES6+)
- **State management** : [Redux Toolkit](https://redux-toolkit.js.org/)
- **Authentification** : NextAuth + localStorage (double source de vérité)
- **UI Components** : React / CSS modules
- **Backend API** : Connecté à une API distante (non incluse ici)
- **Images et assets** : Gérés localement ou via URL

---

## 🧠 Fonctionnalités principales

- 🔐 Authentification via Google ou formulaire local
- 🛒 Système de panier multi-profil (géré par `user.email`)
- 🎴 Ajout automatique à la collection après paiement
- 📦 Boosters contenant des cartes aléatoires
- 🎨 Filtres dynamiques dans le shop
- 🗃 Affichage conditionnel selon l’état d’authentification

---

## 📁 Structure du projet

```bash
/src
  ├── app/                    # Pages Next.js (client side)
  ├── components/             # UI components réutilisables (Header, Footer, etc.)
  ├── features/auth/          # Authentification locale (formulaire)
  ├── lib/helpers.js          # Hook `useCurrentUser()` pour centraliser l'utilisateur
  ├── redux/                  # Slices Redux (cart, pokemons, collection)
  ├── public/                 # Assets statiques (images)
```

---

## 🧩 Authentification : `useCurrentUser`

Le hook `useCurrentUser()` permet de **centraliser l'accès à l'utilisateur connecté** :

- Si l'utilisateur est connecté via Google → il récupère `session.user`
- Sinon → il lit `localStorage.getItem("currentUser")`
- Renvoie `{ user, isLoading }` pour compatibilité SSR/client

Exemple :

```js
const { user, isLoading } = useCurrentUser()
```

---

## ⚠️ Accès restreint aux pages

Certaines pages (ex: `/collection`, `/paiement`) redirigent automatiquement vers `/login` si l’utilisateur n’est pas connecté :

```js
useEffect(() => {
  if (isLoading) return
  if (!user?.email) router.push('/login')
}, [isLoading, user])
```

---

## 🧪 Lancer le projet en local

```bash
# 1. Installer les dépendances
npm install

# 2. Démarrer le serveur de développement
npm run dev

# 3. Accéder à l'application
http://localhost:3000
```

---

## ✅ TODO développeur

- [ ] Ajouter une vérification centralisée dans toutes les pages critiques
- [ ] Extraire les types (ex: `CartItem`, `Booster`, etc.) dans un fichier partagé
- [ ] Ajouter une gestion des erreurs côté Redux
- [ ] Optimiser le catchGame
- [ ] Migrer vers TypeScript (optionnel)


---

## 📩 Contact

Pour toute question technique ou bug bloquant :
**[Yasmix]** – yasmix@pokeapp.dev
