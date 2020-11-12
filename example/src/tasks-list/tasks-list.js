import React from "react";

const TasksList = ({ tasks }) => {
  return <ul>{tasks && tasks.map((task) => <li>{task.name}</li>)}</ul>;
};

export default TasksList;
