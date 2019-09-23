import { all } from 'redux-saga/effects';

import typesOfLikes from './typesOfLikes';
import features from './features';
// import authorization from './Authorization';

function* MainSaga() {
  yield all([typesOfLikes(), features()]); // , authorization(), features()
}
export default MainSaga;
