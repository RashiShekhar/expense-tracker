import React from "react";
import { SiPivotaltracker } from "react-icons/si";
import { FiLogOut } from "react-icons/fi";

export default function Dashboard() {
  return (
    <>
      <nav className="w-full h-16 bg-slate-900 text-white px-6 flex justify-between items-center sticky top-0 z-50 shadow-md">
        <div className="flex items-center gap-2 text-xl font-semibold">
          <SiPivotaltracker className="text-3xl text-emerald-400" />
          <span>𝔽𝕚𝕟𝕒𝕟𝕔𝕖 𝕋𝕣𝕒𝕔𝕜𝕖𝕣</span>
        </div>

        <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-1 rounded flex justify-between items-center gap-2">
          <span>Logout</span>
          <FiLogOut />
        </button>
      </nav>
    </>
  );
}
