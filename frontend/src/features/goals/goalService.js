import axios from "axios";

const API_URL = "/api/goals/";

// Create a new goal from form
const createGoal = async (goalData, token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, goalData, config);
  return response.data;
};

// Create a new comment

const addComment = async (goalId, commentData, token) => {
  try {
    const response = await axios.put(
      `${API_URL}/${goalId}/comment`,
      { text: commentData },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get user goals with filtering
const getGoals = async (token, filter) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    params: {
      filter: filter, // Pass the filter parameter
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

// Update user goal
const putGoal = async (goal, token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + goal.id, goal, config);

  return response.data;
};

// Delete user goal
const deleteGoal = async (goalId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + goalId, config);

  return response.data;
};

const goalService = {
  createGoal,
  getGoals,
  putGoal,
  deleteGoal,
  addComment,
};

export default goalService;
