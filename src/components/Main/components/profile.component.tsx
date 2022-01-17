import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/auth-context";

import LoaderComponent from "../../../utils/loader.component";

import { IUserData } from '../../../interfaces/interfaces-module';


const ProfileComponent = () => {
    let navigate = useNavigate();

    const { setStatus } = useContext(AuthContext);

    const [isLoading, setLoading] = useState<boolean>(false);
    const [dataUser, setData] = useState<IUserData>({} as IUserData);

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
        setStatus(prev => !prev);
        navigate('/', { replace: true });
    }

    useEffect(() => {
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