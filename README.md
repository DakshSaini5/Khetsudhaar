# Khetsudhaar - Gamified Agricultural Learning Platform

![Khetsudhaar Cover](https://img.shields.io/badge/Status-Live-success?style=for-the-badge)
![Expo](https://img.shields.io/badge/Expo-1C1E24?style=for-the-badge&logo=expo&logoColor=white)
![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Supabase](https://img.shields.io/badge/Supabase-181818?style=for-the-badge&logo=supabase&logoColor=3ECF8E)

Khetsudhaar is a cross-platform, gamified agricultural learning application designed to educate farmers on modern farming techniques, provide real-time market prices, and incentivize learning through a robust quest and reward system. 

Built using a single codebase, it runs natively on **iOS** and **Android**, and is also deployed as a **Progressive Web App (PWA)**.

🚀 **[Live Web Deployment](https://dist-two-mocha-26.vercel.app)**  
*(Feel free to register a new account to test out the features!)*

---

## 🌟 Key Features

*   **Gamification Engine**: Learn and earn! Complete agricultural lessons and quizzes to earn XP and Coins.
*   **Leaderboards**: Compete with other farmers globally on a real-time leaderboard.
*   **Live Market Prices**: Check real-time crop prices, trends, and daily changes.
*   **Quest System**: Complete daily and monthly tasks (e.g., "Check market prices 3 times") to unlock rewards.
*   **Offline-First**: Crucial data is cached locally via `AsyncStorage` allowing users to view recent market prices even without an internet connection.
*   **Multi-Language**: Built-in support for multiple languages (English & Hindi) to cater to diverse farming communities.

## 🛠️ The Tech Stack

*   **Frontend**: React Native, React Native Web, Expo (SDK 54), Expo Router
*   **Backend & Database**: Supabase (PostgreSQL), Supabase Auth
*   **Caching & Local Storage**: `@react-native-async-storage/async-storage`
*   **Deployment**: Vercel (PWA)

## 🧠 Technical Highlights: The "Hybrid Supabase" Architecture

To bypass strict email-confirmation requirements on Supabase without compromising the live, real-time database, this app implements a custom **Hybrid Interceptor Pattern**:

1.  **Auth Interception**: `supabase.auth` methods are overridden. The app authenticates the user locally and stores a persistent session in `AsyncStorage`.
2.  **Query Routing**: 
    *   Queries to **user-specific tables** (`profiles`, `user_lessons`) are intercepted and routed to a local storage database.
    *   Queries to **public tables** (`market_prices`, `lessons`, `quests`) are passed straight through to the *real* Supabase database using the Anonymous Key.
3.  **Result**: Flawless, instant registration while continuing to stream live agricultural data from the cloud!

---

## 🚀 Running Locally

1. Install dependencies
   ```bash
   npm install
   ```

2. Start the app
   ```bash
   npx expo start
   ```

3. Press `w` to open in browser, or scan the QR code using **Expo Go** on your iOS/Android device!
