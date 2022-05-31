import React from 'react';
import Author from '../../components/Author/Author';
import { Link } from 'react-router-dom';
import ShareButtons from '../../components/ShareButtons/ShareButtons';
import Comment from '../../components/Comment/Comment';
import gridImageOne from '../../assets/images/portfolio-details/2.jpg';
import ImageGridTwoColumn from '../../components/ImageGrid/ImageGridTwoColumn';
import authorImage from '../../assets/images/news-details/author.jpg';

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

const NewsArticle = props => {

    const {news, com} = props;

    return (
      <div className="col-lg-8 col-md-12">
      <div className="news-deatil-area">
          <div key={news[0]?.id} className="news-item-3">
             <h4 className="news-details">{news[0]?.title}</h4>

             <ImageGridTwoColumn image={news[0]?.featureImg} description={news[0]?.description} />
          </div>
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
    );
};

export default NewsArticle;