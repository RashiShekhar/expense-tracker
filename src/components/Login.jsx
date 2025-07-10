import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        login(data.user);
        nav("/dashboard");
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Server error during login");
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-black to-purple-900">
      <div className="absolute inset-0 opacity-20 bg-[url('/img2.jpg')] bg-cover bg-center blur-3xl scale-125 z-0" />

      <div className="absolute inset-0 bg-black/60 z-0" />

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="bg-white/10 backdrop-blur-lg border border-white/30 p-8 rounded-xl shadow-2xl w-full max-w-md">
          <h1 className="text-4xl font-extrabold text-white text-center mb-6 drop-shadow-md">
            Welcome Back 👋
          </h1>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-white/80 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-white/50 border border-white/30 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-white/80 mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-white/50 border border-white/30 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold rounded-lg shadow-lg transition duration-300"
            >
              Log In
            </button>
          </form>

          <p className="mt-6 text-center text-white/70 text-sm">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-emerald-400 hover:text-emerald-600 hover:underline transition"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
