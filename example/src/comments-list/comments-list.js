import React from "react";

import Box from "../shared/box";
import ListHeader from "../shared/list-header";
import List from "../shared/list/list";
import AddForm from "../shared/add-form";

const CommentsList = ({ comments, addComment }) =>
  comments ? (
    <Box>
      <ListHeader>Comments:</ListHeader>
      <div
        style={{
          gridTemplateRows: "auto 100px",
        }}
      >
        <List items={comments} itemContentKey="body" />
        <AddForm onClick={addComment} btnCaption="Add comment" />
      </div>
    </Box>
  ) : null;

export default CommentsList;
