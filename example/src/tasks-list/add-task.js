import React, { useState } from "react";
import zacs from "@nozbe/zacs";

import style from "./add-task.module.css";

const Input = zacs.styled("input", style.input, {
  isFocused: style.isFocused, //@TODO
});

const Button = zacs.styled("button", style.button);

const AddTask = ({ addTask }) => {
  const [taskName, setTaskName] = useState("");

  const handleAddButton = () => {
    addTask(taskName);
    setTaskName("");
  };

  return (
    <div>
      <Input
        type="text"
        value={taskName}
        onChange={(event) => {
          setTaskName(event.target.value);
        }}
      />
      <Button value="Add task" onClick={handleAddButton}>
        Add task!
      </Button>
    </div>
  );
};

export default AddTask;
