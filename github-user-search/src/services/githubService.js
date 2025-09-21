// src/services/githubService.js
import axios from "axios";

const BASE_URL = "https://api.github.com";

export const fetchUsers = async (query) => {
  const response = await axios.get(`${BASE_URL}/search/users?q=${query}`);
  return response.data.items;
};

export const fetchUserDetails = async (username) => {
  const response = await axios.get(`${BASE_URL}/users/${username}`);
  return response.data;
};

// 🔥 This is the one missing in your case
export const fetchAdvancedUserData = async ({ username, location, minRepos }) => {
  let query = "";

  if (username) query += `${username} in:login `;
  if (location) query += `location:${location} `;
  if (minRepos) query += `repos:>=${minRepos}`;

  const response = await axios.get(`${BASE_URL}/search/users?q=${query}`);
  return response.data.items;
};
