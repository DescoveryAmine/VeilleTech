import { Link } from 'react-router-dom';


const ArticlesPost = props => {

    const {news, com} = props;
    let posts =[];
    {posts = news.slice(0,3)} 
    return (
        <aside className="widget widget-trend-post">
            <h3 className="widget-title"><span> News</span></h3>

            {
                posts?.map(post => {
                    return (
                        <div key={post?.id} className="articles-tr-post">
                            <h5><Link to={Link}>{post?.title}</Link>
                            </h5>
                            <span><i className="fa fa-calendar-alt"></i>{post?.date}</span>
                        </div>
                    )
                })
            }
        </aside>
    );
};

export default ArticlesPost;