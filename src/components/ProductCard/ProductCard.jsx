import React from "react";
import {Link} from 'react-router-dom';

const ProductCard = ({product}) => {

  const {title, price, description, image, id} = product
  return <div>
          <h2>{title}</h2>
          <p>{description}</p>
          <p>{price}</p>
          <img src={image} alt={title} />
          <Link to={`/productdetail/?id=${id}`}>See more</Link>
        </div>;
};

export default ProductCard;
