import { Link } from 'react-router-dom';
import ThemeSlider from '../../Sliders/ThemeSlider/ThemeSlider';
import partnerOneImage from '../../../assets/images/home/client-logo/1.png';
import partnerTwoImage from '../../../assets/images/home/client-logo/2.png';
import partnerThreeImage from '../../../assets/images/home/client-logo/3.png';
import partnerFourImage from '../../../assets/images/home/client-logo/4.png';
import partnerFiveImage from '../../../assets/images/home/client-logo/5.png';


const FooterOne = () => {
    return (
        <footer className="footer-01">

            {/* Partner Slider Section  */}

            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="footer-border"></div>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-md-6">
                        {/* <!-- Navigation Menu Start --> */}
                        <aside className="widget">
                        <Link to="/"><h3 className="widget-title">Home</h3></Link>
                        </aside>
                        {/* <!-- Navigation Menu End --> */}
                    </div>
                    <div className="col-lg-3 col-md-6">
                        {/* <!-- Navigation Menu Start --> */}
                        <aside className="widget">
                        <Link to="/About"><h3 className="widget-title">About us</h3></Link>
                        </aside>
                        {/* <!-- Navigation Menu End --> */}
                    </div>
                    <div className="col-lg-3 col-md-6">
                        {/* <!-- Navigation Menu Start --> */}
                        <aside className="widget">
                        <Link to="/contact"><h3 className="widget-title">Contact us</h3></Link>
                        </aside>
                        {/* <!-- Navigation Menu End --> */}
                    </div>
                    <div className="col-lg-3 col-md-6">
                        {/* <!-- Navigation Menu Start --> */}
                        <aside className="widget">
                        <Link to="/contact"><h3 className="widget-title">Help</h3></Link>
                        </aside>
                        {/* <!-- Navigation Menu End --> */}

                        {/* <!-- Quote Btn Start --> */}
                        <aside className="widget">
                            <a href='https://www.defense.tn/?lang=fr' className="quomodo-btn" >Go to MDN WebSite <i className="fa fa-long-arrow-right"></i></a>
                        </aside>
                        {/* <!-- Quote Btn  End --> */}
                    </div>
                </div>
                {/* <!-- Copyright --> */}
                <div className="row">
                    <div className="col-lg-12">
                        <div className="copyright clearfix">
                            <ul>
                                <li><a href='https://www.facebook.com/defense.tn'><i className="fa fa-facebook-f"></i></a></li>
                            
                                <li><a href='https://www.youtube.com/channel/UCfa9UDwDsHvcTw7MBBtNyIg'><i className="fa fa-youtube"></i></a></li>
                                
                            </ul>
                            <p>crm@defense.tn</p>
                        </div>
                    </div>
                </div>
                {/* <!-- Copryright --> */}
            </div>
        </footer>
    );
};

export default FooterOne;