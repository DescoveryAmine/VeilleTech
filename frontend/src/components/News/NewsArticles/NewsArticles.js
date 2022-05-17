import BannerTwo from '../../../components/Banners/BannerTwo/BannerTwo';
import NewsArtContent from '../../NewsContent/NewsArtContent';
import newsImageOne from '../../../assets/images/news/1.jpg';
import newsImageTwo from '../../../assets/images/news/2.jpg';


const news = [
    {
        id: 1,
        title: 'Lorem ipsum dolor sit amet, consecte cing elit, sed do eiusmod tempor.',
        link: '/',
        category: 'Informatique',
        categoryLink: '/',
        videoLink: '',
        featureImg: newsImageOne,
        views: '232',
        comments: '35',
        date: '24th March 2021'
    },
    {
        id: 2,
        title: 'Lorem ipsum dolor sit amet, consecte cing elit, sed do eiusmod tempor.',
        link: '/',
        category: 'Mecanique',
        categoryLink: '/',
        videoLink: 'LXb3EKWsInQ',
        featureImg: newsImageTwo,
        views: '232',
        comments: '35',
        date: '24th March 2021'
    },
    {
        id: 3,
        title: 'Lorem ipsum dolor sit amet, consecte cing elit, sed do eiusmod tempor.',
        link: '/',
        category: 'Electronique',
        categoryLink: '/',
        videoLink: '',
        featureImg: newsImageTwo,
        views: '232',
        comments: '35',
        date: '24th March 2021'
    }
]

const News = () => {
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
                        <NewsArtContent news={news} />
                    </div>
            </section>
    );
};

export default News;