import React, {useEffect, useState} from "react";
import {CircleLoader} from 'react-spinners';
import axios from 'axios';
import ArticleCard from '../ArticleCard';

const Articles = () => {

  const [articles, setarticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchArticles = async() => {
      const articlesRes = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${currentPage}`);
      const authorRes = await axios.get(`https://jsonplaceholder.typicode.com/users/${currentPage}`);
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
      setarticles(articlesArr);
    }
    fetchArticles()
  }, [currentPage]);

  const paintCards = () => articles.map((article, i) => <ArticleCard article={article} key={i}/>);

  const nextPage = () => {
    if(currentPage < 10){
      setCurrentPage(currentPage+1)
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }

  const prevPage = () => {
    if(currentPage !==1) {
      setCurrentPage(currentPage - 1)
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }

  return <div>
          {articles.length === 0
          ? <CircleLoader speedMultiplier={0.5}/>
          : <div>
              {paintCards()}
              <div className="pagination">
                <button onClick={prevPage} className='pagination__button'>Prev</button>
                <p className="current">{currentPage}</p>
                <button onClick={nextPage} className='pagination__button'>Next</button>
              </div>
            </div>
          }
        </div>;
};

export default Articles;
