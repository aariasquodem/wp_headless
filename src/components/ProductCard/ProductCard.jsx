import React from "react";
import {Link} from 'react-router-dom';

const ProductCard = ({product}) => {

  const {title, price, description, image, id} = product
  return <div className="product-card">
          <img src={image} alt={title} />
          <div className="product-data">
            <section>
              <h2>{title}</h2>
              <p>{description}</p>
              <p><b>Price:</b> {price}$</p>
            </section>
            <Link to={`/productdetail/?id=${id}`}>See more</Link>
          </div>
        </div>;
};

export default ProductCard;
