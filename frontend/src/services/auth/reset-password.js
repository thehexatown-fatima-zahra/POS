"use server";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function resetPassword(token, password) {
  console.log(token, password);
  const res = await fetch(`${API_URL}/auth/reset-password/${token}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password }),
  });
  return res.json();
}
