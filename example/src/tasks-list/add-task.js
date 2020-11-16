import React, { useState } from "react";

const AddTask = ({ addTask }) => {
  const [taskName, setTaskName] = useState("");

  const handleAddButton = () => {
    addTask(taskName);
    setTaskName("");
  };

  return (
    <div>
      <input
        type="text"
        value={taskName}
        onChange={(event) => {
          setTaskName(event.target.value);
        }}
      />
      <button value="Add task" onClick={handleAddButton}>
        add task!
      </button>
    </div>
  );
};

export default AddTask;
