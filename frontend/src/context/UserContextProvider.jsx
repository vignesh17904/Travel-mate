import React from "react";
import UserContext from "./userContext.js";

const UserContextProvider = ({children}) => {
    const [userLoggedIn, setUserLoggedin] = React.useState(false);
    return(
        <UserContext.Provider value={{userLoggedIn, setUserLoggedIn}}>
        {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider