## Edzy Canteen App

A modern React-based web application for managing a school/college canteen, allowing students to browse snacks, place orders, and track spending.

## Features

Student Management: View all students and their details.
Snack Orders: Add snacks to cart and place orders.
Order Tracking: Track orders and total spent by each student.
Authentication UI: Login and Sign-Up modals.
Splash Screen: Animated splash screen on first visit.
Responsive Design: Works on mobile and desktop devices.
Styled with: Bootstrap 5 and custom CSS.
State Management: React useState and useEffect hooks, Zustand for global state.
Data Handling: Local data stored in data.jsx instead of backend API.

## Hosted On

The app is hosted on Render:
[Live Demo Link](https://edzy-canteen-app.onrender.com/)

## Setup Instructions
1. **Clone the repository**
   ```bash
   git clone https://github.com/dhruvdk10/canteen-app
   ```
2. **Navigate to the project directory**
   ```bash
   cd canteen-app
   ```
3. **Install dependencies**
   ```bash
   npm install
   ```
4. **Run the development server**
   ```bash
   npm run dev
   ```
## Note: The app now uses a local data.jsx file for students and snacks data. There is no separate mock API server required.

## Tech Stack

React 19
React Router Dom 7
Bootstrap 5
Zustand (for global state)
Vite (as build tool)

## Libraries Used
Bootstrap 5 – Styling and responsive layout
FontAwesome – Icons for UI elements
React Router DOM – Routing between pages
Zustand – Global state management for cart and orders
Vite – Fast development server and build tool

## Data Approach

All data (students, snacks) is now stored in data.jsx. Orders are saved in localStorage to simulate backend persistence. Axios API calls are no longer used in this version.

## Author

Dhruv Kapoor
