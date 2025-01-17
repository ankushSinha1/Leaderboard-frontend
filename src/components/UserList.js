import React, { useState, useEffect } from "react";
import { fetchUsers, addUser, claimPoints } from "../services/api.js";
import "./UserList.css"

const UserList = ({ onClaim }) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [newUserName, setNewUserName] = useState("");

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const { data } = await fetchUsers();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleAddUser = async () => {
    if (!newUserName.trim()) return alert("User name cannot be empty.");
    try {
      await addUser(newUserName);
      setNewUserName("");
      loadUsers();
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const handleClaimPoints = async () => {
    if (!selectedUser) return alert("Please select a user.");
    try {
      const { data } = await claimPoints(selectedUser);
      alert(`Claimed ${data.pointsClaimed} points for ${data.user.name}`);
      onClaim(); // Trigger leaderboard update
    } catch (error) {
      console.error("Error claiming points:", error);
    }
  };

  return (
    <div className="select_user">
      <h2>Select User</h2>
      <div>
        <select onChange={(e) => setSelectedUser(e.target.value)} value={selectedUser}>
          <option value="">Select User</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name}
            </option>
          ))}
        </select>
        <button onClick={handleClaimPoints}>Claim Points</button>
      </div>
      <div>
        <input
          type="text"
          placeholder="Add New User"
          value={newUserName}
          onChange={(e) => setNewUserName(e.target.value)}
        />
        <button onClick={handleAddUser}>Add User</button>
      </div>
    </div>
  );
};

export default UserList;
