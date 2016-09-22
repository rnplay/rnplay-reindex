import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Reindex from '../Reindex';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import styles from '../styles/main.css';

export default class AuthItem extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: Reindex.isLoggedIn(),
    };
  }

  componentDidMount() {
    console.log(Reindex.isLoggedIn());
    Reindex.addListener('tokenChange', this.handleTokenChange);
  }

  componentWillUnmount() {
    Reindex.removeListener('tokenChange', this.handleTokenChange);
  }

  handleTokenChange = () => {
    this.setState({ isLoggedIn: Reindex.isLoggedIn() });
  };

  handleLogin = () => {
    this.props.auth.login();
  }

  handleLogout = () => {
    Reindex.logout();
  }

  render() {
    if (this.state.isLoggedIn) {
      return (
        <DropdownButton className={styles.roundIcon} title={<i className="fa fa-bars"></i>} noCaret id="dropdown-no-caret">
          <MenuItem eventKey="1" onClick={this.handleLogout}>Logout</MenuItem>
        </DropdownButton>
      );
    } else {
      return (
        <DropdownButton className={styles.roundIcon} title={<i className="fa fa-bars"></i>} noCaret id="dropdown-no-caret">
          <MenuItem eventKey="1" onClick={this.handleLogin}>Login / Register </MenuItem>
        </DropdownButton>
      );
    }
  }
}