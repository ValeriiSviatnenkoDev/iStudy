import React, { useEffect, useState } from "react";
import LoaderComponent from "../../../utils/loader.component";

const ContactsComponent = () => {
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 3000);

    }, []);

    return (
        <div className="main__contacts">
            {
                isLoading ? <LoaderComponent /> :
                    <div className="contact-container">
                        <p>Наши контакты</p>
                        <div className="container-social">
                            <a href="https://www.instagram.com/"><i className="fab fa-instagram"></i></a>
                            <a href="https://uk-ua.facebook.com/"><i className="fab fa-facebook"></i></a>
                            <a href="https://web.telegram.org/"><i className="fab fa-telegram"></i></a>
                        </div>
                        <div className="container-def-contacts">
                            <a href="tel:380637446175"><i className="fas fa-phone"></i> +380 63 744 6175</a>
                            <a href="mailto:valerii.sviatnenko.dev@gmail.com"> <i className="fas fa-envelope"></i> valerii.sviatnenko.dev@gmail.com</a>
                        </div>
                        <div className="container-map">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d4272.478770227359!2d30.612038729331356!3d50.45169692703312!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4cf48194c3d5b%3A0x65ea628498aaf46e!2sThe%20Space%20Coworking!5e0!3m2!1sru!2sua!4v1642152212458!5m2!1sru!2sua" width="600" height="450"></iframe>
                        </div>
                    </div>
            }
        </div>
    )
}

export default ContactsComponent;