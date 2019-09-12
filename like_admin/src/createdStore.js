import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
// import mySaga from './sagas';
import logger from 'redux-logger';
import rootReducer from './reducers/rootReducer';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware, logger];

const store = createStore(rootReducer, {}, composeWithDevTools(applyMiddleware(...middlewares)));
// sagaMiddleware.run(mySaga);

export default store;
