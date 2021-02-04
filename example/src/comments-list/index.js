import React from "react";
import zacs from "@nozbe/zacs";

import Box from "../shared/box";
import ListHeader from "../shared/list-header";
import List from "../shared/list";
import InputWithButton from "../shared/input-with-button";
import { useState } from "react/cjs/react.development";

import style from "./style.module.css";

const Label = zacs.styled("label", style.label);
const Input = zacs.styled("input", style.input);

const CommentsList = ({ comments, addComment, addAttachmentsByFilesArray }) => {
  const [files, setFiles] = useState([]);
  const [comment, setComment] = useState("");

  const handleAddFile = (event) => {
    const { files: formFiles } = event.target;
    if (formFiles) {
      setFiles([...formFiles]);
    }
  };

  const handleAddComment = () => {
    if (files.length) {
      addAttachmentsByFilesArray(comment, files);
      setComment("");
      setFiles([]);
      return;
    }

    addComment(comment);
    setComment("");
  };

  const filesArray = Array.from(files);

  return comments ? (
    <Box>
      <ListHeader>Comments:</ListHeader>
      <List items={comments} itemContentKey="body" />

      <InputWithButton
        onClick={handleAddComment}
        value={comment}
        onChange={setComment}
        btnCaption="Add comment"
      />

      <Input
        type="file"
        name="fileInput"
        id="fileInput"
        multiple
        onChange={handleAddFile}
      />

      <Label htmlFor="fileInput">Select files</Label>
      <ul>
        {filesArray.map((file) => (
          <li>{file.name}</li>
        ))}
      </ul>
    </Box>
  ) : null;
};

export default CommentsList;
