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
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-6">
        <h1 className="text-4xl md:text-6xl font-extrabold drop-shadow-lg">
          Welcome to Finance Tracker
        </h1>
        <p className="text-lg md:text-2xl mt-4 drop-shadow-md">
          Securely manage your budget and expenses
        </p>
        <button
          onClick={() => navigate("/login")}
          className="mt-10 px-6 py-2 bg-white text-black rounded-lg shadow-md hover:bg-gray-200 transition"
        >
          <b>Skip to Login</b>
        </button>
      </div>
    </div>
  );
}

export default Intro;
