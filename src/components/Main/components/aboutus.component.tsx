import React, { useEffect, useState } from "react";
import emailjs from '@emailjs/browser';

import useInput from "../../../hooks/use-input";
import LoaderComponent from "../../../utils/loader.component";
import { error } from "console";
import ModalComponent from "../../../utils/modal.component";

const AboutComponent = () => {
    const [_status, setStatus] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [_content, setContent] = useState('');

    const _username = useInput('', true);
    const _useremail = useInput('', true);


    const handlerContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
    }

    const handlerSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        emailjs.send("service_nv3yu3o", "template_7z8lasc", {
            from_name: _username.value,
            from_email: _useremail.value,
            message: _content,
        }, 'user_JvHEfKQT1W7Efbdif9sBQ').then((response) => {
            if (response.status === 200) {
                setStatus(true);
                setTimeout(() => {
                    setStatus(false);
                }, 2500);
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    useEffect(() => {
        setLoading(true);
        const statusTheme = localStorage.getItem('theme');

        if (statusTheme === 'true') {
            document.body.classList.toggle('body__theme');
        }

        setTimeout(() => {
            setLoading(false);
        }, 3000);

    }, []);

    return (
        <>
            {
                _status ? <ModalComponent message={'Сообщение удачно доставлено!'} /> : null
            }
            <div className="main__about-us">
                {
                    isLoading ? <LoaderComponent /> :
                        <div className="about-us-container">
                            <div className="about-us-info">
                                <p>О нас</p>
                                <p>
                                    Наша компания уже давно на рынке и не раз доказывала, что она одна из самых лучших IT-компаний Украины.
                                    Мы выполнили более 700 сложных заказов, 250 из них были выполнены на мировой рынок.
                                    За нами создание сложных централизированных систем для управления персоналом, компанией, магазинами или продукцией.
                                    Постоянный поток клиентов, более 50-ти разных заказов в сутки, как на рынок Украины, так и на мировой.
                                </p>
                                <p>&#60; iStudy &#62;</p>
                                <p>
                                    И теперь наша цель создать образовательную платформу, которая будет нацелена на предоставления бесплатного и качественного образования,
                                    для жителей Украины. Это поможет увеличить процент граждан у которых есть образование, а также для кого-то сможет открыть двери в другую отрасль работы.
                                    Наша плафторма сможет создать удобный и качественный механизм обучения, который не даст тебе заскучать, учителя больше не будут пичкать тебя бесполезной информацией.
                                    Наши учителя используют только актуальную и полезную информацию. Остается только начать, дальше - больше.
                                </p>
                            </div>
                            <form onSubmit={handlerSubmit}>
                                <div className="form-title">
                                    Если у вас есть вопрос, задайте его нам, используя форму ниже, ответ не заставит вас долго ждать!
                                </div>
                                <label htmlFor="name-user">
                                    <input id="name-user" type="text" placeholder="Введите своё имя" {..._username} />
                                </label>
                                <label htmlFor="email-user">
                                    <input id="email-user" type="email" placeholder="Введите свою почту" {..._useremail} />
                                </label>
                                <label htmlFor="msg-user">
                                    <textarea name="msg-user" id="msg-user" value={_content} placeholder="Введите ваш вопрос? (Их может быть несколько)" onChange={(e) => { handlerContent(e); }}></textarea>
                                </label>
                                <button type="submit">Отправить</button>
                            </form>
                        </div>
                }
            </div>
        </>
    )
}

export default AboutComponent;