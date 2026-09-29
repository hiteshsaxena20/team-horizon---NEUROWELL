# eRTMAC-NWIS (Nearby Wells Intelligence System)
### AI-Powered Decision Support System for Drilling Operations
**Smart India Hackathon Problem Statement: SIH26121**

---

## 🚀 Overview

**eRTMAC-NWIS** is an enterprise-grade AI decision support platform built for drilling engineers and geoscientists. The system aggregates historical nearby well data, evaluates similarity scores using multi-parameter geological metrics, retrieves actionable drilling knowledge, identifies potential risks (lost circulation, formation pressure, wellbore instability), and provides intelligent parameter recommendations before and during drilling operations.

---

## 🌟 Key Features & Modules

1. **Enterprise Authentication & Gatekeeping** (`/login`)
   - Branded login portal with security badges and instant one-click **"Demo Login"** for hackathon evaluations.
   - Persistent session storage across page reloads.

2. **Executive Drilling Dashboard** (`/dashboard`)
   - High-level KPIs: Active wells, analyzed offset wells, high-risk alerts, and AI optimization score.
   - Target well overview (`WELL-A01`) with geological lithology summary.
   - Interactive GIS Leaflet field map with color-coded risk markers and real-time popups.
   - Live risk alerts and chronological incident tracking feed.

3. **Nearby Wells GIS Intelligence** (`/nearby-wells`)
   - Interactive spatial map with radius slider (1–10 km).
   - Real-time search and multi-criteria filters (formation, well type, status, risk level, depth ranges).
   - Offset well listing with quick-action links to detailed telemetry and comparative views.

4. **Well Telemetry & Geological Details** (`/well/:wellId`)
   - Detailed well specifications, geological strata, and depth milestones.
   - Interactive charts: ROP (Rate of Penetration), WOB (Weight on Bit), Torque, and Dual-Axis Mud Weight vs Pump Pressure profiles.
   - Historical drilling incident timeline and mitigations.

5. **Multi-Parameter Well Similarity Analysis** (`/similar-wells`)
   - Radar chart comparing geological formation, depth profile, pressure gradient, mud weight, and lithology match.
   - Side-by-side stratigraphic column comparison.
   - Ranked similarity table with match score breakdowns.

6. **AI Drilling Assistant (RAG Simulation)** (`/ai-assistant`)
   - Conversational AI powered by offset drilling intelligence.
   - Context-aware responses with source citations (Field Alpha Database, Regional Well Registry).
   - Quick-prompt selector covering lost circulation, similar offset wells, high-pressure zones, and lessons learned.

7. **Proactive Risk Analysis Engine** (`/risk-analysis`)
   - Overall drilling risk gauge with categorized severity distributions.
   - Detailed risk cards with geological causes, depth boundaries, and pre-drill/while-drilling mitigation checklists.
   - Historical incident frequency by category.

8. **Drilling Decision Support** (`/decision-support`)
   - Recommended operational parameters (Mud Weight, ROP, WOB, RPM) derived from top-matching offset wells.
   - AI confidence score (87%) backed by historical empirical data.
   - Direct shortcuts to comprehensive report generation.

9. **Intelligence Reports & PDF Export** (`/reports`)
   - 7-section structured drilling intelligence report.
   - Live Print (`window.print()`), Share link, and simulated PDF compilation with download notifications.

---

## 🛠️ Technology Stack

- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS v4, custom deep navy/cyan Oil & Gas theme
- **Visualization & Maps**: Recharts, Leaflet, React-Leaflet
- **Icons**: Lucide React
- **Build Tool**: Vite 8.2

---

## 🏁 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
The application will be accessible at `http://localhost:5173`.

### 3. Production Build
```bash
npm run build
```

---

## 🎯 Hackathon Presentation Guide (Recommended Flow)

1. **Login**: Click **"Demo Login"** to enter the platform instantly.
2. **Dashboard**: Highlight the key metrics, active field map, and target well `WELL-A01`.
3. **Nearby Wells**: Demonstrate the distance radius slider and geological filters.
4. **Well Details**: Click any well to inspect its drilling telemetry curves (ROP, WOB, Torque).
5. **Well Analysis**: Show the radar chart and multi-dimensional similarity ranking with `WELL-A02`.
6. **AI Assistant**: Click one of the suggested prompts to showcase the RAG-style offset well intelligence.
7. **Risk Analysis**: Explain the risk gauge and mitigation plans for lost circulation.
8. **Decision Support**: Present the optimal drilling parameter recommendations.
9. **Reports**: Trigger **"Download Report PDF"** and **"Print"** to showcase report generation.
