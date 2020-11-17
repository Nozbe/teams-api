import React from "react";
import AddComment from "./add-comment";

const CommentsList = ({ comments, addComment }) =>
  comments ? (
    <>
      <p>Comments</p>
      <ul>
        {comments.map((comment) => (
          <li>{comment.body}</li>
        ))}
      </ul>
      <AddComment {...{ addComment }} />
    </>
  ) : null;

export default CommentsList;
