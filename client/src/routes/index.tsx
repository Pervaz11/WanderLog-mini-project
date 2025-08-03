import { type RouteObject } from "react-router-dom";

// Layouts
import Layout from "../layouts/Layout";
import AuthLayout from "../layouts/AuthLayout";

// Client Pages
import Home from "../pages/Home";
import { Explore } from "../pages/Explore";
import { MyLists } from "../pages/MyLists";
import { Journal } from "../pages/Journal";

// // Auth Pages
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
// import ForgotPassword from "../pages/auth/ForgotPassword";
// import ResetPassword from "../pages/auth/ResetPassword";
// import AuthCallback from "../pages/auth/AuthCallabck";

const routes: RouteObject[] = [
    {
        path: "/",
        element: <Layout />,
        children: [
            { index: true, element: <Home /> },
            { path: "my-lists", element: <MyLists /> },
            { path: "journal", element: <Journal /> },
            { path: "explore", element: <Explore /> },
        ],
    },

    {
        path: "/auth",
        element: <AuthLayout />,
        children: [
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "register",
                element: <Register />,
            },
            // {
            //     path: "forgot-password",
            //     element: <ForgotPassword />,
            // },
            // {
            //     path: "reset-password/:token",
            //     element: <ResetPassword />,
            // },
            // {
            //     path: "success/:token",
            //     element: <AuthCallback />,
            // },
        ],
    },
];

export default routes;
