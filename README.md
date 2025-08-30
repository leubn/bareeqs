# Bareeqs – Static Site (GitHub Pages Ready)

A clean, multi-page website for **Bareeqs** with dynamic shared components and data-driven sections.
Drop the folder into a GitHub repository and enable **GitHub Pages** to host it for free.

## Structure
```
bareeqs-site/
├── index.html
├── about.html
├── services.html
├── projects.html
├── contact.html
└── assets/
    ├── components/
    │   ├── header.html
    │   └── footer.html
    ├── css/
    │   └── styles.css
    ├── data/
    │   ├── brand.json
    │   ├── services.json
    │   └── projects.json
    └── js/
        ├── components.js
        ├── brand.js
        ├── services.js
        ├── projects.js
        └── main.js
```

## How it works
- **Header & footer** are injected dynamically into every page (edit them once in `assets/components`).  
- **Colors, logo text, email, phone, socials** come from `assets/data/brand.json`.  
- **Services & Projects** are rendered from JSON files (`assets/data/services.json`, `assets/data/projects.json`).

## Customize brand
Edit `assets/data/brand.json`:
```json
{{
  "companyName": "Bareeqs",
  "tagline": "Empowering People. Enabling Success.",
  "primaryColor": "#0A192F",
  "secondaryColor": "#E7B23B",
  "accentColor": "#FDFDFD",
  "email": "info@bareeqs.com",
  "phone": "+971-000-0000",
  "location": "United Arab Emirates",
  "domain": "bareeqs.com",
  "social": {{"linkedin": "#", "instagram": "#"}},
  "scheduleLink": ""
}}
```

## Deploy on GitHub Pages
1. Create a new repository, e.g. **bareeqs.github.io** *or* any repo name.
2. Upload **all files** from `bareeqs-site/` to the repo root.
3. In *Settings → Pages*, choose:
   - **Branch:** `main` (or `master`), **Folder:** `/ (root)`
4. Save. Your site will be live in a minute or two.
   - If your repo is *not* named `bareeqs.github.io`, your URL will be `https://<username>.github.io/<repo>/`

## Notes
- The contact form uses **mailto:** (no server). For WhatsApp, change `phone` to a WhatsApp link or add a link in `brand.json`.
- To add a scheduling link, put your Calendly/Cal.com URL in `brand.json` under `"scheduleLink"`.
- Add more services/projects by editing the respective JSON files.
- All repeated UI is centralized so you only change things in one place.
