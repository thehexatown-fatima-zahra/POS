export async function getMetrics() {
  try {
    const token = localStorage.getItem("token");
    console.log("Using token:", token);

    const res = await fetch("http://localhost:5000/v1/dashboard/metrics", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Fetch response status:", res.status);

    if (!res.ok) {
      throw new Error(`Error ${res.status}: ${res.statusText}`);
    }

    const data = await res.json();
    console.log("Metrics data fetched:", data);
    return data;
  } catch (error) {
    console.error("Error fetching metrics:", error);
    throw error;
  }
}
