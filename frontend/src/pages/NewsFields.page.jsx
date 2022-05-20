import BannerTwo from '../components/Banners/BannerTwo/BannerTwo';
import NewsFieldContent from '../components/NewsContent/NewsFildContent';
import NewsSidebar from '../components/NewsSidebar/NewsSidebar';
import newsImageOne from '../assets/images/news/1.jpg';
import newsImageTwo from '../assets/images/news/2.jpg';
import newsImageThree from '../assets/images/news/3.jpg';
import MoveTop from '../components/MoveTop/MoveTop';

const news = [
    {
        id: 1,
        title: 'Lorem ipsum dolor sit amet, consecte cing elit, sed do eiusmod tempor.',
        link: '/',
        category: 'Informatique',
        categoryLink: '/',
        videoLink: '',
        featureImg: newsImageOne,
        galleryImages: [
            { id: 1, image: newsImageThree, link: "#" },
            { id: 2, image: newsImageTwo, link: "#" },
            { id: 3, image: newsImageOne, link: "#" }
        ],
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
        galleryImages: [
            { id: 1, image: newsImageThree, link: "#" },
            { id: 2, image: newsImageTwo, link: "#" },
            { id: 3, image: newsImageOne, link: "#" }
        ],
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
        galleryImages: [
            { id: 1, image: newsImageThree, link: "#" },
            { id: 2, image: newsImageTwo, link: "#" },
            { id: 3, image: newsImageOne, link: "#" }
        ],
        views: '232',
        comments: '35',
        date: '24th March 2021'
    }
]

const News = () => {
    return (
        <>
            {/* Page Banner section  */}
            <BannerTwo pageTitle="News Fields" title="News" />

            {/* Content  */}
            <section className="news-page">
                    <div className="row">
                        {/* Content area  */}
                        <NewsFieldContent news={news} />
                    </div>
            </section>
            {/* Move to top Section  */}
            <MoveTop path="/news" />
        </>
    );
};

export default News;