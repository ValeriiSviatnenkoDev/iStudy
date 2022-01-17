const HomeComponent = () => {
    return (
        <>
            <div className="main__content">
                <div className="content-about">
                    <div className="header-content container">
                        &#60; iStudy &#62;
                    </div>
                    <div className="header-title container">
                        Наша цель создать для тебя идеальную среду обучения, которая поможет наладить твой учебный процесс и подтянуть твои знания.
                        Мы помогаем тебе изучить только необходимое в теории, без лишних вещей, только самое главное, закрепляя эту теорию тестом.
                        Ученики, выбравшие iStudy, замечали улучшение успеваемости, а также больше предпочитали нашу платформу, чем обыденная школа.
                    </div>
                </div>
                <div className="content-image">
                    <img src="https://www.science.org/do/10.1126/science.abj5865/abs/Repetition_1280x720.jpg" alt="studiesImage" />
                </div>
            </div>

            <div className="main__content content_study">
                <div className="content-image">
                    <img src="https://loopup.com/app/uploads/2020/07/loopup-remote-meeting-software-3.jpg" alt="meetingImage" />
                </div>
                <div className="content-title">
                    Наша платформа даёт возможность, как учиться, так и учить.
                    Любой желающий при достижении определенного уровня имеет право подать заявку на одобрения статуса "Учитель".
                    Будучи учителем вы сможете создавать персональные комнаты, на определенное количество учеников и заниматься репититорством, 
                    а также вы сможете создавать статьи и предоставлять информацию ученикам. 
                </div>
            </div>

            <div className="main__content content_info">
                <div className="content-title">
                    Учителя не оставят тебя без помощи и всегда помогут с заданием, 
                    а также ответят на поставленный тобою вопрос. 
                    Больше ты не будешь проигнорирован, а твой вопрос более не останется без внимания.
                    Учитель сможет дать хороший и понятный тебе ответ на твой вопрос.
                </div>
                <div className="content-image">
                    <img src="https://www.yogabijdepressie.nl/wp-content/uploads/2018/03/klankbordgroep.png" alt="infoImage" />
                </div>
            </div>

        </>
    )
}

export default HomeComponent;