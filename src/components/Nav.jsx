import React from "react";
import { SiPivotaltracker } from "react-icons/si";
import { FiLogOut } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Nav() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="w-full h-16 fixed top-0 left-0 z-50 backdrop-blur-md bg-white/10 border-b border-white/20 text-white px-6 flex justify-between items-center shadow-md">
      <div className="flex items-center gap-3 text-xl font-semibold tracking-wide">
        <SiPivotaltracker className="text-2xl text-emerald-400 drop-shadow" />
        <span className="text-white font-mono">
          <span className="text-emerald-300">Finance</span>{" "}
          <span className="text-orange-200">Tracker</span>
        </span>
      </div>

      <div className="flex items-center gap-4">
        {user?.name && (
          <span className="text-sm font-medium text-white hidden sm:block">
            👋 Hello, <span className="text-emerald-300">{user.name}</span>
          </span>
        )}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-4 py-1 rounded-full shadow-sm transition hover:scale-105 active:scale-95 border border-white/30"
        >
          <span className="text-sm font-medium">Logout</span>
          <FiLogOut className="text-base" />
        </button>
      </div>
    </nav>
  );
}
