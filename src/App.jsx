import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import CreateListPage from "./pages/CreateListPage";
import ListLandingPage from "./pages/ListLandingPage";
import CreateCategoryPage from "./pages/CreateCategoryPage";
import { AuthProvider } from "./components/AuthProvider";

// Error component for route errors
function ErrorPage() {
    return (
        <div className="error-container">
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <button onClick={() => window.location.href = '/'}>
                Return to Home
            </button>
        </div>
    );
}

const router = createBrowserRouter([
    {
        path: "/",
        element: <NavBar />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <HomePage />,
                errorElement: <ErrorPage />,
            },
            {
                path: "login",
                element: <LoginPage />,
                errorElement: <ErrorPage />,
            },
            {
                path: "signup",
                element: <SignupPage />,
                errorElement: <ErrorPage />,
            },
            {
                path: "create-list",
                element: <CreateListPage />,
                errorElement: <ErrorPage />,
            },
            {
                path: "lists",
                element: <ListLandingPage />,
                errorElement: <ErrorPage />,
            },
            {
                path: "create-category",
                element: <CreateCategoryPage />,
                errorElement: <ErrorPage />,
            },
        ],
    },
]);

console.log("Router configuration:", router);

function App() {
    return (
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    );
}

export default App; 