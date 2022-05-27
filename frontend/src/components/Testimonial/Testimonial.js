import authorImageOne from '../../assets/images/home3/author.png';
import authorImageTwo from '../../assets/images/home3/author-2.png';
import Slider from "react-slick";
import React, { useState, useEffect } from 'react';


function SampleNextArrow({ classes, newStyle, onClick }) {
    return (
        <div
            className={`${classes}`}
            style={{ ...newStyle }}
            onClick={onClick}
        ><i className="fa fa-arrow-right" aria-hidden="true"></i></div>
    );
}

function SamplePrevArrow({ classes, newStyle, onClick }) {
    return (
        <div
            className={classes}
            style={{ ...newStyle }}
            onClick={onClick}
        ><i className="fa fa-arrow-left" aria-hidden="true"></i></div>
    );
}

const navSettings = {
    slidesToShow: 3,
    slidesToScroll: 1,
    dots: false,
    arrows: false,
    centerMode: true,
    centerPadding: 0,
    focusOnSelect: true,
    slide: "ul",
    responsive: [
        {
            breakpoint: 767,
            settings: {
                slidesToShow: 1
            }
        }
    ]
}


const style = {
    background: '#ff4a17',
    width: '80px',
    height: '80px',
    textAlign: 'center',
    margin: 0,
    padding: 0,
    display: 'inline-block',
    fontSize: '18px',
    lineHeight: '80px',
    opacity: 1,
    top: '40%',
    transition: 'all 0.4s ease',
    cursor: 'pointer'
}




const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow classes="carousel-control-next" newStyle={style} />,
    prevArrow: <SamplePrevArrow classes="carousel-control-prev" newStyle={style} />,
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
                slidesToShow: 1
            }
        },

    ]
}

const testimonials = [
    {
        id: 1,
        review: "“ Online proofing smart review allows pages within multi page documents to be treated as .Aproove was built to be content - based rather than proof - based.”",
        stars: 5,
        authorName: 'Kane D William',
        designation: 'CEO, Print Co.',
        authorImage: authorImageOne
    },
    {
        id: 2,
        review: "“ Online proofing smart review allows pages within multi page documents to be treated as .Aproove was built to be content - based rather than proof - based.”",
        stars: 5,
        authorName: 'Rosalina D William',
        designation: 'CEO, Print Co.',
        authorImage: authorImageTwo
    }, {
        id: 3,
        review: "“ Online proofing smart review allows pages within multi page documents to be treated as .Aproove was built to be content - based rather than proof - based.”",
        stars: 5,
        authorName: 'Thomas D William',
        designation: 'CEO, Print Co.',
        authorImage: authorImageOne
    }, {
        id: 4,
        review: "“ Online proofing smart review allows pages within multi page documents to be treated as .Aproove was built to be content - based rather than proof - based.”",
        stars: 5,
        authorName: 'Kane D William',
        designation: 'CEO, Print Co.',
        authorImage: authorImageTwo
    }
];

const Testimonial= props => {

    let slider1;
    let slider2;

    const [state, setState] = useState({
        nav1: null,
        nav2: null
    });

useEffect(()=>{

    setState({
        nav1: slider1,
        nav2: slider2
    });

},[])


        return (
            <section className="testimonial-section ab-tesimonial">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">

                            {/* Slick Slider  */}

                            <Slider className="testimonial-slider"
                                asNavFor={state.nav2}
                                ref={slider => (slider1 = slider)}
                                {...sliderSettings}
                            >
                                {
                                    testimonials?.map(testimonial => {
                                        return (
                                            <div key={testimonial?.id} className="testimonial-item">
                                                <div className="testi-author">
                                                    <div className="test-shape-1"></div>
                                                    <img src={testimonial.authorImage} alt="" />
                                                    <div className="test-shape-2"></div>
                                                </div>
                                                <div className="testi-quote">
                                                    <div className="rating">
                                                        {Array.from(Array(testimonial.stars), (e, i) => {
                                                            return <i key={i} className="fa fa-star"></i>
                                                        })}
                                                    </div>
                                                    <p>
                                                        “ Online proofing smart review allows pages within multi page documents to be treated as . Aproove was built to be content-based rather than proof-based. ”
                                                    </p>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </Slider>

                            <Slider
                                className="slider-nav"
                                asNavFor={state.nav1}
                                ref={slider => (slider2 = slider)}
                                slidesToShow={3}
                                swipeToSlide={true}
                                focusOnSelect={true}
                                {...navSettings}
                            >
                                {
                                    testimonials?.map(testimonial => {
                                        return (
                                            <div key={testimonial?.id} role="presentation">
                                                <div className="author-meta">
                                                    <h5>{testimonial.authorName}</h5>
                                                    <p className="designation">{testimonial.designation}</p>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </Slider>

                        </div>
                    </div>
                </div>
            </section>
        );
};

export default Testimonial;