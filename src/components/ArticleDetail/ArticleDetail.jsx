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
    if(email.length > 0 && body.length > 0 ){
      setComments([...comments, comment])
    }
  }

  const paintCards = () => comments.map((comment, i) => <CommentCard comment={comment} key={i}/>);

  return <>
          {loading
          ? <div className="spinner"><CircleLoader speedMultiplier={0.5} color={'#00857a'}  size={100}/></div>
          : <div className="comments">
              <div className="article-body">
                <h2>{data.title}</h2>
                <h3>{data.author}</h3>
                <p><b>Company:</b> {data.company}</p>
                <p><b>City:</b> {data.city}</p>
                <p>{data.body}</p>
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

export default ArticleDetail;
