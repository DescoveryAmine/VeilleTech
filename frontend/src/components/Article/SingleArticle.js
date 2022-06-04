import React , { useEffect, useState } from 'react';
import Author from '../../components/Author/Author';
import { Link } from 'react-router-dom';
import { useHttpClient } from '../../hooks/http-hook';
import ShareButtons from '../../components/ShareButtons/ShareButtons';
import Comment from '../../components/Comment/Comment';
import ImageGridTwoColumn from '../../components/ImageGrid/ImageGridTwoColumn';



const NewsArticle = props => {

    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const {news,postid, com} = props;

    const post = news.filter(post=>post.id===postid).shift();

    useEffect(() => {
    const post = news.filter(post=>post.id===postid).shift();
    const storedData = window.localStorage.getItem('userData');
    if(post&&storedData)
    {
     const data = JSON.parse(storedData);
     switch (post.category) {
        case 'informatique':
            data['info']=data['info']+1;
          break;
        case 'electronique':
            data['electro']=data['electro']+1;
          break;
        case 'mecanique':
            data['meca']=data['meca']+1;
          break;
        default:
          console.log(`Sorry, we are out of range`);
      }
      window.localStorage.setItem('userData',JSON.stringify(data));
    }
     const updatePost = async () => {
        try {
        const responseData = await sendRequest(
        'http://localhost:5000/api/news/news-articles/updateOne',
        'POST',
        JSON.stringify({
          postId: postid,
          postCat: post.category
        }),
        {
          'Content-Type': 'application/json'
        }
      );
      }
       catch (err) {
        console.log(`${error} `);
      }
    };updatePost();
},[postid])

    return (
        
     <div className="col-lg-8 col-md-12">
         <>
         {!!post ?
            <div className="news-deatil-area">
                <div key={post?.id} className="news-item-3">
                    <h4 className="news-details">{post?.title}</h4>

                    <ImageGridTwoColumn image={post?.featureImg} description={post?.description} />
                </div>
                <div className="pagination-share">
                    <div className="post-pagination">
                        <Link className="prev-post" to={post?.previousPostLink}><i className="fa fa-arrow-left"></i></Link>
                        <Link className="next-post" to={post?.nextPostLink}><i className="fa fa-arrow-right"></i></Link>
                    </div>

                    {/* Share button  */}

                    <div className="social-share">
                        <p>Share Now <span>-</span></p>
                        <ShareButtons />
                    </div>

                </div>

                {/* Author section  */}
                {post?.author && <Author singlePost={post} />}

            </div>
            :
            <div className="news-deatil-area">
            <div key={news[0]?.id} className="news-item-3">
                <h4 className="news-details">{news[0]?.title}</h4>

                <ImageGridTwoColumn image={news[0]?.featureImg} description={news[0]?.description} />
            </div>
            <div className="pagination-share">
                <div className="post-pagination">
                    <Link className="prev-post" to={news[0]?.previousPostLink}><i className="fa fa-arrow-left"></i></Link>
                    <Link className="next-post" to={news[0]?.nextPostLink}><i className="fa fa-arrow-right"></i></Link>
                </div>

                {/* Share button  */}

                <div className="social-share">
                    <p>Share Now <span>-</span></p>
                    <ShareButtons />
                </div>

            </div>

            {/* Author section  */}
            {news[0]?.author && <Author singlePost={news[0]} />}

        </div>
            }
      </>
      {/* Comments section  */}
      <Comment />


  </div>
    );
};

export default NewsArticle;