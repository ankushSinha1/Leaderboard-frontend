import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000", // Backend URL
});

export const fetchUsers = () => API.get("/users");
export const addUser = (name) => API.post("/users/add", { name });
export const claimPoints = (userId) => API.post("/users/claim", { userId });
export const fetchLeaderboard = () => API.get("/leaderboard");
