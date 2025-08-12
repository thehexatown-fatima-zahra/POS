"use client";
import { Bell, Menu } from "lucide-react";

export default function Header({ onHamburgerClick }) {
  return (
    <header className="flex items-center justify-between mb-6">
      <div className="flex gap-2 items-center">
        <button
          className="md:hidden p-2 rounded-full bg-[#292C2D] hover:bg-gray-700 transition"
          onClick={onHamburgerClick}
        >
          <Menu size={20} color="white" />
        </button>

        <img
          src="arrow.png"
          alt=""
          className="w-6 h-6 bg-[#292C2D] rounded-full mt-[2px]"
        />
        <h1 className="text-2xl font-semibold">Dashboard</h1>
      </div>

      <div className="flex items-center gap-3">
        <button className="p-2 rounded-full bg-white hover:bg-gray-200 transition">
          <Bell size={16} color="black" />
        </button>
        <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center">
          JD
        </div>
      </div>
    </header>
  );
}
