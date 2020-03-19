import React from 'react';
import classes from './ProductSlider.module.scss'

function SingleProduct(props: { src: string }) {
    return (
        <div className={classes.SingleProduct}>
            <img src={props.src} alt={"Products"}/>
        </div>
    )
}

export default SingleProduct
