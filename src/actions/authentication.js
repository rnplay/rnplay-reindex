const PROCESS_AUTH = 'PROCESS_AUTH';

function porcessAuth (payload){
	return {
		type:PROCESS_AUTH,
		...payload
	};
}

export {types, porcessAuth};