import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Dashboard from '../components/Dashboard';
import Login from '../components/Login';
import Register from '../components/Register';
import SplashPage from '../components/SplashPage';
import NotFoundPage from '../components/NotFoundPage';
import CloneProject from '../components/CloneProject';
import CreateProject from '../components/CreateProject';
import EditProject from '../components/EditProject';
import ProjectView from '../components/ProjectView';
import HelpPage from '../components/HelpPage';
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
                <Route  path="/clone" component={CloneProject}  />
                <Route  path="/task/:id" component={Register}/>
                <Route  path="/newtask" component={Register}  />
                <Route  path="/help" component={HelpPage} />
                <Route component={NotFoundPage} />
                <Route  exact path="/splash" component={SplashPage}/>
            </Switch>
        </div>
    </BrowserRouter>
);


export default AppRouter;