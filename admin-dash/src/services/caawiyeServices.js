export const fetchCaawiyeFromAPI = async () => {
  const response = await fetch("http://localhost:7005/api/caawiye");
  if (!response.ok) throw new Error("Failed to fetch caawiye");
  const data = await response.json();
  return data;
};

export const fetchCaawiyeById = async (id) => {
  const response = await fetch(`http://localhost:7005/api/caawiye/${id}`);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch caawiye by ID");
  }
  const data = await response.json();
  return data.data;
};

export const addCaawiye = async (caawiyeData) => {
  const response = await fetch("http://localhost:7005/api/caawiye", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(caawiyeData),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to add caawiye");
  }
  return await response.json();
};

export const updateCaawiye = async (id, caawiyeData) => {
  const response = await fetch(`http://localhost:7005/api/caawiye/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(caawiyeData),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to update caawiye");
  }
  return await response.json();
};

export const deleteCaawiye = async (id) => {
  const response = await fetch(`http://localhost:7005/api/caawiye/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to delete caawiye");
  }
  return await response.json();
};
