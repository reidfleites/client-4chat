import { createContext } from "react";
import { useState } from "react";

const AllUsersProvider = ({ children }) => {
  const [allUsers, setAllUsers] = useState([]);

  return (
    <AllUsersContext.Provider value={[allUsers, setAllUsers]}>
      {children}
    </AllUsersContext.Provider>
  );
};
export default AllUsersProvider;
export const AllUsersContext = createContext();
