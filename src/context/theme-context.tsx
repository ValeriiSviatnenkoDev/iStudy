import React, { createContext, useState } from "react";

interface IThemeContext {
    switchTheme: boolean,
    setTheme: React.Dispatch<React.SetStateAction<boolean>>
}

export const ThemeContext = createContext<IThemeContext>({} as IThemeContext);

export const ThemeProvider = (props:React.PropsWithChildren<{ }>) => {
    const [switchTheme, setTheme] = useState<boolean>(false);

    return(
        <ThemeContext.Provider value={{switchTheme, setTheme}}>
            {props.children}
        </ThemeContext.Provider>
    )
}