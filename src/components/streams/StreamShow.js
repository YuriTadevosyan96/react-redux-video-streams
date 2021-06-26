import React from 'react';
import { connect } from 'react-redux';
import FlvJs from 'flv.js';

import { getSingleStream } from '../../actions';

class StreamShow extends React.Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
  }

  componentDidMount() {
    if (!this.props.stream) {
      this.props.getSingleStream(this.props.match.params.id);
    }

    this.buildPlayer();
  }

  componentDidUpdate() {
    this.buildPlayer();
  }

  componentWillUnmount() {
    this.player.destroy();
  }

  buildPlayer() {
    const { id } = this.props.match.params;

    if (this.player || !this.props.stream) {
      return;
    }

    if (FlvJs.isSupported()) {
      this.player = FlvJs.createPlayer({
        type: 'flv',
        url: `http://localhost:8000/live/${id}.flv`,
      });
      this.player.attachMediaElement(this.videoRef.current);
      this.player.load();
    }
  }

  render() {
    if (!this.props.stream) {
      return null;
    }

    const { title, description } = this.props.stream;

    return (
      <>
        <div>
          <video ref={this.videoRef} style={{ width: '100%' }} controls />
          <h2>{title}</h2>
          <h5>{description}</h5>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { getSingleStream })(StreamShow);
