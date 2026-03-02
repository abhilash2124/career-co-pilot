const API_URL = import.meta.env.VITE_API_URL;

export async function apiRequest(endpoint, options = {}) {
    console.log(`API Request abD: ${endpoint}`, options);
    const token = localStorage.getItem("token");

    // const reponse = await fetch(`${API_URL}${endpoint}`, {
    //     ...options,
    //     headers: {
    //         ...options.headers,
    //         "Authorization": `Bearer ${token}`
    //     },
    // });
    const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json", 
      Authorization: token ? `Bearer ${token}` : "",
      ...options.headers,
    },
  });

    if (response.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
        return null;
    }

    return response.json();
}