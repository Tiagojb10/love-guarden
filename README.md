# 🌸 Love Garden — For Her

A romantic interactive flower garden website. Each lily blooms open to reveal a poem or memory.

---

## Files

```
love-garden/
├── index.html     — main page
├── style.css      — all styling
├── flowers.js     — YOUR CONTENT (edit this!)
├── main.js        — animations & logic
├── photos/        — put your photos here
└── README.md
```

---

## How to customise

### 1. Edit `flowers.js`

Open `flowers.js` — everything is clearly labelled at the top.

- Change `GARDEN_TITLE` and `PARTNER_NAME`
- Edit each flower's `title`, `content`, `footer`
- Add more flower objects to the array
- Change `color`: `"pink"` | `"lavender"` | `"white"` | `"red"` | `"gold"` | `"blue"`
- Change `type`: `"poem"` | `"memory"` | `"photo"`

### 2. Add photos

1. Create a `photos/` folder in the project root
2. Put your image there (e.g. `photos/us.jpg`)
3. In `flowers.js`, set `imageUrl: "photos/us.jpg"` on a flower with `type: "photo"`

---

## Deploy to Vercel

### Option A — Vercel CLI (fastest)

```bash
npm i -g vercel
cd love-garden
vercel
```

Follow the prompts. Done! You'll get a live URL to share with her.

### Option B — Vercel Dashboard

1. Go to https://vercel.com and sign in
2. Click **Add New → Project**
3. Drag and drop this entire `love-garden` folder
4. Click **Deploy**

No framework needed — it's pure HTML/CSS/JS, Vercel handles it automatically.

---

## Share it with her

After deploying, Vercel gives you a URL like:
```
https://love-garden-xyz.vercel.app
```

Send it to her with a little message 💕
