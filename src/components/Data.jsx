import React from "react";
import Nav from "./Nav";
export default function Data() {
  return (
    <>
      <Nav />
      <div className="flex text-white justify-center items-center min-h-screen bg-slate-900 p-10">
        <table className="border border-black">
          <thead>
            <tr>
              <th className="border border-black px-4 py-2">Item</th>
              <th className="border border-black px-4 py-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-black px-4 py-2">Apples</td>
              <td className="border border-black px-4 py-2">₹100</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
