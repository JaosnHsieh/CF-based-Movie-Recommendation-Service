import React, { Component } from 'react'
import { toastr } from 'react-redux-toastr'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Button, Form, Modal, Header } from 'semantic-ui-react'
import renderInput from '../../components/form/renderInput'
import { onSignup }  from '../../modules/auth'

export class MeComponent extends Component {

  constructor (props, context) {
    super(props, context)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  async handleFormSubmit (formProps) {
    try {
      const response = await this.props.onSignup(formProps)
      toastr.success('更新成功！');
    } catch (e) {
      toastr.error(e.msg);
    }
  }

  render () {
    const { isLoading } = this.props.auth;
    return (
      <div>
        <Header textAlign='center' as='h1'>會員資料</Header>
        <Form onSubmit={this.props.handleSubmit(this.handleFormSubmit)}>
          <Form.Field>
            <Field component={renderInput} type='text' required disabled name='account' />
          </Form.Field>
          <Form.Field>
            <Field component={renderInput} type='text' required label='暱稱（可中文、英文、數字）' name='nickname' />
          </Form.Field>
          <Form.Field>
            <Field component={renderInput} type='date' label='生日' name='birthday' />
          </Form.Field>
          <Button type='submit' fluid primary loading={isLoading}>送出</Button>
        </Form>
      </div>
    )
  }
}

const validate = (formProps) => {
  let errors = {}
  const requiredFields = ['nickname']

  requiredFields.forEach(field => {
    if (!formProps[field]) {
      errors[field] = 'Required'
    }
  })

  if (formProps.password != formProps.confirmPassword) {
    errors.confirmPassword = '需與密碼相同'
  }

  return errors
}

const MeForm = reduxForm({
  form: 'me',
  destroyOnUnmount: false,
  validate,
})(MeComponent)

const mapStateToProps = state => ({
  auth: state.auth,
  me: state.form.me,
  initialValues: state.auth.member
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({switchType, onSignup}, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(MeForm)
