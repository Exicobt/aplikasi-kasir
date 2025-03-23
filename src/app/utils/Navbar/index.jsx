'use client'

import { List, SquaresFour, ListBullets } from "@phosphor-icons/react";

const Navbar = ({ placeholder, view, setView }) => {
  
  const changeView = () => {
    setView(view === "grid" ? "list" : "grid");
  };

  return (
    <nav className="bg-highlight fixed top-0 w-full flex h-14 px-10 justify-between items-center z-[999]">
      <button>
        <List size={20} color="white"/>
      </button>

      <button onClick={changeView} className="cursor-pointer">
        {view === "list" ? (
          <ListBullets size={20} color="white" />
        ) : (
          <SquaresFour size={20} color="white" />
        )}
      </button>
    </nav>
  );
};

export default Navbar;