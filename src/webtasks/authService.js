import Auth0Lock from 'auth0-lock'
import Reindex from '../Reindex';
import {store} from '../index';
import * as authActions from '../actions/authentication';
export default class AuthService {
  constructor(clientId, domain, options) {
    this.lock = new Auth0Lock(clientId, domain, options)
    this.lock.on('authenticated', this._doAuthentication.bind(this))
    this.login = this.login.bind(this)
  }

  _doAuthentication(authResult){
    Reindex.loginWithToken('auth0',authResult.idToken)
    .then(data=>{
      console.log(data);
      store.dispatch(authActions.checkLogin(true));
    })
    .catch((err)=>{
      console.log(err);
    });

  }

  login() {
    this.lock.show({});
  }
}