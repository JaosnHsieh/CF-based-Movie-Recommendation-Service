const initialState = {
  host: '',
  pathname: '',
  sessionMember: {},
  isLogined: false
}

const actionTypes = {
  INIT_SOURCE_REQUEST: 'INIT_SOURCE_REQUEST',
  INIT_SESSION_MEMBER: 'INIT_SESSION_MEMBER'
}

export const sourceRequestReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INIT_SOURCE_REQUEST:
      return {
        ...state,
        host: action.payload.host,
        pathname: action.payload.pathname
      }
    case actionTypes.INIT_SESSION_MEMBER:
      return {
        ...state,
        isLogined: true,
        sessionMember: action.payload
      }
    default: return state
  }
}
