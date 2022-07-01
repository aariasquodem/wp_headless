import React from "react";
import { useSearchParams } from "react-router-dom";
import { useDataLoader } from 'react-use-data-loader';
import {CircleLoader} from 'react-spinners';
import axios from "axios";

const article = async(id) => {
  try {
    const articleRes = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
    // const commentsRes = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${id}`);
    const articleJson = articleRes.data
    const authorRes = await axios.get(`https://jsonplaceholder.typicode.com/users/${articleJson.userId}`);
    const authorJson = authorRes.data;
    const dataArticle = {
      'title': articleJson.title,
      'author': authorJson.name,
      'city': authorJson.address.city,
      'company': authorJson.company.name,
      'body': articleJson.body
    }
    return dataArticle
  } catch (error) {
    console.log('error', error)
  }  
}

const ArticleDetail = () => {

  const [searchParams] = useSearchParams();
  const { data, loading } = useDataLoader(article, searchParams.get('id'));

  return <>
          {loading
          ? <CircleLoader speedMultiplier={0.5}/>
          : <div>
            <h2>{data.title}</h2>
            <h3>{data.author}</h3>
            <p>{data.company}</p>
            <p>{data.city}</p>
            <p>{data.body}</p>
          </div>
          }
        </>;
};

export default ArticleDetail;
