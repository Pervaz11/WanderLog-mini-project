import { FcGoogle } from "react-icons/fc";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import loginValidationSchema from "../../../validations/loginValidation";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { post } from "../../../services/commonRequest";
import { API_BASE_URL, endpoints } from "../../../services/api";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { setUser } from "../../../features/userSlice";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import Aurora from "../../components/ui/Aurora";
import { motion } from "framer-motion";


const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { enqueueSnackbar } = useSnackbar();
    const [showPassword, setShowPassword] = useState(false);

    const message = searchParams.get("message");
    const errorMessage = searchParams.get("error");

    useEffect(() => {
        const token = searchParams.get("token");
        if (token) {
            try {
                const decoded = jwtDecode(token) as any;
                localStorage.setItem("token", JSON.stringify(token));
                dispatch(
                    setUser({
                        id: decoded.id,
                        email: decoded.email,
                        role: decoded.role,
                        fullName: decoded.fullName,
                        profileImage: decoded.profileImage,
                        token: token || "",
                    })
                );
                enqueueSnackbar("Google login successful!", {
                    anchorOrigin: { vertical: "bottom", horizontal: "right" },
                    autoHideDuration: 2000,
                    variant: "success",
                });
                navigate(decoded.role === "admin" ? "/admin" : "/");
            } catch (e) {
                enqueueSnackbar("Google login error!", {
                    anchorOrigin: { vertical: "bottom", horizontal: "right" },
                    autoHideDuration: 2000,
                    variant: "error",
                });
            }
        } else if (message) {
            enqueueSnackbar(message, {
                anchorOrigin: { vertical: "bottom", horizontal: "right" },
                autoHideDuration: 2000,
                variant: "success",
            });
        }
    }, [message, searchParams, dispatch, enqueueSnackbar, navigate]);

    useEffect(() => {
        if (errorMessage) {
            enqueueSnackbar("Google Sign In failed!", {
                anchorOrigin: { vertical: "bottom", horizontal: "right" },
                autoHideDuration: 2000,
                variant: "error",
            });
        }
    }, [errorMessage]);

    const formik = useFormik({
        initialValues: { email: "", password: "" },
        validationSchema: loginValidationSchema,
        onSubmit: async (values) => {
            try {
                const res: { statusCode?: number; message: string; token?: string } =
                    await post(`${endpoints.auth}/login`, values);

                if (res.statusCode === 401) {
                    enqueueSnackbar(res.message, {
                        autoHideDuration: 2000,
                        anchorOrigin: { vertical: "bottom", horizontal: "right" },
                        variant: "error",
                    });
                } else {
                    enqueueSnackbar(res.message, {
                        autoHideDuration: 2000,
                        anchorOrigin: { vertical: "bottom", horizontal: "right" },
                        variant: "success",
                    });

                    if (res.token) {
                        const decoded: any = jwtDecode(res.token);
                        localStorage.setItem("token", JSON.stringify(res.token));
                        dispatch(
                            setUser({
                                id: decoded.id,
                                email: decoded.email,
                                role: decoded.role,
                                fullName: decoded.fullName,
                                profileImage: decoded.profileImage,
                                token: res.token || "",
                            })
                        );
                        navigate(decoded.role === "admin" ? "/admin" : "/");
                    }
                }
            } catch (error) {
                console.log("error: ", error);
            }
        },
    });

    return (
        <section className="relative w-full min-h-screen bg-gradient-to-r from-blue-50 to-purple-100">
            {/* Aurora background */}
            <div className="absolute inset-0 z-0">
                <Aurora
                    colorStops={["#7CFF67", "#B19EEF", "#6929FF"]}
                    blend={0.5}
                    amplitude={1.0}
                    speed={0.5}
                />
            </div>

            {/* Login form container */}
            <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md"
                >
                    <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
                        Welcome Back
                    </h2>

                    {/* Google Login */}
                    <button
                        onClick={() => {
                            window.location.href = `${API_BASE_URL}/auth/google`;
                        }}
                        className="w-full flex items-center justify-center gap-3 py-3 border border-gray-300 rounded-xl hover:bg-blue-50 transition mb-6"
                    >
                        <FcGoogle size={22} />
                        <span className="text-sm font-medium text-gray-700">
                            Sign in with Google
                        </span>
                    </button>

                    {/* Divider */}
                    <div className="relative mb-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-white px-2 text-gray-500">
                                or sign in with email
                            </span>
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={formik.handleSubmit} className="space-y-4 text-sm">
                        {/* Email */}
                        <div>
                            <label className="block font-medium text-gray-600 mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formik.values.email}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl shadow-inner focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                placeholder="Email"
                            />
                            {formik.errors.email && formik.touched.email && (
                                <span className="text-red-500 text-sm">
                                    {formik.errors.email}
                                </span>
                            )}
                        </div>

                        {/* Password */}
                        <div className="relative">
                            <label className="block font-medium text-gray-600 mb-1">
                                Password
                            </label>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formik.values.password}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl shadow-inner focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition pr-12"
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                tabIndex={-1}
                                className="absolute right-3 top-9 text-xl text-gray-600 hover:text-gray-800 focus:outline-none"
                                onClick={() => setShowPassword((prev: boolean) => !prev)}
                            >
                                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                            </button>
                            {formik.errors.password && formik.touched.password && (
                                <span className="text-red-500 text-sm">
                                    {formik.errors.password}
                                </span>
                            )}
                        </div>

                        {/* Login Button */}
                        <button
                            disabled={
                                formik.isSubmitting ||
                                !formik.dirty ||
                                Object.entries(formik.errors).length > 0
                            }
                            type="submit"
                            className="w-full py-3 disabled:bg-blue-400 disabled:cursor-not-allowed cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition mt-2"
                        >
                            Login
                        </button>
                    </form>

                    <p className="text-center text-sm text-gray-500 mt-6">
                        Don’t have an account?{" "}
                        <Link to="/auth/register" className="text-blue-600 hover:underline">
                            Register
                        </Link>
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default Login;
