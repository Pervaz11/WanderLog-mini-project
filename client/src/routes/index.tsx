import { type RouteObject } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";

// Layouts
import Layout from "../layouts/Layout";
import AuthLayout from "../layouts/AuthLayout";

// Client Pages
import Home from "../pages/Home";
import { Explore } from "../pages/Explore";
import { MyLists } from "../pages/MyLists";
import { Journal } from "../pages/Journal";
import CreateList from "../pages/CreateList";
import ProfilePage from "../pages/Profile";

// Auth Pages
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPasswordPage from "../pages/auth/ForgotPassword";
import AuthCallback from "../pages/auth/Success";
import ResetPassword from "../pages/auth/RessetPassword";

// Shared
import NotFound from "../pages/shared/NotFound";
import AIChat from "../pages/AIChat";

const ROUTES: RouteObject[] = [
    // Client
    {
        path: "/",
        element: <Layout />,
        children: [
            { index: true, element: <Home /> },
            { path: "explore", element: <Explore /> },
            { path: "my-lists", element: <MyLists /> },
            { path: "journal", element: <Journal /> },
            { path: "chat", element: <AIChat /> },
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
            { path: "*", element: <NotFound /> },
        ],
    },

    // Auth
    {
        path: "/auth",
        element: <AuthLayout />,
        children: [
            { path: "login", element: <Login /> },
            { path: "register", element: <Register /> },
            { path: "password", element: <ForgotPasswordPage /> },
            { path: "callback", element: <AuthCallback /> },
            { path: "reset-password/:token", element: <ResetPassword /> },
            { path: "*", element: <NotFound /> },
        ],
    },
];

export default ROUTES;
