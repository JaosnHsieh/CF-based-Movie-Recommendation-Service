import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { toastr } from 'react-redux-toastr'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Button, Form, Header } from 'semantic-ui-react'
import renderInput from '../../components/form/renderInput'
import { onUpdatePw } from '../../modules/auth'

export class UpdatePwComponent extends Component {
  constructor (props, context) {
    super(props, context)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  async handleFormSubmit (formProps) {
    try {
      await this.props.onUpdatePw(formProps)
      toastr.success('密碼更新成功')
    } catch (e) {
      toastr.error(e.message)
    }
  }

  render () {
    const { isLoading } = this.props.auth
    return (
      <div>
        <Header textAlign='center' as='h1'>修改密碼</Header>
        <Form onSubmit={this.props.handleSubmit(this.handleFormSubmit)}>
          <Form.Field>
            <Field component={renderInput} type='password' required label='舊密碼' name='oldPassword' />
          </Form.Field>
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
      </div>
    )
  }
}

const validate = (formProps) => {
  let errors = {}
  const requiredFields = ['oldPassword', 'password', 'confirmPassword']

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

const UpdatePwForm = reduxForm({
  form: 'updatePw',
  validate
})(UpdatePwComponent)

const mapStateToProps = state => ({
  auth: state.auth,
  updatePw: state.form.updatePw
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({onUpdatePw}, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(UpdatePwForm)
