import React, { useState } from "react";
import Nav from "./Nav";

export default function Dashboard() {
  const [amt, setAmt] = useState("");

  const Add = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: amt }),
      });

      const data = await response.json();
      console.log("Server Response:", data);
      setAmt("");
    } catch (error) {
      console.error("Error submitting amount:", error);
    }
  };

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
                value={amt}
                onChange={(e) => setAmt(e.target.value)}
                className="input input-accent w-60 gap-3"
              />

              <div className="flex gap-3 mt-2">
                <button className="btn btn-accent" onClick={Add}>
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
