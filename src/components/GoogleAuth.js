import React from 'react';
import { connect } from 'react-redux';

import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {
  //window is the windowscope of the browser
  //client:auth2 loads up library, then callback for clientid
  //this initiates gapi client
  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client
        .init({
          clientId: '621059385873-cejc47iodf8s0mgtigkar61jbkhie77f.apps.googleusercontent.com',
          scope: 'email'
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get())
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button className="ui red google button" onClick={this.onSigningClick}>
          <i className="google icon" />
          Log out
        </button>
      );
    } else {
      return (
        <button className="ui red google button" onClick={this.onSigningClick}>
          <i className="google icon" />
          Log in with Google
        </button>
      );
    }
  }

  onSigningClick = () => {
    if(this.props.isSignedIn) {
      this.auth.signOut();
    } else if (this.props.isSignedIn === false) {
      this.auth.signIn();
    }
  };

  render() {
    return <div>{this.renderAuthButton()}</div>;
  };
}

const mapStateToProps = (state) => {
  return {isSignedIn: state.auth.isSignedIn};
}

export default connect(
  mapStateToProps,
  { signIn, signOut }
)(GoogleAuth);
