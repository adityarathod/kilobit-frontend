import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware, compose } from 'redux'

import rootReducer from '../reducers'

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose
const store = createStore(
	rootReducer,
	composeEnhancers(
		applyMiddleware(
			thunkMiddleware, // lets us dispatch() functions
		)
	)
)

export default store