# DashDrive — Project Coverage

> Comprehensive documentation of everything implemented across all DashDrive apps.

---

## 📱 Mobile User App (`mobile-user/`)

### Tech Stack
| Technology | Purpose |
|---|---|
| React Native 0.81 + Expo 54 | Core framework |
| NativeWind (Tailwind CSS) | Styling |
| Expo Router | File-based navigation |
| React Native Reanimated | Animations |
| react-native-maps (Google) | Map rendering |
| @gorhom/bottom-sheet | Bottom sheet UI |
| UberMove fonts | Brand typography |

### Brand Identity
- **Primary Color**: `#00ff90` (Brand Green) — CTAs, highlights, accents
- **Secondary**: `#000000` — Text, headers, dark backgrounds
- **Neutral Palette**: Zinc scale (replacing old slate colors)
- **Dark Mode**: Full support with zinc-900/black backgrounds

---

### Screens Implemented

#### 1. Authentication (`app/auth/`)

| Screen | File | Description |
|---|---|---|
| Login | `login.tsx` | Phone number + social auth entry point |
| Phone Login | `phone-login.tsx` | Country code selector + phone input |
| OTP Verification | `otp.tsx` | 6-digit code verification |
| Phone Verify | `verify-phone.tsx` | Phone number confirmation flow |
| Email Entry | `email.tsx` | Email input for account creation |
| Name Entry | `name.tsx` | First/last name profile setup |
| Register Options | `register-options.tsx` | Social auth (Apple, Google, Facebook) |

#### 2. Home Screen (`app/home.tsx`)

The main dashboard — **46KB**, the largest and most complex screen.

**Features:**
- Full-screen Google Maps with custom light/dark styles
- **Live driver simulation**: 6 animated car markers (`tamitoy.png`) moving along Lusaka road network (Cairo Road, Great East Road, Independence Avenue)
- Native `image` prop for flicker-free marker rendering
- Current location blue dot indicator
- Draggable bottom sheet with 3 snap points (15%, 60%, 100%)
- **Vibrant Bento Grid** of service cards:
  - 🚗 Drive (ride-hailing)
  - 🍔 Food (food delivery)
  - 📦 Delivery (package delivery)
  - 🏪 Mart (grocery/convenience)
  - 🚐 Intercity (long-distance)
  - 🏢 Business (corporate rides)
  - 🚛 Cargo/Freight
  - 🔑 Rentals
  - 🛡️ Insurance
- Animated floating search bar with rotating placeholder text
- Profile avatar button
- "More Services" expandable modal
- Location permission modal
- Light/Dark/System theme toggle
- Business mode toggle (via saved places store)

#### 3. Search (`app/search.tsx` + `app/search/`)

| Screen | File | Description |
|---|---|---|
| Search | `search.tsx` | Full search experience with map |
| Choose Place | `search/choose-place.tsx` | Place selection from list |
| Edit Saved | `search/edit-saved.tsx` | Edit saved places (Home, Work, etc.) |
| Map Picker | `search/map-picker.tsx` | Draggable pin for precise location |

#### 4. Ride Negotiation (`app/negotiation/`)

| Screen | File | Description |
|---|---|---|
| Fare Input | `fare-input.tsx` | User proposes their fare |
| Broadcasting | `broadcasting.tsx` | Broadcasts fare to nearby drivers |
| Tracking | `tracking.tsx` | Real-time ride progress tracking |
| Completed | `completed.tsx` | Ride completion summary + rating |

#### 5. Food Delivery (`app/food/`)

| Screen | File | Description |
|---|---|---|
| Food Home | `index.tsx` | Restaurant browsing + food ordering |

#### 6. Mart / Grocery (`app/mart/`)

| Screen | File | Description |
|---|---|---|
| Mart Home | `index.tsx` | Grocery/convenience store browsing |

#### 7. Ride Receipt (`app/ride/`)

| Screen | File | Description |
|---|---|---|
| Receipt | `receipt.tsx` | Detailed trip receipt with fare breakdown |

#### 8. Account (`app/account/`)

| Screen | File | Description |
|---|---|---|
| Profile | `profile.tsx` | Edit personal info, photo, name |
| History | `history.tsx` | Past ride history |
| Wallet | `wallet.tsx` | Balance, top-up, transactions |
| Saved Places | `saved-places.tsx` | Home, Work, custom locations |
| Company | `company.tsx` | Business/corporate account management |
| Company Members | `company-members.tsx` | Manage team members |
| Company Invitations | `company-invitations.tsx` | Invite/accept team invitations |

#### 9. Settings (`app/settings/`)

| Screen | File | Description |
|---|---|---|
| Settings Home | `index.tsx` | Main settings page |
| Privacy | `privacy.tsx` | Privacy & security controls |
| Support | `support.tsx` | Help center & FAQ |

#### 10. Payment Setup (`app/setup/`)

| Screen | File | Description |
|---|---|---|
| Add Card | `add-card.tsx` | Credit/debit card entry |
| Payment Method | `payment-method.tsx` | Select/manage payment methods |

---

## 🚘 Driver App (Pilot Mode — `app/pilot/`)

Embedded within the mobile-user app as a "Pilot" module.

### Driver Screens

