import React from "react";
import {Link} from 'react-router-dom';

const ArticleCard = ({article}) => {

  const {title, body, author, id} = article
  return <div>
          <h2>{title}</h2>
          <h3>{author}</h3>
          <p>{body.slice(0, 25)}...<Link to={`/articledetail/?id=${id}`}>[Read more]</Link></p>
        </div>;
};

export default ArticleCard;
