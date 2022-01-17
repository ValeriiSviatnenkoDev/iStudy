import React, { useEffect, useState } from "react";
import useInput from "../../../hooks/use-input";

import LoaderComponent from "../../../utils/loader.component";

import { IUserData, INewsData } from '../../../interfaces/interfaces-module';

const NewsComponent = () => {
    const [_contentpost, setContent] = useState<string>('');
    const [_news, setNews] = useState([] as INewsData[]);
    const [error, setError] = useState(null);

    const [isLoading, setLoading] = useState<boolean>(false);
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

        try {
            const response = await fetch('http://localhost:5000/create-post', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })

            const jsonData = await response.json();

            if (jsonData.status) {
                setNews((previous => [...previous, jsonData.post]));
            } else {
                setError(jsonData.errors.message)
            }
        } catch (error: any) {
            setError(error);
        }
    }

    const handlerLoadNews = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:5000/get-posts', {
                method: 'GET'
            })

            const jsonData = await response.json();

            console.log(jsonData.posts);

            setNews(jsonData.posts);
            setTimeout(() => {
                setLoading(false);
            }, 3000);
        } catch (error: any) {
            setError(error);
        }

    }

    useEffect(() => {
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
                            _news.map((post, id) => (
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