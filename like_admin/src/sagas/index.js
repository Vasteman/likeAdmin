import { all } from 'redux-saga/effects';

import typesOfLikes from './typesOfLikes';
import features from './features';
import releases from './Releases';
// import authorization from './Authorization';

function* MainSaga() {
  yield all([typesOfLikes(), features(), releases()]); // , authorization()
}
export default MainSaga;
