import { Link } from 'react-router-dom';
import ThemeSlider from '../../Sliders/ThemeSlider/ThemeSlider';
import heroShape from '../../../assets/images/home/hero-shape.png';
import heroBgImage from '../../../assets/images/home/hero.jpg';
import partnerOneImage from '../../../assets/images/home/client-logo/1.png';
import partnerTwoImage from '../../../assets/images/home/client-logo/2.png';
import partnerThreeImage from '../../../assets/images/home/client-logo/3.png';
import partnerFourImage from '../../../assets/images/home/client-logo/4.png';
import partnerFiveImage from '../../../assets/images/home/client-logo/5.png';
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
    },
    {
        id: 4,
        image: partnerFourImage,
        link: '#'
    },
    {
        id: 5,
        image: partnerFiveImage,
        link: '#'
    },
    {
        id: 6,
        image: partnerOneImage,
        link: '#'
    },
    {
        id: 7,
        image: partnerTwoImage,
        link: '#'
    },
    {
        id: 8,
        image: partnerThreeImage,
        link: '#'
    },
    {
        id: 9,
        image: partnerFourImage,
        link: '#'
    },
    {
        id: 10,
        image: partnerFiveImage,
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
                            L'expertise scientifique et technique de référence
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
                           <h2>l'éditeur technique et scientifique de référence</h2>
                            <p>
                            Science de l’Ingénieur : l’outil déterminant des succès de l’industrie depuis plus de 70 ans.
                            Le partenaire de référence pour la réussite de vos projets industriels.
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