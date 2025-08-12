"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { resetPassword } from "@/services/auth/reset-password";

export default function ResetPasswordPage() {
  const { token } = useParams();
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
  e.preventDefault();

  if (password !== confirmPassword) {
    toast({
      title: "Error",
      description: "Passwords do not match",
      variant: "destructive",
    });
    return;
  }

  setLoading(true);
  try {
    const res = await resetPassword(token, password);
    console.log("Reset password response:", res);

    if (res?.message === "Password reset successfully") {
        localStorage.removeItem("token"); 
      toast({
        title: "Success",
        description: "Password reset successful! Please login.",
      });
      router.push("/auth/login");
    } else {
      toast({
        title: "Error",
        description: res?.message || "Failed to reset password",
        variant: "destructive",
      });
    }
  } catch (err) {
    toast({
      title: "Error",
      description: err.message || "Something went wrong",
      variant: "destructive",
    });
  } finally {
    setLoading(false);
  }
}


  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f0f0f] text-white">
      <div className="bg-[#2a2c2e] p-8 rounded-xl w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-pink-300">Reset Password</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">New Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 rounded-md bg-[#1a1c1e] border border-gray-700 text-sm"
            />
          </div>
          <div>
            <label className="block mb-1">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full p-3 rounded-md bg-[#1a1c1e] border border-gray-700 text-sm"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#FAC1D9] hover:bg-pink-400 text-black py-2 rounded-md"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
