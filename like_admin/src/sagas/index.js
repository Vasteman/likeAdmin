import { all } from 'redux-saga/effects';

import typesOfLikes from './typesOfLikes/typesOfLikesPanelSaga';

function* MainSaga() {
  yield all([typesOfLikes()]);
}

export default MainSaga;
