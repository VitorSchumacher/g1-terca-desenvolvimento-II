import { createContext, useState } from "react";

export const UserContext = createContext({});

function UserProvider({ children }) {
  const [user, setUser] = useState();
  const createUser = (newUser) => {
    setUser(newUser);
  };
  return (
    <UserContext.Provider value={{ user, createUser }}>
      {children}
    </UserContext.Provider>
  );
}
export default UserProvider;
