// app/users/page.js
// Main Users page — connects frontend to API
// Shows: Add form + Users list
// Handles: Create, Read, Update, Delete

"use client";

import { useState, useEffect } from "react";
import UserForm from "../../components/Userform";
import UserCard from "../../components/Usercard";

export default function UsersPage() {

  
  const [users, setUsers] = useState([]);

 
  const [loading, setLoading] = useState(true);

  
  const [success, setSuccess] = useState("");

  
  useEffect(() => {
    fetchUsers();
  }, []);
  
 const fetchUsers = async () => {
  try {
    setLoading(true);
    const res = await fetch("/api/users");
    const data = await res.json();

    
    if (Array.isArray(data)) {
      setUsers(data);
    } else {
      setUsers([]); 
      console.error("API returned:", data);
    }

  } catch (err) {
    console.error("Could not load users!", err);
    setUsers([]); 
  } finally {
    setLoading(false);
  }
};
  
  const handleAdd = async (userData) => {
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await res.json();

      if (!res.ok) {
        return { error: data.error };
        
      }

    
      showSuccess(`${userData.name} added successfully!`);

      await fetchUsers();
      

      return {};
      
    } catch (err) {
      return { error: "Could not add user!" };
    }
  };

  
  const handleEdit = async (id, updates) => {
    try {
      const res = await fetch(`/api/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });

      const data = await res.json();

      if (!res.ok) {
        return { error: data.error };
      }

      showSuccess("User updated successfully! ");
      await fetchUsers();
      return {};

    } catch (err) {
      return { error: "Could not update user!" };
    }
  };


  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/users/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) return;

      showSuccess("User deleted! ");
      await fetchUsers();

    } catch (err) {
      console.error("Could not delete user!", err);
    }
  };


  const showSuccess = (message) => {
    setSuccess(message);
    setTimeout(() => setSuccess(""), 3000);
    
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">

        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Users Manager 
          </h1>
          <p className="text-gray-500 mt-1">
            Add, edit and delete users.
          </p>
        </div>

       
        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl">
            {success}
          </div>
        )}

        
        <UserForm onAdd={handleAdd} />

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-700">
            All Users
          </h2>
          <span className="bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full font-medium">
            {users.length} {users.length === 1 ? "user" : "users"}
          </span>
        </div>

        {loading ? (
          <div className="text-center py-16 text-gray-400">
            <p className="text-4xl mb-3"> </p>
            <p>Loading users...</p>
          </div>

        ) : users.length === 0 ? (
          /* Empty state */
          <div className="text-center py-16 bg-white rounded-xl border text-gray-400">
            <p className="text-4xl mb-3"></p>
            <p className="font-medium">No users yet!</p>
            <p className="text-sm mt-1">Add your first user above </p>
          </div>

        ) : (
          /* Users grid */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {users.map((user) => (
              <UserCard
                key={user.id}
                user={user}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}