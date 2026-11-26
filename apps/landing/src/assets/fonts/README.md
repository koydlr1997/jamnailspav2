# Local fonts

Place your font files here, preferably `.woff2`. Keep separate files for each weight/style, or use a variable font. Include any accompanying font license in this folder.

Register the actual files in `../../styles/fonts.css` using relative URLs. Vite will hash and bundle fonts referenced by that stylesheet.

For example, after adding `brand-regular.woff2`:

```css
@font-face {
  font-family: 'Brand';
  src: url('../assets/fonts/brand-regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
```

Declare the family in `src/styles.css` so components use Tailwind utilities:

```css
@theme {
  --font-brand: 'Brand', sans-serif;
}
```

Apply `font-brand` where needed. Match `font-weight` to each file; for a variable font, declare its supported range (for example, `100 900`) instead. No font is selected or loaded yet.
