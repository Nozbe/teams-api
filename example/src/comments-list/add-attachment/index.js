import React, { useState } from "react";
import zacs from "@nozbe/zacs";
import InputWithButton from "../../shared/input-with-button";

import style from "./style.module.css";

const Label = zacs.styled("label", style.label);

const AddAttachment = ({ addAttachmentsByFilesArray }) => {
  const [files, setFiles] = useState([]);

  const [comment, setComment] = useState("");

  const addAttachment = () => {
    addAttachmentsByFilesArray(comment, files);
  };

  const handleAddFile = (event) => {
    const { files: formFiles } = event.target;
    if (formFiles) {
      setFiles([...formFiles]);
    }
  };

  const filesArray = Array.from(files);

  return (
    <>
      <InputWithButton
        onClick={addAttachment}
        onChange={setComment}
        btnCaption="Add attachments"
        value={comment}
      />
      <input
        style={{ visibility: "hidden", position: "absolute" }}
        type="file"
        name="fileInput"
        id="fileInput"
        multiple
        onChange={handleAddFile}
      />

      <Label htmlFor="fileInput">Select files</Label>
      <ul>
        {filesArray.map((file) => {
          console.log(file);
          return <li>{file.name}</li>;
        })}
      </ul>
    </>
  );
};

export default AddAttachment;
