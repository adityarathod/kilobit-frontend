import fetch from 'isomorphic-unfetch'


const { API_ROOT } = process.env

export const REQUEST_USER_INFO = 'REQUEST_USER_INFO'
function requestUserInfo(username) {
	return {
		type: REQUEST_USER_INFO,
		username
	}
}

export const RECEIVE_USER_INFO = 'RECEIVE_USER_INFO'
function receiveUserInfo(username, infoJSON) {
	return {
		type: RECEIVE_USER_INFO,
		username,
		info: infoJSON.result
	}
}

export const REJECT_USER_INFO = 'REJECT_USER_INFO'
function rejectUserInfo() {
	return {
		type: REJECT_USER_INFO
	}
}


export const PROCESS_ERROR = 'PROCESS_ERROR'
export const ERROR_TYPES = {
	API_INACCESSIBLE: 'API_INACCESSIBLE',
	NOT_FOUND: 'NOT_FOUND',
	'OTHER_ERROR': 'OTHER_ERROR'
}
export function processError(error) {
	let status
	switch (error) {
		case ERROR_TYPES.NOT_FOUND:
			status = 404
			break
		case ERROR_TYPES.API_INACCESSIBLE:
		case ERROR_TYPES.OTHER_ERROR:
		default:
			status = 500
			break
	}
	return {
		type: PROCESS_ERROR,
		error,
		status
	}
}

export const CLEAR_ERROR = 'CLEAR_ERROR'
export function clearError() { 
	return {
		type: CLEAR_ERROR
	}
}

export function getUserInfo(username) {
	return dispatch => {
		dispatch(requestUserInfo(username))
		const payload = {
			method: 'POST',
			cache: 'no-cache',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ username })
		}
		return fetch(`${API_ROOT}/user/info`, payload)
			.then(response => response.json(), err => {
				// this is a fetch error
				dispatch(processError(ERROR_TYPES.API_INACCESSIBLE))
				return Promise.reject(err)
			})
			.then(json => {
				switch (json.status) {
					case 200:
						dispatch(receiveUserInfo(username, json))
						return
					case 404:
						dispatch(processError(ERROR_TYPES.NOT_FOUND))
						break
					case 400:
					case 500:
					default:
						dispatch(processError(ERROR_TYPES.OTHER_ERROR))

				}
				return Promise.reject(null)
			})
			.catch(() => dispatch(rejectUserInfo()))
	}
}