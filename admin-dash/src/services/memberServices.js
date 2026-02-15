const API = "http://localhost:7005/api/members";

export const fetchMemberDetailsFromAPI = async () => {
  const response = await fetch(API);

  if (!response.ok) {
    throw new Error("Something went wrong");
  }

  const data = await response.json();
  return data.data;
};

export const fetchMemberByIdAPI = async (id) => {
  const response = await fetch(`${API}/${id}`);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch member by ID");
  }

  const data = await response.json();
  return data.data;
}

export const registerMember = async (formData) => {
  const response = await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    throw new Error("Failed to register member");
  }

  return response.json();
};

export const updateMember = async (id, formData) => {
  const response = await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to update member");
  }

  return response.json();
}

export const deleteMember = async (id) => {
  const response = await fetch(`${API}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to delete member");
  }

  return response.json();
}