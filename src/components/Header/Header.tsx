import React, { useState, useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";

import StudyHeaderComponents from "../Study/components/Header/Header";

import { AuthContext } from "../../context/auth-context";
import { ThemeContext } from "../../context/theme-context";

const Header = () => {
    const [studyDrop, setDrop] = useState<boolean>(false);

    const { switchTheme, setSwitchTheme } = useContext(ThemeContext);
    const { statusLogin } = useContext(AuthContext);

    const handleSwitchTheme = () => {
        setSwitchTheme(prev => !prev);
    }

    useEffect(() => {
        if (JSON.parse(localStorage.getItem('theme') as string) !== switchTheme) {
            localStorage.setItem('theme', JSON.stringify(switchTheme));
        }

        if(JSON.parse(localStorage.getItem('status_login') as string) !== statusLogin) {
            localStorage.setItem('theme', JSON.stringify(statusLogin));
        }
    }, [switchTheme, statusLogin]);

    return (
        <header>
            <div className="header__container">
                <div className="container-logo">
                    <NavLink to="/"> <i className="fas fa-book-open"></i> iStudy</NavLink>
                </div>

                <div className="container-navigation">
                    <NavLink to="/">Главная <i className="fas fa-home"></i></NavLink>
                    <NavLink to="/news">Новости <i className="far fa-newspaper"></i></NavLink>
                    <NavLink to="/contacts">Контакты <i className="fas fa-address-book"></i></NavLink>
                    <NavLink to="#" onClick={() => setDrop(prev => !prev)}>Учёба <i className="fas fa-book-reader"></i></NavLink>
                    <NavLink to="/about-us">О нас <i className="fas fa-question-circle"></i></NavLink>
                    {statusLogin ? <NavLink to="/g-chat">Чат <i className="fas fa-comments"></i></NavLink> : null}
                </div>

                <div className="container-option">
                    <label className="switch">
                        <input type="checkbox" onChange={handleSwitchTheme} defaultChecked={JSON.parse(localStorage.getItem('theme') || 'false')} />
                        <span className="slider round"></span>
                    </label>
                    {
                        switchTheme ? <i className="fas fa-moon"></i> : <i className="fas fa-sun"></i>
                    }
                </div>
                <div className="container-profile">
                   {
                       statusLogin ? <NavLink to="/profile"><i className="fas fa-user-circle"></i>Профиль</NavLink> : <NavLink to="/sign-in"><i className="fas fa-user-circle"></i>Войти</NavLink>
                   }
                </div>
            </div>
            {
                studyDrop ? <StudyHeaderComponents drop={studyDrop} /> : null
            }
        </header>
    );
}

export default Header;