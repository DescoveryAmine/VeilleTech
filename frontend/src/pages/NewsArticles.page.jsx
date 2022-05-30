import React, { useEffect, useState } from 'react';
import {toast, ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useHttpClient } from '../hooks/http-hook';
import LoadingSpinner from '../components/Loading/Loading';
import BannerTwo from '../components/Banners/BannerTwo/BannerTwo';
import ArticlesSidebar from '../components/NewsArticleSideBar/articleSideBar';
import gridImageOne from '../assets/images/portfolio-details/2.jpg';
import ImageGridTwoColumn from '../components/ImageGrid/ImageGridTwoColumn';
import authorImage from '../assets/images/news-details/author.jpg';
import Author from '../components/Author/Author';
import { Link } from 'react-router-dom';
import ShareButtons from '../components/ShareButtons/ShareButtons';
import Comment from '../components/Comment/Comment';
import MoveTop from '../components/MoveTop/MoveTop';

const images = [gridImageOne];

const singlePost = {
    id: 1,
    name: '',
    description: `
        <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. 
        </p>
    `,
    authorName: "Rosalina Williamson",
    authorDesignation: "Main Author",
    authorInfo: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    authorImage: authorImage,
    nextPostLink: '#',
    previousPostLink: '#'
}

const SingleNews = () => {

    const [News, setNews]= useState([]);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    

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

            <section className="single-news-page">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-md-12">
                            <div className="news-deatil-area">

                                <div dangerouslySetInnerHTML={{
                                    __html: singlePost.description
                                }}></div>

                                <ImageGridTwoColumn images={images} />

                                <div className="pagination-share">
                                    <div className="post-pagination">
                                        <Link className="prev-post" to={singlePost.previousPostLink}><i className="fa fa-arrow-left"></i></Link>
                                        <Link className="next-post" to={singlePost.nextPostLink}><i className="fa fa-arrow-right"></i></Link>
                                    </div>

                                    {/* Share button  */}

                                    <div className="social-share">
                                        <p>Share Now <span>-</span></p>
                                        <ShareButtons />
                                    </div>

                                </div>

                                {/* Author section  */}
                                <Author singlePost={singlePost} />

                            </div>

                            {/* Comments section  */}
                            <Comment />


                        </div>

                        {/* Sidebar area  */}
                        <ArticlesSidebar news = {News} />

                    </div>
                </div>
            </section>

            {/* Move to top Section  */}
            <MoveTop path="/single-news" />
        </>
    );
};

export default SingleNews;