import NewsArtContent from '../../NewsContent/NewsArtContent';

const News = props => {
    return (
            <section className="news-page">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 text-center">
                        <div className="sub-title-2"><span>News</span></div>
                        <h3 className="sec-title">
                            News Articles
                        </h3>
                    </div>
                </div>
            </div>
                    <div className="row">
                        {/* Content area  */}
                        <NewsArtContent news={props.news} postsPerPage='3' paginated ={false} />
                    </div>
            </section>
    );
};

export default News;