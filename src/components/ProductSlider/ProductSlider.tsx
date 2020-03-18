import React, {useState} from 'react';
import Slider from 'react-slick';
import classes from './ProductSlider.module.scss';
import Image from '../Image'


function ProductSlider() {

    const [modalIsOpen, setModelIsOpen] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(0)

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

    const toggleModel = (index: number) => {
        setModelIsOpen(!modalIsOpen);
        setSelectedIndex(index)
    }


    return (
        <div>
            <Slider {...settings} className={classes.Slider}>
                {prodUrls().map((d, i) => (
                    <div key={i}>
                        <div className={classes.Wrapper} onClick={() => toggleModel(i)}>
                            <Image src={d.src} alt={d.alt}/>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default ProductSlider