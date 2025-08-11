import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Aurora from "../../components/ui/Aurora";
import axios from "axios";
import { useSnackbar } from "notistack";

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState("");
    const { enqueueSnackbar } = useSnackbar();

    const handleForgotPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:3000/auth/forgot-password", {
                email,
            });

            enqueueSnackbar("Password reset link sent!", { variant: "success" });
        } catch (err: any) {
            enqueueSnackbar(
                err.response?.data?.message || "Failed to send reset link",
                { variant: "error" }
            );
        }
    };

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

            {/* Forgot password form container */}
            <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md"
                >
                    <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
                        Forgot Password
                    </h2>

                    <form onSubmit={handleForgotPassword} className="space-y-5">
                        <div>
                            <label className="block mb-1 text-gray-600">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="example@mail.com"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-xl transition font-semibold"
                        >
                            Send Reset Link
                        </button>
                    </form>

                    <p className="mt-6 text-center text-sm text-gray-500">
                        Remembered your password?{" "}
                        <Link
                            to="/auth/login"
                            className="text-blue-600 hover:underline font-medium"
                        >
                            Back to Login
                        </Link>
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default ForgotPasswordPage;
