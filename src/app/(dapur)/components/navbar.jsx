'use client'

import { useState } from "react";
import { List, X, SignOut } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = async() => {
    await fetch("/api/logout", {
      method: "POST",
    })

    router.push('/')
  }

  return (
    <>
      <nav className="bg-highlight fixed top-0 w-full flex h-14 px-10 justify-between items-center z-[999]">
        <button onClick={toggleMenu} className="relative z-[1000]">
          {isMenuOpen ? (
            <X size={20} color="white"/>
          ) : (
            <List size={20} color="white"/>
          )}
        </button>
      </nav>

      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/80 bg-opacity-50 z-[998]"
          onClick={closeMenu}
        />
      )}

      <div className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-[999] ${
        isMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="pt-16 p-6">
          <div className="space-y-4">
            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
            >
              <SignOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;