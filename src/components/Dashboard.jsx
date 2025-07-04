import React, { useState } from "react";
import Nav from "./Nav";

export default function Dashboard() {
  const [amt, setAmt] = useState("");
  const [entries, setEntries] = useState([]);
  const [total, setTotal] = useState(null);

  const Add = async (e) => {
    e.preventDefault();

    if (!amt || isNaN(amt)) {
      alert("Please enter a valid number.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/dashboard", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: Number(amt) }),
      });

      const data = await response.json();
      console.log("Server Response:", data);

      if (response.ok) {
        // Add new entry to the displayed list
        setEntries((prev) => [...prev, data.data]);
        setAmt("");
      } else {
        alert(data.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Error submitting amount:", error);
      alert("Failed to connect to server.");
    }
  };

  const calculateTotal = () => {
    const sum = entries.reduce((acc, curr) => acc + Number(curr.amount), 0);
    setTotal(sum);
  };

  return (
    <>
      <Nav />

      <div className="relative min-h-screen w-full">
        <img
          src="/img2.jpg"
          alt="Dashboard Background"
          className="w-full h-full object-cover blur-xl absolute inset-0"
        />

        <div className="relative z-10 p-10">
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
                <button className="btn btn-secondary" onClick={calculateTotal}>
                  <b>Total</b>
                </button>
              </div>

              <div className="mt-6 space-y-2">
                <h3 className="text-lg font-bold">Entered Amounts:</h3>
                <ul className="list-disc list-inside">
                  {entries.length === 0 ? (
                    <li className="text-gray-500">No entries</li>
                  ) : (
                    entries.map((entry, index) => (
                      <li key={index}>₹ {entry.amount}</li>
                    ))
                  )}
                </ul>
              </div>

              {total !== null && (
                <div className="mt-4 text-lg font-bold text-green-700">
                  Total: ₹ {total}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
