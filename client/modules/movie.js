import axios from 'axios'

const initialState = {
  ratingList: [],
  recommendList: [],
  error: null,
  isLoading: false,
  // pageData: {}
  page: 1
}

const actionTypes = {
  FETCH_RECOMMEND_LIST_SUCCESS: 'FETCH_RECOMMEND_LIST_SUCCESS',
  FETCH_LIST_FAIL: 'FETCH_LIST_FAIL',
  FETCH_TOP_LIST_REQUEST: 'FETCH_TOP_LIST_REQUEST',
  FETCH_TOP_LIST_SUCCESS: 'FETCH_TOP_LIST_SUCCESS',
  FETCH_RATING_AND_RECOMMEND_LIST_REQUEST: 'FETCH_RATING_AND_RECOMMEND_LIST_REQUEST',
  FETCH_RATING_AND_RECOMMEND_LIST_SUCCESS: 'FETCH_RATING_AND_RECOMMEND_LIST_SUCCESS',
  RELOAD_DATA: 'RELOAD_DATA'
}

export const onFetchTopList = (host) => async dispatch => {
  try {
    dispatch({ type: actionTypes.FETCH_TOP_LIST_REQUEST })
    const res = await axios.get(`http://${host}/api/movie/top`)
    return dispatch({ type: actionTypes.FETCH_TOP_LIST_SUCCESS, payload: res.data })
  } catch (response) {
    dispatch({ type: actionTypes.FETCH_LIST_FAIL })
    throw (response.data)
  }
}

export const onFetchRatingAndRecommendList = (host, cookie) => async dispatch => {
  try {
    dispatch({ type: actionTypes.FETCH_RATING_AND_RECOMMEND_LIST_REQUEST })
    const opts = {
      headers: {
        Cookie: cookie
      }
    }
    const result = await Promise.all([
      axios.get(`http://${host}/api/movie/rating`, opts),
      axios.get(`http://${host}/api/movie/recommend`, opts)
    ])
    return dispatch({ type: actionTypes.FETCH_RATING_AND_RECOMMEND_LIST_SUCCESS, payload: result })
  } catch (response) {
    dispatch({ type: actionTypes.FETCH_LIST_FAIL })
    throw (response.data)
  }
}

export const onRating = (movieId, rating) => async (dispatch) => {
  try {
    await axios.post(`/api/movie/rating`, {
      MovieId: movieId,
      rating
    })
    dispatch({
      type: actionTypes.RELOAD_DATA,
      payload: { movieId, rating }
    })
  } catch (response) {
    throw (response.data)
  }
}

export const onFetchRecommendList = () => async (dispatch, getStore) => {
  try {
    const res = await axios.get(`/api/movie/recommend?page=${getStore().movie.page + 1}`)
    dispatch({
      type: actionTypes.FETCH_RECOMMEND_LIST_SUCCESS,
      payload: { recommendData: res.data }
    })
  } catch (response) {
    throw (response.data)
  }
}

export const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_TOP_LIST_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case actionTypes.FETCH_TOP_LIST_SUCCESS:
      return {
        ...state,
        recommendList: action.payload.data,
        pageData: action.payload.pageData,
        isLoading: false
      }
    case actionTypes.FETCH_RATING_AND_RECOMMEND_LIST_SUCCESS:
      const ratingData = action.payload[0].data
      const recommendData = action.payload[1].data
      return {
        ...state,
        ratingList: ratingData.data,
        page: 1,
        recommendList: recommendData.data,
        isLoading: false
      }
    case actionTypes.FETCH_RATING_AND_RECOMMEND_LIST_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case actionTypes.FETCH_RECOMMEND_LIST_SUCCESS:
      return {
        ...state,
        isLoading: true,
        page: action.payload.recommendData.page,
        recommendList: [...state.recommendList, ...action.payload.recommendData.data]
      }
    case actionTypes.FETCH_LIST_FAIL:
      return {
        ...state,
        isLoading: false
      }
    case actionTypes.RELOAD_DATA:
      const movieId = action.payload.movieId
      const removedMovie = state.recommendList.find(movie => movie.id === movieId)
      return {
        ...state,
        ratingList: [
          {
            MovieId: movieId,
            rating: action.payload.rating,
            Movie: removedMovie
          },
          ...state.ratingList
        ],
        page: 1,
        recommendList: state.recommendList.filter((movie) => movie.id !== movieId),
        isLoading: false
      }
    default: return state
  }
}
