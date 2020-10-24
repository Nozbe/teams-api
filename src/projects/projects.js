const getAllProjects = async (apiClient) => {
  try {
    const { data } = await apiClient.get("sync", {
      collection_name: "projects",
    });

    return data.changes.projects.updated;
  } catch (err) {
    console.error(err);
  }
};

const getSingleActionsProjectId = async (apiClient) => {
  const allProjects = await getAllProjects(apiClient);
  console.log(allProjects.find((project) => project.is_single_actions).id);
  return allProjects.find((project) => project.is_single_actions).id;
};

exports.getAllProjects = module.exports.getAllProjects = getAllProjects;
exports.getSingleActionsProjectId = module.exports.getSingleActionsProjectId = getSingleActionsProjectId;
