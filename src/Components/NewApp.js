import React, {Component} from 'react';
import webtask from '../webtask';
import Spinner from 'react-spinkit';
import styles from '../styles/main.css';

export default class NewApp extends Component {

  static contextTypes = {
    router: React.PropTypes.object,
  };

  async componentDidMount() {
    let result = await webtask('getNewApplicationToken');
    this.context.router.replace(`/apps/${result.body.urlToken}`);
  }

  render() {
    return (
      <div className={styles.centered}>
        <h2>Loading...<Spinner spinnerName="wave" /></h2>
      </div>
    );
  }
}
