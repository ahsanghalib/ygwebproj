import React from 'react';
import Slider, {Settings} from 'react-slick'
import classes from './HomeHero.module.scss'

function HomeHero() {

    const settings: Settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        easing: 'ease-in-out',
        fade: true,
        draggable: false
    };

    return (
        <div className={classes.Hero}>
            <Slider {...settings} className={classes.Slider}>
                <div className={classes.Item1}>
                    <div className={classes.InnerText}>Passion is Paramount</div>
                </div>
                <div className={classes.Item2}>
                    <div className={classes.InnerText}>Explore</div>
                </div>
                <div className={classes.Item3}>
                    <div className={classes.InnerText}>Discover</div>
                </div>
                <div className={classes.Item4}>
                    <div className={classes.InnerText}>Create</div>
                </div>
                <div className={classes.Item5}>
                    <div className={classes.InnerText}>Deliver</div>
                </div>
            </Slider>
        </div>
    )
}

export default HomeHero