| Screen | File | Description |
|---|---|---|
| Driver Home | `index.tsx` | Main driver dashboard with map, online/offline toggle, earnings summary |
| Welcome | `welcome.tsx` | Driver onboarding welcome screen |
| Request Detail | `request-detail.tsx` | Incoming ride request card (pickup, destination, fare, accept/decline) |
| Pickup Navigation | `pickup-navigation.tsx` | Turn-by-turn navigation to passenger |
| Trip Active | `trip-active.tsx` | Active trip screen with route tracking |
| Trip Completed | `trip-completed.tsx` | Trip summary after drop-off |
| Earnings | `earnings.tsx` | Detailed earnings dashboard |
| Profile | `profile.tsx` | Driver profile & vehicle info |
| Chat | `chat.tsx` | In-app messaging with passenger |
| Call | `call.tsx` | Voice call interface |
| Video Call | `video-call.tsx` | Video call interface |
| Promotions | `promotions.tsx` | Driver incentives & bonuses |

### Driver Onboarding (`app/pilot/setup/`)

| Screen | File | Description |
|---|---|---|
| Welcome | `welcome.tsx` | Setup entry point |
| Terms | `terms.tsx` | Terms & conditions acceptance |
| Vehicle Info | `vehicle-info.tsx` | Vehicle make, model, year, color, plate |
| Documents | `documents.tsx` | Required documents checklist |
| Doc Upload | `doc-upload.tsx` | Document photo upload |
| Preferences | `preferences.tsx` | Driving preferences (areas, hours, ride types) |
| Completion | `completion.tsx` | Setup complete confirmation |

---

## 🖥️ Admin Panel (`admin-panel/`)

| Technology | Purpose |
|---|---|
| React + Vite | Web framework |
| Tailwind CSS | Styling |
| TypeScript | Type safety |
| Google Maps API | Fleet visualization |

### Known Admin Features
- Fleet management dashboard
- Live fleet map with animated markers
- Geofencing zones
- Live bid monitoring
- Safety & disputes management
- Driver onboarding management
- Brand Green (`#00ff90`) theme consistency

---

## 📂 Reference Materials (`mobile-driver/`)

Contains **181 reference screenshots** from the Uber Driver iOS app, used as design inspiration for the driver pilot experience.

---

## 🗺️ Map & Simulation System

### Lusaka Road Network
The home screen simulates live driver activity across real Lusaka, Zambia roads:

| Road | Segments | Direction |
|---|---|---|
| Cairo Road | `cairo-n1`, `cairo-n2`, `cairo-s1`, `cairo-s2` | North ↔ South loop |
| Great East Road | `geast-e1`, `geast-e2`, `geast-w1`, `geast-w2` | East ↔ West loop |
| Independence Avenue | `indep-e1`, `indep-e2`, `indep-w1`, `indep-w2` | East ↔ West loop |

**Simulation Details:**
- 6 driver markers spread across different segments
- 500ms update interval for smooth movement
- Staggered speeds to prevent bunching
- NaN safety checks on coordinate interpolation
- Native `image` prop for flicker-free rendering on Android

### Map Marker Evolution
| Approach | Result |
|---|---|
| Child `<Image>` + `tracksViewChanges={true}` | ❌ Constant blinking |
| Child `<Image>` + `tracksViewChanges={false}` | ❌ Markers invisible |
| Child `<View>` (green dots) + `tracksViewChanges={true}` | ✅ Visible, no blink |
| Native `image` prop + `tracksViewChanges={false}` | ✅ **Final solution** — no blink, visible |

---

## 🎨 Design System

### Typography
- `font-uber` — UberMove Regular (body text)
- `font-uber-medium` — UberMoveMedium (subheadings)
- `font-uber-bold` — UberMoveBold (headers, CTAs)

### Component Patterns
- Bottom sheets with 40px corner radius
- Rounded cards (`rounded-2xl` to `rounded-[40px]`)
- Subtle shadows (`shadow-sm shadow-black/5`)
- Consistent `px-6` horizontal padding
- Animated entering/exiting with Reanimated
- `SafeAreaView` for safe content rendering

### Assets
- `tamitoy.png` — Car marker for map simulation
- 3D service card illustrations for bento grid
- Custom font files for UberMove family

---

## 📊 Screen Count Summary

| App Section | Screens |
|---|---|
| Authentication | 7 |
| Home + Search | 5 |
| Ride Flow (Negotiation + Receipt) | 5 |
| Food + Mart | 2 |
| Account | 7 |
| Settings | 3 |
| Payment Setup | 2 |
| **Driver (Pilot)** | **12** |
| **Driver Onboarding** | **7** |
| **Total** | **~50 screens** |

---

## 🔧 Ongoing / Known Issues

| Issue | Status | Notes |
|---|---|---|
| Marker size (native `image` prop) | 🟡 In Progress | Image renders at full resolution; needs resized asset |
| Marker blinking | ✅ Fixed | Solved with native `image` prop |
| Marker clipping | ✅ Fixed | No longer using bitmap capture |
| JavaScript heap out of memory | ✅ Fixed | Increased Node.js memory limit |
| Port conflicts (admin panel) | ✅ Fixed | Resolved dev server port issues |

---

*Last updated: 16 February 2026*
