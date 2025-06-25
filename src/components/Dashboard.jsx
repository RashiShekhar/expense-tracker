import React from "react";
import Nav from "./Nav";

export default function Dashboard() {
  return (
    <>
      <Nav />

      <div className="relative w-full h-screen overflow-hidden">
        <img
          src="/img2.jpg"
          alt="Dashboard Background"
          className="w-full h-full object-cover blur-xl"
        />

        <div className="absolute top-0 left-0 w-full h-full flex items-start justify-start p-10">
          <div className="card w-full max-w-sm bg-base-100 shadow-xl bg-opacity-90 gap-3 border border-white p-6">
            <div className="card-body space-y-4">
              <h2 className="card-title">
                💰 <b>Daily Expense Tracker</b>
              </h2>

              <input
                type="text"
                placeholder="Enter amount"
                className="input input-accent w-60 gap-3"
              />

              <div className="flex gap-3 mt-2">
                <button className="btn btn-accent">
                  <b>Add</b>
                </button>
                <button className="btn btn-secondary">
                  <b>Total</b>
                </button>
              </div>

              <div></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
