import React, { Component } from 'react'
import { initStore } from '../../modules/store'
import withRedux from 'next-redux-wrapper'
import standardLayout from '../../hocs/standardLayout'
import MeForm from '../../containers/member/MeForm'
import axios from 'axios';

const pageTitle = 'Movie-Recommendation | 個人資料'

export class MePage extends Component {
  static getInitialProps = async ({ store, isServer }) => {
    try {
      const user = await axios.get('http://localhost:8000/api/member');
      store.dispatch({ type: 'INIT_MEMBER_DATA', payload: user.data })
    } catch (e) {
      console.log(e, '!!');
    }
  }

  render () {
    return (<MeForm />)
  }
}

export default withRedux(initStore)(standardLayout(MePage, pageTitle))
