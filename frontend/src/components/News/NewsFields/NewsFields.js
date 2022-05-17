import { Link } from 'react-router-dom';
import blogOneImage from '../../../assets//images/home/news-1.jpg';
import blogTwoImage from '../../../assets//images/home/news-2.jpg';
import blogThreeImage from '../../../assets//images/home/news-3.jpg';
import authorImage from '../../../assets/images/home/author.png';

const blogs = [
    {
        id: 1,
        title: 'Building Next generation Quantum Machines',
        category: 'Informatique',
        author: 'Rosaline D. William',
        authorImage: authorImage,
        date: '14th May, 2021',
        comments: '10 Comments',
        featureImage: blogOneImage,
        link: '#',
        authorUrl: '#'
    },
    {
        id: 2,
        title: 'Les Moteurs a piston sont devenus obsolètes',
        category: 'Mecanique',
        author: 'Rosaline D. William',
        authorImage: authorImage,
        date: '14th May, 2021',
        comments: '10 Comments',
        featureImage: blogTwoImage,
        link: '#',
        authorUrl: '#'
    },
    {
        id: 3,
        title: ' les paneaux solaires nouvelles formes d\'energies',
        category: 'Electronique',
        author: 'Rosaline D. William',
        authorImage: authorImage,
        date: '14th May, 2021',
        comments: '10 Comments',
        featureImage: blogThreeImage,
        link: '#',
        authorUrl: '#'
    }
];

const BlogOne = () => {
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
                        blogs?.map(blog => {
                            return (
                                <div key={blog?.id} className="col-lg-4 col-md-6">
                                    <div className="news-item">
                                        <div className="post-thumb">
                                            <img src={blog.featureImage} alt="" />
                                            <Link to={blog?.link} className="cate">{blog?.category}</Link>
                                        </div>
                                        <div className="post-details">
                                            <Link to={blog?.authorUrl} className="author">
                                                <img src={blog?.authorImage} alt="" />{blog?.author}
                                            </Link>
                                            <h4>
                                                <Link to={blog?.link}>{blog?.title}</Link>
                                            </h4>
                                            <div className="post-footer">
                                                <Link to="/"><i className="fa fa-calendar-alt"></i>{blog?.date}</Link>
                                                <Link to="/"><i className="fa fa-comments"></i>{blog?.comments}</Link>
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