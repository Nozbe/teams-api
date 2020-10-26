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

  return allProjects.find((project) => project.is_single_actions).id;
};

exports = module.exports = {
  getAllProjects,
  getSingleActionsProjectId,
};
