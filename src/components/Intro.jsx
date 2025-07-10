import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Intro() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 15000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <video
        src="/intro.mp4"
        autoPlay
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-black/60 z-10" />

      <div className="relative z-20 flex flex-col items-center justify-center h-full px-6 text-center text-white">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
          Welcome to <span className="text-blue-400">Finance Tracker</span>
        </h1>
        <p className="text-lg md:text-2xl max-w-xl drop-shadow-md">
          Securely manage your budget, track expenses, and gain financial
          clarity.
        </p>

        <button
          onClick={() => navigate("/login")}
          className="mt-10 px-6 py-3 bg-white text-black rounded-full text-lg font-semibold shadow-lg hover:bg-gray-200 transition-all duration-300"
        >
          Skip to Login
        </button>
      </div>
    </div>
  );
}

export default Intro;
