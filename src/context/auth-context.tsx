import React, { createContext, useState } from "react";

interface IThemeContext {
    statusLogin: boolean,
    setStatus: React.Dispatch<React.SetStateAction<boolean>>
}

export const AuthContext = createContext<IThemeContext>({} as IThemeContext);

export const AuthProvider = (props:React.PropsWithChildren<{ }>) => {
    const [statusLogin, setStatus] = useState<boolean>(JSON.parse(localStorage.getItem('status_login') as string));

    if(JSON.parse(localStorage.getItem('status_login') as string) === undefined) {
        setStatus(false);
    }

    return(
        <AuthContext.Provider value={{statusLogin, setStatus}}>
            {props.children}
        </AuthContext.Provider>
    )
}