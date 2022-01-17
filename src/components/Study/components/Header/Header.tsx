import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const StudyHeaderComponents = (props: any) => {
    const [isVisible, setVisible] = useState<boolean>(false);

    const handleDropList = () => {
        setVisible(prev => !prev);
    }

    return (
        <div className="study_header__container" style={props.drop && { animationName: 'drop', animationDuration: '0.5s', animationIterationCount: '1' }}>
            <div className="study-navigation">
                <NavLink to="/disciplines/all">Все</NavLink>
                <NavLink to="/disciplines/math">Математика</NavLink>
                <NavLink to="/disciplines/lang">Языки</NavLink>
                <NavLink to="/disciplines/biology">Биология</NavLink>
                <NavLink to="/disciplines/chemistry">Химия</NavLink>
                <NavLink to="/disciplines/physics">Физика</NavLink>
                <NavLink to="#" onClick={handleDropList}>Другое {isVisible ? <i className="fas fa-angle-down"></i> : <i className="fas fa-angle-up"></i>}</NavLink>
            </div>
            {
                isVisible &&
                <div className="study-drop-list" style={isVisible && { animationName: 'dropdown', animationDuration: '0.1s', animationIterationCount: '1' }}>
                    <NavLink to="/">Программирование <i className="fas fa-code"></i></NavLink>
                    <NavLink to="/">Трейдинг <i className="fas fa-chart-line"></i></NavLink>
                    <NavLink to="/">Дизайн <i className="fas fa-paint-brush"></i></NavLink>
                    <NavLink to="/">Медиа-блоггер <i className="fas fa-photo-video"></i></NavLink>
                </div>
            }
        </div>
    )
}

export default StudyHeaderComponents;