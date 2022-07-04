import React, {Fragment, useEffect, useState} from "react";
import axios from 'axios';
import { useSearchParams } from "react-router-dom";
import { useDataLoader } from 'react-use-data-loader';
import {CircleLoader} from 'react-spinners';
import CommentCard from "../CommentCard";

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
  const[comments, setComments] = useState([]);

  const id = window.location.href.split('=')[1];

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.elements.email.value;
    const body = e.target.elements.body.value;
    const comment = {'email': email, 'body': body}
    if(email.length > 0 && body.length > 0 ){
      setComments([...comments, comment])
    }
  }

  useEffect(() => {
    const fetchComments = async() => {
      try {
        const res = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${id}`);
        const json = res.data;
        const commentsArr = json.map( element => {
          return {
            'email': element.email,
            'body': element.body
          }
        })
        setComments(commentsArr)
      } catch (error) {
        console.log('error', error)
      }
    }
    fetchComments()
  }, [])

  const paintCards = () => comments.map((comment, i) => <CommentCard comment={comment} key={i}/>);

  return <>
          {loading
          ? <div className="spinner"><CircleLoader speedMultiplier={0.5} color={'#00857a'}  size={100}/></div>
          : <div className="product-page">
            <div className="product-detail">
              <div>
                <h2>{data.title}</h2>
                <p>{data.description}</p>
                <p><b>Price: </b>{data.price}$</p>
              </div>
              <img src={data.img} alt={data.title} />
            </div>
            <div className="article-comments">
                <h3>Comments:</h3>
                <div>{paintCards()}</div>
                <form onSubmit={handleSubmit}>
                  <div className="email-comment">
                    <label htmlFor="email"><b>Email:</b> </label>
                    <input type="email" name="email"/>
                  </div>
                  <div className="body-comment">
                    <label htmlFor="body"><b>Comment:</b> </label>
                    <textarea name="body" rows="4" cols="50"/>
                  </div>
                  <input type="submit" value="Send" className="send-comment"/>
                </form>
              </div>
          </div>
          }
        </>;
};

export default ProductDetail;
