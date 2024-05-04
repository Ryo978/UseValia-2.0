import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Profile from './components/Profile';


const Routes: React.FC = () => { //TODO: configurar rutas
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/perfil">
          <Profile />
        </Route>
        {/* <Route path="/example/:id" component={ExampleComponent} /> */}
      </Switch>
    </Router>
  );
};

export default Routes;