"use client";

import { useState } from "react";
import Image from "next/image";
export default function Home() {
  const [nin, setNin] = useState("");
  const [result, setResult] = useState("");
const [loading, setLoading] = useState(false);

  const checkStatus = async () => {
    if (nin.length !== 11) {
  setResult("Please enter a valid 11-digit NIN.");
  return;
}

setLoading(true);
    const res = await fetch("/api/check-status", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nin }),
    });

    const data = await res.json();
    setLoading(false);
    if (data.success) {
      setResult(
  `Congratulations ${data.applicant.name}! Status: ${data.applicant.status}`
);
    } else {
      setResult("Sorry, NIN not found.");
    }
  };

  return (
    <main className="min-h-screen bg-green-300 flex flex-col items-center justify-center">
     <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        

<div className="flex justify-center items-center gap-8 mb-6">
  <Image
    src="/img1.jpg"
    alt="Logo 1"
    width={120}
    height={120}
  />

  <Image
    src="/img3.jpg"
    alt="Logo 2"
    width={120}
    height={120}
  />
</div>

<h1 className="text-3xl font-bold text-center text-green-500 mb-2">
  Empowerment Status Checker
</h1>
        <p className="text-center text-gray-600 mt-2">
          Enter your NIN Number
        </p>

        <input
          type="text"
          value={nin}
          onChange={(e) => setNin(e.target.value)}
          placeholder="Enter your NIN Number"
          className="w-full border p-3 rounded mt-6 bg-white text-black placeholder-gray-500"
        />
<button
  onClick={checkStatus}
  disabled={loading}
  className="w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded-lg font-semibold disabled:opacity-50"
>
  {loading ? "Checking..." : "Check Status"}
</button>

       {result && (
  <div className="mt-6 bg-green-100 border border-green-400 rounded-lg p-4 text-center">
    <p className="text-green-900 font-semibold whitespace-pre-line">
      {result}
    </p>
  </div>
)}
      </div>
      <footer className="mt-8 text-center text-white text-sm">
  <p>© 2026 Empowerment Programme. All Rights Reserved.</p>
  <p className="mt-1">Powered by RDD Goverment House Kano</p>
</footer>
    </main>
  );
}