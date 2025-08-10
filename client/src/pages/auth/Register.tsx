import { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { useSnackbar } from "notistack";
import { registerValidationSchema } from "../../validations/registerValidation";
import Aurora from "../../components/ui/Aurora";

const RegisterPage = () => {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const formik = useFormik({
        initialValues: {
            fullName: "",
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
        validationSchema: registerValidationSchema,
        onSubmit: async (values, actions) => {
            try {
                const { confirmPassword, ...userData } = values;
                await axios.post("http://localhost:5173/auth/register", userData);
                actions.resetForm();
                enqueueSnackbar("Registered successfully! Check your email.", {
                    variant: "success",
                    autoHideDuration: 3000,
                });
                navigate("/auth/login");
            } catch (error: any) {
                enqueueSnackbar(
                    error.response?.data?.message || "Registration failed",
                    {
                        variant: "error",
                        autoHideDuration: 3000,
                    }
                );
            }
        },
    });

    return (
        <section className="relative w-full min-h-screen bg-gradient-to-r from-purple-100 to-blue-100 px-4">
            <div className="absolute inset-0 z-0">
                <Aurora
                    colorStops={["#7CFF67", "#B19EEF", "#6929FF"]}
                    blend={0.5}
                    amplitude={1.0}
                    speed={0.5}
                />
            </div>

            <div className="relative z-10 flex items-center justify-center min-h-screen">
                <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
                    <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
                        Create Account
                    </h2>

                    <form onSubmit={formik.handleSubmit} className="space-y-5">
                        {/* Full Name */}
                        <div>
                            <label className="block mb-1 text-gray-600">Full Name</label>
                            <input
                                type="text"
                                name="fullName"
                                value={formik.values.fullName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Enter your full name"
                                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-black placeholder:text-gray-800"
                            />
                            {formik.touched.fullName && formik.errors.fullName && (
                                <span className="text-sm text-red-500">{formik.errors.fullName}</span>
                            )}
                        </div>

                        {/* Username */}
                        <div>
                            <label className="block mb-1 text-gray-600">Username</label>
                            <input
                                type="text"
                                name="username"
                                value={formik.values.username}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Choose a username"
                                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none  text-black placeholder:text-gray-800"
                            />
                            {formik.touched.username && formik.errors.username && (
                                <span className="text-sm text-red-500">{formik.errors.username}</span>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block mb-1 text-gray-600">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Enter your email"
                                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none  text-black placeholder:text-gray-800"
                            />
                            {formik.touched.email && formik.errors.email && (
                                <span className="text-sm text-red-500">{formik.errors.email}</span>
                            )}
                        </div>

                        {/* Password */}
                        <div className="relative">
                            <label className="block mb-1 text-gray-600">Password</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Enter your password"
                                className="w-full px-4 py-2 border border-gray-300 rounded-xl pr-10 focus:ring-2 focus:ring-blue-500 outline-none text-black placeholder:text-gray-800"
                            />
                            <div
                                className="absolute right-3 top-9 cursor-pointer"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </div>
                            {formik.touched.password && formik.errors.password && (
                                <span className="text-sm text-red-500">{formik.errors.password}</span>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div className="relative">
                            <label className="block mb-1 text-gray-600">Confirm Password</label>
                            <input
                                type={showConfirm ? "text" : "password"}
                                name="confirmPassword"
                                value={formik.values.confirmPassword}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Confirm your password"
                                className="w-full px-4 py-2 border border-gray-300 rounded-xl pr-10 focus:ring-2 focus:ring-blue-500 outline-none text-black placeholder:text-gray-800"
                            />
                            <div
                                className="absolute right-3 top-9 cursor-pointer"
                                onClick={() => setShowConfirm(!showConfirm)}
                            >
                                {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                            </div>
                            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                                <span className="text-sm text-red-500">{formik.errors.confirmPassword}</span>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={
                                formik.isSubmitting ||
                                !formik.dirty ||
                                Object.keys(formik.errors).length > 0
                            }
                            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Register
                        </button>
                    </form>

                    {/* OAuth Buttons */}
                    <div className="flex items-center my-6">
                        <div className="flex-grow h-px bg-gray-300" />
                        <span className="mx-3 text-gray-500">or</span>
                        <div className="flex-grow h-px bg-gray-300" />
                    </div>

                    <div className="flex flex-col gap-3">
                        <a
                            href="http://localhost:3000/auth/google"
                            className="flex items-center justify-center gap-2 w-full py-2 border border-gray-300 rounded-xl hover:bg-gray-100 transition text-sm font-medium"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                x="0px"
                                y="0px"
                                width="22"
                                viewBox="0 0 48 48"
                            >
                                <path
                                    fill="#FFC107"
                                    d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                                ></path>
                                <path
                                    fill="#FF3D00"
                                    d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                                ></path>
                                <path
                                    fill="#4CAF50"
                                    d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                                ></path>
                                <path
                                    fill="#1976D2"
                                    d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                                ></path>
                            </svg>
                            Continue with Google
                        </a>

                        <a
                            href="http://localhost:3000/auth/github"
                            className="flex items-center justify-center gap-2 w-full py-2 border border-gray-300 rounded-xl hover:bg-gray-100 transition text-sm font-medium"
                        >
                            {/* Github Icon from lucide-react can be replaced with SVG if needed */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                stroke="none"
                            >
                                <path d="M12 0C5.372 0 0 5.372 0 12c0 5.302 3.438 9.8 8.205 11.387.6.113.82-.26.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.388-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.085 1.838 1.237 1.838 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.774.418-1.304.76-1.605-2.665-.3-5.466-1.334-5.466-5.933 0-1.31.467-2.381 1.235-3.222-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.29-1.552 3.296-1.23 3.296-1.23.654 1.653.244 2.873.12 3.176.77.84 1.233 1.911 1.233 3.222 0 4.61-2.803 5.63-5.475 5.922.43.372.823 1.103.823 2.222v3.293c0 .32.218.694.825.576C20.565 21.796 24 17.298 24 12c0-6.628-5.372-12-12-12z" />
                            </svg>
                            Continue with GitHub
                        </a>
                    </div>

                    <p className="mt-6 text-center text-sm text-gray-500">
                        Already have an account?{" "}
                        <a href="/auth/login" className="text-blue-600 hover:underline font-medium">
                            Login
                        </a>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default RegisterPage;
