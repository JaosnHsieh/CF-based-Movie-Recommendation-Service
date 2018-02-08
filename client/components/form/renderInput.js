import React from 'react'
import PropTypes from 'prop-types'
import { Form, Label } from 'semantic-ui-react'

export const rednerInput = ({ input, label, type, meta, required, disabled }) => {
  const { error, invalid } = meta
  return (
    <div>
      <Form.Input
        {...input}
        disabled={disabled}
        required={required}
        error={invalid}
        placeholder={label}
        type={type} />
      {invalid && error !== 'Required' && <Label basic color='red' pointing>{error}</Label>}
    </div>
  )
}

rednerInput.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  type: PropTypes.string,
  meta: PropTypes.object,
  required: PropTypes.bool,
  disabled: PropTypes.bool
}

export default rednerInput
