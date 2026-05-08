
import "./globals.css";
import Navbar from "../components/Navbar";


export const metadata = {
  title: "User Manager",
  
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
       
        <Navbar />

        <main>
          {children}
        </main>
      
      </body>
    </html>
  );
}