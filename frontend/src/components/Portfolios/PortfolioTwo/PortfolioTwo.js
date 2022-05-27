import { Link } from 'react-router-dom';
import portfolioImgOne from '../../../assets/images/about/m0.jpg';
import portfolioImgTwo from '../../../assets/images/about/m1.jpg';
import portfolioImgThree from '../../../assets/images/about/m2.jpg';
import portfolioImgFour from '../../../assets/images/about/m3.jpg';
import portfolioImgFive from '../../../assets/images/about/m4.jpg';

const portfolios = [
    
    {
        id: 1,
        image: portfolioImgTwo,
        name: 'Events',
        company: 'Armed Forces',
        link: '/'
    },
    {
        id: 2,
        image: portfolioImgThree,
        name: 'Events',
        company: 'Armed Forces',
        link: '/'
    },
    {
        id: 3,
        image: portfolioImgFour,
        name: 'Events',
        company: 'Armed Forces',
        link: '/'
    },
    {
        id: 4,
        image: portfolioImgFive,
        name: 'Events',
        company: 'Armed Forces',
        link: '/'
    }
]

const PortfolioTwo = () => {
    return (
        <section className="portfolio-section-2 ps-color">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-md-6">
                        <div className="work-title">
                            <div className="sub-title">
                                <span className="border-left bl-3"></span>Case Study
                            </div>
                            <h3 className="sec-title">
                                Our Portfolio
                            </h3>
                            <i className="fa fa-long-arrow-right"></i>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                        {/* <!-- Work Item --> */}
                        <div className="work-item work-item-2">
                            <img src={portfolioImgOne} alt="" />
                            <div className="work-detail">
                                <Link className="cate" to="/">Events</Link>
                                <h4><Link to="/">Armed Forces</Link></h4>
                            </div>
                        </div>
                        {/* <!-- Work Item --> */}
                    </div>
                </div>
                <div className="row">

                    {/* <!-- Work Item --> */}
                    {
                        portfolios?.map(portfolio => {
                            return (
                                <div key={portfolio?.id} className="col-lg-3 col-md-6">
                                    <div className="work-item work-item-2">
                                        <img src={portfolio?.image} alt="" />
                                        <div className="work-detail">
                                            <Link className="cate" to={portfolio?.link}>{portfolio?.name}</Link>
                                            <h4><Link to={portfolio?.link}>{portfolio?.company}</Link></h4>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </section>
    );
};

export default PortfolioTwo;