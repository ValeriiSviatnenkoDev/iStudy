import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import useInput from "../../../hooks/use-input";

import { IUserData, IChatMessage } from "../../../interfaces/interfaces-module";
import LoaderComponent from "../../../utils/loader.component";

const socket = io('http://localhost:5000');

const GlobalChatComponent = () => {
    const _usermessage = useInput('', true);

    const [isLoading, setLoading] = useState<boolean>(false);
    const [dataUser, setData] = useState<IUserData>({} as IUserData);
    const [messages, setMsgs] = useState([] as IChatMessage[]);

    const date = new Date();

    const handlerLoadUser = () => {
        setLoading(true);
        let data = JSON.parse(localStorage.getItem('user') || '{ }');
        setData(data);
        setTimeout(() => {
            setLoading(false);
        }, 2500);
    }

    const handlerMessages = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (!_usermessage.value) {
                return console.log('Message undefined!');
            }

            const data = { 'userlogin': dataUser.userlogin, 'useremail': dataUser.useremail, 'message': _usermessage.value, 'createAt': `${date.getHours()}:${date.getMinutes()} ${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}` };
            socket.emit('get-messages', (data));

        } catch (error) {
            console.error(error);

        }
    }


    socket.emit('get-all-messages');
    useEffect(() => {
        handlerLoadUser();
    }, [])

    return (
        <>
            {
                isLoading ?
                    <LoaderComponent />
                    :
                    <div className="main__global-chat">
                        <div className="container-profile">
                            <img src="https://cdndelivr.com/stickerset/Bobobu07/115/png" alt="avatarImage" />
                            <p>{dataUser.userlogin}</p>
                            <p>{dataUser.useremail}</p>
                        </div>
                        <div className="container-chat">
                            <div className="chat-header">
                                Глобальный чат
                            </div>
                            <div className="chat-main">
                                <div className="container-messages">
                                    {
                                        messages.map((msg, id) => (
                                            <div className="msg-card" key={id}>
                                                <img src="https://cdndelivr.com/stickerset/Bobobu07/115/png" alt="avatarImage" />
                                                <div className="message-box">
                                                    <div className="user-name">
                                                        {msg.userlogin}
                                                    </div>
                                                    <div className="user-message">
                                                        {msg.message}
                                                    </div>
                                                    <div className="message-time">
                                                        {msg.createAt}
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className="chat-footer">
                                <form onSubmit={handlerMessages}>
                                    <label htmlFor="msg_send">
                                        <input type="text" name="msg_send" id="msg_send" {..._usermessage} placeholder="Введите ваше сообщение" />
                                    </label>
                                    <button type="submit"><i className="fas fa-paper-plane"></i></button>
                                </form>
                            </div>
                        </div>
                    </div>
            }
        </>
    );
}

export default GlobalChatComponent;