# **App Name**: CryptoFolio

## Core Features:

- Real-Time Crypto Dashboard: Display a real-time dashboard of top cryptocurrencies with search functionality.
- Coin Detail Pages: Detailed coin pages with interactive charts (Chart.js or ApexCharts).
- Secure Authentication: Secure user authentication using Firebase Authentication (Email/Password, Google Login).
- Portfolio Management: Portfolio management with the ability to add/remove cryptocurrencies and track value using Firebase Firestore.
- Watchlist: Watchlist functionality for users to track preferred cryptocurrencies using Firebase Firestore.

## Style Guidelines:

- Primary color: Deep blue (#1A237E) to convey trust and security.
- Secondary color: Light gray (#EEEEEE) for backgrounds and neutral elements.
- Accent: Teal (#00ACC1) for interactive elements and highlights.
- Clean and modern typography for readability and a professional look.
- Use crisp and minimalist icons for navigation and actions.
- Responsive layout that adapts to different screen sizes (desktop and mobile).
- Subtle animations and transitions to enhance user experience.

## Original User Request:
🔥 Project Title: CryptoTrack

🧩 Objective:
Build a modern, responsive cryptocurrency tracker website using Firebase. The app should support real-time price tracking, portfolio management, and user authentication — inspired by the attached PDF design.

🔧 Firebase Services Required:
1. Firebase Authentication (Email/Password, optionally Google Login)
2. Firebase Firestore for storing:
   - User portfolios
   - Watchlists
3. Firebase Hosting for deploying the front-end
4. (Optional) Firebase Cloud Functions to fetch crypto data from external APIs (like CoinGecko)

📂 Firestore Structure:

users/
  {userId}/
    portfolio/
      bitcoin: {
        amount: 1.2,
        buyPrice: 28000,
        dateAdded: "2025-04-22"
      }
    watchlist/
      ethereum: true

🔐 Firestore Security Rules:

rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
  }
}

🌐 Hosting Setup:
- Public directory: `public/` or `dist/`
- Use `firebase init` to select:
  ✔ Hosting
  ✔ Firestore
  ✔ Authentication
- Deploy with: `firebase deploy`

🎨 Design Features from UI:
- Home screen with top coins and search
- Coin detail pages with charts (use Chart.js or ApexCharts)
- Secure login/register
- Portfolio page with value calculation
- Add/remove from watchlist
- Responsive layout (desktop/mobile)
- Optional dark mode
  