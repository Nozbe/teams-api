import React from "react";

import Box from "../shared/box";
import List from "../shared/list";
import ListHeader from "../shared/list-header";
import InputWithButton from "../shared/input-with-button";

const TasksList = ({ tasks, getComments, addTask, selectedTaskId }) =>
  tasks ? (
    <Box>
      <ListHeader>Tasks:</ListHeader>
      <List
        items={tasks}
        handleSelect={getComments}
        selectable
        selectedItemId={selectedTaskId}
      ></List>
      <InputWithButton onClick={addTask} />
    </Box>
  ) : null;

export default TasksList;
