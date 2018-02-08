import React, { Component } from 'react'
import { connect } from 'react-redux'
import { toastr } from 'react-redux-toastr'
import { bindActionCreators } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Button, Form, Header, Segment } from 'semantic-ui-react'
import renderInput from '../../components/form/renderInput'
import { onForgotPw, onResetPw } from '../../modules/auth'

export class ForgotPwComponent extends Component {
  constructor (props, context) {
    super(props, context)
    this.getVerifyCode = this.getVerifyCode.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  async handleFormSubmit (formProps) {
    try {
      await this.props.onResetPw(formProps)
      toastr.success('密碼更新成功，請用新密碼登入！')
    } catch (e) {
      toastr.error(e.message)
    }
  }

  async getVerifyCode () {
    try {
      await this.props.onForgotPw({
        provider: this.props.auth.type,
        ...this.props.forgotPw.values
      })
    } catch (e) {
      toastr.error(e.message)
    }
  }

  render () {
    const { verifyCodeTimer, isLoading } = this.props.auth
    const showVerifyCodeTimer = verifyCodeTimer > 0

    const { values: formValues } = this.props.forgotPw || {}
    let activeVerifyButton = false
    if (formValues) {
      activeVerifyButton = formValues.email
    }
    return (
      <div>
        <Segment stacked>
          <Header textAlign='center' as='h1'>忘記密碼</Header>
          <Form onSubmit={this.props.handleSubmit(this.handleFormSubmit)}>
            <Form.Field>
              <Field component={renderInput} type='email' required label='信箱' name='email' />
            </Form.Field>
            <Form.Group widths='equal'>
              <Form.Field width={10}>
                <Field component={renderInput} type='text' required label='驗證碼' name='verifyCode' />
              </Form.Field>
              <Form.Field width={3}>
                <Button type='button' content='取得驗證碼' fluid
                  color='yellow'
                  disabled={!activeVerifyButton}
                  loading={showVerifyCodeTimer}
                  onClick={this.getVerifyCode} />
                {showVerifyCodeTimer && <span>還有 {verifyCodeTimer} 秒 ...</span>}
              </Form.Field>
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Field>
                <Field component={renderInput} type='password' required label='新密碼' name='password' />
              </Form.Field>
              <Form.Field>
                <Field component={renderInput} type='password' required label='確認新密碼' name='confirmPassword' />
              </Form.Field>
            </Form.Group>
            <Button type='submit' fluid primary loading={isLoading}>送出</Button>
          </Form>
        </Segment>
        <Segment textAlign='center'>
          想起密碼了 ?  <a href='/auth/login'>登入</a>
        </Segment>
      </div>
    )
  }
}

const validate = (formProps) => {
  let errors = {}
  const requiredFields = ['email', 'password', 'confirmPassword', 'verifyCode', 'nickname']

  requiredFields.forEach(field => {
    if (!formProps[field]) {
      errors[field] = 'Required'
    }
  })

  if (formProps.password !== formProps.confirmPassword) {
    errors.confirmPassword = '需與密碼相同'
  }

  return errors
}

const ForgotPwForm = reduxForm({
  form: 'forgotPw',
  validate
})(ForgotPwComponent)

const mapStateToProps = state => ({
  auth: state.auth,
  destroyOnUnmount: false,
  forgotPw: state.form.forgotPw
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({onForgotPw, onResetPw}, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(ForgotPwForm)
