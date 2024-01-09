import axios from 'axios'
import {

  COMPANY_LIST_SUCCESS,
  COMPANY_LIST_FAIL,
  COMPANY_LIST_RESET
} from '../constants/companyConstant'

import { logout } from './userActions'


export const addCompnayAction = (payload) => async (dispatch, getState) => {
  try {
    dispatch({
      type: COMPANY_LIST_SUCCESS,
      payload: payload,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: COMPANY_LIST_FAIL,
      payload: message,
    })
  }
}
