# Font Guidelines - Poppins

## Overview
This project uses **Poppins** as the primary font throughout the entire application. This ensures consistent typography and brand identity.

## Implementation Details

### Font Weights Available:
- **Light (300)** - For subtle text elements
- **Regular (400)** - For body text and standard content
- **Medium (500)** - For emphasis and subheadings
- **SemiBold (600)** - For important headings
- **Bold (700)** - For main titles and strong emphasis

### Setup Configuration:
1. **Next.js Font Import**: Poppins is imported using Next.js Google Fonts in `app/layout.tsx`
2. **Tailwind Configuration**: Custom font family defined in `tailwind.config.ts`
3. **Global CSS**: Poppins set as default font family in `app/globals.css`

### Usage Guidelines:

#### ✅ Correct Usage:
```jsx
// Default - Poppins will be applied automatically
<h1 className="text-2xl font-semibold">Title</h1>
<p className="text-base">Body text</p>

// Explicit Poppins usage (when needed)
<span className="font-poppins font-medium">Emphasized text</span>
```

#### ❌ Avoid:
```jsx
// Don't use other font families
<p className="font-serif">Text</p>
<h1 className="font-mono">Title</h1>

// Don't override with custom fonts
<div style={{fontFamily: 'Arial'}}>Content</div>
```

### Font Weight Classes:
- `font-light` - Poppins Light (300)
- `font-normal` - Poppins Regular (400)
- `font-medium` - Poppins Medium (500)
- `font-semibold` - Poppins SemiBold (600)
- `font-bold` - Poppins Bold (700)

## Consistency Rules:
1. **Never override** the font family unless absolutely necessary for specific design requirements
2. Use appropriate **font weights** for hierarchy (Bold for titles, Medium for subheadings, Regular for body)
3. Maintain **consistent font sizing** across similar elements
4. Test font rendering on different devices and browsers

## Technical Implementation:
The font is loaded with `display: swap` for optimal performance and includes proper fallbacks:
```
Poppins → ui-sans-serif → system-ui → -apple-system → BlinkMacSystemFont → Segoe UI → Roboto → Helvetica Neue → Arial → Noto Sans → sans-serif
```

---
**Remember**: Poppins font is a core part of the brand identity. Always ensure it's being used consistently across all components and pages.