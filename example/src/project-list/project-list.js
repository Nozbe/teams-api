import React from "react";

const Badge = ({ projectId, selectedProjectId }) =>
  projectId === selectedProjectId ? "[x] " : "[ ] ";

const ProjectList = ({ projects, selectedProjectId }) => {
  return (
    <ul>
      {projects &&
        projects.map((project) => (
          <li>
            <Badge projectId={project.id} {...{ selectedProjectId }}></Badge>
            {project.name.length ? project.name : "Single Actions"}
          </li>
        ))}
    </ul>
  );
};

export default ProjectList;
