# CricBrain AI 🏏🧠

**CricBrain AI** is a premium, cinematic cricket analytics platform built for the **Agentic Premier League (APL) Watch Party & Micro-Hackathon** organized by **GDG Baroda**.

Built using **"Vibe Coding"** principles, this project transforms complex IPL match statistics into engaging, AI-driven narratives and simplified insights for fans.

## 🚀 Key Features

- **Agentic Match Dashboard**: Real-time visualization of match dynamics (KKR vs GT IPL Clash).
- **Fullstack AI Engine**: A dedicated Node.js/Express backend serving live match insights and analytics.
- **Explain Like I'm New**: Interactive "Beginner Mode" tooltips that simplify technical cricket jargon (CRR, RRR, Win Prob).
- **AI "Sledge" Mode**: A toggleable personality for the AI Agent (👔 Analyst vs 🎙️ Fanatic).
- **Momentum Timeline**: A high-impact visualization showing the ebb and flow of match momentum.
- **Cinematic Player Cards**: Dedicated impact profiles for star performers with dynamic impact ratings.

## 🏗️ Architecture

CricBrain is now a complete **Fullstack Application**:

- **`/client`**: React.js + Vite + Tailwind CSS v4. Handles the cinematic UI and user interactions.
- **`/server`**: Node.js + Express. Serves match data and AI insights via a RESTful API.

## 🛠️ Tech Stack

- **Frontend**: React, Framer Motion, Recharts, Lucide React.
- **Backend**: Node.js, Express.
- **Styling**: Tailwind CSS v4 (Glassmorphism & Neon Aesthetics).
- **Vibe**: High-impact sports broadcast theme.

## 📦 Getting Started

### 1. Installation
Run the following in the root directory:
```bash
npm install
cd client && npm install
cd ../server && npm install
```

### 2. Running the Project
From the root directory, simply run:
```bash
npm start
```
This will use `concurrently` to start both the **Vite Client (Port 5173)** and the **Express Server (Port 5000)** simultaneously.

## 📡 API Endpoints

- `GET /api/match-data`: Returns the latest match statistics and momentum timeline.
- `GET /api/insights`: Returns AI-generated strategic insights and verdicts.
- `GET /api/summaries`: Returns dynamic match commentary in multiple vibes.

---
*Built with ❤️ for the GDG Baroda APL Micro-Hackathon 2026.*
