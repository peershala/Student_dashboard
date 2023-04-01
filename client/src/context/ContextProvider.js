import React, { createContext, useContext, useEffect, useState } from "react";

const UserContext = React.createContext([{}, () => {}])


let initialState = {}


const UserProvider = props => {

  const [state, setState] = useState(initialState)


  return (

    <UserContext.Provider value={[state, setState]}>

      {props.children}
      {/* <AppProvider/> */}

    </UserContext.Provider>

  )

};




const AppContext = createContext();

const AppProvider = ({ children }) => {

    const [thememode, setThememode] = useState(true)


    const toggleTheme = ()=>{
        thememode === false ? setThememode(true) : setThememode(false)

    }

  return (
    <AppContext.Provider
      value={{
        thememode,setThememode,toggleTheme
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const AppState = () => {
  return useContext(AppContext);
};

export default AppProvider;
export { UserContext, UserProvider }