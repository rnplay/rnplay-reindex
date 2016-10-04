import React, {Component} from 'react';
import styles from '../styles/main.css';

export default class Home extends Component {

  render() {
    return (
      <div className={styles.home}>
        <h3>React Native Playground</h3>
        <a href="/apps/new">Create an app</a>
      </div>
    );
  }
}
