import React, { Component } from 'react'
import { initStore } from '../../modules/store'
import withRedux from 'next-redux-wrapper'
import standardLayout from '../../hocs/standardLayout'
import LoginForm from '../../containers/auth/LoginForm'

const pageTitle = 'Movie-Recommendation'

export class LoginPage extends Component {
  render () {
    return (<LoginForm />)
  }
}

export default withRedux(initStore)(standardLayout(LoginPage, pageTitle))
