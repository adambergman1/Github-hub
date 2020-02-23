import React, { useState, useEffect } from 'react'
import { InputLabel, MenuItem, FormControl, Select, Grid, Typography } from '@material-ui/core'

const OrgSelector = (props) => {
  const [selected, updateSelected] = useState('')

  useEffect(() => {
    handleUpdate(props.orgs[0].login)
  }, [])

  const handleUpdate = (value) => {
    updateSelected(value)
    props.handleChange(value)
  }

  return (
    <FormControl style={{ minWidth: '150px' }}>
      <InputLabel id='select-organization-label'>Organization</InputLabel>
      <Select
        labelId='select-organization-label'
        value={selected}
        id='select-org-dropdown'
        onChange={(e) => handleUpdate(e.target.value)}
      >
        {props.orgs && props.orgs.map(org => (
          <MenuItem key={org.login} value={org.login}>{org.login}</MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default OrgSelector
