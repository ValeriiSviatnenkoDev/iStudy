import React, { useState, useContext } from "react";

import { ThemeContext } from "../../context/themeContext";

const Header = () => {
    const [switchTheme, setSwitchTheme] = useState(true);
    const { setTheme } = useContext(ThemeContext);

    const handleSwitchTheme = () => {
        setSwitchTheme(prev => !prev);
        setTheme(switchTheme);

        localStorage.setItem('theme', JSON.stringify(switchTheme));

        document.body.classList.toggle('body__theme');
    }

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
                        <input type="checkbox" onChange={() => handleSwitchTheme()}/>
                        <span className="slider round"></span>
                    </label>
                   {
                       switchTheme ? <i className="fas fa-sun"></i> : <i className="fas fa-moon"></i>
                   }
                </div>

                <div className="container-profile">
                    <a href="/sign-in"><i className="fas fa-user-circle"></i>Sign</a>
                </div>
            </div>
        </header>
    );
}

export default Header;