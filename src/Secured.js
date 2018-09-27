import React, { Component } from 'react';
import Keycloak from 'keycloak-js';
import UserInfo from './UserInfo';
import Logout from './Logout';

class Secured extends Component {
  
  constructor(props) {
    super(props);
    this.state = { keycloak: null, authenticated: false };
  }

  componentDidMount() {
    const keycloak = Keycloak('/keycloak.json');
    keycloak.init({onLoad: 'login-required'}).then(authenticated => {
      this.setState({keycloak: keycloak, authenticated: authenticated})
    })
  }

  render() {
    if (this.state.keycloak) {
      if (this.state.authenticated) return (
        <div>
          <p>This is a keycloak-secured component of your application. You shouldn't be able to see this unless you've authenticated with keycloak.</p>
          <UserInfo keycloak={this.state.keycloak} />
          <Logout keycloak={this.state.keycloak} />
        </div>
      ); else return (<div>Unable to authenticate!</div>) 
    }
    return (
      <div>Initializing keycloak....</div>
    );
  }
}
export default Secured;
