import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveTokens } from "../utils/auth.js";

function Login() {
    const BASE = import.meta.env.VITE_DJANGO_BASE_URL;

    const [form, setForm] = useState({
        username: "",
        password: "",
    });

    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        try {
            const response = await fetch(`${BASE}/api/token/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            const data = await response.json();

            if (response.ok) {
                saveTokens(data);
                setMessage("Login successful!");

                setTimeout(() => {
                    navigate("/");
                }, 1000);
            } else {
                setMessage(
                    data.detail || "Login failed. Please try again."
                );
            }
        } catch (error) {
            console.error("Login error:", error);
            setMessage("An error occurred. Please try again.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6">
            <div className="max-w-md w-full bg-white p-6 rounded shadow">
                <h2 className="text-2xl font-bold mb-4">
                    Login
                </h2>

                <form onSubmit={handleSubmit} className="space-y-3">
                    <input
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                        placeholder="Username"
                        required
                        className="w-full p-2 border rounded"
                    />

                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Password"
                        required
                        className="w-full p-2 border rounded"
                    />

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded"
                    >
                        Login
                    </button>
                </form>

                {message && (
                    <p className="mt-3 text-sm">{message}</p>
                )}

                <div className="mt-4 text-sm">
                    Don't have an account?{" "}
                    <a
                        href="/signup"
                        className="text-blue-600 hover:underline"
                    >
                        Sign up
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Login;