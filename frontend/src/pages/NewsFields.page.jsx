import React, { useEffect, useState } from 'react';
import {toast, ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useHttpClient } from '../hooks/http-hook';
import LoadingSpinner from '../components/Loading/Loading';
import BannerTwo from '../components/Banners/BannerTwo/BannerTwo';
import FieldContent from '../components/Testimonial/Testimonial';
import MoveTop from '../components/MoveTop/MoveTop';

const NewsFields = () => {

    const [News, setNews]= useState([]);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    useEffect(() => {
        const fetchArticles = async () => {
          try {
            const responseData = await sendRequest(
              `http://localhost:5000/api/news/news-fields/`
            );
             responseData.articles.map((article) => ( setNews(N => [...N,
              {
              id: article._id,
              title: article.title[0],
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
            <BannerTwo pageTitle="News Fields" title="News" />

            {/* Content  */}
            <section className="news-page">
                    <div className="row">
                        {/* Content area  */}
                        <FieldContent news={News} com='0'/>
                    </div>
            </section>
            {/* Move to top Section  */}
            <MoveTop path="/news" />
        </>
    );
};

export default NewsFields;