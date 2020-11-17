import React from "react";
import Badge from "../shared/badge";
import AddTask from "./add-task";

const TasksList = ({ tasks, selectTask, addTask, selectedTaskId }) =>
  tasks ? (
    <div>
      <ul>
        {tasks.map((task) => (
          <>
            <Badge elementId={task.id} selectedElementId={selectedTaskId} />
            <li
              key={task.id}
              onClick={() => selectTask(task.id)}
              style={{ cursor: "pointer" }}
            >
              {task.name}
            </li>
          </>
        ))}
      </ul>
      <AddTask {...{ addTask }} />
    </div>
  ) : null;

export default TasksList;
