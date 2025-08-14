import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthCallback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");
        const user = params.get("user");

        if (token && user) {
            localStorage.setItem("token", token);
            localStorage.setItem("user", user);
            navigate("/");
        } else {
            navigate("/");
        }
    }, [navigate]);

    return (
        <div className="flex justify-center items-center h-screen">
            <p>Login completed...</p>
        </div>
    );
};

export default AuthCallback;
