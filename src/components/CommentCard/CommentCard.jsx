import React from "react";

const CommentCard = ({comment}) => {

  const {body, email} = comment

  return <div>
          <h5>Author: {email}</h5>
          <p>Comment: {body}</p>
        </div>;
};

export default CommentCard;
