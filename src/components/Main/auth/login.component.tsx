import React, { useContext, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";

import ModalComponent from "../../../utils/modal.component";
import useInput from "../../../hooks/use-input";

import { AuthContext } from "../../../context/auth-context";

const LoginComponent = () => {
    let navigate = useNavigate();
    const _useremail = useInput('', true);
    const _userpassword = useInput('', true);

    const { setStatus } = useContext(AuthContext);

    const [statusError, setStatusErr] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const data = { 'userEmail': _useremail.value, 'userPassword': _userpassword.value };
            const response = await fetch("http://localhost:5000/user-login", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            const jsonData = await response.json();

            if (jsonData.status) {
                localStorage.setItem('user', JSON.stringify(jsonData.user));
                localStorage.setItem('status_login', JSON.stringify(jsonData.status));
                setStatus(prev => !prev);
                setTimeout(() => {
                    navigate('/profile', { replace: true });
                }, 1500);
            } else {
                setStatusErr(true);
                setError(jsonData.error.message);
                return setTimeout(() => {
                    setStatusErr(false);
                }, 2500);
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            {
                statusError ? <ModalComponent message={error} /> : null
            }

            <div className="main__signup main__signin">
                <div className="signup-header">
                    Авторизация
                </div>

                <div className="signin-form">
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="email_user">
                            <input id="email_user" type="email" placeholder="Ваш логин" {..._useremail} style={_useremail.value.length <= 0 ? { borderBottom: _useremail._errorstyle, color: '#EB0055' } : { borderBottom: '1px solid #8d73b6' }} />
                        </label>
                        <label htmlFor="password_user">
                            <input id="password_user" type="password" placeholder="Ваш пароль" {..._userpassword} style={_userpassword.value.length <= 0 ? { borderBottom: _userpassword._errorstyle, color: '#EB0055' } : { borderBottom: '1px solid #8d73b6' }} />
                        </label>
                        <div className="footer-title">
                            <p>Ты ещё не с нами?</p>
                            <NavLink to="/sign-up">Создать аккаунт</NavLink>
                            {
                                error === 'Неверный пароль или эл. почта!' ? <NavLink to="/recovery-page">Забыли пароль?</NavLink> : null
                            }
                        </div>
                        <button type="submit">Войти</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default LoginComponent;