import React, { useEffect, useContext } from 'react'
import { InputLabel, MenuItem, FormControl, Select } from '@material-ui/core'
import { GithubContext } from '../context/GithubContext'

const OrgSelector = ({ orgs }) => {
  const { activeOrg, setActiveOrg } = useContext(GithubContext)

  useEffect(() => {
    if (!activeOrg) {
      setActiveOrg(orgs[0])
    }
  }, [orgs])

  return (
    <FormControl style={{ minWidth: '150px' }}>
      <InputLabel id='select-organization-label'>Organization</InputLabel>
      <Select
        labelId='select-organization-label'
        value={activeOrg || ''}
        id='select-org-dropdown'
        onChange={(e) => setActiveOrg(e.target.value)}
      >
        {orgs && orgs.map(org => (
          <MenuItem key={org} value={org}>{org}</MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default OrgSelector
