import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
// import logger from 'redux-logger';
import MainSaga from './sagas';
import rootReducer from './reducers/rootReducer';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware]; // logger];

const store = createStore(rootReducer, {}, composeWithDevTools(applyMiddleware(...middlewares)));
sagaMiddleware.run(MainSaga);

export default store;
