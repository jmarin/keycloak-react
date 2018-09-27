import React, { Component } from 'react';

class UserInfo extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      id: "",
      token: "",
      tokenParsed: ""
    };

    this.props.keycloak.loadUserInfo().then(userInfo => {
      this.setState({name: userInfo.name, email: userInfo.email, id: userInfo.sub, token: this.props.keycloak.token, tokenParsed: JSON.stringify(this.props.keycloak.tokenParsed)})
    });
  }

  render() {
    if (this.props.keycloak.hasResourceRole("hmda-admin")) {
      return (
        <div className="UserInfo">
          <p>Name: {this.state.name}</p>
          <p>Email: {this.state.email}</p>
          <p>ID: {this.state.id}</p>
          <p>Token: {this.state.token}</p>
          <p>Token Parsed: {this.state.tokenParsed}</p>
        </div>
      );
    } else {
      return(
        <div><h2>User {this.state.name} does not have permission to access this resource</h2></div>
      );
    }
  }
}

export default UserInfo;
