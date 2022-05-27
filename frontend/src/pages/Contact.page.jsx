import BannerTwo from '../components/Banners/BannerTwo/BannerTwo';
import ContactForm from '../components/ContactForm/ContactForm';
import ContactSidebar from '../components/ContactSidebar/ContactSidebar';
import MoveTop from '../components/MoveTop/MoveTop';

const contactInfo = {
    numberOne: "(+216) 717 601 65",
    numberTwo: "(+216)717 601 29",
    emailOne: "crm@defense.tn",
    locationOne: "Base Militaire Aouina, Cité Taieb Mhiri, Aouina, 2045 Tunis",
    
};

const Contact = () => {
    return (
        <>
            {/* Page Banner section  */}
            <BannerTwo pageTitle="Contact Us" title="Contact" />

            <section className="contact-page-section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <div className="sub-title-2"><span>Contact</span></div>
                            <h3 className="sec-title">Get In Touch</h3>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="contact-page-form">
                                {/* Contact Form  */}
                                <ContactForm />
                            </div>
                        </div>

                        {/* Contact sidebar  */}
                        <ContactSidebar contactInfo={contactInfo} />

                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="quomodo-map grayscale">
                                <iframe src="https://maps.google.com/maps?width=720&amp;height=600&amp;hl=en&amp;coord=36.8558737,10.2221889&amp;q=CEMEDA+-+مركز+الاختبارات+الطبية+للملاحة+الجوية%E2%80%AD&amp;ie=UTF8&amp;t=p&amp;z=16&amp;iwloc=B&amp;output=embed" scrolling="no"></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Move to top Section  */}
            <MoveTop path="/contact" />
        </>
    );
};

export default Contact;