// src/services/githubService.js
import axios from 'axios';

const GITHUB_API_BASE_URL = 'https://api.github.com/users';

export const fetchUserData = async (username) => {
  try {
    const response = await axios.get(`${GITHUB_API_BASE_URL}/${username}`);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error fetching user data:', error);
    // You might want to distinguish between 404 (user not found) and other errors
    if (error.response && error.response.status === 404) {
      return { success: false, error: 'User not found' };
    }
    return { success: false, error: 'An unexpected error occurred' };
  }
};