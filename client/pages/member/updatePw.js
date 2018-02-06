import React, { Component } from 'react'
import { initStore } from '../../modules/store'
import withRedux from 'next-redux-wrapper'
import standardLayout from '../../hocs/standardLayout'
import UpdatePwForm from '../../containers/member/UpdatePwForm'

const pageTitle = 'Movie-Recommendation | 修改密碼'

export class UpdatePwPage extends Component {
  render () {
    return (<UpdatePwForm />)
  }
}

export default withRedux(initStore)(standardLayout(UpdatePwPage, pageTitle))
