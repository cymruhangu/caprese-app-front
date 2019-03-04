import {createStore, applyMiddleware, combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {loadAuthToken} from './local-storage';
import authReducer from './reducers/auth';
import protectedDataReducer from './reducers/protected-data';
import projectsReducer from './reducers/projects';
import timerReducer from './reducers/timer';
import {setAuthToken, refreshAuthToken} from './actions/auth';

const initialState = {};
const middleware = [thunk];


const store = createStore(
    combineReducers({
        form: formReducer,
        auth: authReducer,
        protectedData: protectedDataReducer,
        projects: projectsReducer,
        timer: timerReducer
    }), initialState,
        composeWithDevTools(
            applyMiddleware(...middleware)
        )
);

// Hydrate the authToken from localStorage if it exist
const authToken = loadAuthToken();
if (authToken) {
    const token = authToken;
    store.dispatch(setAuthToken(token));
    store.dispatch(refreshAuthToken());
}

export default store;
