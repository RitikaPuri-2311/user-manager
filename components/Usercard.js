"use client";
import { useState } from "react";

export default function UserCard({ user, onDelete, onEdit }) {

  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user.name);
  const [editEmail, setEditEmail] = useState(user.email);
  const [showConfirm, setShowConfirm] = useState(false);
  const [editError, setEditError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!editName || !editEmail) {
      setEditError("Both fields are required!");
      return;
    }
    setLoading(true);
    const result = await onEdit(user.id, {
      name: editName,
      email: editEmail
    });
    if (result && result.error) {
      setEditError(result.error);
    } else {
      setIsEditing(false);
      setEditError("");
    }
    setLoading(false);
  };

  const handleCancel = () => {
    setEditName(user.name);
    setEditEmail(user.email);
    setIsEditing(false);
    setEditError("");
  };

  return (
    <div className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">

      {isEditing ? (
        <div className="flex flex-col gap-3">
          <h3 className="font-semibold text-gray-700">Editing...</h3>

          {editError && (
            <p className="text-red-500 text-sm">{editError}</p>
          )}

          <input
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="Name"
          />
          <input
            value={editEmail}
            onChange={(e) => setEditEmail(e.target.value)}
            className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="Email"
          />

          <div className="flex gap-2">
            <button
              onClick={handleSave}
              disabled={loading}
              className="bg-green-500 text-white px-4 py-1.5 rounded-lg hover:bg-green-600 text-sm"
            >
              {loading ? "Saving..." : "Save ✓"}
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-200 text-gray-700 px-4 py-1.5 rounded-lg hover:bg-gray-300 text-sm"
            >
              Cancel
            </button>
          </div>
        </div>

      ) : (
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-xl">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-semibold text-gray-800">{user.name}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
              <p className="text-xs text-gray-400 mt-0.5">
                Added: {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setIsEditing(true)}
              className="flex-1 text-sm bg-blue-50 text-blue-600 px-3 py-2 rounded-lg hover:bg-blue-100"
            >
              ✏️ Edit
            </button>
            <button
              onClick={() => setShowConfirm(true)}
              className="flex-1 text-sm bg-red-50 text-red-500 px-3 py-2 rounded-lg hover:bg-red-100"
            >
              🗑️ Delete
            </button>
          </div>

          {showConfirm && (
            <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600 mb-3">
                Are you sure you want to delete <strong>{user.name}</strong>?
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    onDelete(user.id);
                    setShowConfirm(false);
                  }}
                  className="text-sm bg-red-500 text-white px-4 py-1.5 rounded-lg hover:bg-red-600"
                >
                  Yes, Delete
                </button>
                <button
                  onClick={() => setShowConfirm(false)}
                  className="text-sm bg-gray-200 text-gray-700 px-4 py-1.5 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}