# New York Dental Office Website

A responsive React and Vite redesign concept prepared for New York Dental Office. It includes dedicated desktop and mobile layouts, clinic services, dentists, reviews, appointment requests, contact details, and location information.

## Customize a clinic

1. Edit `src/data/clinicData.js` for clinic details, doctors, services, reviews, images, contact information, and booking slots.
2. Edit `src/theme/theme.js` for colors and brand tokens.
3. Keep component markup and stylesheet structure unchanged when producing a pixel-consistent client variation.

## Development

```bash
npm install
npm run dev
```

## Production

```bash
npm run build
npm run preview
```

The deployable production output is written to `dist/`.

## Current product tier

This project is frontend-only. Appointment requests open WhatsApp and are not stored in a database. A booking API, authentication, database, and admin dashboard can be added later as a separate upgrade without redesigning this frontend.

