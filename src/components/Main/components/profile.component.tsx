import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import LoaderComponent from "../../../utils/loader.component";

interface IDataUser {
    id: string,
    useremail: string,
    userlogin: string,
    userlvl: number,
    userrole: string,
    userxp: number,
}

const ProfileComponent = () => {
    let navigate = useNavigate();

    const [isLoading, setLoading] = useState<boolean>(false);
    const [dataUser, setData] = useState<IDataUser>({
        id: '',
        useremail: '',
        userlogin: '',
        userlvl: 0,
        userrole: '',
        userxp: 0,
    });

    const handleLoadData = () => {
        setLoading(true);
        let data = JSON.parse(localStorage.getItem('user') || '{ }');
        setData(data);
        setTimeout(() => {
            setLoading(false);
        }, 2500);
    };

    const handleLogOut = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('status_login');
        navigate('/', { replace: true });
    }

    useEffect(() => {
        const statusTheme = localStorage.getItem('theme');

        if (statusTheme === 'true') {
            document.body.classList.toggle('body__theme');
        }

        handleLoadData();
    }, []);

    return (
        <div className="main__profile">
            {
                isLoading ? <LoaderComponent /> :
                    <div className="profile-info-container">
                        <div className="profile-info">
                            <img src="https://cdndelivr.com/stickerset/Bobobu07/115/png" alt="avatarImage" />
                            <div className="container-info">
                                <p>{dataUser.userlogin}</p>
                                <p>{dataUser.useremail}</p>
                                <div className="profile-lvl">
                                    <p>{dataUser.userlvl}</p>
                                    <p>Уровень</p>
                                </div>
                                <div className="profile-xp">
                                    <div className="background-xp">
                                        <div className="xp-bar" style={{ width: dataUser.userxp }}>
                                            
                                        </div>
                                    </div>
                                </div>
                                <button onClick={handleLogOut}>Выйти</button>
                            </div>
                        </div>

                        <div className="profile-action">
                            <div className="profile-navigation">
                                <a href="/meet">Meet</a>
                                <a href="/tests">Тесты</a>
                                <a href="/studies">Обучение</a>
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
}

export default ProfileComponent;