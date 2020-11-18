import React from "react";

import Box from "../shared/box";
import List from "../shared/list/list";
import ListHeader from "../shared/list-header";
import AddForm from "../shared/add-form";

const TasksList = ({ tasks, selectTask, addTask, selectedTaskId }) =>
  tasks ? (
    <Box>
      <ListHeader>Tasks:</ListHeader>
      <List
        items={tasks}
        handleSelect={selectTask}
        defaultItemName="Single Actions"
        selectable
        selectedItemId={selectedTaskId}
      ></List>
      <AddForm onClick={addTask} />
    </Box>
  ) : null;

export default TasksList;
