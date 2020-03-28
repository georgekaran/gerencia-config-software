import { put, takeEvery, call  } from 'redux-saga/effects';
import { User } from '../utils/Api/Api';

function* fetchUser(action) {
  try {
     const { data } = yield call(User.findByEmail, action.payload.email);
     yield put({type: "USER_FETCH_SUCCEEDED", user: data});
  } catch (e) {
     yield put({type: "USER_FETCH_FAILED", message: e});
  }
}

function* removeUser() {
  yield put({ type: "SIGNOUT_USER" })
}

function* mySaga() {
  yield takeEvery("SET_AUTH", fetchUser);
  yield takeEvery("REMOVE_AUTH", removeUser);
}

export default mySaga;