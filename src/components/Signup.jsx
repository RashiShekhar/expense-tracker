import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const userData = { name, email, password };
    const response = await fetch("http://localhost:5000/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    if (response.ok) {
      console.log("User created: ", data);
      navigate("/login");
    } else {
      alert(data.message || "Signup failed");
      console.error("Signup failed:", data.message);
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-110"
        style={{
          backgroundImage: `url("/img2.jpg")`,
        }}
      ></div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60 z-0" />

      {/* Signup form */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="bg-white/10 backdrop-blur-md p-10 rounded-lg shadow-xl w-96 border border-white/30">
          <h2 className="text-3xl font-bold text-center text-white mb-6">
            Create Account
          </h2>

          <form className="flex flex-col gap-4" onSubmit={handleSignup}>
            <div className="flex flex-col gap-2 text-white">
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Name
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 rounded-lg bg-white/20 text-white border border-white/30 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your email"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 rounded-lg bg-white/20 text-white border border-white/30 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <label
                htmlFor="password"
                className="block text-sm font-medium mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-2 rounded-lg bg-white/20 text-white border border-white/30 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <label
                htmlFor="password"
                className="block text-sm font-medium mb-1"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="c_password"
                className="w-full px-4 py-2 rounded-lg bg-white/20 text-white border border-white/30 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Re-Enter your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 transition-colors duration-300 text-white font-semibold rounded-lg shadow-md"
            >
              SignUp
            </button>
          </form>

          <p className="text-center text-sm text-white mt-4">
            Already have an account?{" "}
            <Link to="/login" className="underline hover:text-gray-300">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
