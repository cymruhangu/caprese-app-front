export const UPDATE_TIME = 'UPDATE_TIME';
export const updateTime = current => ({
  type: UPDATE_TIME,
  current,
});

export const UPDATE_PROJECTID = 'UPDATE_CURRENT_ID';
export const updateProjectId = id => ({
    type: UPDATE_PROJECTID,
    id
});