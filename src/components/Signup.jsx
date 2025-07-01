import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

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
      console.error("Signup failed:", data.message);
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
        <h1 className="text-center text-5xl font-semibold m-4 text-white drop-shadow-lg">
          <i>Finance Tracker Application</i>
        </h1>

        <div className="flex flex-col justify-center items-center p-10 gap-4">
          <div className="w-96 border-2 rounded-md border-black bg-transparent backdrop-blur-sm p-8">
            <div className="text-3xl text-center underline underline-offset-4 mb-6">
              SIGNUP
            </div>

            <form className="flex flex-col gap-4" onSubmit={handleSignup}>
              <div className="flex flex-col gap-2">
                <label htmlFor="uname" className="font-bold">
                  Name:
                </label>
                <input
                  type="text"
                  className="border border-black p-1 rounded"
                  id="uname"
                  placeholder="Enter Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <label htmlFor="upass" className="font-bold">
                  Email:
                </label>
                <input
                  type="text"
                  className="border border-black p-1 rounded"
                  id="email"
                  placeholder="Enter Your Email"
                  value={email}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <label htmlFor="upass" className="font-bold">
                  Confirm Password:
                </label>
                <input
                  type="password"
                  className="border border-black p-1 rounded"
                  id="cpass"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn border border-black btn-lg rounded-full self-center p-2 hover:bg-black hover:text-white"
              >
                SignUp
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
