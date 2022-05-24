import React, { useEffect, useState } from 'react';
import { useHttpClient } from '../hooks/http-hook';
import LoadingSpinner from '../components/Loading/Loading';
import Pricing from '../components/Pricing/Pricing';
import NewsFields from '../components/News/NewsFields/NewsFields';
import NewsArticles from '../components/News/NewsArticles/NewsArticles';
import NewsSidebar from '../components/NewsSidebar/NewsSidebar';
import CallToActionTwo from '../components/CallToActions/CallToActionTwo/CallToActionTwo';
import ServiceOne from '../components/Services/ServiceOne/ServiceOne';
import StrategyOne from '../components/Strategies/StrategyOne/StrategyOne';
import BannerOne from '../components/Banners/BannerOne/BannerOne';
import MoveTop from '../components/MoveTop/MoveTop';


const Home = () => {

    const [News, setNews]= useState([]);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    
    //Use id client in Inettractive mode
    //const userId = useParams().userId;
    // ne pas oublier  de chabger les paramettres de useEffect [sendRequest, userId]);
  
    const mapArticlesToModels = (loadedArticles) =>{
        loadedArticles.map((article, index) => ( setNews(N => [...N,{
            id: article._id,
            Oid: index+1,
            title: article.title[0],
            link: article.link[0],
            category: article.cat,
            categoryLink: '/',
            videoLink: '',
            featureImg: article['media:content'][0]?.url,
            views: article.views,
            date: article.pubDate
        }])));
    }

    useEffect(() => {
      const fetchArticles = async () => {
        try {
          const responseData = await sendRequest(
            `http://localhost:5000/api/news/`
          );
           responseData.articles.map((article) => ( setNews(N => [...N,
            {
            id: article._id,
            title: article.title[0],
            link: article.link[0],
            category: article.cat,
            categoryLink: '/',
            videoLink: '',
            featureImg: article['media:content'][0]?.url,
            views: article.views,
            date: article.pubDate[0].split(' ').slice(1,4)}])));
        } catch (err) {}
      };
      fetchArticles();
    }, [sendRequest]);
  
  
    return (
        <>
            {isLoading && <LoadingSpinner/>}
            <div>
               {error&&(<p>{error}</p>)}
            </div>
            {/* Banner Section */}
            <BannerOne />

            {/* Content  */}
            <section className="news">
                    <div className="row">
                    <div className="col-lg-8 col-md-12">
                       {/* Blog Section  */}
                       <NewsFields />

                    </div>
                        {/* Sidebar area  */}
                        <NewsSidebar />

                    </div>
            </section>

            {/* News Section  */}
            <NewsArticles news={News}/>

            {/* Service Section  */}
            <ServiceOne />

            {/* Pricing Section  */}
            <Pricing />

            {/* Call To Action Section  */}
            {/* <CallToActionOne /> */}

            {/*Skill Section  */}
            {/* <SkillOne /> */}

            {/*StrategyOne Section  */}
            <StrategyOne />

            {/* Fun Facts Section 
            <FunFactOne /> */}

            {/*Portfolio Section  */}
            {/* <PortfolioOne /> */}

            {/* Call To Action Two Section  */}
            <CallToActionTwo />

            {/* Move to top Section  */}
            <MoveTop path="/" />
        </>
    );
};

export default Home;