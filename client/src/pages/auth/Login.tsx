import { useState } from "react";
import { Eye, EyeOff, Github } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Aurora from "../../components/ui/Aurora";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Email:", email, "Password:", password);
    };

    return (
        <>
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
                        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Welcome Back</h2>

                        <form onSubmit={handleLogin} className="space-y-5">
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

                            <div className="relative">
                                <label className="block mb-1 text-gray-600">Password</label>
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
                                Sign In
                            </button>
                        </form>

                        <div className="flex items-center my-6">
                            <div className="flex-grow h-px bg-gray-300" />
                            <span className="mx-3 text-gray-500">or</span>
                            <div className="flex-grow h-px bg-gray-300" />
                        </div>

                        <div className="flex flex-col gap-3">
                            <button className="flex items-center justify-center gap-2 w-full py-2 border border-gray-300 rounded-xl hover:bg-gray-100 transition text-sm font-medium">
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="22" viewBox="0 0 48 48">
                                    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
                                    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
                                    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
                                    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                                </svg>
                                Continue with Google
                            </button>

                            <button className="flex items-center justify-center gap-2 w-full py-2 border border-gray-300 rounded-xl hover:bg-gray-100 transition text-sm font-medium">
                                <Github className="w-5 h-5" />
                                Continue with GitHub
                            </button>
                        </div>

                        <p className="mt-6 text-center text-sm text-gray-500">
                            Don't have an account?{" "}
                            <Link to="/auth/register" className="text-blue-600 hover:underline font-medium">
                                Register
                            </Link>
                        </p>
                    </motion.div>
                </div>
            </section>
        </>
    );
};

export default LoginPage;
