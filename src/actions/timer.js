export const UPDATE_TIME = 'UPDATE_TIME';
export const updateTime = current => ({
  type: UPDATE_TIME,
  current,
});

export const UPDATE_PROJECT_DATA = 'UPDATE_PROJECT_DATA';
export const updateProjectData = (updates) => ({
    type: UPDATE_PROJECT_DATA,
    updates
});

export const UPDATE_PROJECT_NAME = 'UPDATE_PROJECT_NAME';
export const updateProjectName = name => ({
    type: UPDATE_PROJECT_NAME,
    name
});