import React, { useState } from "react";
import UserList from "./components/UserList";
import Leaderboard from "./components/Leaderboard";
import "./App.css";

const App = () => {
  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => {
    setRefresh(!refresh); // Trigger refresh
  };

  return (
    <div className="App">
      <h1>Leaderboard System</h1>
      <UserList onClaim={handleRefresh} />
      <Leaderboard key={refresh} />
    </div>
  );
};

export default App;
