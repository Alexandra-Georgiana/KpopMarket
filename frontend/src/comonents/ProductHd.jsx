// ProductHd.jsx

import React from 'react';
import { TbArrowRight } from 'react-icons/tb';

const ProductHd = (props) => {
    const { product } = props;

    return (
        <div className="pt-20"> {/* Add padding-top here */}
            Home <TbArrowRight /> Shop <TbArrowRight /> {product.name}
        </div>
    );
};

export default ProductHd;
