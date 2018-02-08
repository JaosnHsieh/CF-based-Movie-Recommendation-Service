import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { toastr } from 'react-redux-toastr'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Button, Form, Header, Segment } from 'semantic-ui-react'
import renderInput from '../../components/form/renderInput'
import { onLogin } from '../../modules/auth'

export class LoginComponent extends Component {
  constructor (props, context) {
    super(props, context)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  async handleFormSubmit (formProps) {
    try {
      await this.props.onLogin({
        provider: this.props.auth.type,
        ...formProps
      })
      window.location = '/'
    } catch (e) {
      toastr.error(e.message)
    }
  }

  render () {
    const { isLoading } = this.props.auth
    return (
      <div>
        <Segment stacked>
          <Header textAlign='center' as='h1'>登入會員</Header>
          <Form onSubmit={this.props.handleSubmit(this.handleFormSubmit)}>
            <Form.Field>
              <Field component={renderInput} type='email' required label='信箱' name='email' />
            </Form.Field>
            <Form.Field>
              <Field component={renderInput} type='password' required label='密碼' name='password' />
            </Form.Field>
            <Button type='submit' fluid primary loading={isLoading}>登入</Button>
          </Form>
        </Segment>
        <Segment textAlign='center'>
          沒辦法登入嗎？  <a href='/auth/signup'>註冊</a>  |  <a href='/auth/forgotPw'>忘記密碼</a>
        </Segment>
      </div>
    )
  }
}

const validate = (formProps) => {
  let errors = {}
  const requiredFields = ['email', 'password']

  requiredFields.forEach(field => {
    if (!formProps[field]) {
      errors[field] = 'Required'
    }
  })

  return errors
}

const LoginForm = reduxForm({
  form: 'login',
  destroyOnUnmount: false,
  validate
})(LoginComponent)

const mapStateToProps = state => ({
  auth: state.auth,
  login: state.form.login
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({onLogin}, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
