"use client";

import Link from "next/link";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { forgotPassword } from "@/services/auth/forgot-password";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
 async function handleSubmit(e) {
  e.preventDefault();
  setLoading(true);

  try {
    const data = await forgotPassword(email); 
    console.log('res in frontend', data);

    toast({
      title: "Success",
      description: data.message || "Password reset email sent! Please check your inbox.",
    });
    setEmail("");
  } catch (e) {
    toast({
      title: "Error",
      description: e.message || "Failed to send reset email.",
      variant: "destructive",
    });
  } finally {
    setLoading(false);
  }
}



  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0f0f0f] text-white">
      <h1 className="text-pink-300 text-4xl font-bold mb-8 tracking-wide">COSYPOS</h1>
      <div className="bg-[#2a2c2e] p-8 rounded-xl max-w-md shadow-lg text-center">
        <h1 className="text-2xl font-semibold mb-2 text-[#FAC1D9]">
          Forgot your password?
        </h1>
        <p className="mb-6 text-gray-400 text-[16px]">
          Please enter your email to recover your password.
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="mt-4">
            <label className="block mb-1 text-sm text-white text-start font-poppins">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 rounded-md bg-[#1a1c1e] placeholder-[#777979] text-white border border-gray-700 focus:outline-none focus:border-pink-400 text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-[200px] bg-[#FAC1D9] hover:bg-pink-400 mt-10 text-black py-2 rounded-md font-medium transition-colors duration-200"
          >
            {loading ? "Sending..." : "Submit Now"}
          </button>
        </form>

        <div className="text-center pl-[50px] mt-10">
          <Link href="/auth/login" className="flex items-center">
            <p className="text-white text-center pl-20">Back to</p>
            <span className="text-[#FAC1D9] hover:underline text-[16px] ml-2">Login!</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
