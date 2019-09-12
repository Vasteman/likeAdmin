import { all } from 'redux-saga/effects';

import typesOfLikes from './typesOfLikes/typesOfLikesPanel';

function* MainSaga() {
  yield all([typesOfLikes()]);
}

export default MainSaga;
