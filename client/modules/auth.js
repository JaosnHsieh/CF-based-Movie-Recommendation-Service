import axios from 'axios'

const initialState = {
  member: {},
  error: null,
  isLoading: false,
  verifyCodeTimer: 0
}

const actionTypes = {
  FORM_SUBMIT_REQUEST: 'FORM_SUBMIT_REQUEST',
  FORM_SUBMIT_SUCCESS: 'FORM_SUBMIT_SUCCESS',
  FORM_SUBMIT_FAIL: 'FORM_SUBMIT_FAIL',
  INIT_MEMBER_DATA: 'INIT_MEMBER_DATA',
  START_TIMER: 'START_TIMER',
  STOP_TIMER: 'STOP_TIMER',
  TICK: 'TICK'
}

export const getVerifyCode = (formProps) => async dispatch => {
  try {
    await axios.post('/api/auth/verifyCode', formProps)
    dispatch({ type: actionTypes.START_TIMER })
    return setInterval(() => dispatch({ type: actionTypes.TICK }), 1000)
  } catch ({ response }) {
    dispatch({ type: actionTypes.STOP_TIMER })
    throw (response.data)
  }
}

export const onForgotPw = (formProps) => async dispatch => {
  try {
    dispatch({ type: actionTypes.START_TIMER })
    await axios.post('/api/auth/forgotpw', formProps)
    return setInterval(() => dispatch({ type: actionTypes.TICK }), 1000)
  } catch ({ response }) {
    dispatch({ type: actionTypes.STOP_TIMER })
    throw (response.data)
  }
}

export const onLogin = (formProps) => async dispatch => {
  try {
    dispatch({ type: actionTypes.FORM_SUBMIT_REQUEST })
    const res = await axios.post(`/api/auth/login${window.location.search}`, formProps)
    dispatch({ type: actionTypes.FORM_SUBMIT_SUCCESS, payload: res.data })
  } catch ({ response }) {
    dispatch({ type: actionTypes.FORM_SUBMIT_FAIL })
    throw (response.data)
  }
}

export const onResetPw = (formProps) => async dispatch => {
  try {
    dispatch({ type: actionTypes.FORM_SUBMIT_REQUEST })
    const res = await axios.patch('/api/auth/resetpw', formProps)
    dispatch({ type: actionTypes.FORM_SUBMIT_SUCCESS, payload: res.data })
  } catch ({ response }) {
    dispatch({ type: actionTypes.FORM_SUBMIT_FAIL })
    throw (response.data)
  }
}

export const onSignup = (formProps) => async dispatch => {
  try {
    dispatch({ type: actionTypes.FORM_SUBMIT_REQUEST })
    const res = await axios.post(`/api/auth/signup${window.location.search}`, formProps)
    dispatch({ type: actionTypes.FORM_SUBMIT_SUCCESS, payload: res.data })
  } catch ({ response }) {
    dispatch({ type: actionTypes.FORM_SUBMIT_FAIL })
    throw (response.data)
  }
}

export const onUpdatePw = (formProps) => async dispatch => {
  try {
    dispatch({ type: actionTypes.FORM_SUBMIT_REQUEST })
    const res = await axios.patch('/api/member/updatepw', formProps)
    dispatch({ type: actionTypes.FORM_SUBMIT_SUCCESS, payload: res.data })
  } catch ({ response }) {
    dispatch({ type: actionTypes.FORM_SUBMIT_FAIL })
    throw (response.data)
  }
}

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INIT_MEMBER_DATA:
      return {
        ...state,
        member: action.payload
      }
    case actionTypes.FORM_SUBMIT_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case actionTypes.FORM_SUBMIT_SUCCESS:
      return {
        ...state,
        isLoading: false
      }
    case actionTypes.FORM_SUBMIT_FAIL:
      return {
        ...state,
        isLoading: false
      }
    case actionTypes.START_TIMER:
      return {
        ...state,
        verifyCodeTimer: 60
      }
    case actionTypes.STOP_TIMER:
      return {
        ...state,
        verifyCodeTimer: 0
      }
    case actionTypes.TICK:
      return {
        ...state,
        verifyCodeTimer: state.verifyCodeTimer - 1
      }
    default: return state
  }
}
