import React from "react";

const CommentCard = ({comment}) => {

  const {body, email} = comment

  return <div>
          <h4>Author: {email}</h4>
          <p>Comment: {body}</p>
        </div>;
};

export default CommentCard;
