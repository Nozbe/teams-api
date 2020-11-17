import React, { useState } from "react";

const AddComment = ({ addComment }) => {
  const [commentBody, setCommentBody] = useState("");

  const handleAddButton = () => {
    addComment(commentBody);
    setCommentBody("");
  };

  return (
    <>
      <input
        type="text"
        value={commentBody}
        onChange={(event) => {
          setCommentBody(event.target.value);
        }}
      />
      <button value="Add task" onClick={handleAddButton}>
        Add task!
      </button>
    </>
  );
};

export default AddComment;
