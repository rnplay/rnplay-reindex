import React, {Component} from 'react';
import styles from './styles/main.css';
import Codemirror from 'react-codemirror';
import 'codemirror/mode/jsx/jsx';
import 'codemirror/lib/codemirror.css';
import Appetize from './Appetize';
import Select from 'react-select';
import {DEVICES} from './devices';
import 'react-select/scss/default.scss';
import Relay from 'react-relay';
import ChangeApplicationMutation from './mutations/ChangeApplicationMutation';

class Main extends Component {

  state = {
    code: null,
    device: 'iphone6',
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

  switchToDevice = (option) => {
    this.setState({device: option.value});
  }

  updateCode = (code) => {
    this.setState({code: code});
  }

  render() {
    console.log(this.props.application)
    return (
      <div className={styles.container}>
        <div className={styles.editor}>
          <div className={styles.header}>
            <div className={styles.menu}>
              ^
            </div>
            <div className={styles.headerContent}>
              <form onSubmit={this.updateApp} className={styles.form}>
                <input className={styles.title} type="text" defaultValue={this.props.application.name} onChange={(e) => this.setState({name: e.target.value})} />
              </form>
              <div className={styles.controls}>
                <button onClick={this.updateApp} className={styles.button}>Save</button>
                <Select
                  className={styles.device}
                  name="device"
                  clearable={false}
                  value={this.state.device}
                  options={DEVICES.ios}
                  onChange={this.switchToDevice}
                />
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

        <div className={styles.simulator}>
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
