"use server";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function login(name, password) {
  try {
    console.log(name, password);
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, password }),
    });

    const data = await res.json();
    console.log("Login response:", data);

    if (!res.ok) {
      throw new Error(data.message || `Login failed: ${res.statusText}`);
    }

    return data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}
