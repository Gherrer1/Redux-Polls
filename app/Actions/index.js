import { RECEIVED_DATA, RECEIVED_ERROR } from './actionTypes';

export function receivedDataAction(data) {
	return {
		type: RECEIVED_DATA,
		data,
	};
}

export function receivedErrorAction() {
	return {
		type: RECEIVED_ERROR,
	};
}
