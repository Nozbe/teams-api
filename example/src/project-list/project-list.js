import React from "react";
import zacs from "@nozbe/zacs";

import Badge from "../shared/badge";

const Label = zacs.text();
const Box = zacs.view(null);

const ProjectList = ({ projects, selectedProjectId, getTasks }) => {
  const handleSelectProject = (projectId) => {
    getTasks(projectId);
  };

  return (
    <Box>
      <Label>Projects:</Label>
      <ul>
        {projects &&
          projects.map((project) => (
            <li
              key={project.id}
              onClick={() => handleSelectProject(project.id)}
            >
              <Badge
                elementId={project.id}
                selectedElementId={selectedProjectId}
              ></Badge>
              {project.name.length ? project.name : "Single Actions"}
            </li>
          ))}
      </ul>
    </Box>
  );
};

export default ProjectList;
