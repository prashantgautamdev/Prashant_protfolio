# Cloudinary Setup — Free Image Upload (No Card Required)

Firebase Storage ab free nahi hai (Feb 2026 se card/Blaze plan zaroori hai). Isliye images ke liye **Cloudinary** use kar rahe hain — fully free, signup mein card nahi maangta.

Free tier: 25 GB storage + 25 GB bandwidth/month — ek portfolio site ke liye kaafi zyada hai.

## STEP 1: Cloudinary Account Banaye (2 minute)

1. https://cloudinary.com/users/register/free par jaaye
2. Email se sign up kare (card nahi maanga jayega)
3. Login karne ke baad **Dashboard** khulega

## STEP 2: Cloud Name Copy Kare

1. Dashboard ke top par **"Cloud name"** dikhega (e.g. `dz4f1qkht`)
2. Ise copy kar le

## STEP 3: Unsigned Upload Preset Banaye

Ye zaroori hai taaki browser se directly (bina backend server ke) upload ho sake.

1. Dashboard mein **Settings** (gear icon, top-right) → **Upload** tab par jaaye
2. "Upload presets" section mein **"Add upload preset"** click kare
3. **Signing Mode** ko `Unsigned` set kare
4. Preset ka naam de (e.g. `portfolio_uploads`) — chahe to default random naam bhi rakh sakte hain, jo bhi dikhe wahi naam copy kar le
5. **Save** kare

## STEP 4: Code Mein Daalein

`admin.html` file kholen, top ke paas ye lines dhundhe:

```js
const CLOUDINARY_CLOUD_NAME = 'YOUR_CLOUD_NAME';
const CLOUDINARY_UPLOAD_PRESET = 'YOUR_UPLOAD_PRESET';
```

Inhe apne Step 2 aur Step 3 ki values se replace kar de:

```js
const CLOUDINARY_CLOUD_NAME = 'dz4f1qkht';
const CLOUDINARY_UPLOAD_PRESET = 'portfolio_uploads';
```

## STEP 5: Test Kare

1. `admin.html` browser mein khole, login kare
2. Naya blog/project/certificate add kare, image select kare, Save kare
3. Image upload ho jayegi aur uska URL automatically Firestore document mein save ho jayega
4. `index.html` khol kar check kare — image dikhni chahiye

## Troubleshooting

- **"Upload failed" error** → Cloud name ya preset name galat hai, ya preset "Unsigned" mode mein nahi hai
- **Image dikh nahi rahi** → Browser console (F12) mein error check kare
- **Bohot saari images ho gayi, manage karni hai** → Cloudinary dashboard ke "Media Library" mein jaake delete/organize kar sakte hain

## Note

Ab Firebase Storage ki zaroorat nahi hai — Firestore (data) aur Authentication (admin login) abhi bhi Firebase mein hi hain, sirf images Cloudinary se ja rahi hain.
