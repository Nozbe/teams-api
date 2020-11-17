import React from "react";
import AddTask from "./add-task";

const TasksList = ({ tasks, selectTask, addTask }) =>
  tasks ? (
    <>
      <ul>
        {tasks.map((task) => (
          <li
            key={task.id}
            onClick={() => selectTask(task.id)}
            style={{ cursor: "pointer" }}
          >
            {task.name}
          </li>
        ))}
      </ul>
      <AddTask {...{ addTask }} />
    </>
  ) : null;

export default TasksList;
