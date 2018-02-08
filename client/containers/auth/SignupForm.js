import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { toastr } from 'react-redux-toastr'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Button, Form, Header, Segment } from 'semantic-ui-react'
import renderInput from '../../components/form/renderInput'
import { getVerifyCode, onSignup } from '../../modules/auth'

export class SignupComponent extends Component {
  constructor (props, context) {
    super(props, context)
    this.getVerifyCode = this.getVerifyCode.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  async handleFormSubmit (formProps) {
    try {
      await this.props.onSignup({
        provider: this.props.auth.type,
        ...formProps
      })
      toastr.success('註冊完成！')
      window.location = `/auth/login${window.location.search}`
    } catch (e) {
      toastr.error(e.message)
    }
  }

  async getVerifyCode () {
    try {
      const response = await this.props.getVerifyCode({
        provider: this.props.auth.type,
        ...this.props.signup.values
      })
    } catch (e) {
      toastr.error(e.message)
    }
  }

  render () {
    const { type, verifyCodeTimer, isLoading } = this.props.auth
    const showVerifyCodeTimer = verifyCodeTimer > 0

    const { values: formValues } = this.props.signup || {}
    let activeVerifyButton = false
    if (formValues) {
      activeVerifyButton = formValues.email
    }

    return (
      <div>
        <Segment stacked>
          <Header textAlign='center' as='h1'>註冊會員</Header>
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
                <Field component={renderInput} type='password' required label='密碼' name='password' />
              </Form.Field>
              <Form.Field>
                <Field component={renderInput} type='password' required label='確認密碼' name='confirmPassword' />
              </Form.Field>
            </Form.Group>
            <Form.Field>
              <Field component={renderInput} type='text' required label='暱稱（可中文、英文、數字）' name='nickname' />
            </Form.Field>
            <Form.Field>
              <label style={{float: 'right'}}>註冊即代表同意使用者條款</label>
            </Form.Field>
            <Button type='submit' fluid primary loading={isLoading}>註冊</Button>
          </Form>
        </Segment>
        <Segment textAlign='center'>
          已經擁有會員 ?  <a href='/auth/login'>登入</a>
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

const SignupForm = reduxForm({
  form: 'signup',
  destroyOnUnmount: false,
  validate
})(SignupComponent)

const mapStateToProps = state => ({
  auth: state.auth,
  signup: state.form.signup
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({getVerifyCode, onSignup}, dispatch)
}

SignupForm.propTypes = {
  auth: PropTypes.object,
  signup: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm)
