import React from "react";
import zacs from "@nozbe/zacs";

import Badge from "../shared/badge";
import style from "./project-list.module.css";
import ListItem from "../shared/list-item/list-item";

const Label = zacs.text(style.title);
const Box = zacs.view(null);

const ProjectList = ({ projects, selectedProjectId, getTasks }) => {
  const handleSelectProject = (projectId) => {
    getTasks(projectId);
  };

  return (
    <Box>
      <Label>Projects:</Label>
      <ul
        style={{
          listStyleType: "none",
          padding: 0,
        }}
      >
        {projects &&
          projects.map((project) => (
            <ListItem
              key={project.id}
              onClick={() => handleSelectProject(project.id)}
            >
              <Badge
                elementId={project.id}
                selectedElementId={selectedProjectId}
              ></Badge>
              {project.name.length ? project.name : "Single Actions"}
            </ListItem>
          ))}
      </ul>
    </Box>
  );
};

export default ProjectList;
