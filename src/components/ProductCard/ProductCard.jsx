import React from "react";

const ProductCard = ({product}) => {

  const {title, price, description, image} = product
  return <div>
          <h2>{title}</h2>
          <p>{description}</p>
          <p>{price}</p>
          <img src={image} alt={title} />
        </div>;
};

export default ProductCard;
