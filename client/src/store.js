import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from './reducers/userReducers'

import {
  createProjectReducer,
  updateProjectReducer,
  projectDeleteReducer,
  projectListReducer,
  projectDetailsReducer,

} from './reducers/projectReducers'

import {
   createFileReducer,
   fileListReducer,
} from './reducers/fileReducer'

import {
  addCompanyReducer,
} from './reducers/companyReducers'

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,

  createProject: createProjectReducer,
  updateProject: updateProjectReducer,
  projectDetails: projectDetailsReducer,
  projectList: projectListReducer,
  projectDelete: projectDeleteReducer,

  createFile: createFileReducer,
  fileList:fileListReducer,


  addCompany:addCompanyReducer,
  


})

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
