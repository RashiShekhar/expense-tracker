import React, { useState } from "react";
import Nav from "./Nav";
import { MdDelete } from "react-icons/md";
import { LuBookOpenCheck } from "react-icons/lu";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [amt, setAmt] = useState("");
  const [entries, setEntries] = useState([]);
  const [total, setTotal] = useState(null);
  const [editIndex, setEditIndex] = React.useState(null);
  const [editAmount, setEditAmount] = React.useState("");
  const [itemName, setItemName] = useState("");

  const Add = async (e) => {
    e.preventDefault();

    if (!amt || isNaN(amt) || !itemName.trim()) {
      alert("Please enter a valid item name and amount.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/dashboard", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: Number(amt),
          item: itemName.trim(),
        }),
      });

      const data = await response.json();
      console.log("Server Response:", data);

      if (response.ok) {
        // Add new entry to the displayed list
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
    // Remove the entry at the given index
    const updated = entries.filter((_, i) => i !== index);
    setEntries(updated);
    // Reset edit state if the deleted item was being edited
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
      i === editIndex ? { amount: parseFloat(editAmount) } : entry
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

  return (
    <>
      <Nav />

      <div className="relative min-h-screen w-full">
        <img
          src="/img2.jpg"
          alt="Dashboard Background"
          className="w-full h-full object-cover blur-xl absolute inset-0"
        />
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="relative z-10 p-10">
            <div className="card w-full max-w-xl bg-base-100 shadow-xl bg-opacity-90 gap-6 border border-white p-10 rounded-lg">
              <div className="card-body space-y-6">
                <h2 className="card-title text-3xl">
                  💰 <b>Daily Expense Tracker</b>
                </h2>

                <input
                  type="text"
                  placeholder="Enter item name"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  className="input input-accent w-80 gap-4 text-lg"
                />

                <input
                  type="text"
                  placeholder="Enter amount"
                  value={amt}
                  onChange={(e) => setAmt(e.target.value)}
                  className="input input-accent w-80 gap-4 text-lg"
                />

                <div className="flex gap-5 mt-4">
                  <button
                    className="btn btn-accent px-8 py-3 text-lg"
                    onClick={Add}
                  >
                    <b>Add</b>
                  </button>
                  <button
                    className="btn btn-secondary px-8 py-3 text-lg"
                    onClick={calculateTotal}
                  >
                    <b>Total</b>
                  </button>
                </div>

                <div className="space-y-3">
                  {entries.length === 0 ? (
                    <div className="text-black text-lg">No entries</div>
                  ) : (
                    entries.map((entry, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between gap-4 bg-white p-2 rounded-md shadow-sm"
                      >
                        {editIndex === index ? (
                          <div className="flex items-center gap-3 w-full">
                            <input
                              type="text"
                              value={editAmount}
                              onChange={(e) => setEditAmount(e.target.value)}
                              className="input input-sm input-accent w-24"
                            />
                            <div className="flex gap-2 ml-auto">
                              <button
                                className="btn btn-sm btn-success"
                                onClick={handleSaveEdit}
                                disabled={!editAmount.trim()}
                              >
                                ✅ Save
                              </button>
                              <button
                                className="btn btn-sm btn-outline btn-warning"
                                onClick={handleCancelEdit}
                              >
                                ❌ Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex justify-between items-center w-full">
                            <span className="text-lg">
                              🛒 {entry.item || "Unnamed Item"} — ₹{" "}
                              {entry.amount}
                            </span>

                            <div className="flex gap-2">
                              <button
                                className="btn btn-sm btn-outline btn-info"
                                onClick={() => handleStartEdit(index)}
                              >
                                ✏️ Edit
                              </button>
                              <button
                                className="btn btn-sm btn-outline btn-error flex items-center gap-1"
                                onClick={() => handleDelete(index)}
                              >
                                <MdDelete className="text-lg" />
                                Delete
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>

                {total !== null && (
                  <div className="mt-6 text-2xl font-bold text-green-700">
                    Total: ₹ {total}
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-center mt-6">
              <Link to="/Data">
                <button className="btn btn-sm btn-outline btn-error flex items-center gap-1 bg-transparent rounded hover:bg-orange-400 text-black text-lg px-8 py-3 border-2 border-black">
                  <LuBookOpenCheck />
                  <b>Check Here</b>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
