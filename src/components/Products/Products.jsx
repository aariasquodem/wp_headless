import React, {useState, useEffect} from "react";
import axios from 'axios';
import {Link} from 'react-router-dom';
import ProductCard from '../ProductCard';

const Products = () => {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('https://fakestoreapi.com/products?limit=5');
        const json = res.data;
        const productsArray = json.map(element => {
          return {
            'title': element.title,
            'price': element.price,
            'description': element.description,
            'image': element.image,
            'id': element.id
          }
        })
        setProducts(productsArray)
      } catch (error) {
        console.log('error', error) 
      }
    }
    fetchProducts();
  }, []);

  const paintCards = () => products.map((product, i) => <Link to={`/productdetail/?id=${product.id}`} key={i}><ProductCard product={product} /></Link>);

  return <div>{paintCards()}</div>;
};

export default Products;
