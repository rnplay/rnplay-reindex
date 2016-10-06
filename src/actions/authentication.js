
const types={
	CHECK_LOGIN : 'CHECK_LOGIN'
}

function checkLogin (payload){
	return {
		type:types.CHECK_LOGIN,
		payload:payload
	};
}

export {types, checkLogin};