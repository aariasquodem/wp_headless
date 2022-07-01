import React from "react";
import axios from 'axios';
import { useSearchParams } from "react-router-dom";
import { useDataLoader } from 'react-use-data-loader';
import {CircleLoader} from 'react-spinners';

const products = async(id) => {
  try {
    const res = await axios.get(`https://fakestoreapi.com/products/${id}`);
    const dataProduct = {
      'title': res.data.title,
      'description': res.data.description,
      'price': res.data.price,
      'img': res.data.image
    }
    return dataProduct
  } catch (error) {
    console.log('error', error);
  }
}

const ProductDetail = () => {
  const [searchParams] = useSearchParams();
  const { data, loading } = useDataLoader(products, searchParams.get('id'));

  return <>
          {loading
          ? <CircleLoader speedMultiplier={0.5}/>
          : <div>
            <h2>{data.title}</h2>
            <p>{data.description}</p>
            <p>{data.price}</p>
            <img src={data.img} alt={data.title} />
          </div>
          }
        </>;
};

export default ProductDetail;
