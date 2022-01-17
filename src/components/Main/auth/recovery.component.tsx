import React from "react";
import emailjs from '@emailjs/browser';
import useInput from "../../../hooks/use-input";

const RecoveryComponent = () => {
    const _recoveryemail = useInput('', true);

    const handlerSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            console.log('Recovery email: ', _recoveryemail.value);
        } catch (error) {
            console.error(error);
        }
    }

    return(
        <div className="main__recovery">
            <form onSubmit={handlerSubmitForm}>
                <label htmlFor="recovery_email">
                    <input type="email" name="recovery_email" id="recovery_email" placeholder="Введите эл. почту аккаунта" {..._recoveryemail}/>
                </label>
                <button type="submit">Отправить</button>
            </form>
        </div>
    );
}

export default RecoveryComponent;