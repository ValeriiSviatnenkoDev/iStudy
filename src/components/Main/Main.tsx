import { useContext } from "react";
import { Routes, Route } from 'react-router-dom';

import HomeComponent from "./components/home.component";
import NewsComponent from "./components/news.component";
import RegisterComponent from "./auth/register.component";
import LoginComponent from "./auth/login.component";
import ProfileComponent from "./components/profile.component";
import ContactsComponent from "./components/contacts.component";
import AboutComponent from "./components/aboutus.component";
import RecoveryComponent from "./auth/recovery.component";
import GlobalChatComponent from "./components/gchat.component";

import { ThemeContext } from "../../context/theme-context";

const Main = () => {
    const { switchTheme } = useContext(ThemeContext);

    return (
        <main className={switchTheme ? 'body__theme' : ''}>
            <div className="main__container">
                <Routes>
                    <Route path="/" element={<HomeComponent />} />
                    <Route path="/news" element={<NewsComponent />} />
                    <Route path="/sign-in" element={<LoginComponent />} />
                    <Route path="/sign-up" element={<RegisterComponent />} />
                    <Route path="/recovery-page" element={<RecoveryComponent />} />
                    <Route path="/profile" element={<ProfileComponent />} />
                    <Route path="/contacts" element={<ContactsComponent />} />
                    <Route path="/about-us" element={<AboutComponent />} />
                    <Route path="/g-chat" element={<GlobalChatComponent />} />
                </Routes>
            </div>
        </main>
    );
}

export default Main;