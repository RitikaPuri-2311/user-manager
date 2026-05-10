"use client";
import { useState } from "react";

export default function UserForm({ onAdd }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email) {
      setError("Please fill in both fields!");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email!");
      return;
    }

    setLoading(true);
    setError("");

    const result = await onAdd({ name, email });

    if (result && result.error) {
      setError(result.error);
    } else {
      setName("");
      setEmail("");
    }

    setLoading(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border mb-8">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
         Add New User
      </h2>

      {error && (
        <p className="text-red-500 text-sm mb-3 bg-red-50 p-2 rounded">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setError("");
          }}
          placeholder="Full name"
          className="border p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <input
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
          }}
          placeholder="Email address"
          className="border p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white py-2.5 rounded-lg hover:bg-blue-600 font-medium transition-colors disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add User +"}
        </button>
      </form>
    </div>
  );
}