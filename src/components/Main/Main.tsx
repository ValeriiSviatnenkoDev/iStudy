import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import HomeComponent from "./components/home.component";
import NewsComponent from "./components/news.component";
import RegisterComponent from "./auth/register.component";
import LoginComponent from "./auth/login.component";

const Main = () => {
    return (
        <main>
            <div className="main__container">
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<HomeComponent />} />
                        <Route path="/news" element={<NewsComponent />} />
                        <Route path="/sign-in" element={<LoginComponent />}/>
                        <Route path="/sign-up" element={<RegisterComponent />} />
                    </Routes>
                </BrowserRouter>
            </div>
        </main>
    );
}

export default Main;