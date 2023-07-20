import { createContext, useEffect, useState } from "react";
import axios from "axios";

const UserContext = createContext({});

//destructured props as {children}
export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (!user) {
      axios.get("/profile").then(({ data }) => {
        setUser(data);
        setReady(true);
      });
    }
    //if theres no user, response will be null
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
