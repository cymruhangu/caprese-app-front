import {API_BASE_URL} from '../config';
import { 
  DELETE_PROJECT_SUCCESS, 
  deleteProjectSuccess,
  FETCH_PROJECTS_SUCCESS,
  fetchProjectsSuccess,
  FETCH_PROJECTS,
  fetchProjects
} from './projects';

describe('deleteProjectSuccess', () => {
  it('Should return the action', () => {
      const id = '123abc';
      const action = deleteProjectSuccess(id);
      expect(action.type).toEqual(DELETE_PROJECT_SUCCESS);
      expect(action.id).toEqual(id);
  });
});

describe('fetchProjectsSuccess', () => {
  it('Should return the action', () => {
      const projects = [];
      const action = fetchProjectsSuccess(projects);
      expect(action.type).toEqual(FETCH_PROJECTS_SUCCESS);
      expect(action.projects).toEqual(projects);
  });
});


  // describe('fetchProjects', () => {
  //   it('Should dispatch fetchProjectsSuccess', () => {
  //       const projects = [];

  //       global.fetch = jest.fn().mockImplementation(() =>
  //           Promise.resolve({
  //               ok: true,
  //               json() {
  //                   return projects;
  //               }
  //           })
  //       );
  //       const dispatch = jest.fn();
  //       return fetchProjects()(dispatch).then(() => {
  //           expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/projects`);
  //           expect(dispatch).toHaveBeenCalledWith(fetchProjectsSuccess(projects));
  //       });
  //     })});
