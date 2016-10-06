import React, {Component} from 'react';
import styles from '../styles/main.css';
import {connect} from 'react-redux';

class Home extends Component {
	static contextTypes = {
    router: React.PropTypes.object,
  };
	handleRoute(){
		if(this.props.isLoggedIn){
			this.context.router.replace('/apps/new')
		}
		else{
			this.props.routes[0].auth.login();
		}
	}
  render() {
    return (
      <div className={styles.home}>
        <h3>React Native Playground</h3>
        <a onClick={this.handleRoute.bind(this)}>Create an app</a>
      </div>
    );
  }
}
const mapStateProps = (state) => {
	const isLoggedIn = state.authentication.isLoggedIn;
	return{
		isLoggedIn
	};
};
export default connect(mapStateProps)(Home);