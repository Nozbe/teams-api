import React, { useState } from "react";
import zacs from "@nozbe/zacs";

import style from "./style.module.css";

const Input = zacs.styled("input", style.input, {
  isFocused: style.isFocused,
});

const Container = zacs.view(style.container, {});

const Button = zacs.styled("button", style.button);

const InputWithButton = ({
  onClick,
  onChange,
  value: valueProp,
  btnCaption,
  placeholder,
}) => {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);

  const handleButton = () => {
    onClick(value);
    setValue("");
  };

  const handleChange = (event) => {
    if (onChange) {
      onChange(event.target.value);
      return;
    }

    setValue(event.target.value);
  };

  return (
    <Container>
      <Input
        type="text"
        value={valueProp || value}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        isFocused={focused}
        onChange={handleChange}
      />
      <Button onClick={handleButton}>{btnCaption || "Add task"}</Button>
    </Container>
  );
};

export default InputWithButton;
