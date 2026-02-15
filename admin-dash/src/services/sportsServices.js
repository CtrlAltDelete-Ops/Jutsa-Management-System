export const fetchSportsDetailsFromAPI = async () => {
  const response = await fetch("http://localhost:7005/api/sports");

  if (!response.ok) {
    throw new Error("Something went wrong");
  }

  const data = await response.json();
  // console.log(data.data); // Log the data to inspect its structure
  return data.data;
};

export const fetchSportsByIdAPI = async (id) => {
  const response = await fetch(`http://localhost:7005/api/sports/${id}`);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch Sports record by ID");
  }

  const data = await response.json();
  return data.data || data; 
};

export const addSports = async (SportsData) => {
  const response = await fetch("http://localhost:7005/api/sports", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(SportsData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to add Sports record");
  }

  return await response.json();
};

export const updateSports = async (id, SportsData) => {
  const response = await fetch(`http://localhost:7005/api/sports/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(SportsData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to update Sport record");
  }

  return await response.json();
};

export const deleteSports = async (id) => {
  const response = await fetch(`http://localhost:7005/api/sports/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to delete Sport record");
  }

  return await response.json();
};