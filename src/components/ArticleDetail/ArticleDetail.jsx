import React, {useState, useEffect} from "react";
import { useSearchParams } from "react-router-dom";
import { useDataLoader } from 'react-use-data-loader';
import {CircleLoader} from 'react-spinners';
import axios from "axios";
import CommentCard from "../CommentCard";

const article = async(id) => {
  try {
    const articleRes = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
    const articleJson = articleRes.data
    const authorRes = await axios.get(`https://jsonplaceholder.typicode.com/users/${articleJson.userId}`);
    const authorJson = authorRes.data;
    const dataArticle = {
      'title': articleJson.title,
      'author': authorJson.name,
      'city': authorJson.address.city,
      'company': authorJson.company.name,
      'body': articleJson.body,
      'id': articleJson.id,
    }
    return dataArticle
  } catch (error) {
    console.log('error', error)
  }  
}

const ArticleDetail = () => {

  const id = window.location.href.split('=')[1];

  const [searchParams] = useSearchParams();
  const { data, loading } = useDataLoader(article, searchParams.get('id'));
  const [comments, setComments] = useState([]);

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

  console.log(comments);

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.elements.email.value;
    const body = e.target.elements.body.value;
    const comment = {'email': email, 'body': body}
    setComments([...comments, comment])
  }

  const paintCards = () => comments.map((comment, i) => <CommentCard comment={comment} key={i}/>);

  return <>
          {loading
          ? <CircleLoader speedMultiplier={0.5}/>
          : <div>
            <h2>{data.title}</h2>
            <h3>{data.author}</h3>
            <p>{data.company}</p>
            <p>{data.city}</p>
            <p>{data.body}</p>
            <h3>Comments:</h3>
            <div>{paintCards()}</div>
            <form onSubmit={handleSubmit}>
              <label htmlFor="email">Email:</label>
              <input type="email" name="email"/>
              <label htmlFor="body">Comment</label>
              <input type="text" name="body"/>
              <input type="submit" value="Send"/>
            </form>
          </div>
          }
        </>;
};

export default ArticleDetail;
