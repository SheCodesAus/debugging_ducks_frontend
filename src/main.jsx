import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import NotFoundPage from "./pages/NotFoundPage";

// Here we import pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ListLandingPage from "./pages/ListLandingPage";
// Here we import components
import NavBar from "./components/NavBar";
import { AuthProvider } from "./components/AuthProvider";

// Here we create the router
const router = createBrowserRouter([
  {
    path: "/",
    element: <NavBar />,
    children: [
        { path: "/", element: <HomePage /> },
        { path: "/signup", element: <SignUpPage /> },
        { path: "/login", element: <LoginPage /> },
        { path: "/lists", element: <ListLandingPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
    <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);