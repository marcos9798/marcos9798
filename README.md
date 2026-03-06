# Med-Life Homoeopathic Clinic Website

A complete, ready-to-use clinic website with editable content.

## How to edit your website content

All main website data is in `content.json`. You can change text, add/remove doctors, services, testimonials, timings, and conditions without touching HTML/CSS.

### Edit examples
- Clinic name and hero section: `clinic`
- Contact details: `contact`
- Add/remove treatment cards: `services` array
- Add/remove doctors: `doctors` array
- Add/remove testimonials: `testimonials` array

## Run locally

Because the site loads data using `fetch`, run it via a local server (not by opening `index.html` directly).

```bash
python3 -m http.server 4173
```

Then open:

```
http://localhost:4173
```

## Files

- `index.html` → website structure
- `styles.css` → design and responsive layout
- `script.js` → dynamic rendering from JSON
- `content.json` → editable website content
