"use client";
import { useState } from "react";

export default function Userform() {
    

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  return (

    <div className="bg-white p-6 rounded-lg shadow-sm border">

      
      <h2 className="text-xl font-bold mb-4">
        Add New User
      </h2>

    
      <input
        type="text"
        placeholder="Enter full name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-3 rounded w-full mb-3"
      />

      <input
         type="email"
        placeholder="Enter email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-3 rounded w-full mb-4"
      />

      
      <p>Name: {name}</p>
      <p>Email: {email}</p>

    <button
        className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded transition-colors"
          >
  Add User
</button>

    </div>
  );
}