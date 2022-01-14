import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import useInput from "../../../hooks/use-input";

import LoaderComponent from "../../../utils/loader.component";

interface IUserData {
    id: string,
    useremail: string,
    userlogin: string,
    userlvl: number,
    userrole: string,
    userxp: number
}

const NewsComponent = () => {
    const [_contentpost, setContent] = useState('');
    const [_news, setNews] = useState({
        posts: [{
            author: "",
            authorId: "",
            content: "",
            createdAt: "",
            title: "",
            urlToImage: "",
            _id: ""
        }]
    });

    const [isLoading, setLoading] = useState(false);
    const [userData, setUserData] = useState<IUserData>({
        id: '',
        useremail: '',
        userlogin: '',
        userlvl: 0,
        userrole: '',
        userxp: 0,
    })

    const _titlepost = useInput('', true);
    const _imagepost = useInput('', true);

    const navigate = useNavigate();
    const date = new Date();

    const handlerWriter = () => {
        setUserData(JSON.parse(localStorage.getItem('user') || '{ }'));
    }

    const handlerContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
    }

    const handlerSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = { 'authorId': userData.id, 'authorName': userData.userlogin, 'titlePost': _titlepost.value, 'imagePost': _imagepost.value, 'contentPost': _contentpost, 'createdAt': `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}` }

        const response = await fetch('http://localhost:5000/create-post', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })

        const jsonData = await response.json();


        if (jsonData.status) {
            navigate('/news', { replace: true });
        }
    }

    const handlerLoadNews = async () => {
        setLoading(true);
        const response = await fetch('http://localhost:5000/get-posts', {
            method: 'GET'
        })

        const jsonData = await response.json();
        setNews(jsonData);
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    }

    useEffect(() => {
        const statusTheme = localStorage.getItem('theme');

        if (statusTheme === 'true') {
            document.body.classList.toggle('body__theme');
        }

        handlerWriter();
        handlerLoadNews();
    }, []);

    return (
        <div className="main__news">
            {
                userData.userrole === 'Admin' || userData.userrole === 'Teacher' ?
                    <div className="create-news-form">
                        <form onSubmit={handlerSubmitForm}>
                            Создать статью
                            <label htmlFor="title-news">
                                <input id="title-news" type="text" placeholder="Введите оглавление статьи" {..._titlepost} />
                            </label>
                            <label htmlFor="content-news">
                                <textarea name="content-area" id="content-news" placeholder="Введите текст статьи" onChange={(e) => { handlerContent(e) }}></textarea>
                            </label>
                            <label htmlFor="image-news">
                                <input id="image-news" type="text" placeholder="Вставьте ссылку на изображение" {..._imagepost} />
                            </label>
                            <button type='submit'>Отправить</button>
                        </form>
                    </div>
                    :
                    null
            }
            {
                isLoading ?
                    <LoaderComponent />
                    :
                    <div className="container-news">
                        {
                            _news.posts.map((post, id) => (
                                <div className="news-card" key={id}>
                                    <div className="card-header">
                                        <p>{post.author}</p>
                                        <p>{post.createdAt}</p>
                                    </div>
                                    <div className="card-content">
                                        <p>{post.title}</p>
                                        <img src={post.urlToImage} alt="imagePost" />
                                        <p>{post.content}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
            }
        </div>
    )
}

export default NewsComponent;