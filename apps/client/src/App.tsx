import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import {
  Tasks,
  UserTasks,
} from './components';

const App = () => (
  <Router>
    <Switch>
      <Route
        exact
        path="/"
        component={() => <Redirect to="/tasks" />}
      />
      <Route
        exact
        path="/tasks"
        component={Tasks}
      />
      <Route
        exact
        path="/users/:id/tasks"
        component={UserTasks}
      />
    </Switch>
  </Router>
);


export default App;
