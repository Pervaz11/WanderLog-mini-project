import { type RouteObject } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute"; // import et


// Layouts
import Layout from "../layouts/Layout";
import AuthLayout from "../layouts/AuthLayout";

// Client Pages
import Home from "../pages/Home";
import { Explore } from "../pages/Explore";
import { MyLists } from "../pages/MyLists";
import { Journal } from "../pages/Journal";
import CreateList from "../pages/CreateList";

// Auth Pages
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPasswordPage from "../pages/auth/ForgotPassword";
import AuthCallback from "../pages/auth/Success";
import ProfilePage from "../pages/Profile";


const routes: RouteObject[] = [
    {
        path: "/",
        element: <Layout />,
        children: [
            { index: true, element: <Home /> },
            { path: "my-lists", element: <MyLists /> },
            { path: "journal", element: <Journal /> },
            { path: "explore", element: <Explore /> },
            {
                path: "create",
                element: (
                    <ProtectedRoute>
                        <CreateList />
                    </ProtectedRoute>
                ),
            },

            {
                path: "profile",
                element: (
                    <ProtectedRoute>
                        <ProfilePage />
                    </ProtectedRoute>
                ),
            },
        ],
    },

    {
        path: "/auth",
        element: <AuthLayout />,
        children: [
            { path: "login", element: <Login /> },
            { path: "register", element: <Register /> },
            { path: "password", element: <ForgotPasswordPage /> },
            {
                path: "/auth/callback",
                element: <AuthCallback />
            }
        ],
    },
];

export default routes;
