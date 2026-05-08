
import Link from "next/link";
// Why Link? → Faster than <a> tag — no full page reload!

export default function Navbar() {
  return (
    <nav className="bg-white border-b shadow-sm px-8 py-4 flex items-center justify-between">
     
      <div>
        <h1 className="text-xl font-bold text-blue-600">
          User Manager 
        </h1>
        
      </div>
      
      <div className="flex gap-6">
        <Link
          href="/"
          className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
        >
         Home
        </Link>
        
        <Link
          href="/users"
          className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
        >
        Users
        </Link>
      </div>
    </nav>
  );
}