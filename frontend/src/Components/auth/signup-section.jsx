"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { register } from "@/services/auth/signup";

export default function SignupPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.replace("/Dashboard");
    }
  }, [router]);

  async function handleSignup(e) {
    e.preventDefault();
    try {
      const data = await register(form.name, form.email, form.password);
      localStorage.setItem("token", data.token);
      router.replace("/Dashboard");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0f0f0f] text-white">
      <h1 className="text-pink-300 text-4xl font-bold mb-8 tracking-wide">COSYPOS</h1>
      <form
        onSubmit={handleSignup}
        className="bg-[#1a1c1d] rounded-2xl p-8 w-full max-w-md shadow-lg text-center"
      >
        <h1 className="text-2xl font-bold text-white mb-2">Sign Up</h1>
        <p className="text-gray-400 mb-6">
          Fill in your details to sign up for an account
        </p>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <label className="block mb-4 text-start">
          <span className="text-sm text-white">Username</span>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="placeholder-[#777979] mt-1 w-full p-3 rounded-md bg-transparent border border-gray-700 text-white focus:outline-none focus:border-[#FAC1D9]"
            placeholder="Enter username"
          />
        </label>

        <label className="block mb-4 text-start">
          <span className="text-sm text-white">Email</span>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="mt-1 placeholder-[#777979] w-full p-3 rounded-md bg-transparent border border-gray-700 text-white focus:outline-none focus:border-[#FAC1D9]"
            placeholder="Enter email"
          />
        </label>

        <label className="block mb-6 text-start">
          <span className="text-sm text-white">Password</span>
          <input
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="mt-1 placeholder-[#777979] w-full p-3 rounded-md bg-transparent border border-gray-700 text-white focus:outline-none focus:border-[#FAC1D9]"
            placeholder="Enter password"
          />
        </label>

        <button
          type="submit"
          className="w-full bg-[#FAC1D9] text-black py-3 rounded-md font-semibold hover:bg-[#f9aeca] transition"
        >
          Sign Up
        </button>

        <p className="text-center text-gray-400 mt-6">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-[#FAC1D9] hover:underline">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
}
