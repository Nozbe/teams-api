import React from "react";

import Box from "../shared/box";
import ListHeader from "../shared/list-header";
import List from "../shared/list";
import InputWithButton from "../shared/input-with-button";
import { useState } from "react/cjs/react.development";
import AddAttachment from "./add-attachment";
import Button from "../shared/button/button";

const CommentsList = ({ comments, addComment, addAttachmentsByFilesArray }) => {
  const [attachmentsFormVisible, setAttachmentsFormVisible] = useState(false);

  return comments ? (
    <Box>
      <ListHeader>Comments:</ListHeader>
      <List items={comments} itemContentKey="body" />
      {!attachmentsFormVisible && (
        <>
          <InputWithButton onClick={addComment} btnCaption="Add comment" />
          <Button
            type="submit"
            onClick={() => setAttachmentsFormVisible(!attachmentsFormVisible)}
          >
            Show attachments form
          </Button>
        </>
      )}
      {attachmentsFormVisible && (
        <AddAttachment {...{ addAttachmentsByFilesArray }} />
      )}
    </Box>
  ) : null;
};

export default CommentsList;
