import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Import pages (components for different views)
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ListLandingPage from "./pages/ListLandingPage";
import CreateListPage from "./pages/CreateListPage";

// Import components (navbar, etc.)
import NavBar from "./components/NavBar";
import { AuthProvider } from "./components/AuthProvider";

// Create the router with paths
const router = createBrowserRouter([
  {
    path: "/",
    element: <NavBar />, // NavBar is used here
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/signup", element: <SignUpPage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/lists", element: <ListLandingPage /> },
      { path: "/create-list", element: <CreateListPage /> },
    ],
  },
]);

// Render the application
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
