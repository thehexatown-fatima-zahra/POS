"use client";

import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/services/auth/login";

export default function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false); 
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      router.replace("/Dashboard");
    } else {
      setIsLoggedIn(false);
    }
  }, [router]);

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const data = await login(name, password);
      localStorage.setItem("token", data.token);
      router.replace("/Dashboard");
    } catch (err) {
      if (err.message) {
  if (err.message.includes("Not Found") || err.message.includes("Invalid credentials")) {
    setError("Incorrect username or password");
  } else if (err.response?.data?.message) {
    setError(err.response.data.message);
  } else {
    setError("An unexpected error occurred");
  }
}

    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0f0f0f] text-white">
      <h1 className="text-pink-300 text-4xl font-bold mb-8 tracking-wide">COSYPOS</h1>

      <form
        onSubmit={handleLogin}
        className="bg-[#292C2D] rounded-3xl p-8 max-w-[758px] shadow-lg font-poppins"
      >
        <h2 className="text-2xl font-bold mb-2 text-center font-poppins">Login</h2>
        <p className="text-[16px] font-poppins font-normal text-[#ffff] mb-6 text-center">
          Please enter your credentials below to continue
        </p>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <label className="block text-[16px] font-medium mb-1">Username</label>
        <input
          type="text"
          placeholder="Enter your username"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 rounded-md bg-[#3D4142] text-white placeholder-[#777979] mb-4 focus:outline-none"
        />

        <label className="block text-[16px] font-medium mb-1">Password</label>
        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 rounded-md bg-[#3D4142] text-white placeholder-[#777979] focus:outline-none"
          />
          <span
            className="absolute right-3 top-2.5 text-gray-500 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)} 
            aria-label={showPassword ? "Hide password" : "Show password"}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") setShowPassword(!showPassword);
            }}
          >
            {showPassword ? <EyeOff /> : <Eye />}
          </span>
        </div>

        <div className="flex items-center justify-between mb-6 text-[18px]">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              className="text-[#777979] bg-[#3D4142] w-4 h-4 border border-[#FAC1D9]"
            />
            <p>Remember me</p>
          </label>
          <Link
            href="/auth/forgot-password"
            className="text-[#FAC1D9] hover:underline font-poppins text-[18px]"
          >
            Forgot Password?
          </Link>
        </div>

        <button
          type="submit"
          className="w-[150px] ml-[110px] bg-[#FAC1D9] hover:bg-[#FAC1D9] text-black font-semibold py-2 rounded-md transition"
        >
          Login
        </button>

        {!isLoggedIn && (
          <p className="text-center text-gray-400 mt-6">
            Don&apos;t have an account?{" "}
            <Link href="/auth/signup" className="text-[#FAC1D9] hover:underline">
              Sign Up
            </Link>
          </p>
        )}
      </form>
    </div>
  );
}
