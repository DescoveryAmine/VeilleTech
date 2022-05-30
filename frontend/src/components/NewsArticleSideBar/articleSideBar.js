import React from 'react';
import Category from '../Category/Category';
import PostArticles from '../Posts/postArticles';


const NewsArticlesSidebar = props => {
    return (
        <div className="col-lg-4 col-md-12">
            <div className="news-sidebar">
                <aside className="widget widget-search">
                    <h3 className="widget-title"><span>Search Objects</span></h3>
                    <form className="search-form" action="#" method="post">
                        <input type="search" name="s" placeholder="Search your keyword..." />
                        <button type="submit"><i className="fa fa-search"></i></button>
                    </form>
                </aside>

                <PostArticles news={props.news} com={props.com}/>

                <Category />

                {/* <Tag />

                <aside className="widget widget-image">
                    <img src={widgetImage} alt="" />
                </aside> */}
            </div>
        </div>
    );
};

export default NewsArticlesSidebar;