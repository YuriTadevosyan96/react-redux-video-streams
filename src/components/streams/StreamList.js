import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Icon, List, Header } from 'semantic-ui-react';

import { getStreams } from '../../actions';

class StreamList extends Component {
  componentDidMount() {
    this.props.getStreams();
  }

  renderList = () => {
    return this.props.streams.map((stream) => (
      <List.Item key={stream.id}>
        {/* Show options only if user is owner */}
        {this.props.user.userId === stream.userId ? (
          <List.Content floated="right">
            <Link to={`/streams/edit/${stream.id}`} className="ui button primary">
              Edit
            </Link>
            <Link to={`/streams/delete/${stream.id}`} className="ui button negative">
              Delete
            </Link>
          </List.Content>
        ) : null}
        {/* Show options only if user is owner */}
        <Icon name="camera" size="large" className="middle aligned" />
        <List.Content>
          <Header as="h3">
            <Link to={`/streams/${stream.id}`}>{stream.title}</Link>
          </Header>
          <p>{stream.description}</p>
        </List.Content>
      </List.Item>
    ));
  };

  render() {
    return (
      <div>
        <h2>Streams</h2>
        <List divided>
          {this.renderList()}
          <List.Item>
            <List.Content floated="right">
              <Link to="/streams/new" className="ui button primary" style={{ marginTop: '.5rem' }}>
                Create Stream
              </Link>
            </List.Content>
          </List.Item>
        </List>
      </div>
    );
  }
}

const mapState = (state) => {
  return { streams: Object.values(state.streams), user: state.userAuth };
};

export default connect(mapState, { getStreams })(StreamList);
