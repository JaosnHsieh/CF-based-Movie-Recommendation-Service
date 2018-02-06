import React, { Component } from 'react'
import { initStore } from '../modules/store'
import withRedux from 'next-redux-wrapper'
import standardLayout from '../hocs/standardLayout'
import TopMovieList from '../containers/movie/TopList'
import { onFetchTopMovieList }  from '../modules/movie'

const pageTitle = 'Movie-Recommendation'

export class HomePage extends Component {

  static getInitialProps = async ({ store, isServer }) => {
    try {
      await store.dispatch(onFetchTopMovieList())
    } catch (e) {
      console.log(e, '!!');
    }
  }

  render () {
    return (<TopMovieList />)
  }
}


export default withRedux(initStore)(standardLayout(HomePage, pageTitle))
