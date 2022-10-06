import React, {useState, useEffect} from "react";

const AuthContext = React.createContext({
    isLoggedIn: false,
    onLogout: () => {},
    onLogin: (email, password) => {}
});

export const AuthContextProvider = (props) =>{
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // userEffect takes in an arrow function and array of dependencies
    // it is execute after the whole component is evalutated and the 
    // dependencies have changed
    useEffect(()=>{
        const storedUserLoggedInformation = localStorage.getItem('isLoggedIn');
        if (storedUserLoggedInformation === '1'){
          setIsLoggedIn(true);
        }
      },[]); 

    const logoutHandler = () => {
        localStorage.removeItem('isLoggedIn');
        setIsLoggedIn(false);
      };
      const loginHandler = (email, password) => {
        // We should of course check email and password
        // But it's just a dummy/ demo anyways
        localStorage.setItem('isLoggedIn' , '1');
        setIsLoggedIn(true);
      };      

    return <AuthContext.Provider
    value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler
        }}>
    {props.children}</AuthContext.Provider>
};

export default AuthContext;