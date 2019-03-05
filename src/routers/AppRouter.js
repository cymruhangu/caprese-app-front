import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Dashboard from '../components/Dashboard';
import Login from '../components/Login';
import Register from '../components/Register';
import SplashPage from '../components/SplashPage';
import NotFoundPage from '../components/NotFoundPage';
import CreateProject from '../components/CreateProject';
import EditProject from '../components/EditProject';
import ProjectView from '../components/ProjectView';
import Header from '../components/Header';

const AppRouter = () => (
    <BrowserRouter>
        <div id="App">
            <Header />
            <Switch>
                <Route  exact={true} path="/" component={Dashboard}  />
                <Route  path="/login" component={Login}  />
                <Route  path="/register" component={Register}  />
                <Route  path="/project/:id" component={ProjectView}  />
                <Route  path="/edit/:id" component={EditProject}  />
                <Route  path="/projectcreate" component={CreateProject}  />
                <Route component={NotFoundPage} />
                <Route  exact path="/splash" component={SplashPage}/>
            </Switch>
        </div>
    </BrowserRouter>
);


export default AppRouter;