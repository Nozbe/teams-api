import React, { useState } from "react";
import zacs from "@nozbe/zacs";

import style from "./style.module.css";

const Input = zacs.styled("input", style.input, {
  isFocused: style.isFocused,
});

const Container = zacs.view(style.container, {});

const Button = zacs.styled("button", style.button);

const InputWithButton = ({ onClick, btnCaption, placeholder }) => {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);

  const handleButton = () => {
    onClick(value);
    setValue("");
  };

  return (
    <Container>
      <Input
        type="text"
        value={value}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        isFocused={focused}
        onChange={(event) => {
          setValue(event.target.value);
        }}
      />
      <Button onClick={handleButton}>{btnCaption || "Add task"}</Button>
    </Container>
  );
};

export default InputWithButton;
