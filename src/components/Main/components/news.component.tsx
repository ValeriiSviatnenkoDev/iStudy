import React, { useEffect } from "react";

const NewsComponent = () => {
    useEffect(() => {
        const statusTheme = localStorage.getItem('theme');

        if(statusTheme == 'true') {
            document.body.classList.toggle('body__theme');
        }

    }, []);

    return(
        <div className="news">
            news!
        </div>
    )
}

export default NewsComponent;