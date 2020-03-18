import React from 'react';
import Img from 'react-image'
import imageNotFound from '../assets/imageNotFound.png'

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
        />
    )
}

export default Image