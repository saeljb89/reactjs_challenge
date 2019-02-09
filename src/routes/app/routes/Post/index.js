import React from 'react';
import {Route, Switch} from 'react-router-dom';

import PostList from './../../components/Post/PostList';
import PostEdit from './../../components/Post/PostEdit';

class Post extends React.Component {

  render() {
    return (
        <div>
      <Switch>
        <Route path={`${this.props.match.path}/edit/:id`}
               render={( props ) => <PostEdit {...props}/>}/>
        <Route path={`${this.props.match.path}/new`} render={( props ) => <PostEdit {...props}/>}/>
        <Route path={`${this.props.match.path}`} render={() => <PostList/>}/>
      </Switch>
      </div>
    )
  }
}

export default Post;
