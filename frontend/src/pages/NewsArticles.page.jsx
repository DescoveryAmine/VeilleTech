import React, { useEffect, useState } from 'react';
import {toast, ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useHttpClient } from '../hooks/http-hook';
import LoadingSpinner from '../components/Loading/Loading';
import BannerTwo from '../components/Banners/BannerTwo/BannerTwo';
import ArticlesSidebar from '../components/NewsArticleSideBar/articleSideBar';
import Article from '../components/Article/SingleArticle';
import MoveTop from '../components/MoveTop/MoveTop';


const SingleNews = () => {

    const [News, setNews]= useState([]);
    const [Post, setPost]= useState({});
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    
    const handelPost = ()=>{
        setPost({title:'looooooooooooooool'});

    }

    useEffect(() => {
      const fetchArticles = async () => {
        try {
          const responseData = await sendRequest(
            `http://localhost:5000/api/news/news-articles/`
          );
           responseData.articles.map((article) => ( setNews(N => [...N,
            {
            id: article._id,
            title: article.title[0],
            description: article.description[0],
            link: article.link[0],
            category: article.cat,
            categoryLink: '/',
            videoLink: '',
            featureImg:article?.imagesrc,
            views: article.views,
            Comments : article.comments,
            date: article?.pubDate[0].split(/[-' ']+/).slice(0,2)
            }])));
        } catch (err) {
          toast.error(`${error} ! please tray again`);
          clearError();
        }
      };
      fetchArticles();
    }, [sendRequest]);

    return (
        <>
        
            {isLoading && <LoadingSpinner/>}
            {/* Banner Section */}
            <ToastContainer/>
            {/* Page Banner section  */}
            <BannerTwo pageTitle="News Feeds" title="News Details" />

            <section className="news">
                    <div className="row">

                        {/* Single Article  */}
                        <Article news = {News} com='0'/>

                        {/* Sidebar area  */}
                        <ArticlesSidebar news = {News} com='0'/>

                    </div>
            </section>

            {/* Move to top Section  */}
            <MoveTop path="/single-news" />
        </>
    );
};

export default SingleNews;