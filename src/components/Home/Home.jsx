import React, {useEffect, useState} from "react";
import {CircleLoader} from 'react-spinners';
import axios from 'axios';
import ArticleCard from '../ArticleCard';

const Home = () => {

  const [articles, setarticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async() => {
      const articlesRes = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=1`);
      const authorRes = await axios.get(`https://jsonplaceholder.typicode.com/users/1`);
      const articlesJson = articlesRes.data;
      const authorJson = authorRes.data;
      const articlesArr = articlesJson.map(element => {
        return {
          'title': element.title,
          'body': element.body,
          'id': element.id,
          'author': authorJson.name
        }
      })
      const lastArticles = articlesArr.slice(0, 3)
      setarticles(lastArticles);
    }
    fetchArticles()
  }, []);

  const paintCards = () => articles.map((article, i) => <ArticleCard article={article} key={i}/>);

  return <div>
    <h1>Last articles</h1>
          {articles.length === 0
          ? <CircleLoader speedMultiplier={0.5}/>
          : <div>{paintCards()}</div>
          }
        </div>;
};

export default Home;
