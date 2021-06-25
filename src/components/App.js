import React from 'react';
import { Route, Router } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import history from '../history';
import Header from './Header';
import StreamList from './streams/StreamList';
import StreamCreate from './streams/StreamCreate';
import StreamDelete from './streams/StreamDelete';
import StreamEdit from './streams/StreamEdit';
import StreamShow from './streams/StreamShow';

function App() {
  return (
    <Router history={history}>
      <Container>
        <div>
          <Header />
          <Route path="/" exact component={StreamList} />
          <Route path="/streams/new" component={StreamCreate} />
          <Route path="/streams/edit/:id" component={StreamEdit} />
          <Route path="/streams/delete/:id" component={StreamDelete} />
          <Route path="/streams/show/:id" component={StreamShow} />
        </div>
      </Container>
    </Router>
  );
}

export default App;
