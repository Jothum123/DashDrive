# DashDrive Brand Guide

## App Overview

**DashDrive** is a premium ride-hailing application designed for fast and fair transportation. The app features a modern, clean UI with smooth animations and support for both light and dark modes.

---

## Color Palette

| Name | Hex | Usage |
|------|-----|-------|
| **Primary** | `#00ff90` | CTAs, highlights, success states, accent elements |
| **Secondary** | `#000000` | Text, headers, dark mode backgrounds |
| **Accent Gray** | `#adadad` | Subdued text, icons, borders |
| **Accent Light** | `#e7e8ec` | Light backgrounds, cards, dividers |
| **White** | `#ffffff` | Light mode background, cards |

### Dark Mode Overrides
- Background: `#000000` (zinc-900/black)
- Cards: `zinc-800/zinc-900`
- Text: White with opacity variations

---

## Typography

| Class | Font | Weight | Usage |
|-------|------|--------|-------|
| `font-uber` | UberMove | Regular | Body text |
| `font-uber-medium` | UberMoveMedium | Medium | Subheadings, labels |
| `font-uber-bold` | UberMoveBold | Bold | Headers, CTAs, emphasis |

---

## UI Components

### Buttons
- **Primary**: `bg-primary` with black text
- **Secondary**: `bg-secondary` with primary/white text
- **Outline**: Transparent with primary border
- **Ghost**: Transparent, text-only

### Cards
- Rounded corners: `rounded-2xl` to `rounded-[40px]`
- Subtle shadows: `shadow-sm shadow-black/5`
- Border: `border border-accent-light` (light) / `border-zinc-800` (dark)

### Icons
- Library: `@expo/vector-icons` (Ionicons, FontAwesome5)
- Styled via NativeWind: `StyledIonicons`, `StyledFontAwesome5`
- Sizes: 12-48px depending on context

---

## Layout Patterns

- **SafeAreaView**: Use `StyledSafeAreaView` from `src/lib/interop.ts`
- **Spacing**: Consistent `px-6` horizontal padding
- **Bottom Sheet**: `@gorhom/bottom-sheet` with custom corner radius (40px)

---

## Authentication Flow

1. **Splash Screen** → Auto-redirect to Login
2. **Login Screen** → Phone login or Social Auth (Apple, Google, Facebook)
3. **Social Auth Modal** → Animated bottom sheet with provider branding
4. **Name Entry** → Post-auth profile setup

---

## Key Files

| File | Purpose |
|------|---------|
| `tailwind.config.js` | Theme colors, fonts |
| `src/lib/interop.ts` | NativeWind icon wrappers |
| `src/components/ui/` | Reusable UI components |
| `app/auth/` | Authentication screens |
| `app/home.tsx` | Main dashboard with map |

---

## Technical Stack

- **Framework**: React Native 0.81 + Expo 54
- **Styling**: NativeWind (Tailwind CSS for RN)
- **Navigation**: Expo Router
- **Animations**: React Native Reanimated
- **Maps**: react-native-maps (Google)
