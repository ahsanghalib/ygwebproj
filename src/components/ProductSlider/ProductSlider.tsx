import React from 'react';
import Slider from 'react-slick';
import classes from './ProductSlider.module.scss';
import Image from '../Image'
import {useDispatch} from 'react-redux'
import {pageModalAction} from '../../store/Actions'
import {PageModelEnum} from '../../types'


function ProductSlider() {

    const dispatch = useDispatch()

    const settings = {
        dots: false,
        arrows: true,
        infinite: true,
        centerMode: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: true,
        autoplay: true,
        cssEase: "ease"
    };

    const prodUrls = () => {
        let listUrl = []
        for (let i = 1; i <= 12; i++) {
            listUrl.push({src: `./prod/${i}.jpg`, alt: `Product Pictures`})
        }
        return listUrl
    }


    return (
        <div>
            <Slider {...settings} className={classes.Slider}>
                {prodUrls().map((d, i) => (
                    <div key={i}>
                        <div className={classes.Wrapper}
                             onClick={() => dispatch(pageModalAction(true, `${i + 1}.jpg`, PageModelEnum.prod, 'Product Detail'))}>
                            <Image src={d.src} alt={d.alt}/>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default ProductSlider