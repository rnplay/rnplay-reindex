import * as authActions from '../actions/authentication';
import Reindex from '../Reindex';
const initialState = {isLoggedIn:Reindex.isLoggedIn()};

export default function(state = initialState, action) {
	console.log(action);
	switch (action.type) {
		case 'CHECK_LOGIN':
			return {...state,isLoggedIn:action.payload};
	}
	return state;
}
