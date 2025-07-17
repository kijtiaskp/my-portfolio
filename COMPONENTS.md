# Component Documentation

## Design Principles

**CRITICAL**: This portfolio has a specific cyberpunk/matrix theme with consistent styling. DO NOT change the design style or color scheme without explicit user approval.

## Component Structure

### Core Sections (`components/sections/`)

#### `hero-section.tsx`
**Purpose**: Main landing section with name animation and introduction

**Key Design Elements**:
- **Hero Name**: White (#ffffff) with glowing text shadow effect
- **Greeting**: Green text "Hello, I'm" (text-green-400)
- **Subtitle**: Slate gray text (text-slate-300) with terminal styling
- **Terminal Elements**: Green $ symbol and animated cursor
- **Animation**: Glitch text effect between full name and nickname
- **Background**: Floating elements with Matrix rain effect

**DO NOT CHANGE**:
- White glowing name effect
- Subtitle slate gray color (text-slate-300)
- Terminal $ symbol and cursor animation
- Green color scheme for UI elements  
- Terminal/cyber aesthetic
- Animation timing and effects

**Current Styling Structure**:
```tsx
// Hero Name - PRESERVE EXACTLY
style={{
  color: "#ffffff",
  textShadow: "0 0 10px #ffffff, 0 0 20px #ffffff, 0 0 30px #ffffff",
  filter: "saturate(1.5) brightness(1.2)",
}}

// Subtitle with terminal styling - PRESERVE
className="text-xl lg:text-2xl text-slate-300 font-mono"
// With $ symbol: <span className="text-green-400">$</span>
// And animated cursor: w-3 h-6 bg-green-400 ml-1
```

**Button Styling**:
```tsx
// Get In Touch button - PRESERVE hover text color
className="...hover:text-green-400..."  // Keeps text readable on dark background
```

#### `about-section.tsx`
**Purpose**: Personal introduction and skills overview

#### `experience-section.tsx` 
**Purpose**: Work experience timeline

#### `projects-section.tsx`
**Purpose**: Portfolio projects showcase

#### `skills-section.tsx`
**Purpose**: Technical skills display

#### `contact-section.tsx`
**Purpose**: Contact form and information

### Interactive Components

#### `interactive-terminal.tsx`
**Purpose**: Simulated terminal for portfolio navigation

**Key Features**:
- Command input system
- Auto-scroll functionality
- Color-coded output types
- Navigation commands

#### `matrix-rain.tsx`
**Purpose**: Animated background effect

**Performance**: Optimized with React.memo and throttling

#### `binary-background.tsx`
**Purpose**: Binary code background animation

**Configuration**: 20x16 grid with random binary patterns

### UI Components (`components/ui/`)

Based on shadcn/ui components with custom theming:
- `button.tsx` - Green accent buttons
- `card.tsx` - Dark theme cards
- `input.tsx` - Terminal-style inputs
- And many more...

### Utility Components

#### `glitch-text.tsx`
**Purpose**: Text glitch animation effect

#### `profile-visual.tsx`
**Purpose**: Profile image with effects

#### `social-links.tsx`
**Purpose**: Social media links

#### `theme-provider.tsx`
**Purpose**: Dark theme management

## Component Guidelines

### 1. Color Scheme
- **Primary**: Green variants (#22c55e, #16a34a, #15803d)
- **Hero Name**: White (#ffffff) with glow effect - SIGNATURE ELEMENT
- **Hero Subtitle**: Slate gray (text-slate-300) - for contrast and readability
- **UI Elements**: Green shades for buttons, borders, icons
- **Terminal Elements**: Green ($, cursor, status indicators)
- **Text**: White for emphasis, slate/green for content
- **Background**: Black/dark variants
- **Accents**: Green glows and borders

### 2. Typography
- **Font**: Monospace (font-mono) for cyber aesthetic
- **Sizes**: Responsive scaling (text-4xl md:text-6xl lg:text-7xl)

### 3. Animations
- **Glitch effects**: For text and transitions
- **Smooth scrolling**: For navigation
- **Hover effects**: Subtle glow and scale

### 4. Performance
- Use React.memo for heavy components
- Implement useCallback and useMemo for optimization
- Throttle animations when needed

## What NOT to Change

1. **Hero name white glow effect** - This is the signature element (#ffffff with textShadow)
2. **Hero subtitle slate color** - text-slate-300 for proper contrast and readability
3. **Terminal elements** - $ symbol, cursor animation, terminal styling
4. **Green color scheme** - Maintains cyberpunk theme consistency for UI elements
5. **Button hover behavior** - hover:text-green-400 keeps text readable on dark backgrounds
6. **Terminal/cyber aesthetic** - Core design identity
7. **Animation timings** - Carefully tuned for UX (glitch effects, cursor blinking)
8. **Font choices** - Monospace maintains theme

## Safe to Modify

1. Content text (with approval)
2. Performance optimizations
3. Bug fixes
4. Adding new features (keeping same style)
5. Accessibility improvements

## Development Notes

**Technology Stack**:
- All components use TypeScript
- Styled with Tailwind CSS
- Animations with Framer Motion
- Icons from Lucide React
- State management with React hooks

**Performance Optimizations Applied**:
- React.memo for heavy components (MatrixRain, HeroSection)
- useCallback and useMemo for expensive operations
- Throttling for background animations
- Lazy loading and code splitting
- Image optimization enabled
- Bundle size reduced by ~30%

**Build Configuration**:
- Next.js 14 with optimized build settings
- Image optimization enabled (WebP/AVIF support)
- Compression and minification
- React strict mode enabled

**Current Bundle Size**: ~163 kB (optimized)

---

## CRITICAL REMINDERS

**Remember**: When in doubt, ask the user before making design changes. This documentation exists to preserve the carefully crafted visual identity.

**Recent Updates** (Applied):
- Hero subtitle uses text-slate-300 for better readability
- Terminal elements ($ symbol, cursor) restored
- Button hover states preserve text visibility
- Performance optimizations maintained
- Bundle size optimized to 163 kB

**If Design Changes Are Needed**: 
1. Always check this documentation first
2. Ask user for explicit permission
3. Preserve the cyberpunk/matrix theme
4. Test on dark backgrounds for text readability
5. Update this documentation after approved changes

## Documentation Standards

**Professional Writing Guidelines**:
- Do NOT use emoticons, emojis, or decorative symbols in documentation
- Replace visual symbols with clear descriptive text (e.g., "FORBIDDEN:" instead of X marks, "means" instead of arrows)
- Keep language professional and explicit
- Use proper headings and formatting without decorative elements
- Focus on technical accuracy and functionality
- Maintain consistent professional tone throughout all documents
- Ensure all text is readable and self-explanatory without visual symbols
- Write descriptive text that conveys meaning clearly without relying on visual cues 