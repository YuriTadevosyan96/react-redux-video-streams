import React from 'react';
import { connect } from 'react-redux';
import { Header } from 'semantic-ui-react';

import StreamForm from './StreamForm';
import { getSingleStream, updateStream } from '../../actions';

class StreamEdit extends React.Component {
  componentDidMount() {
    // fetch stream if its not in redux store
    if (!this.props.stream) {
      const streamId = this.props.match.params.id;
      this.props.getSingleStream(streamId);
    }
  }

  onSubmit = (formValues) => {
    this.props.updateStream(this.props.stream.id, formValues);
  };

  showStreamIfCredentialsMatch = () => {
    const initialValues = {
      title: this.props.stream.title,
      description: this.props.stream.description,
    };

    if (this.props.stream) {
      if (this.props.stream.userId === this.props.user.userId) {
        return <StreamForm onSubmit={this.onSubmit} initialValues={initialValues} />;
      }
    }
  };

  render() {
    if (!this.props.user.isSignedIn) {
      return (
        <Header as="h3" textAlign="center">
          Sign In
        </Header>
      );
    }

    return (
      <>
        <Header as="h3" textAlign="center">
          Edit Stream
        </Header>
        {this.showStreamIfCredentialsMatch()}
      </>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const streamId = ownProps.match.params.id;
  return { stream: state.streams[streamId], user: state.userAuth };
};

export default connect(mapStateToProps, { getSingleStream, updateStream })(StreamEdit);
