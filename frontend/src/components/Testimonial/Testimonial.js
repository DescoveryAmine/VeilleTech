import Pagination from '../Pagination/Pagination';
import Slider from "react-slick";
import { Link } from 'react-router-dom';
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



const Testimonial= props => {

    const {news , com} = props;

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

    let posts =[];
    const InfoPosts = news.filter(post => post.category==='info');
    {InfoPosts.length>0 && posts.push(InfoPosts)};
    const ElectroPosts = news.filter(post => post.category==='electro');
    {ElectroPosts.length>0 && posts.push(ElectroPosts)};
    const MecaPosts = news.filter(post => post.category==='meca');
    {MecaPosts.length>0 && posts.push(MecaPosts)};

    const [pageNumber, setPageNumber] = useState(0);
    const postsPerPage = 1;
    const postVisited = pageNumber * postsPerPage;
    const currentPosts = posts.slice(postVisited, postVisited + postsPerPage);
    const pageCount = Math.ceil(posts.length / postsPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    }

    
return (
    <div className="col-lg-12 col-md-8">
        <div className="container">
        {
            currentPosts?.map(Field => {
        return (
            <section className="testimonial-section ab-tesimonial">
                    <div className="row">
                        <div className="col-lg-12">
                            {/* Slick Slider  */}
                            <div className="post-thumb">
                                <i className="fcate">{Field[0]?.category}</i>
                            </div>

                            <Slider className="testimonial-slider"
                                asNavFor={state.nav2}
                                ref={slider => (slider1 = slider)}
                                {...sliderSettings}
                            >
                                {
                                    Field.map(testimonial => {
                                        return (
                                            <div key={testimonial?.id} className="testimonial-item">
                                            {!!testimonial?.author &&   <div className="testi-author">
                                                    <div className="test-shape-1"></div>
                                                    <img src={testimonial.authorImage} alt="" />
                                                    <div className="test-shape-2"></div>
                                                </div>}
                                                <div className="testi-quote">
                                                    <div className="rating">
                                                        {Array.from(Array(testimonial.views), (e, i) => {
                                                            return <i key={i} className="fa fa-star"></i>
                                                        })}
                                                    </div>
                                                    <div className="postField-thumb">
                                                      <img src={testimonial?.featureImg} alt="" />
                                                    </div>
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
                                    Field.map(testimonial => {
                                        return (
                                            <div key={testimonial?.id} role="presentation">
                                                <div className="author-meta">
                                                    <h5><Link to={testimonial?.link}>{testimonial?.title}</Link></h5>
                                                    <p className="designation">{testimonial.designation}</p>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </Slider>

                        </div>
                    </div>
            </section>
        )
        
        })}
    </div>
    {/* Pagination  */}

    <Pagination pageCount={pageCount} changePage={changePage} />

    </div>
    );
        
};

export default Testimonial;