import { Link } from 'react-router-dom';
import ThemeSlider from '../../Sliders/ThemeSlider/ThemeSlider';
import heroShape from '../../../assets/images/home/hero-shape.png';
import heroBgImage from '../../../assets/images/home/hero.jpg';
import partnerOneImage from '../../../assets/images/events/E1.jpg';
import partnerTwoImage from '../../../assets/images/events/E2.jpg';
import partnerThreeImage from '../../../assets/images/events/E3.jpg';

import Video from '../../Video/Video';

const partners = [
    {
        id: 1,
        image: partnerOneImage,
        link: '#'
    },
    {
        id: 2,
        image: partnerTwoImage,
        link: '#'
    },
    {
        id: 3,
        image: partnerThreeImage,
        link: '#'
    }
];

const settings = {
    autoplay: true,
    autoplaySpeed: 6000,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    arrows: false,
    infinite: true,
    centerMode: false,
    responsive: [
        {
            breakpoint: 640,
            settings: {
                slidesToShow: 1
            }
        },
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 2
            }
        },

    ]
};

const BannerOne = () => {
    return (
        <section className="hero-banner-01" style={{ backgroundImage: `url(${heroBgImage})` }} >
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 col-md-8">
                        <div className="banner-content">
                            <div className="sub-heading">
                            Benchmark scientific and technical expertise
                        	</div>
                            <ul>
                                <li><Link className="quomodo-btn" to="/">Get Started Now <i className="fa fa-long-arrow-right"></i></Link></li>
                                <li>
                                    <Video videoLink="LXb3EKWsInQ" title="Intro Video" />
                                </li>
                                
                            </ul>
                            <div className="Events">
                                    {/* Partner Slider Section  */}
                                <ThemeSlider images={partners} settings={settings} />
                            </div>
                           <h2>The leading technical and scientific publisher</h2>
                            <p>
                            Engineering Science designed for academic and scientific events. We provide meaningful support to our custmers as well as a tool to manage the key requirements of their projects
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* <!-- Shape --> */}
            <div className="hero-shape"><img src={heroShape} alt="" /></div>

        </section>
    );
};

export default BannerOne;