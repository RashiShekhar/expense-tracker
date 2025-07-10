import React, { useEffect, useState } from "react";
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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        login(data.user);
        console.log("Login success:", data);
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
    <div className="relative min-h-screen w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-lg scale-110"
        style={{
          backgroundImage: `url("/img2.jpg")`,
        }}
      ></div>

      <div className="relative z-10 p-10">
        <div className="flex flex-col justify-center items-center p-10 gap-4">
          <div className="w-96 border-2 rounded-md border-black bg-transparent backdrop-blur-sm p-8">
            <div className="text-3xl text-center underline underline-offset-4 mb-6">
              LOGIN
            </div>

            <form className="flex flex-col gap-4" onSubmit={handleLogin}>
              <div className="flex flex-col gap-2">
                <label htmlFor="uname" className="font-bold">
                  Email:
                </label>
                <input
                  type="text"
                  className="border border-black p-1 rounded"
                  id="email"
                  placeholder="Enter Your Email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <label htmlFor="upass" className="font-bold">
                  Password:
                </label>
                <input
                  type="password"
                  className="border border-black p-1 rounded"
                  id="upass"
                  placeholder="Enter Your Password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn border border-black btn-lg rounded-full self-center p-2 hover:bg-black hover:text-white"
              >
                Login
              </button>
            </form>
          </div>

          <p className="text-black text-lg">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="underline text-stone-900 hover:text-gray-950"
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
