const API = "http://localhost:7005/api/users";

export const LoginUser = async (data) => {
  const response = await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("An error occurred while logging in");
  }

  const result = await response.json();
  return result;
};
