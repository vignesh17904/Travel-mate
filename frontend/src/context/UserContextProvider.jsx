import React, { useState, useEffect } from "react";
import UserContext from "./UserContext.js";
import AxiosInstance from "../utils/ApiConfig.js"
const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    try {
      const res = await AxiosInstance.get("/v1/users/me");
      setUser(res.data.data);
    } catch (err) {
      setUser(null);
    }
  };

  /*(() => {
    fetchUser();
  }, []);*/

  return (
    <UserContext.Provider value={{ user, setUser, fetchUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
