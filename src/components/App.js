import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
//To create one's own browser history, need to use plain router
//browserRouter uses its own builtin history object
//need to access history for programmatic navigation of routes

import StreamCreate from './streams/StreamCreate';
import StreamDelete from './streams/StreamDelete';
import StreamEdit from './streams/StreamEdit';
import StreamList from './streams/StreamList';
import StreamShow from './streams/StreamShow';
import Header from './Header';
import history from '../history';

//Link tags are like <a> anchor tags, allows navigation
//<a> tags dump html file when clicked and fetches brand new file, so unideal
const App = () => {
  return (
    <div className="ui container">
      <Router history={history}>
        <div>
          <Header />
          <Switch>
            <Route path="/" exact component={StreamList}/>
            <Route path="/streams/new" exact component={StreamCreate}/>
            <Route path="/streams/edit/:id" exact component={StreamEdit}/>
            <Route path="/streams/delete/:id" exact component={StreamDelete}/>
            <Route path="/streams/:id" exact component={StreamShow}/>
          </Switch>
        </div>
      </Router>
    </div>
    );
    //exact ensures component only renders when path is only "/"
    //not when / is present in other paths
    //equivalent to exact={true}
    //in Route path, :id means name after : is a variable
}

export default App;

/* OAuth client ID:
621059385873-t3637c85d0be0vs2l7lp9883elj5b257.apps.googleusercontent.com
*/
