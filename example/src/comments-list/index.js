import React from "react";

import Box from "../shared/box";
import ListHeader from "../shared/list-header";
import List from "../shared/list";
import InputWithButton from "../shared/input-with-button";

const CommentsList = ({ comments, addComment }) =>
  comments ? (
    <Box>
      <ListHeader>Comments:</ListHeader>
      <List items={comments} itemContentKey="body" />
      <InputWithButton onClick={addComment} btnCaption="Add comment" />
    </Box>
  ) : null;

export default CommentsList;
