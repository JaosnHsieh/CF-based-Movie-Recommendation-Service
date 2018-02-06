import React, { Component } from 'react'
import { initStore } from '../../modules/store'
import withRedux from 'next-redux-wrapper'
import standardLayout from '../../hocs/standardLayout'
import SignupForm from '../../containers/auth/SignupForm'

const pageTitle = '註冊 | Movie-Recommendation'

export class SignupPage extends Component {
  render () {
    return (<SignupForm />)
  }
}

export default withRedux(initStore)(standardLayout(SignupPage, pageTitle))
