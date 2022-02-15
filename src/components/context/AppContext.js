import { createContext } from 'react';
import { useState } from 'react';

 
const MyProvider = ({ children }) => {
const [currentUser, setCurrentUser] = useState({username:"",userid:""});
 
    return (
        <AppContext.Provider value={[
            currentUser,
            setCurrentUser
        ]} >
            {children}
        </AppContext.Provider>
    );
};
export default MyProvider;
export const AppContext = createContext();