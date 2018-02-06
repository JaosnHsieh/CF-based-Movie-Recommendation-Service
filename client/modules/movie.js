import axios from 'axios';

const initialState = {
  list: [],
  error: null,
  isLoading: false,
  pageData: {}
}

const actionTypes = {
  FETCH_TOP_MOVIE_LIST_REQUEST: 'FETCH_TOP_MOVIE_LIST_REQUEST',
  FETCH_TOP_MOVIE_LIST_SUCCESS: 'FETCH_TOP_MOVIE_LIST_SUCCESS',
  FETCH_TOP_MOVIE_LIST_FAIL: 'FETCH_TOP_MOVIE_LIST_FAIL',
}

export const onFetchTopMovieList = (host) => async dispatch => {
  try {
    dispatch({ type: actionTypes.FETCH_TOP_MOVIE_LIST_REQUEST });
    const res = await axios.get(`http://${host}/api/movie`);
    return dispatch({ type: actionTypes.FETCH_TOP_MOVIE_LIST_SUCCESS, payload: res.data });
  } catch (a) {
    dispatch({ type: actionTypes.FETCH_TOP_MOVIE_LIST_FAIL });
    throw(response.data)
  }
}

export const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_TOP_MOVIE_LIST_REQUEST:
      return {
        ...state,
        isLoading: true,
      }
    case actionTypes.FETCH_TOP_MOVIE_LIST_SUCCESS:
      return {
        ...state,
        list: action.payload.data,
        pageData: action.payload.pageData,
        isLoading: false,
      }
    case actionTypes.FETCH_TOP_MOVIE_LIST_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    default: return state
  }
}
