"use server";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function forgotPassword(email) {
  const res = await fetch(`${API_URL}/auth/forgot-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });
  console.log("hye", res);
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}
