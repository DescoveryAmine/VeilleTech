import React from 'react';
import Pricing from '../components/Pricing/Pricing';
import NewsFields from '../components/News/NewsFields/NewsFields';
import NewsArticles from '../components/News/NewsArticles/NewsArticles';
import NewsSidebar from '../components/NewsSidebar/NewsSidebar';
import CallToActionOne from '../components/CallToActions/CallToActionOne/CallToActionOne';
import CallToActionTwo from '../components/CallToActions/CallToActionTwo/CallToActionTwo';
import FunFactOne from '../components/FunFacts/FunFactOne/FunFactOne';
import PortfolioOne from '../components/Portfolios/PortfolioOne/PortfolioOne';
import ServiceOne from '../components/Services/ServiceOne/ServiceOne';
import SkillOne from '../components/Skills/SkillOne/SkillOne';
import StrategyOne from '../components/Strategies/StrategyOne/StrategyOne';
import BannerOne from '../components/Banners/BannerOne/BannerOne';
import MoveTop from '../components/MoveTop/MoveTop';

const Home = () => {
    return (
        <>

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

            {/* About Section  */}
            <NewsArticles />

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