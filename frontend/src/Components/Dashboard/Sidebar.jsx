"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Sidebar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    "Dashboard",
    "Menu",
    "Staff",
    "Inventory",
    "Reports",
    "Order/Table",
    "Reservation",
  ];

  function handleLogout() {
    localStorage.removeItem("token");
    router.replace("/auth/login");
  }

  return (
    <>
      {!isOpen && (
        <button
          className="md:hidden fixed top-4 left-4 z-30 text-white p-2 rounded-full bg-[#292C2D] hover:bg-gray-700 transition"
          onClick={() => setIsOpen(true)}
        >
          <Menu size={24} />
        </button>
      )}

      <aside
        className="hidden md:flex w-[171px] bg-[#292C2D] flex-col items-start p-4 gap-6 h-screen overflow-y-auto scrollbar-hide"
      >
        <div className="text-xl font-semibold text-pink-200 pl-4">COSYPOS</div>
        <nav className="flex flex-col gap-2 w-full">
          {menuItems.map((label, i) => (
            <button
              key={i}
              className={`flex flex-col items-center gap-3 py-3 px-4 rounded-md max-w-[117px] text-gray-200 hover:bg-[#FAC1D9] hover:text-black transition ${
                i === 0 ? "bg-white/6" : ""
              }`}
            >
              <div className="w-8 h-8 bg-[#FFFFFF] rounded-full flex items-center justify-center">
                <img src="ff.png" alt="" />
              </div>
              <span className="text-sm hover:text-black">{label}</span>
            </button>
          ))}
        </nav>
        <div className="mt-auto w-full flex flex-col items-center gap-4 pr-8">
          <button
            onClick={handleLogout}
            className="flex flex-col items-center gap-2 text-sm text-gray-400"
          >
            <img src="logout.png" alt="" />
            <p>Logout</p>
          </button>
        </div>
      </aside>

      <aside
        className={`md:hidden fixed top-0 left-0 h-screen w-64 bg-[#292C2D] flex flex-col items-start p-4 gap-6  transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="w-full flex justify-end">
          <button
            className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-gray-700 transition"
            onClick={() => setIsOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

        <div className="text-xl font-semibold text-pink-200">COSYPOS</div>

        <nav className="flex flex-col gap-2 w-full">
          {menuItems.map((label, i) => (
            <button
              key={i}
              className={`flex flex-row items-center gap-3 py-3 px-4 rounded-md text-gray-200 hover:bg-[#FAC1D9] hover:text-black transition ${
                i === 0 ? "bg-white/6" : ""
              }`}
              onClick={() => setIsOpen(false)}
            >
              <div className="w-8 h-8 bg-[#FFFFFF] rounded-full flex items-center justify-center">
                <img src="ff.png" alt="" />
              </div>
              <span className="text-sm hover:text-black">{label}</span>
            </button>
          ))}
        </nav>

        <div className="mt-auto w-full flex flex-col items-center gap-4">
          <button
            onClick={handleLogout}
            className="flex flex-col items-center gap-2 text-sm text-gray-400"
          >
            <img src="logout.png" alt="" />
            <p>Logout</p>
          </button>
        </div>
      </aside>
    </>
  );
}
