import { Link } from "react-router-dom";

const pricings = [
    {
        id: 1,
        name: 'Recent Events',
        price: 5,
        description: 'Recent Scientifique Events',
        features: [
            'Workshops', 'Conferences', 'Debates', 'Hackatons'
        ],
        buttonText: 'Purchase Now',
        buttonLink: '/',
        class: ''
    },
    {
        id: 2,
        name: 'Projects & Tenders',
        price: 10,
        description: 'Chose where to apply your skills',
        features: [
            'PFA', 'PFE', 'National Project', 'International Projet'
        ],
        buttonText: 'Purchase Now',
        buttonLink: '/',
        class: 'p-team'
    },
    {
        id: 3,
        name: 'Magazine & Library',
        price: 10,
        description: 'Receve our Recent Mgazine ',
        features: [
            'News', 'Scientifique Magazine', 'Scientifique Article','practical Manuscripts'
        ],
        buttonText: 'Purchase Now',
        buttonLink: '/',
        class: 'p-family'
    }
]

const Pricing = () => {
    return (
        <section className="pricing-section-2 width-bg">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 text-center">
                        <div className="sub-title-2"><span>Subscribe Edition</span></div>
                        <h3 className="sec-title">
                            What We delivre
                        </h3>
                    </div>
                </div>
                <div className="row">

                    {/* <!-- pricing item start --> */}
                    {
                        pricings?.map(pricing => {
                            return (
                                <div key={pricing?.id} className="col-lg-4 col-md-6">

                                    <div className={`pricing-item text-center ${pricing?.class}`}>
                                        <p className="pack-name">{pricing?.name}</p>
                                        <div className="price"><span>TD</span>{pricing?.price}</div>
                                        <p className="description">{pricing?.description}</p>
                                        <ul>
                                            {
                                                pricing.features.map((feature, index) => <li key={index}><i className="fa fa-check"></i>{feature}</li>)
                                            }
                                        </ul>
                                        <Link className="quomodo-btn" to={pricing?.buttonLink}>{pricing?.buttonText}</Link>
                                    </div>
                                </div>
                            )
                        })
                    }
                    {/* <!-- pricing item start --> */}

                </div>
            </div>
        </section>
    );
};

export default Pricing;