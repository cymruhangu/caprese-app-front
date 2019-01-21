export const UPDATE_TIME = 'UPDATE_TIME';
export const updateTime = current => ({
  type: UPDATE_TIME,
  current,
});

export const UPDATE_PROJECTID = 'UPDATE_CURRENT_ID';
export const updateProjectId = (updates) => ({
    type: UPDATE_PROJECTID,
    updates
});

export const UPDATE_PROJECT_NAME = 'UPDATE_PROJECT_NAME';
export const updateProjectName = name => ({
    type: UPDATE_PROJECT_NAME,
    name
});