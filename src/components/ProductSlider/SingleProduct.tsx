import React from 'react';
import classes from './ProductSlider.module.scss'
import {shallowEqual, useSelector} from 'react-redux'
import {AppStateType} from '../../types'
import {ASSETS_URL} from '../../helpers'

function SingleProduct() {

    const store = useSelector((state: AppStateType) => state.mainStore, shallowEqual)

    return (
        <div className={classes.SingleProduct}>
            <img src={`${ASSETS_URL}/prod/${store.pageIndex+1}.jpg`} alt={"Products"}/>
        </div>
    )
}

export default SingleProduct
