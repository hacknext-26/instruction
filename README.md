# HACKNEXT'26 SERIES 2.0
## Live Hackathon Projector Display System
**SNS COLLEGE OF TECHNOLOGY**

A purpose-built, white-glowing futuristic live event digital signage system designed to run continuously across three floors of the venue on 16:9 projectors with zero scrolling, real-time database-driven event transitions via Supabase Realtime, and an obscure admin control route.

---

## 🌟 Key Features

1. **Three Dedicated Floor Displays (`/floor1`, `/floor2`, `/floor3`)**:
   - Single fullscreen 16:9 composition (`100vw` × `100vh`, `overflow: hidden`).
   - Zero scrolling, no page reload on updates, strictly event-focused.
   - Reusable `ProjectorDisplay` core architecture.
2. **Real-time Event Broadcasting**:
   - Powered by Supabase PostgreSQL and Supabase Realtime channels.
   - Instant transitions with subtle Framer Motion fade, blur, and entrance effects.
   - Fallback offline broadcast channel for instant testing or network resilience.
3. **Obscure Admin Controller (`/admin98427`)**:
   - No login or complex CMS — direct access via secret URL.
   - Multi-floor status indicators (`● LIVE`).
   - Live 16:9 preview mirror using the exact same `ProjectorDisplay` component.
   - Individual "Publish Floor X" and "Publish All Floors" triggers.
4. **Hardware & Browser Optimizations**:
   - Browser Fullscreen API with initial user activation prompt.
   - Screen Wake Lock API (`navigator.wakeLock.request('screen')`) to prevent projector PCs from sleeping during 24–48 hour continuous operation.
   - Lightweight, GPU-accelerated luminous background without memory leaks.
5. **Event Essentials**:
   - Real-world live clock updating every second (`DAY · DD MONTH YYYY` & `HH : MM : SS AM/PM`).
   - High-contrast, scannable QR Code linking to `https://hacknext-portal.vercel.app/`.
   - Custom animated SVG coding mascot with animated typing, blinking eyes, and glowing screen.
   - Fixed SNS College of Technology header branding and venue Wi-Fi (`DT-PLAY HOUSE : snsdt@2025`).

---

## 🚀 Quick Start (Local Development)

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment (Optional for local testing)
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Add your Supabase project credentials:
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```
*(Note: If no Supabase credentials are provided, the system automatically uses an active local broadcast channel and memory store so you can test all 3 floors and admin publishing instantly out-of-the-box!)*

### 3. Start Development Server
```bash
npm run dev
```
Open your browser to:
- Floor 1: [http://localhost:3000/floor1](http://localhost:3000/floor1)
- Floor 2: [http://localhost:3000/floor2](http://localhost:3000/floor2)
- Floor 3: [http://localhost:3000/floor3](http://localhost:3000/floor3)
- Admin: [http://localhost:3000/admin98427](http://localhost:3000/admin98427)

---

## 🗄️ Supabase Database & Realtime Setup

1. Open your [Supabase Dashboard](https://database.new) and create a project.
2. Navigate to the **SQL Editor**.
3. Open `supabase/schema.sql` from this repository and run the SQL commands.
   - Creates the `floor_events` table with UUID and floor number constraints.
   - Seeds default events for Floors 1, 2, and 3.
   - Configures public anonymous SELECT and UPDATE policies.
   - Enables the `supabase_realtime` publication for `floor_events`.
4. Copy your **Project URL** and **Anon Key** from **Project Settings → API** into your `.env` file or Vercel Environment Variables.

---

## 🎨 Asset Customization

### College Logos
Place the official venue logos in the `public/assets/` directory:
- Left Logo: `public/assets/logo-left.png`
- Right Logo: `public/assets/logo-right.png`

*(High-resolution vector-grade placeholder PNGs are pre-installed and can be swapped at any time).*

### Mascot Animation
The system includes an animated cyber coding bot. To customize:
- Place custom Lottie JSON in `public/mascot/mascot.json`
- Or replace with an image asset in `public/mascot/mascot.webp`

---

## 🖥️ Operating on Venue Projectors

1. On each floor's projector PC, open Google Chrome or Microsoft Edge.
2. Navigate to the respective floor URL:
   - Floor 1 PC: `https://your-domain.vercel.app/floor1`
   - Floor 2 PC: `https://your-domain.vercel.app/floor2`
   - Floor 3 PC: `https://your-domain.vercel.app/floor3`
3. Click the prominent **ENTER FULLSCREEN** button.
   - Activates browser Fullscreen mode.
   - Locks Screen Wake Lock to prevent the display from sleeping.
   - Hides cursor and UI controls.
4. If you need to exit fullscreen at any point, press <kbd>ESC</kbd>. A discreet re-fullscreen button will remain available in the corner.

---

## 🌐 Deployment to Vercel

1. Push this repository to GitHub or GitLab.
2. Import the repository in [Vercel](https://vercel.com).
3. Under **Environment Variables**, add:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Click **Deploy**.
5. Once deployed, verify your URLs:
   - `https://your-project.vercel.app/floor1`
   - `https://your-project.vercel.app/floor2`
   - `https://your-project.vercel.app/floor3`
   - `https://your-project.vercel.app/admin98427`

---

## 🏗️ Production Build Verification
To verify production builds locally:
```bash
npm run build
npm run preview
```
