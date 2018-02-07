import React, { Component } from 'react'
import { initStore } from '../modules/store'
import withRedux from 'next-redux-wrapper'
import standardLayout from '../hocs/standardLayout'
import HomeList from '../containers/movie/HomeList'
import { onFetchTopList, onFetchRatingAndRecommendList }  from '../modules/movie'

const pageTitle = 'Movie-Recommendation'

export class HomePage extends Component {

  static getInitialProps = async ({ store, req }) => {
    try {
      const { headers, session } = req;
      const host = headers.host;
      const cookie = headers.cookie;
      const isLogined = session && session.member;
      if (isLogined) {
        await store.dispatch(onFetchRatingAndRecommendList(host, cookie))
      } else {
        await store.dispatch(onFetchTopList(host))
      }
    } catch (e) {
      console.log(e);
    }
  }

  render () {
    return (<HomeList />)
  }
}


export default withRedux(initStore)(standardLayout(HomePage, pageTitle))
