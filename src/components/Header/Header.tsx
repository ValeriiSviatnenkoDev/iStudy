import React, { useState, useContext, useEffect } from "react";

import { ThemeContext } from "../../context/theme-context";

const Header = () => {
    const [theme, setTheme] = useState<boolean>(false);

    const { setSwitchTheme } = useContext(ThemeContext);
    const handleSwitchTheme = () => {
        setTheme(prev => !prev);
        setSwitchTheme(theme);

        localStorage.setItem('theme', JSON.stringify(!theme));
        document.body.classList.toggle('body__theme');
    }

    useEffect(() => {
    }, [theme, JSON.parse(localStorage.getItem('status_login') || 'false')])

    return (
        <header>
            <div className="header__container">
                <div className="container-logo">
                    <a href="/"> <i className="fas fa-book-open"></i> iStudy</a>
                </div>

                <div className="container-navigation">
                    <a href="/">Главная <i className="fas fa-home"></i></a>
                    <a href="/news">Новости <i className="far fa-newspaper"></i></a>
                    <a href="/contacts">Контакты <i className="fas fa-address-book"></i></a>
                    <a href="/studies">Учёба <i className="fas fa-book-reader"></i></a>
                    <a href="/about-us">О нас <i className="fas fa-question-circle"></i></a>
                </div>

                <div className="container-option">
                    <label className="switch">
                        <input type="checkbox" onChange={() => handleSwitchTheme()} defaultChecked={JSON.parse(localStorage.getItem('theme') || 'false')} />
                        <span className="slider round"></span>
                    </label>
                    {
                        JSON.parse(localStorage.getItem('theme') || 'false') ? <i className="fas fa-moon"></i> : <i className="fas fa-sun"></i>
                    }
                </div>
                <div className="container-profile">
                   {
                       JSON.parse(localStorage.getItem('status_login') || 'false') ? <a href="/profile"><i className="fas fa-user-circle"></i>Профиль</a> :  <a href="/sign-in"><i className="fas fa-user-circle"></i>Войти</a>
                   }
                </div>
            </div>
        </header>
    );
}

export default Header;