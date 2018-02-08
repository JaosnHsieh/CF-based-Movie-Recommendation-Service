import React from 'react'
import PropTypes from 'prop-types'
import { Select } from 'semantic-ui-react'

export const renderSelect = ({ input, label, options, type, meta, required }) => {
  const { invalid } = meta
  return (
    <Select
      {...input}
      error={invalid}
      options={options}
      onChange={(e, data) => input.onChange(data.value)}
      placeholder={label}
      required={required} />
  )
}

renderSelect.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  options: PropTypes.object,
  type: PropTypes.string,
  meta: PropTypes.object,
  required: PropTypes.bool
}

export default renderSelect
