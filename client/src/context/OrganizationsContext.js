import React, { useState, createContext } from 'react'

export const OrganizationsContext = createContext()

const OrganizationsContextProvider = props => {
  const [selectedOrg, updateSelectedOrg] = useState('')

  return (
    <OrganizationsContext.Provider value={{ selectedOrg: '', updateSelectedOrg: '' }}>
      {props.children}
    </OrganizationsContext.Provider>
  )
}

export default OrganizationsContextProvider
