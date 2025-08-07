// src/pages/auth/Register.tsx

import { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Github } from "lucide-react";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { registerValidationSchema  } from "../../validations/registerValidation";
import Aurora from "../../components/ui/Aurora";

const RegisterPage = () => {
    const navigate = useNavigate();
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
                await axios.post("http://localhost:5050/auth/register", userData);
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
                                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                            {formik.touched.fullName && formik.errors.fullName && (
                                <span className="text-sm text-red-500">
                                    {formik.errors.fullName}
                                </span>
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
                                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                            {formik.touched.username && formik.errors.username && (
                                <span className="text-sm text-red-500">
                                    {formik.errors.username}
                                </span>
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
                                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                            {formik.touched.email && formik.errors.email && (
                                <span className="text-sm text-red-500">
                                    {formik.errors.email}
                                </span>
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
                                className="w-full px-4 py-2 border border-gray-300 rounded-xl pr-10 focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                            <div
                                className="absolute right-3 top-9 cursor-pointer"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </div>
                            {formik.touched.password && formik.errors.password && (
                                <span className="text-sm text-red-500">
                                    {formik.errors.password}
                                </span>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div className="relative">
                            <label className="block mb-1 text-gray-600">
                                Confirm Password
                            </label>
                            <input
                                type={showConfirm ? "text" : "password"}
                                name="confirmPassword"
                                value={formik.values.confirmPassword}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="w-full px-4 py-2 border border-gray-300 rounded-xl pr-10 focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                            <div
                                className="absolute right-3 top-9 cursor-pointer"
                                onClick={() => setShowConfirm(!showConfirm)}
                            >
                                {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                            </div>
                            {formik.touched.confirmPassword &&
                                formik.errors.confirmPassword && (
                                    <span className="text-sm text-red-500">
                                        {formik.errors.confirmPassword}
                                    </span>
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

                    <p className="mt-6 text-center text-sm text-gray-500">
                        Already have an account?{" "}
                        <a
                            href="/auth/login"
                            className="text-blue-600 hover:underline font-medium"
                        >
                            Login
                        </a>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default RegisterPage;
