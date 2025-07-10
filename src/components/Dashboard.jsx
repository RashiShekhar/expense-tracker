import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import { MdDelete } from "react-icons/md";
import { LuBookOpenCheck } from "react-icons/lu";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [amt, setAmt] = useState("");
  const [entries, setEntries] = useState([]);
  const [total, setTotal] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [editAmount, setEditAmount] = useState("");
  const [itemName, setItemName] = useState("");
  const [animatedTotal, setAnimatedTotal] = useState(0);

  const Add = async (e) => {
    e.preventDefault();

    if (!amt || isNaN(amt) || !itemName.trim()) {
      alert("Please enter a valid item name and amount.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/dashboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: Number(amt),
          item: itemName.trim(),
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setEntries((prev) => [...prev, data.data]);
        setAmt("");
        setItemName("");
      } else {
        alert(data.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Error submitting amount:", error);
      alert("Failed to connect to server.");
    }
  };

  const handleDelete = (index) => {
    const updated = entries.filter((_, i) => i !== index);
    setEntries(updated);
    if (editIndex === index) {
      setEditIndex(null);
      setEditAmount("");
    }
  };

  const handleStartEdit = (index) => {
    setEditIndex(index);
    setEditAmount(String(entries[index].amount));
  };

  const handleSaveEdit = () => {
    if (!editAmount.trim() || isNaN(editAmount)) {
      alert("Please enter a valid number.");
      return;
    }

    const updated = entries.map((entry, i) =>
      i === editIndex ? { ...entry, amount: parseFloat(editAmount) } : entry
    );

    setEntries(updated);
    setEditIndex(null);
    setEditAmount("");
  };

  const handleCancelEdit = () => {
    setEditIndex(null);
    setEditAmount("");
  };

  const calculateTotal = () => {
    const sum = entries.reduce((acc, curr) => acc + Number(curr.amount), 0);
    setTotal(sum);
  };

  // Animate the total value smoothly
  useEffect(() => {
    if (total === null) return;

    let start = 0;
    const duration = 700;
    const stepTime = 10;
    const increment = total / (duration / stepTime);

    const interval = setInterval(() => {
      start += increment;
      if (start >= total) {
        clearInterval(interval);
        setAnimatedTotal(total);
      } else {
        setAnimatedTotal(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(interval);
  }, [total]);

  return (
    <>
      <Nav />

      <div className="relative min-h-screen w-full bg-gradient-to-br from-black to-purple-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('/img2.jpg')] bg-cover bg-center blur-3xl scale-125 z-0" />

        <div className="relative z-10 flex items-center justify-center min-h-screen p-6">
          <div className="w-full max-w-2xl bg-white/10 backdrop-blur-lg border border-white/30 shadow-2xl rounded-xl p-8">
            <h2 className="text-4xl font-extrabold text-white text-center mb-8 drop-shadow-md">
              💸 Your Daily Tracker
            </h2>

            <form className="flex flex-col gap-6 items-center" onSubmit={Add}>
              <div className="w-full max-w-sm relative">
                <input
                  type="text"
                  id="itemName"
                  placeholder=" "
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  className="peer block w-full rounded-lg border border-white/30 bg-transparent px-4 pt-5 pb-2 text-white placeholder-transparent focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400 transition"
                  required
                  aria-label="Item name"
                />
                <label
                  htmlFor="itemName"
                  className="absolute left-4 top-2 text-sm text-white/70 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-white/40 peer-focus:top-2 peer-focus:text-sm peer-focus:text-emerald-400"
                >
                  🧾 Item name
                </label>
              </div>

              <div className="w-full max-w-sm relative">
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  id="amount"
                  placeholder=" "
                  value={amt}
                  onChange={(e) => setAmt(e.target.value)}
                  className="peer block w-full rounded-lg border border-white/30 bg-transparent px-4 pt-5 pb-2 text-white placeholder-transparent focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400 transition"
                  required
                  aria-label="Amount"
                />
                <label
                  htmlFor="amount"
                  className="absolute left-4 top-2 text-sm text-white/70 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-white/40 peer-focus:top-2 peer-focus:text-sm peer-focus:text-emerald-400"
                >
                  💰 Amount
                </label>
              </div>

              <div className="flex gap-4 mt-2">
                <button
                  type="submit"
                  className="btn bg-emerald-500 text-white px-8 py-2 rounded-lg shadow-md hover:bg-emerald-600 transition"
                >
                  ➕ Add
                </button>
                <button
                  type="button"
                  className="btn bg-indigo-500 text-white px-8 py-2 rounded-lg shadow-md hover:bg-indigo-600 transition"
                  onClick={calculateTotal}
                >
                  📊 Total
                </button>
              </div>
            </form>

            {/* Entry List */}
            <div className="mt-8 space-y-4">
              {entries.length === 0 ? (
                <div className="text-white text-center text-lg animate-pulse">
                  No entries yet. Start tracking 💼
                </div>
              ) : (
                entries.map((entry, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center bg-white/80 p-3 rounded-md shadow-sm"
                  >
                    {editIndex === index ? (
                      <div className="flex items-center gap-3 w-full">
                        <input
                          type="text"
                          value={editAmount}
                          onChange={(e) => setEditAmount(e.target.value)}
                          className="input input-sm w-24"
                        />
                        <div className="ml-auto flex gap-2">
                          <button
                            className="btn btn-sm btn-success"
                            onClick={handleSaveEdit}
                          >
                            ✅ Save
                          </button>
                          <button
                            className="btn btn-sm btn-warning"
                            onClick={handleCancelEdit}
                          >
                            ❌ Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex justify-between items-center w-full">
                        <span className="text-lg font-medium text-black">
                          📌 {entry.item} — ₹{entry.amount}
                        </span>
                        <div className="flex gap-2">
                          <button
                            className="btn btn-sm btn-outline btn-info"
                            onClick={() => handleStartEdit(index)}
                          >
                            ✏️
                          </button>
                          <button
                            className="btn btn-sm btn-outline btn-error"
                            onClick={() => handleDelete(index)}
                          >
                            <MdDelete />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>

            {total !== null && (
              <div className="text-center mt-6 text-3xl font-bold text-green-300 transition-all">
                Total Spent: ₹ {animatedTotal}
              </div>
            )}

            <div className="flex justify-center mt-6">
              <Link to="/Data">
                <button className="btn btn-outline btn-warning text-lg flex items-center gap-2 hover:scale-105 transition">
                  <LuBookOpenCheck />
                  View Full History
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
