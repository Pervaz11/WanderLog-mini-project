import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import Aurora from "../../components/ui/Aurora";
import axios from "axios";
import { useSnackbar } from "notistack";

const ResetPasswordPage = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post(
                `http://localhost:3000/auth/reset-password/${token}`,
                { password },
                { headers: { "Content-Type": "application/json" } }
            );

            enqueueSnackbar("Şifrə uğurla dəyişdirildi!", { variant: "success" });
            navigate("/auth/login");
        } catch (err: any) {
            enqueueSnackbar(err.response?.data?.message || "Xəta baş verdi", {
                variant: "error",
            });
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

            {/* Reset Password form container */}
            <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md"
                >
                    <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
                        Reset Password
                    </h2>

                    <form onSubmit={handleResetPassword} className="space-y-5">
                        <div className="relative">
                            <label className="block mb-1 text-gray-600">New Password</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-xl pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                            />
                            <div
                                className="absolute right-3 top-9 cursor-pointer text-gray-500 hover:text-blue-500 transition"
                                onClick={() => setShowPassword((prev) => !prev)}
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-xl transition font-semibold"
                        >
                            Change Password
                        </button>
                    </form>
                </motion.div>
            </div>
        </section>
    );
};

export default ResetPasswordPage;
