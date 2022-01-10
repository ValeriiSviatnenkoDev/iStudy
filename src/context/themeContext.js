import React, { createContext, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = (props) => {
    const [switchTheme, setTheme] = useState(false);

    return(
        <ThemeContext.Provider value={{switchTheme, setTheme}}>
            {props.children}
        </ThemeContext.Provider>
    )
}