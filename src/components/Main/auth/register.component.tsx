import React, { useState } from "react";
import useInput from "../../../hooks/use-input";
import { useNavigate } from "react-router-dom";

import ModalComponent from "../../../utils/modal.component";

const RegisterComponent = () => {
    let navigate = useNavigate();

    const _userlogin = useInput('', true);
    const _useremail = useInput('', true);
    const _userpassword = useInput('', true);
    const _confpassword = useInput('', true);

    const [statusError, setStatus] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if(_userlogin.value.length <= 4) {
                setStatus(true);
                setError('Логин должен состоять минимум из 5-ти символов!');
                setTimeout(() => {
                    setStatus(false);
                }, 2500);
            } 

            const data = { 'userLogin': _userlogin.value, 'userEmail': _useremail.value, 'userPassword': _userpassword.value };
            console.log(data);
            const response = await fetch("http://localhost:5000/user-register", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            const jsonData = await response.json();

            if (jsonData.status) {
                localStorage.setItem('user', JSON.stringify(jsonData.user));
                setTimeout(() => {
                    navigate('/', { replace: true });
                }, 1500);
            } else {
                setStatus(true);
                setError(jsonData.errors.message);
                return setTimeout(() => {
                    setStatus(false);
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

            <div className="main__signup">
                <div className="signup-header">
                    <i className="fas fa-user-plus"></i>
                    <p>Регистрация</p>
                </div>

                <div className="signup-form">
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="login_user">
                            <input id="login_user" type="text" placeholder="Ваш логин" {..._userlogin} style={_userlogin.value.length <= 0 ? { borderBottom: _userlogin._errorstyle } : { borderBottom: '2px solid #846aad' }} />
                        </label>
                        <label htmlFor="email_user">
                            <input id="email_user" type="email" placeholder="Ваша эл. почта" {..._useremail} style={_useremail.value.length <= 0 ? { borderBottom: _useremail._errorstyle } : { borderBottom: '2px solid #846aad' }} />
                        </label>
                        <label htmlFor="password">
                            <input id="password-user" type="password" placeholder="Ваш пароль" {..._userpassword} style={_userpassword.value.length <= 0 ? { borderBottom: _userpassword._errorstyle } : { borderBottom: '2px solid #846aad' }} />
                        </label>
                        <label htmlFor="conf_password">
                            <input id="conf_password" type="password" placeholder="Подтвердите пароль" {..._confpassword} style={_confpassword.value.length <= 0 ? { borderBottom: _confpassword._errorstyle } : { borderBottom: '2px solid #846aad' }} />
                        </label>
                        <button type="submit">Полетели</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default RegisterComponent;