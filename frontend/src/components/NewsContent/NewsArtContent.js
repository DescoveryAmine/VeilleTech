import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Pagination from '../Pagination/Pagination';
import ThemeSlider from '../Sliders/ThemeSlider/ThemeSlider';
import Video from '../Video/Video';



const NewsContent = props => {
    
    const {news, postsPerPage, paginated} = props;
    const [pageNumber, setPageNumber] = useState(0);
    const postVisited = pageNumber * postsPerPage;
    //const infoPosts = news.filter(post => post.category==='electro')
    const currentPosts = news.slice(postVisited, postVisited + postsPerPage);
    const pageCount = Math.ceil(news.length / postsPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    }

    return (
        <div className="col-lg-12 col-md-8">
            <div className="container">
            {
                currentPosts?.map(singleNews => {
                    return (
                        <div key={singleNews?.id} className="news-item-3">
                            <div className= {`${singleNews?.featureImg ? 'news-thumb' : ''}`}>
                              <>
                                    {
                                      singleNews?.featureImg && <img src={singleNews.featureImg} alt="" />  
                                    }
                               
                                    {
                                      singleNews?.videoLink && <Video videoLink={singleNews.videoLink} />
                                    }
                              </>
                              

                                <Link to={singleNews.categoryLink} className="cate">{singleNews.date}</Link>

                            </div>
                            <div className="news-details">
                                <h3>
                                    <Link to={singleNews.link}>{singleNews.title}</Link>
                                </h3>
                                <div className="news-footer">
                                    <span><i className="fa fa-eye"></i>{singleNews.views} Views</span>
                                    <span><i className="fa fa-comments"></i>{singleNews.Comments} Comments</span>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
            </div>
            {/* Pagination  */}

            {paginated && <Pagination pageCount={pageCount} changePage={changePage} />}

        </div>
    );
};

export default NewsContent;