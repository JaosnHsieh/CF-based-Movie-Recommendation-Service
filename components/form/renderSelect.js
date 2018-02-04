import React from 'react'
import { Label, Select } from 'semantic-ui-react'

export const renderSelect = ({ input, label, options, type, meta, required }) => {
  const { pristine, touched, error, invalid } = meta;
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

export default renderSelect
