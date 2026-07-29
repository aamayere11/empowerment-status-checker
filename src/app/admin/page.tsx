"use client";

import { useState } from "react";

export default function AdminPage() {
  const [form, setForm] = useState({
    name: "",
    nin: "",
    phone: "",
    gender: "Male",
    lga: "",
    bankName: "",
    accountNumber: "",
    status: "Selected",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const saveApplicant = async () => {
    if (form.nin.length !== 11) {
      alert("NIN must be 11 digits.");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/add-applicant", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    setLoading(false);

    if (data.success) {
      alert("Applicant added successfully!");

      setForm({
        name: "",
        nin: "",
        phone: "",
        gender: "Male",
        lga: "",
        bankName: "",
        accountNumber: "",
        status: "Selected",
      });
    } else {
      alert(data.message);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 flex justify-center py-10">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-xl">

        <h1 className="text-3xl font-bold text-center text-green-700 mb-6">
          Add Applicant
        </h1>

        <input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-3 rounded mb-4 text-black"
        />

        <input
          name="nin"
          placeholder="NIN"
          value={form.nin}
          onChange={handleChange}
          className="w-full border p-3 rounded mb-4 text-black"
        />

        <input
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          className="w-full border p-3 rounded mb-4 text-black"
        />

        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
          className="w-full border p-3 rounded mb-4 text-black"
        >
          <option>Male</option>
          <option>Female</option>
        </select>

        <input
          name="lga"
          placeholder="LGA"
          value={form.lga}
          onChange={handleChange}
          className="w-full border p-3 rounded mb-4 text-black"
        />

        <input
          name="bankName"
          placeholder="Bank Name"
          value={form.bankName}
          onChange={handleChange}
          className="w-full border p-3 rounded mb-4 text-black"
        />

        <input
          name="accountNumber"
          placeholder="Account Number"
          value={form.accountNumber}
          onChange={handleChange}
          className="w-full border p-3 rounded mb-4 text-black"
        />

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full border p-3 rounded mb-6 text-black"
        >
          <option>Selected</option>
          <option>Not Selected</option>
        </select>

        <button
          onClick={saveApplicant}
          disabled={loading}
          className="w-full bg-green-700 hover:bg-green-800 text-white p-3 rounded-lg"
        >
          {loading ? "Saving..." : "Save Applicant"}
        </button>

      </div>
    </main>
  );
}