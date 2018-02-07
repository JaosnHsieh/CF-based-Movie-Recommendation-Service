import axios from 'axios';

const initialState = {
  ratingList: [],
  recommendList: [],
  error: null,
  isLoading: false,
  pageData: {}
}

const actionTypes = {
  FETCH_LIST_FAIL: 'FETCH_LIST_FAIL',
  FETCH_TOP_LIST_REQUEST: 'FETCH_TOP_LIST_REQUEST',
  FETCH_TOP_LIST_SUCCESS: 'FETCH_TOP_LIST_SUCCESS',
  FETCH_RATING_AND_RECOMMEND_LIST_REQUEST: 'FETCH_RATING_AND_RECOMMEND_LIST_REQUEST',
  FETCH_RATING_AND_RECOMMEND_LIST_SUCCESS: 'FETCH_RATING_AND_RECOMMEND_LIST_SUCCESS',
}

export const onFetchTopList = (host) => async dispatch => {
  try {
    dispatch({ type: actionTypes.FETCH_TOP_LIST_REQUEST });
    const res = await axios.get(`http://${host}/api/movie/top`);
    return dispatch({ type: actionTypes.FETCH_TOP_LIST_SUCCESS, payload: res.data });
  } catch (response) {
    dispatch({ type: actionTypes.FETCH_LIST_FAIL });
    throw(response.data)
  }
}

export const onFetchRatingAndRecommendList = (host, cookie) => async dispatch => {
  try {
    dispatch({ type: actionTypes.FETCH_RATING_AND_RECOMMEND_LIST_REQUEST });
    const opts = {
      headers: {
         Cookie: cookie,
      }
    }
    const result = await Promise.all([
      axios.get(`http://${host}/api/movie/rating`, opts),
      axios.get(`http://${host}/api/movie/recommend`, opts),
    ]);
    return dispatch({ type: actionTypes.FETCH_RATING_AND_RECOMMEND_LIST_SUCCESS, payload: result });
  } catch (response) {
    dispatch({ type: actionTypes.FETCH_LIST_FAIL });
    throw(response.data)
  }
}

export const onRating = (movieId, rating) => async dispatch => {
  try {
    await axios.post(`/api/movie/rating`, {
      MovieId: movieId,
      rating
    });
  } catch (response) {
    throw(response.data)
  }
}

export const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_TOP_LIST_REQUEST:
      return {
        ...state,
        isLoading: true,
      }
    case actionTypes.FETCH_TOP_LIST_SUCCESS:
      return {
        ...state,
        recommendList: action.payload.data,
        pageData: action.payload.pageData,
        isLoading: false,
      }
    case actionTypes.FETCH_RATING_AND_RECOMMEND_LIST_SUCCESS:
      const ratingData = action.payload[0].data;
      const recommendData = action.payload[1].data;
      return {
        ...state,
        ratingList: ratingData.data,
        recommendList: recommendData.data,
        isLoading: false,
      }
    case actionTypes.FETCH_RATING_AND_RECOMMEND_LIST_REQUEST:
      return {
        ...state,
        isLoading: true,
      }
    case actionTypes.FETCH_LIST_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    default: return state
  }
}
