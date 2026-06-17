# Hero Section Analysis (GiGi Energy Drink)

Here is a comprehensive breakdown of the Hero Section you requested. You can use this blueprint to recreate the structure, layout, and animations in your own site (e.g., inside `High-Fidelity Frontend`).

## 1. Core Architecture & Libraries

The hero section heavily relies on:
- **Next.js & Tailwind CSS** for structure and styling.
- **Framer Motion** for all animations (entrance, continuous loops, scroll-based physics).
- **`useScroll`, `useTransform`, and `useSpring`** to create buttery-smooth parallax scrolling effects synced with Lenis smooth scroll.

## 2. Scroll-Linked Physics (Parallax)

At the top of the component, scroll progress is tracked using a `useScroll` hook referencing the hero section container (`offset: ["start start", "end start"]`). 
This progress maps to several physics-based `useSpring` values (`springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 }`):
- `y`: Parallax scrolling on the main product image (moves from 0 to 200px downwards as you scroll).
- `textX1`: Moves the first part of the headline (`"FUEL YOUR"`) horizontally to the left (0 to -100px).
- `textX2`: Moves the second part of the headline (`"AMBITION"`) horizontally to the right (0 to 100px).
- `scale`: Shrinks the main product image slightly on scroll (1 to 0.9).
- `opacity`: Fades out the text content on scroll (1 to 0).

## 3. Layout Breakdown

The layout is a standard split-screen on Desktop and stacked on Mobile (`grid lg:grid-cols-2 gap-8 items-center`).

### Background Layers
- **Gradient Base**: An absolute div overlay covering the background with a subtle linear gradient.
- **Floating Orbs (Ambient Light)**: Two heavily blurred div circles (`blur-3xl`) positioned absolute (one top-left, one bottom-right). They use a continuous loop animation:
  - `animate={{ x: [0, 30, 0], y: [0, -20, 0], scale: [1, 1.1, 1] }}`
  - `transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}`

### Left Column: Text Content
All elements in this column stagger in using a shared `fadeUpVariants` object.
- **Eyebrow Tag**: A pill-shaped badge containing a pulsing indicator dot.
  - *Dot Animation*: `animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}`
- **Split Headings**: Two `<h1>` elements wrapping the text, linked to the `textX1` and `textX2` scroll values.
- **Subtitle**: Standard paragraph tag describing the product.
- **Call-to-Action (CTA) Buttons**:
  - Primary button: Solid background with hover state (`scale: 1.02`). It features a sweeping glare effect using a moving absolute `div` (`whileHover={{ x: "200%" }}`).
  - Secondary button: Outline button that inverses colors on hover.
- **Benefit Tickers**: A row of small text items with bullet points staggered on entry (`transition={{ delay: 0.8 + i * 0.1 }}`).

### Right Column: Product Showcase
This column is linked to the `y` and `scale` scroll physics values.
- **Ambient Glow**: Behind the product image is an absolute colored div with a heavy blur (`blur-[80px]`) that pulses opacity and scale over 4 seconds continuously.
- **Levitating Image**: The main product image uses Next.js `<Image />` with a `drop-shadow-2xl`. It levitates continuously via Framer Motion:
  - `animate={{ y: [0, -15, 0], rotate: [0, 2, 0] }}`
  - `transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}`

### Scroll Indicator (Bottom Center)
An absolute positioned pill-shaped outline containing an inner pill (mouse scroll wheel metaphor) that animates up and down infinitely.

## 4. Animation Configurations to Copy

**Fade Up Entrance:**
```typescript
const fadeUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.8,
      ease: [0.25, 0.4, 0.25, 1],
    },
  }),
}
```

**Spring Bounce Entrance (For right side):**
```typescript
const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.8, rotate: -10 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
      delay: 0.3,
    },
  },
}
```

## 5. Adaptation Guide for Your Site
When moving this into `High-Fidelity Frontend`:
1. Change the `<Image />` `src` to your desired product or graphic.
2. Remove or change the `bg-[#AFFF00]` and `text-[#AFFF00]` tailwind utilities to match your brand's color tokens (e.g., red or dark grey colors).
3. Update the text strings (Headings, Eyebrow, benefits).
4. Make sure your environment has `framer-motion` installed, as this section leans on it heavily.
5. The parallax effects require the page to have scrolling room, meaning it works best if you have other sections below it.
