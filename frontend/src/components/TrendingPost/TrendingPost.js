import { Link } from 'react-router-dom';


const TrendingPost = props => {

    const {news, com} = props;
    let posts =[];
    const TrendPosts = news.filter(post => post.views>3);
    if(TrendPosts.length>0)
    {posts = TrendPosts.slice(0,TrendPosts.length)} 
    return (
        <aside className="widget widget-trend-post">
            <h3 className="widget-title"><span>Trend News</span></h3>

            {
                posts?.map(post => {
                    return (
                        <div key={post?.id} className="tr-post">
                            <h5><Link to={post?.link}>{post?.title}</Link>
                            </h5>
                            <span><i className="fa fa-calendar-alt"></i>24 March, 2020</span>
                        </div>
                    )
                })
            }
        </aside>
    );
};

export default TrendingPost;