import React from 'react';
import {Route, Switch} from 'react-router-dom';

import Header from './components/Navigation/Header';
import Post from './routes/Post';
import Dashboard from './routes/Dashboard';

class App extends React.Component {
  render() {
    return (
      <div className="main-app-container">
        <section className="app-page-container">
          <Header/>

            <div className="app-content pb-0 full-width">
              <Switch>
                <Route path={`${this.props.match.path}posts`} component={Post}/>
                <Route path={`${this.props.match.path}`} component={Dashboard}/>
              </Switch>
            </div>
        </section>
      </div>
    )
  }
}

export default App;
