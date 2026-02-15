const API = "http://localhost:7005/api/positions";

// Fetch position details
export const fetchPositionDetailsFromAPI = async () => {
  try {
    const response = await fetch(API);
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Failed to fetch positions.");
    return data.data;
  } catch (error) {
    throw new Error(error.message || "Something went wrong");
  }
};

// Fetch position details by ID
export const fetchPositionById = async (id) => {
  try {
    const response = await fetch(`${API}/${id}`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Failed to fetch position by ID");
    return data.data;
  } catch (error) {
    throw new Error(error.message || "Something went wrong");
  }
};


// Register a new position
export const registerPosition = async (formData) => {
  try {
    const response = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Failed to register position");
    return data.data;
  } catch (error) {
    throw new Error(error.message || "Failed to register position");
  }
};

// Update an existing position
export const updatePosition = async (id, formData) => {
  try {
    const response = await fetch(`${API}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Failed to update position");
    return data.data;
  } catch (error) {
    throw new Error(error.message || "Failed to update position");
  }
};

// Delete a position
export const deletePosition = async (id) => {
  try {
    const response = await fetch(`${API}/${id}`, { method: "DELETE" });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Failed to delete position");
    return data.data;
  } catch (error) {
    throw new Error(error.message || "Failed to delete position");
  }
};
