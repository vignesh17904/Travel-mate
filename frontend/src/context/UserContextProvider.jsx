import React, { useState, useEffect } from "react";
import axios from "axios";
import UserContext from "./UserContext.js";

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    try {
      const res = await axios.get("/api/v1/users/me", { withCredentials: true });
      setUser(res.data.user);
    } catch (err) {
      setUser(null);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, fetchUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
