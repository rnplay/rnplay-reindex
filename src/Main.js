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
import Config from './config';
import Auth0Lock from 'auth0-lock';



class Main extends Component {

  constructor(props){
    super(props);
    this.state = {
      code: null,
      name: null,
      loggedIn: false
    };
  }
  componentDidMount() {
    this.lock = new Auth0Lock(Config.AUTH0_CLIENT_ID, Config.AUTH0_DOMAIN);
    this.setState({code: this.props.application.indexIos, name: this.props.application.name});
    this.simulator = new Appetize();
    this.lock.on('authenticated',function(authResult){
      localStorage.setItem("idToken", authResult.idToken);
      this.setState({loggedIn:true});
    }.bind(this));
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
  getIdToken(){
    var idToken = localStorage.getItem("id_token");
    var authHash = this.lock.parseHash(window.location.hash);
    if(!idToken && authHash){
      if(authHash.id_token){
        idToken = authHash.id_token;
        localStorage.setItem("id_token",authHash.id_token);
        this.setState({loggedIn:true});
      }
      if(authHash.error){
        console.log(authHash);
      }
    }
    return idToken;
  }
  updateCode = (code) => {
    this.setState({code: code});
  }
  handleAuth = (e) =>{
    if(!this.state.loggedIn){
      this.lock.show();
    }
    else{
      this.setState({loggedIn:false});
      localStorage.removeItem("idToken");
    }
  }
  render() {
    return (
      <div className={styles.container}>
        <div className={classNames(styles.column, styles.columnLeft)}>
          <div className={styles.editor}>
            <div className={styles.header}>
              <div className={styles.menu}>
                <DropdownButton className={styles.roundIcon} title={<i className="fa fa-bars"></i>} noCaret id="dropdown-no-caret">
                  <MenuItem eventKey="1" onClick={this.handleAuth.bind(this)}>{(this.state.loggedIn === true) ? "Logout" : "Login"}</MenuItem>
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
