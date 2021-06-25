import React, { Component } from 'react';
import { connect } from 'react-redux';

import { signIn, signOut } from '../actions';

class GoogleAuth extends Component {
  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.props.isUserSignedIn === null) {
      return null;
    } else if (this.props.isUserSignedIn) {
      return (
        <button onClick={this.onSignOutClick} className="ui red google button">
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button onClick={this.onSignInClick} className="ui red google button">
          <i className="google icon" />
          Sign In
        </button>
      );
    }
  }

  decideAuthState = (isSignedIn) => {
    if (isSignedIn) {
      const userId = this.auth.currentUser.get().getId();
      this.props.signIn(userId);
    } else {
      this.props.signOut();
    }
  };

  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client
        .init({
          clientId: '1092217556991-k4019r96cm3cmes6in3eo44ufgsgutbh.apps.googleusercontent.com', // cspell:disable-line
          scope: 'email',
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.decideAuthState(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.decideAuthState);
        });
    });
  }

  componentWillUnmount() {
    this.auth.isSignedIn.get() && this.auth.signOut();
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = (state) => {
  return { isUserSignedIn: state.userAuth.isSignedIn };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
