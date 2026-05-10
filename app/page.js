
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center max-w-md mx-auto p-8">

        <div className="text-7xl mb-6"></div>

        <h1 className="text-4xl font-bold text-gray-800 mb-3">
          User Manager
        </h1>

        <p className="text-gray-500 mb-8 text-lg">
          Manage users easily!
        </p>

        <Link
          href="/users"
          className="bg-blue-500 text-white px-8 py-3 rounded-xl hover:bg-blue-600 font-semibold transition-colors text-lg"
        >
          Manage Users →
        </Link>

        <p className="text-gray-400 text-sm mt-8">
          Built with Next.js + React + Tailwind CSS
        </p>

      </div>
    </div>
  );
}