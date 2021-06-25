import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getSingleStream, deleteStream } from '../../actions';
import Modal from '../Modal';
import history from '../../history';

function StreamDelete(props) {
  const dispatch = useDispatch();
  const streamId = props.match.params.id;
  const user = useSelector((state) => state.userAuth);
  const stream = useSelector((state) => state.streams[streamId]);

  useEffect(() => {
    if (!stream) {
      dispatch(getSingleStream(streamId));
    }
  });

  const handleDismiss = () => {
    history.replace('/');
  };

  const handleDelete = () => {
    dispatch(deleteStream(streamId));
  };

  const actions = () => (
    <React.Fragment>
      <button onClick={handleDelete} className="ui negative button">
        Delete
      </button>
      <button onClick={handleDismiss} className="ui button">
        Cancel
      </button>
    </React.Fragment>
  );

  if (!user.isSignedIn || !stream || user.userId !== stream.userId) {
    return null;
  }

  return (
    <Modal
      onDismiss={handleDismiss}
      title="Delete Stream"
      content="Are you sure you want to delete this stream?"
      actions={actions()}
    />
  );
}

export default StreamDelete;
