import classNames from 'classnames';
import React, {Component} from 'react';
import styles from '../styles/main.css';
import Codemirror from 'react-codemirror';
import 'codemirror/mode/jsx/jsx';
import 'codemirror/lib/codemirror.css';
import Appetize from './Appetize';
import {DEVICES} from '../devices';
import 'react-select/scss/default.scss';
import Relay from 'react-relay';
import ChangeApplicationMutation from '../mutations/ChangeApplicationMutation';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import AuthItem from './AuthItem';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: null,
      name: null,
    };
  }
  componentDidMount() {
    this.setState({code: this.props.application.body, name: this.props.application.name});
    this.simulator = new Appetize();
    console.log(this.state);
    console.log(this.props);
  }
  updateApp = (e) => {
    if (e) {
      e.preventDefault();
    }
    Relay.Store.commitUpdate(
      new ChangeApplicationMutation({
        id: this.props.application.id,
        name: this.state.name,
        body: this.state.code
      }), {
        onFailure: (transaction) => {
          console.error(transaction.getError());
        },
      }
    );
  }
  updateCode = (code) => {
    this.setState({code: code});
  }
  render() {
    return (
      <div className={styles.container}>
        <div className={classNames(styles.column, styles.columnLeft)}>
          <div className={styles.editor}>
            <div className={styles.header}>
              <div className={styles.menu}>
                <AuthItem auth={this.props.routes[0].auth}/>
              </div>
              <div className={styles.headerContent}>
                <form onSubmit={this.updateApp} className={styles.form}>
                  <input className={styles.title} type="text" defaultValue={this.props.application.name} onChange={(e) => this.setState({name: e.target.value})} />
                </form>
                <div className={styles.controls}>
                  <button onClick={this.updateApp} className={styles.button}>{this.props.relay.hasOptimisticUpdate(this.props.application) ? 'Saving...' : 'Save'}</button>

                </div>
              </div>
            </div>
            <Codemirror className={styles.codemirror} value={this.state.code} onChange={this.updateCode} options={{
              mode: 'jsx',
              viewportMargin: Infinity,
              lineNumbers: true,
              lineWrapping: true
            }} />
          </div>
        </div>
        <div className={classNames(styles.column, styles.columnRight)}>
          <Appetize options={{device: this.state.device}} application={this.props.application} />
        </div>
      </div>
    );
  }
}

export default Relay.createContainer(Main, {
  fragments: {
    application: () => Relay.QL`
      fragment on Application {
        id,
        name,
        urlToken,
        body
      }
    `,
  },
});
