import classNames from 'classnames';
import React, {Component} from 'react';
import styles from './styles/main.css';
import Codemirror from 'react-codemirror';
import 'codemirror/mode/jsx/jsx';
import 'codemirror/lib/codemirror.css';
import Appetize from './Appetize';
import {DEVICES} from './devices';
import 'react-select/scss/default.scss';
import Relay from 'react-relay';
import ChangeApplicationMutation from './mutations/ChangeApplicationMutation';
import { DropdownButton, MenuItem } from 'react-bootstrap';

class Main extends Component {

  state = {
    code: null,
    name: null
  };

  componentDidMount() {
    this.setState({code: this.props.application.indexIos, name: this.props.application.name});
    this.simulator = new Appetize();
  }

  updateApp = (e) => {
    if (e) {
      e.preventDefault();
    }
    Relay.Store.commitUpdate(
      new ChangeApplicationMutation({
        id: this.props.application.id,
        name: this.state.name,
        indexIos: this.state.code
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
                <DropdownButton className={styles.roundIcon} title={<i className="fa fa-bars"></i>} noCaret id="dropdown-no-caret">
                  <MenuItem eventKey="1">LOGIN</MenuItem>
                  <MenuItem eventKey="2">REGISTER</MenuItem>
                </DropdownButton>
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
          <Appetize id="mzv0wej631g9mxc881x2wmnpvc" options={{device: this.state.device}} />
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
        indexIos,
        indexAndroid
      }
    `,
  },
});
