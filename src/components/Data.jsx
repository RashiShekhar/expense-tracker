import React, { useState, useEffect } from "react";
import Nav from "./Nav";

export default function Data() {
  const [groupedData, setGroupedData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/entries");
        if (!res.ok) throw new Error("Failed to fetch entries");

        const data = await res.json();

        const grouped = {};
        data.forEach((entry) => {
          // Group by YYYY-MM-DD to keep it consistent
          const date = entry.createdAt
            ? entry.createdAt.split("T")[0]
            : "Unknown date";
          if (!grouped[date]) grouped[date] = [];
          grouped[date].push(entry);
        });

        setGroupedData(grouped);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEntries();
  }, []);

  if (loading) {
    return (
      <>
        <Nav />
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-black to-purple-900">
          <p className="text-white text-xl animate-pulse">Loading data...</p>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Nav />
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-black to-purple-900 p-10">
          <p className="text-red-400 text-xl font-semibold">{error}</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Nav />
      <div className="relative min-h-screen w-full bg-gradient-to-br from-black to-purple-900 overflow-hidden p-10">
        <div className="absolute inset-0 opacity-20 bg-[url('/img2.jpg')] bg-cover bg-center blur-3xl scale-125 z-0" />

        <div className="relative z-10 flex flex-col items-center">
          <h1 className="text-4xl font-extrabold text-white text-center mb-4 mt-10 drop-shadow-md">
            📊 Daily Expense Summary
          </h1>

          <div className="w-full max-w-5xl bg-white/10 backdrop-blur-lg border border-white/30 rounded-xl shadow-2xl p-8 space-y-16">
            {Object.keys(groupedData).length === 0 ? (
              <p className="text-xl text-gray-300 text-center">
                No entries found.
              </p>
            ) : (
              Object.entries(groupedData)
                .sort((a, b) => new Date(b[0]) - new Date(a[0]))
                .map(([date, entries]) => {
                  const dailyTotal = entries.reduce(
                    (sum, e) => sum + Number(e.amount),
                    0
                  );

                  return (
                    <div key={date} className="space-y-6">
                      <h2 className="text-2xl font-extrabold text-purple-400 border-b border-purple-600 pb-2 drop-shadow-md">
                        📅 {date}
                      </h2>
                      <div className="overflow-x-auto rounded-md shadow-sm">
                        <table className="table-auto w-full border-collapse text-white">
                          <thead className="bg-purple-900/50 sticky top-0">
                            <tr>
                              <th className="px-6 py-3 text-lg font-semibold text-left">
                                🛍️ Item
                              </th>
                              <th className="px-6 py-3 text-lg font-semibold text-left">
                                💵 Amount (₹)
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {entries.map((entry, idx) => (
                              <tr
                                key={entry._id}
                                className={`border-b border-purple-700 ${
                                  idx % 2 === 0
                                    ? "bg-purple-900/30"
                                    : "bg-purple-900/20 hover:bg-purple-800/50"
                                }`}
                              >
                                <td className="px-6 py-3">{entry.item}</td>
                                <td className="px-6 py-3 font-medium">
                                  ₹ {Number(entry.amount).toFixed(2)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                          <tfoot className="bg-green-900/50 font-semibold text-green-300">
                            <tr>
                              <td className="px-6 py-3">Total</td>
                              <td className="px-6 py-3">
                                ₹ {dailyTotal.toFixed(2)}
                              </td>
                            </tr>
                          </tfoot>
                        </table>
                      </div>
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
