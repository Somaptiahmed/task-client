


import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../Context/AuthContext";
import PropTypes from "prop-types";
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/firebase.init";

const SignUp = () => {
    const { setUser } = useContext(AuthContext);
    const [errors, setErrors] = useState({});
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    // Password validation
    const validatePassword = (password) => {
        const newErrors = {};
        if (password.length < 6) newErrors.passwordLength = "Password must be at least 6 characters long.";
        if (!/[A-Z]/.test(password)) newErrors.uppercase = "Password must include at least one uppercase letter.";
        if (!/[a-z]/.test(password)) newErrors.lowercase = "Password must include at least one lowercase letter.";
        if (!/\W/.test(password)) newErrors.specialChar = "Password must include at least one special character.";
        return newErrors;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const passwordErrors = validatePassword(password);
        if (username.length < 5) passwordErrors.username = "Username must be at least 5 characters.";
        if (Object.keys(passwordErrors).length > 0) {
            setErrors(passwordErrors);
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email, password }),
            });

            const data = await response.json();
            if (response.ok) {
                setUser(data.user);
                toast.success(`Welcome, ${data.user.username}!`, { position: "top-center" });
                navigate("/"); // Navigate to home page
            } else {
                setErrors({ register: data.message || "Sign-up failed. Please try again." });
            }
        } catch (err) {
            toast.error("Sign-up failed. Please try again.", { position: "top-center" });
            setErrors({ register: "Sign-up failed. Please try again." });
        }
    };

    // Handle Google login
    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            setUser(user); // Update user context with Google login data
            toast.success(`Welcome, ${user.displayName}!`, { position: "top-center" });
            navigate("/"); // Navigate to home page
        } catch (err) {
            setErrors({ googleLogin: "Google login failed. Please try again." });
            toast.error("Google login failed. Please try again.", { position: "top-center" });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white shadow-xl rounded-lg p-10 w-full max-w-md">
                <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">Create an Account</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Username Field */}
                    <div>
                        <label className="block text-gray-700 font-medium">Username</label>
                        <input
                            name="username"
                            type="text"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        {errors.username && <p className="text-sm text-red-500 mt-1">{errors.username}</p>}
                    </div>

                    {/* Email Field */}
                    <div>
                        <label className="block text-gray-700 font-medium">Email</label>
                        <input
                            name="email"
                            type="email"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    {/* Password Field */}
                    <div>
                        <label className="block text-gray-700 font-medium">Password</label>
                        <input
                            name="password"
                            type="password"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <p className="text-sm text-gray-600 mt-1">Password must be at least 6 characters, include one uppercase letter, one lowercase letter, and one special character.</p>
                        {Object.keys(errors).map((key) => (
                            <p key={key} className="text-sm text-red-500 mt-1">{errors[key]}</p>
                        ))}
                    </div>

                    {/* Submit Button */}
                    <button className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-all duration-300">
                        Sign Up
                    </button>
                </form>

                {/* Or Divider */}
                <div className="flex items-center my-6">
                    <hr className="flex-grow border-gray-300" />
                    <span className="px-2 text-gray-500">OR</span>
                    <hr className="flex-grow border-gray-300" />
                </div>

                {/* Google Login Button */}
                <button
                    className="w-full flex items-center justify-center border border-gray-300 p-3 rounded-lg hover:bg-gray-100 transition-all duration-300"
                    onClick={handleGoogleLogin}
                >
                    <FcGoogle className="text-2xl mr-2" /> Continue with Google
                </button>

                {/* Already have an account link */}
                <p className="text-center text-gray-600 mt-4">
                    Already have an account? <Link className="text-blue-500 hover:underline" to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
};

// Prop validation
SignUp.propTypes = {
    children: PropTypes.node,
};

export default SignUp;
