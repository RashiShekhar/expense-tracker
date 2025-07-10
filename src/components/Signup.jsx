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
      navigate("/login");
    } else {
      alert(data.message || "Signup failed");
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-black to-purple-900">
      <div className="absolute inset-0 opacity-20 bg-[url('/img2.jpg')] bg-cover bg-center blur-3xl scale-125 z-0" />

      <div className="absolute inset-0 bg-black/60 z-0" />

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="bg-white/10 backdrop-blur-lg border border-white/30 p-8 rounded-xl shadow-2xl w-full max-w-md">
          <h2 className="text-3xl font-extrabold text-white text-center mb-6 drop-shadow-md">
            ✨ Create an Account
          </h2>

          <form className="flex flex-col gap-5" onSubmit={handleSignup}>
            {[
              {
                id: "name",
                label: "Name",
                type: "text",
                value: name,
                setValue: setName,
                placeholder: "Enter your name",
              },
              {
                id: "email",
                label: "Email",
                type: "email",
                value: email,
                setValue: setEmail,
                placeholder: "Enter your email",
              },
              {
                id: "password",
                label: "Password",
                type: "password",
                value: password,
                setValue: setPassword,
                placeholder: "Enter your password",
              },
              {
                id: "confirmPassword",
                label: "Confirm Password",
                type: "password",
                value: confirmPassword,
                setValue: setConfirmPassword,
                placeholder: "Re-enter your password",
              },
            ].map(({ id, label, type, value, setValue, placeholder }) => (
              <div key={id} className="flex flex-col text-white gap-1">
                <label
                  htmlFor={id}
                  className="text-sm font-semibold text-white/80"
                >
                  {label}
                </label>
                <input
                  id={id}
                  type={type}
                  placeholder={placeholder}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  required
                  className="px-4 py-3 rounded-lg bg-white/20 text-white placeholder-white/50 border border-white/30 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition"
                />
              </div>
            ))}

            <button
              type="submit"
              className="mt-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold rounded-lg shadow-lg transition duration-300"
            >
              Sign Up
            </button>
          </form>

          <p className="text-center text-sm text-white/70 mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="underline text-emerald-400 hover:text-emerald-600 transition"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
