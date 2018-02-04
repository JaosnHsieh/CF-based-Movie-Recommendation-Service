import React, { Component } from 'react'
import { initStore } from '../../modules/store'
import withRedux from 'next-redux-wrapper'
import standardLayout from '../../hocs/standardLayout'
import ForgotPwForm from '../../containers/auth/ForgotPwForm'

const pageTitle = '忘記密碼 | Movie-Recommendation'

export class ForgotPwPage extends Component {
  render () {
    return (<ForgotPwForm />)
  }
}

export default withRedux(initStore)(standardLayout(ForgotPwPage, pageTitle))
