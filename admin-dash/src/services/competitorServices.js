export const fetchCompetitorsFromAPI = async () => {
  const response = await fetch("http://localhost:7005/api/competitors");

  if (!response.ok) {
    throw new Error("Failed to fetch competitors");
  }

  const data = await response.json();
  return data.data; // Assuming API response structure
};

export const fetchCompetitorByIdAPI = async (id) => {
  const response = await fetch(`http://localhost:7005/api/competitors/${id}`);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch competitor by ID");
  }

  const data = await response.json();
  return data.data; // Flexible to handle API response structure
};

export const addCompetitor = async (competitorData) => {
  const response = await fetch("http://localhost:7005/api/competitors", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(competitorData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to add competitor");
  }

  return await response.json();
};

export const updateCompetitor = async (id, competitorData) => {
  const response = await fetch(
    `http://localhost:7005/api/competitors/update/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(competitorData),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to update competitor");
  }

  return await response.json();
};

export const deleteCompetitor = async (id) => {
  const response = await fetch(
    `http://localhost:7005/api/competitors/${id}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to delete competitor");
  }

  return await response.json();
};
