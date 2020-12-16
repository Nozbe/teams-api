import React from "react";

import Box from "../shared/box";
import List from "../shared/list";
import ListHeader from "../shared/list-header";

const ProjectList = ({ projects, selectedProjectId, getTasks }) => (
  <Box>
    <ListHeader>Projects:</ListHeader>
    <List
      items={projects}
      handleSelect={getTasks}
      defaultItemName="Single Tasks"
      selectable
      selectedItemId={selectedProjectId}
    ></List>
  </Box>
);

export default ProjectList;
