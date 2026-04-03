# Edzy Canteen App

A modern React-based web application for managing a school/college canteen, allowing students to browse snacks, place orders, and track spending.

## Features

- **Student Management**: View all students and their details.
- **Snack Orders**: Add snacks to cart and place orders.
- **Order Tracking**: Track orders and total spent by each student.
- **Authentication UI**: Login and Sign-Up modals.
- **Splash Screen**: Animated splash screen on first visit.
- **Responsive Design**: Works on mobile and desktop devices.
- **Styled with**: Bootstrap 5 and custom CSS.
- **State Management**: React `useState` and `useEffect` hooks.
- **API Integration**: Interacts with backend API using Axios.

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

5. **Start the mock API server**

```bash
npx json-server --watch db.json --port 5000
```

## Tech Stack

- React 19
- React Router Dom 7
- Bootstrap 5
- Axios
- FontAwesome Icons
- Zustand (for global state)
- Vite (as build tool)

## Libraries Used

React – Frontend library
Bootstrap 5 – Styling and responsive layout
FontAwesome – Icons for UI elements
Axios – For API calls (mocked in this project)
React Router DOM – Routing between pages

## Mock Data Approach

Mock Data Approach
All data is stored in db.json.
Students and snacks data are loaded via API calls on page load using Axios.
Orders are saved in localStorage to simulate backend persistence.

## Author

**Dhruv Kapoor**
