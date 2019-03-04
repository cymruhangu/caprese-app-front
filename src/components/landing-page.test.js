import React from 'react';
import {shallow, mount} from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
const mockStore = configureMockStore();

import LandingPage from './create-project';

describe('<LandingPage />', () => {
  const initialState = {
    auth: {
      authToken: 'aadfasdfasdfasf',
      currentUser: {
        firstName: 'John',
        lastName: 'Student',
        username: 'jstudent'
      },
      loading: false,
      error: null
    }
    
  };
  const mockStore = configureMockStore();
  let store, wrapper;

  beforeEach(() => {
    store=mockStore(initialState);
    wrapper = shallow(
      <Provider store={store}>
        <LandingPage />
      </Provider>
    );
  });

  it('should render CONNECTED component', () => {
    expect(wrapper.length).toEqual(1);
  });

});