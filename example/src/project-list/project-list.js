import React from "react";

const Badge = ({ projectId, selectedProjectId }) =>
  projectId === selectedProjectId ? "[x] " : "[ ] ";

const ProjectList = ({ projects, selectedProjectId, selectProject }) => {
  const handleSelectProject = (projectId) => {
    selectProject(projectId);
  };

  return (
    <>
      <p>Projects:</p>
      <ul>
        {projects &&
          projects.map((project) => (
            <li onClick={() => handleSelectProject(project.id)}>
              <Badge projectId={project.id} {...{ selectedProjectId }}></Badge>
              {project.name.length ? project.name : "Single Actions"}
            </li>
          ))}
      </ul>
    </>
  );
};

export default ProjectList;
