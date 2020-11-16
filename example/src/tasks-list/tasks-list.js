import React from "react";
import AddTask from "./add-task";

const TasksList = ({ tasks, addTask }) =>
  tasks ? (
    <>
      <ul>
        {tasks.map((task) => (
          <li>{task.name}</li>
        ))}
      </ul>
      <AddTask {...{ addTask }} />
    </>
  ) : null;

export default TasksList;
