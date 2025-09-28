import axios from "axios";

const api = axios.create({
  baseURL: "https://api.github.com",
});

export const searchUsers = async ({ username, location, minRepos }) => {
  let query = "";
  if (username) query += `${username} `;
  if (location) query += `location:${location} `;
  if (minRepos) query += `repos:>=${minRepos} `;

  const response = await api.get(`/search/users?q=${query.trim()}`);
  return response.data;
};
