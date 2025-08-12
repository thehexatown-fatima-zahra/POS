// const API_URL = process.env.NEXT_PUBLIC_API_URL;

// export async function login(name, password) {
//   try {
//     console.log(name, password);
//     const res = await fetch(`${API_URL}/auth/login`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ name, password }),
//     });

//     const data = await res.json();
//     console.log("Login response:", data);

//     if (!res.ok) {
//       throw new Error(data.message || `Login failed: ${res.statusText}`);
//     }

//     return data;
//   } catch (error) {
//     console.error("Login error:", error);
//     throw error;
//   }
// }

// export async function register(name, email, password) {
//   const res = await fetch(`${API_URL}/auth/register`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ name, email, password }),
//   });
//   console.log("(hye going to backend");
//   const data = await res.json();
//   console.log(data);
//   if (!res.ok) {
//     throw new Error(data.message || "Registration failed");
//   }
//   return data;
// }

// export async function forgotPassword(email) {
//   const res = await fetch(`${API_URL}/auth/forgot-password`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ email }),
//   });
//   console.log("hye", res);
//   const data = await res.json();
//   if (!res.ok) {
//     throw new Error(data.message || "Something went wrong");
//   }

//   return data;
// }

// export async function resetPassword(token, password) {
//   console.log(token, password);
//   const res = await fetch(`${API_URL}/auth/reset-password/${token}`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ password }),
//   });
//   return res.json();
// }
