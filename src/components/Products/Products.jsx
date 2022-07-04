import React, {useState, useEffect} from "react";
import {CircleLoader} from 'react-spinners';
import axios from 'axios';
import ProductCard from '../ProductCard';

const Products = () => {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('https://fakestoreapi.com/products?limit=4');
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

  const paintCards = () => products.map((product, i) =><ProductCard product={product} key={i} />);

  return <div>
          <h2 className="title">Products</h2>
          {products.length === 0
          ? <div className="spinner"><CircleLoader speedMultiplier={0.5} color={'#00857a'}  size={100}/></div>
          : <div className="product-list">{paintCards()}</div>
          }
        </div>;
};

export default Products;
