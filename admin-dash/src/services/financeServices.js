export const fetchFinanceDetailsFromAPI = async () => {
  const response = await fetch("http://localhost:7005/api/finances");

  if (!response.ok) {
    throw new Error("Failed to fetch finance details");
  }

  const data = await response.json();
  return data.data; // Assuming the API response structure
};

export const fetchFinanceByIdAPI = async (id) => {
  const response = await fetch(`http://localhost:7005/api/finances/${id}`);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch finance by ID");
  }

  const data = await response.json();

  return data.data; // Flexible to handle API response structure
};

export const addFinance = async (financeData) => {
  const response = await fetch("http://localhost:7005/api/finances/reg", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(financeData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to add finance record");
  }

  return await response.json();
};

export const updateFinance = async (id, financeData) => {
  const response = await fetch(
    `http://localhost:7005/api/finances/update/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(financeData),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to update finance record");
  }

  return await response.json();
};

export const deleteFinance = async (id) => {
  const response = await fetch(
    `http://localhost:7005/api/finances/${id}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to delete finance record");
  }

  return await response.json();
};
