"use server";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function register(name, email, password) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
  console.log("(hye going to backend");
  const data = await res.json();
  console.log(data);
  if (!res.ok) {
    throw new Error(data.message || "Registration failed");
  }
  return data;
}
