# Apna Blog/Admin System Live Karne Ke Steps

Aapke 5 files hain: `index.html` (main website), `admin.html` (admin panel), `firebase-init.js`, `site-data.js`, `CLOUDINARY-SETUP.md` (image upload setup). Sab ek hi folder mein rakhein.

## STEP 1: Firebase Project Banaye (5 minute, free)

1. https://console.firebase.google.com par jaaye, Google account se login kare
2. **"Add project"** click kare, naam de (e.g. `prashant-portfolio`), continue kare
3. Google Analytics ka option aaye to disable kar sakte hain, "Create project" click kare

## STEP 2: Web App Add Kare

1. Project dashboard par **`</>`** (Web) icon click kare
2. App ka nickname de (e.g. "Portfolio"), "Register app" click kare
3. Jo `firebaseConfig = {...}` object dikhega use **copy** kar le
4. `firebase-init.js` file kholen, `const firebaseConfig = {...}` wale block ko apne copy kiye object se replace kar de

## STEP 3: Firestore Database Enable Kare

1. Left sidebar mein **Build > Firestore Database** par jaaye
2. "Create database" click kare → **"Start in test mode"** chune (development ke liye) → location select kare → Enable

> ⚠️ Test mode 30 din baad expire ho jaata hai. Jab site live ho jaaye to "Rules" tab mein jaake proper security rules laga dena (neeche diya hai).

## STEP 4: Authentication Enable Kare (Admin Login Ke Liye)

1. Left sidebar mein **Build > Authentication** par jaaye
2. "Get started" click kare
3. **Email/Password** provider choose kar enable kare
4. "Users" tab mein jaake **"Add user"** click kare — apna email aur password daalein (yahi admin login credentials honge)

## STEP 5: Cloudinary Setup Kare (Images Upload Ke Liye, Free + No Card)

Firebase Storage ab free nahi hai (Blaze/card chahiye), isliye images **Cloudinary** (free, no card) ke through upload hoti hain. Poore steps `CLOUDINARY-SETUP.md` file mein hai — 5 minute ka kaam hai.

## STEP 6: Test Kare

1. `admin.html` ko browser mein khole (ya apne hosting par upload kar ke wahan se khole)
2. Step 4 mein banaya email/password se login kare
3. "New Post" / "New Project" / "New Certificate" se content add kare, images upload kare
4. `index.html` khol kar dekhe — content automatically wahan dikhega

## Security Rules (Production Ke Liye — Test Mode Khatam Hone Se Pehle Laga Dein)

Firestore > Rules tab mein ye paste kare (sirf logged-in admin likh sake, sab padh sake):

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{collection}/{docId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

Storage > Rules tab mein ye paste kare:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

> Note: Ye Storage rules sirf tab lagaye agar future mein Firebase Storage (Blaze plan) use karne lage. Abhi images Cloudinary se ja rahi hain, jiske apne security settings `CLOUDINARY-SETUP.md` mein hai.

## Hosting Kahan Kare

Ye static files hain (HTML+JS), kahin bhi free host ho sakti hain: Firebase Hosting, Netlify, Vercel, ya GitHub Pages. Bas saari 4 files same folder mein upload kar dein.

## Important Notes

- Jab tak `firebase-init.js` mein real config nahi daalenge, site purane static content ke saath chalti rahegi, koi error nahi aayega
- Blog, Projects, aur Certificates teeno ka data alag-alag Firestore collections mein store hota hai: `blogs`, `projects`, `certificates`
- Admin panel mobile-friendly hai, phone se bhi blog likh sakte hain
- Naye blog post ka cover image, project image, certificate image — sab seedha admin panel se upload hoti hai, alag se URL dhundne ki zaroorat nahi
