
import { Link } from 'react-router-dom';



const BlogOne = props => {

    const {news, com} = props;
    let posts =[];

    if(com==='Natural')

    {
        posts=news;

    }

     else 
    {

        const InfoPosts = news.filter(post => post.category==='informatique');
        const TInfoPosts = InfoPosts.filter(post => post.views===(Math.max(...InfoPosts.map(p => p.views), 0)));
        if(TInfoPosts.length>0 && com==='informatique')
        {posts.push(TInfoPosts.shift())};
        const ElectroPosts = news.filter(post => post.category==='electronique');
        const TElectroPosts = ElectroPosts.filter(post => post.views===(Math.max(...ElectroPosts.map(p => p.views), 0)));
        if(TElectroPosts.length>0 && com==='electronique')
        {posts.push(TElectroPosts.shift())};
        const MecaPosts = news.filter(post => post.category==='mecanique');
        const TMecaPosts = MecaPosts.filter(post => post.views===(Math.max(...MecaPosts.map(p => p.views), 0)));
        if(TMecaPosts.length>0 && com==='mecanique') 
        {posts.push(TMecaPosts.shift())};

    }
    return (
        <section className="news-section">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 text-center">
                        <div className="sub-title-2"><span>News</span></div>
                        <h3 className="sec-title">
                            News Fields
                        </h3>
                    </div>
                </div>
                <div className="row">

                    {/* <!-- Single Post Start --> */}
                    {
                        posts?.map(p => {
                            return (
                                <div key={p?.id} className="col-lg-6 col-md-10">
                                    <div className="news-item">
                                        <div className="post-thumb">
                                            <img src={p?.featureImg} alt="" />
                                            <Link to={p?.link} className="cate">{p?.category}</Link>
                                        </div>
                                        <div className="post-details">
                                            {p?.author && <Link to={p?.authorUrl} className="author">
                                            <img src={p?.authorImage} alt="" />{p?.author}</Link>
                                            }
                                            <h4>
                                                <Link to={p?.link}>{p?.title}</Link>
                                            </h4>
                                            <div className="post-footer">
                                                <Link to="/"><i className="fa fa-calendar-alt"></i>{p?.date}</Link>
                                                <Link to="/"><i className="fa fa-comments"></i>{p?.views} Views</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                    {/* <!-- Single Post End --> */}
                </div>
            </div>
        </section>
    );
};

export default BlogOne;