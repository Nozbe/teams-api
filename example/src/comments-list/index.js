import React from "react";

import Box from "../shared/box";
import ListHeader from "../shared/list-header";
import List from "../shared/list";
import InputWithButton from "../shared/input-with-button";
import { useState } from "react/cjs/react.development";

const CommentsList = ({ comments, addComment, addAttachmentByFormData }) => {
  const [files, setFiles] = useState([]);

  const addAttachment = () => {
    addAttachmentByFormData("comment body", files, "attachment name");
  };

  const handleAddFile = (event) => {
    const { files: formFiles } = event.target;

    console.log(formFiles[0]);

    formFiles[0].text().then((t) => console.log(t.length));

    if (formFiles) {
      setFiles([...formFiles]);
    }
  };

  return comments ? (
    <Box>
      <ListHeader>Comments:</ListHeader>
      <List items={comments} itemContentKey="body" />
      <InputWithButton onClick={addComment} btnCaption="Add comment" />
      <>
        {/* <form> */}
        <input type="file" multiple onChange={handleAddFile} />
        <button type="submit" onClick={addAttachment}>
          Add attachment
        </button>
        {/* </form> */}
      </>
    </Box>
  ) : null;
};

export default CommentsList;
