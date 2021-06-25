import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header } from 'semantic-ui-react';

import StreamForm from './StreamForm';
import { createStream } from '../../actions';

class StreamCreate extends Component {
  onSubmit = (formValues) => {
    this.props.createStream(formValues);
  };

  render() {
    if (!this.props.userSingedIn) {
      return (
        <Header as="h3" textAlign="center">
          Sign In
        </Header>
      );
    }

    return (
      <>
        <Header as="h3" textAlign="center">
          Create Stream
        </Header>
        <StreamForm onSubmit={this.onSubmit} />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return { userSingedIn: state.userAuth.isSignedIn };
};

export default connect(mapStateToProps, { createStream })(StreamCreate);
