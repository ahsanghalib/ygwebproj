import React from 'react';
import classes from './ProductSlider.module.scss'
import {shallowEqual, useSelector} from 'react-redux'
import {AppStateType} from '../../types'

function SingleProduct() {

    const store = useSelector((state: AppStateType) => state.mainStore, shallowEqual)

    return (
        <div className={classes.SingleProduct}>
            <img src={`./prod/${store.pageIndex+1}.jpg`} alt={"Products"}/>
        </div>
    )
}

export default SingleProduct
