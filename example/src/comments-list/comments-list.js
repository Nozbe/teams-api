import React from "react";
import AddComment from "./add-comment";

const CommentsList = ({ comments, addComment }) =>
  comments ? (
    <div>
      <p>Comments</p>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>{comment.body}</li>
        ))}
      </ul>
      <AddComment {...{ addComment }} />
    </div>
  ) : null;

export default CommentsList;
