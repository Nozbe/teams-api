import React, { useState } from "react";
import zacs from "@nozbe/zacs";

import style from "./style.module.css";

const Input = zacs.styled("input", style.input, {
  isFocused: style.isFocused,
});

const Container = zacs.view(style.container, {});

const Button = zacs.styled("button", style.button);

const AddForm = ({ onClick, btnCaption }) => {
  const [taskName, setTaskName] = useState("");
  const [focused, setFocused] = useState(false);

  const handleButton = () => {
    onClick(taskName);
    setTaskName("");
  };

  return (
    <Container>
      <Input
        type="text"
        value={taskName}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        isFocused={focused}
        onChange={(event) => {
          setTaskName(event.target.value);
        }}
      />
      <Button onClick={handleButton}>{btnCaption || "Add task"}</Button>
    </Container>
  );
};

export default AddForm;
