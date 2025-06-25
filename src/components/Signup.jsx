import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

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

            <form className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="uname" className="font-bold">
                  Name:
                </label>
                <input
                  type="text"
                  className="border border-black p-1 rounded"
                  id="uname"
                  placeholder="Enter Your Name"
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
                  required
                />
                <label htmlFor="upass" className="font-bold">
                  Confirm Password:
                </label>
                <input
                  type="password"
                  className="border border-black p-1 rounded"
                  id="upass"
                  placeholder="Confirm Password"
                  required
                />
              </div>

              <button
                type="submit"
                onClick={() => navigate("/login")}
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

export default Login;
