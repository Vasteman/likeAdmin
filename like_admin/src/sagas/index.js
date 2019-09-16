import { all } from 'redux-saga/effects';

import typesOfLikes from './typesOfLikes';
// import authorization from './Authorization';

function* MainSaga() {
  yield all([typesOfLikes()]); // , authorization()
}
export default MainSaga;
