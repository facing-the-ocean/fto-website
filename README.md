# Facing the Ocean Website

This website introduces Facing the Ocean - a network of civic tech communities in Asia.

## File Structure

```
fto-website/
├── index.html              Home page
├── about.html              About / What is FtO?
├── events.html             All events timeline
├── coc.html                Code of Conduct
├── get-involved.html       Get Involved
├── events/
│   ├── seoul-2026.html     FtO Seoul 2026
│   ├── kh-2025.html        FtO Kaohsiung 2025
│   ├── yokohama-2024.html  FtO Yokohama 2024
│   ├── jeju-2023.html      FtO Jeju 2023
│   ├── tainan-2020.html    FtO Tainan 2020
│   ├── tainan-2019.html    FtO Tainan 2019
│   └── okinawa-2019.html   FtO Okinawa 2019
├── css/
│   └── style.css           All shared styles
├── js/
│   └── main.js             Mobile nav toggle + active link
└── README.md               This file
```

## Editing Content

All pages are plain HTML — edit them directly and push to GitHub to update the site. Ask Eunsoo to add your profile to the repostitory.

- **Navigation** is duplicated in each page (search for `<nav class="site-nav">` to update all)
- **Footer** is duplicated in each page (search for `<footer class="site-footer">`)
- **Styles** are all in `css/style.css`
- **Event pages** in `events/` use `../css/style.css` and `../js/main.js` (one level up)

## Adding a New Event Page

1. Copy an existing event page (e.g. `events/jeju-2023.html`)
2. Rename it (e.g. `events/tokyo-2027.html`)
3. Update the title, hero content, info chips, schedule, and resources
4. Add a new entry to `events.html` timeline
5. Update the homepage (`index.html`) upcoming event banner if applicable

## Adding Photos

Replace the `.photo-placeholder` divs with real `<img>` tags:

```html
<!-- Before (placeholder) -->
<div class="photo-placeholder" style="height:220px;">
  <span class="ph-icon">🖼</span>
  <span>Photo placeholder</span>
</div>

<!-- After (real photo) -->
<img src="../img/kh-2025-venue.jpg" alt="Net Zero Institute, Kaohsiung" 
     style="width:100%; height:220px; object-fit:cover; border-radius:var(--radius);">
```

Place images in an `img/` folder in the repo root.

## Content Sources

All content is sourced from the FtO HackMD documentation hub:
- Master index: https://g0v.hackmd.io/@fto/book
- GitHub org: https://github.com/facing-the-ocean
- Google Drive archive: https://drive.google.com/open?id=1Qyg6QHq5L8pCykPj6MKIpbGmevuODKHM
