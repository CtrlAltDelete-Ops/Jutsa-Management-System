export const FetchActivities = async () => {
  const response = await fetch("http://localhost:7005/api/activities");
  if (!response.ok) throw new Error("Failed to fetch activities");
  const data = await response.json();

  console.log(data.data);
  return data.data;
};

export const fetchActivityById = async (id) => {
  const response = await fetch(`http://localhost:7005/api/activities/${id}`);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch activity by ID");
  }
  const data = await response.json();
  return data.data;
};

export const addActivity = async (activityData) => {
  const response = await fetch("http://localhost:7005/api/activities", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(activityData),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to add activity");
  }
  return await response.json();
};

export const updateActivity = async (id, activityData) => {
  const response = await fetch(`http://localhost:7005/api/activities/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(activityData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to update activity");
  }
  return await response.json();
};

export const deleteActivity = async (id) => {
  const response = await fetch(`http://localhost:7005/api/activities/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to delete activity");
  }
  return await response.json();
};
