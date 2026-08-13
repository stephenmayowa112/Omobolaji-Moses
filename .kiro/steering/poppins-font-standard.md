---
inclusion: auto
---

# Poppins Font Standard

## Critical Font Requirement
**MANDATORY**: This project uses Poppins font exclusively throughout all components, pages, and UI elements. This is a strict requirement that must be followed at all times.

## Implementation Status
✅ **COMPLETED**: Poppins font has been properly configured across the project:

1. **Next.js Font Integration**: Poppins imported via `next/font/google` in `app/layout.tsx`
2. **Tailwind Configuration**: Custom font families configured in `tailwind.config.ts`
3. **Global CSS**: Poppins set as default font family in `app/globals.css`
4. **Font Weights**: Light (300), Regular (400), Medium (500), SemiBold (600), Bold (700)

## Development Guidelines

### ✅ Always Use:
```jsx
// Default classes (Poppins is automatically applied)
<h1 className="text-2xl font-semibold">Main Title</h1>
<h2 className="text-xl font-medium">Subtitle</h2>
<p className="text-base font-normal">Body text</p>

// Explicit Poppins when needed
<span className="font-poppins font-bold">Important text</span>
```

### ❌ Never Use:
```jsx
// Don't use other font families
<p className="font-serif">Incorrect</p>
<h1 className="font-mono">Wrong</h1>

// Don't override with inline styles
<div style={{fontFamily: 'Arial'}}>Forbidden</div>
<span style={{fontFamily: 'Times'}}>Not allowed</span>
```

## Font Weight Hierarchy:
- **Headings**: `font-semibold` or `font-bold`
- **Subheadings**: `font-medium`
- **Body Text**: `font-normal` (default)
- **Subtle Text**: `font-light`
- **Emphasis**: `font-medium` or `font-semibold`

## Code Review Checklist:
Before submitting any component or page:
- [ ] No custom font families specified
- [ ] Using appropriate Poppins font weights
- [ ] No inline font-family styles
- [ ] Text hierarchy follows weight guidelines
- [ ] No font imports other than Poppins

## Technical Details:
- **Font Variable**: `--font-poppins` available globally
- **Fallback Chain**: Poppins → ui-sans-serif → system-ui → [standard fallbacks]
- **Performance**: Font loaded with `display: swap` optimization
- **Subsets**: Latin characters included

## Non-Negotiable Rules:
1. **NEVER** introduce other fonts without explicit project owner approval
2. **ALWAYS** use Poppins font classes or rely on default inheritance
3. **MAINTAIN** consistent font weights for similar UI elements
4. **TEST** font rendering across different browsers and devices

This font standard is essential for brand consistency and user experience. Any deviation must be documented and approved.