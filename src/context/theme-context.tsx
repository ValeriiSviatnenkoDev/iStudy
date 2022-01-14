import React, { createContext, useState } from "react";

interface IThemeContext {
    switchTheme: boolean,
    setSwitchTheme: React.Dispatch<React.SetStateAction<boolean>>
}

export const ThemeContext = createContext<IThemeContext>({} as IThemeContext);

export const ThemeProvider = (props:React.PropsWithChildren<{ }>) => {
    const [switchTheme, setSwitchTheme] = useState<boolean>(false);

    return(
        <ThemeContext.Provider value={{switchTheme, setSwitchTheme}}>
            {props.children}
        </ThemeContext.Provider>
    )
}