import React from 'react';
import Img from 'react-image'
import {ASSETS_URL} from '../helpers'

const imageNotFound = ASSETS_URL + '/imageNotFound.png'

interface ImageProps {
    src: string;
    alt: string
}

function Image(props: ImageProps) {
    return (
        <Img
            src={props.src}
            alt={props.alt}
            loader={<div/>}
            unloader={<div><img src={imageNotFound} alt={"Not Found"}/></div>}
            style={{width: '100%', height: '100%'}}
        />
    )
}

export default Image