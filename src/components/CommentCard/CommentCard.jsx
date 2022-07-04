import React from "react";

const CommentCard = ({comment}) => {

  const {body, email} = comment

  return <div className="comment">
          <p><b>Comment:</b> {body}</p>
          <p className="author"><b>Author:</b> {email}</p>
        </div>;
};

export default CommentCard;
