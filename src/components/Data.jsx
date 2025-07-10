import React, { useState, useEffect } from "react";
import Nav from "./Nav";

export default function Data() {
  const [groupedData, setGroupedData] = useState({});

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/entries");
        const data = await res.json();

        const grouped = {};
        data.forEach((entry) => {
          const date = new Date(entry.createdAt).toLocaleDateString();
          if (!grouped[date]) grouped[date] = [];
          grouped[date].push(entry);
        });

        setGroupedData(grouped);
      } catch (error) {
        console.error("Error fetching entries:", error);
      }
    };

    fetchEntries();
  }, []);

  return (
    <>
      <Nav />
      <div className="bg-slate-900 min-h-screen p-10">
        <h1 className="text-4xl font-bold text-white text-center mb-2">
          📊 Daily Expense Summary
        </h1>

        <div className="flex flex-col items-center justify-center">
          <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6 space-y-10">
            {Object.keys(groupedData).length === 0 ? (
              <p className="text-xl text-gray-700">No entries found.</p>
            ) : (
              Object.entries(groupedData)
                .sort((a, b) => new Date(b[0]) - new Date(a[0]))
                .map(([date, entries]) => {
                  const dailyTotal = entries.reduce(
                    (sum, e) => sum + Number(e.amount),
                    0
                  );

                  return (
                    <div key={date} className="space-y-3">
                      <h2 className="text-2xl font-bold text-blue-700">
                        📅 {date}
                      </h2>
                      <table className="table-auto w-full text-left border-collapse">
                        <thead className="bg-gray-100">
                          <tr>
                            <th className="px-4 py-2 text-lg">🛍️ Item</th>
                            <th className="px-4 py-2 text-lg">💵 Amount (₹)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {entries.map((entry) => (
                            <tr
                              key={entry._id}
                              className="border-b hover:bg-gray-50"
                            >
                              <td className="px-4 py-2">{entry.item}</td>
                              <td className="px-4 py-2">₹ {entry.amount}</td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot className="bg-green-100 font-semibold">
                          <tr>
                            <td className="px-4 py-2">Total</td>
                            <td className="px-4 py-2 text-green-700">
                              ₹ {dailyTotal}
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  );
                })
            )}
          </div>
        </div>
      </div>
    </>
  );
}
