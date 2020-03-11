import React, { useState, useContext, useEffect } from 'react'
import Repository from './Repository'
import { GithubContext } from '../context/GithubContext'

import { List, ListSubheader, ListItem, ListItemText, TablePagination, Paper, IconButton, CircularProgress } from '@material-ui/core'
import FirstPageIcon from '@material-ui/icons/FirstPage'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import LastPageIcon from '@material-ui/icons/LastPage'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'

const Repositories = () => {
  const [isLoading, setLoading] = useState(false)
  const [fullHeight, setFullHeight] = useState(false)

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const { activeOrg, repos } = useContext(GithubContext)

  useEffect(() => {
    if (repos[activeOrg]) {
      setPage(0)
      setLoading(false)
    } else {
      setLoading(true)
    }
  }, [repos, activeOrg])

  const changeHeight = () => {
    setFullHeight(!fullHeight)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  return (
    <div className='repositories'>
      <Paper>
        <List
          className={!fullHeight ? 'small-height' : ''}
          dense
          subheader={
            <ListSubheader className='flex align-center space-between' style={{ background: '#eee' }}>
            Repositories
              {!fullHeight
                ? <ExpandMoreIcon className='toggle-button' onClick={changeHeight} />
                : <ExpandLessIcon className='toggle-button' onClick={changeHeight} />}
            </ListSubheader>
          }
        >
          {isLoading ? (
            <ListItem key='loading'>
              <div className='loading'>
                <CircularProgress />
              </div>
            </ListItem>
          ) : repos[activeOrg] && repos[activeOrg].length ? (
            (rowsPerPage > 0 ? repos[activeOrg].slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : repos[activeOrg])
              .map((repo, i) => (
                <Repository key={i} repo={repo} />
              ))
          ) : (
            <ListItem key='no-repo-items'>
              <ListItemText
                primary='No repositories found'
                secondary='Only repositories with admin permissions are listed here'
              />
            </ListItem>
          )}
        </List>
        <table>
          <tbody>
            <tr>
              <TablePagination
                rowsPerPageOptions={[10, 25, 50, { label: 'All', value: -1 }]}
                count={repos[activeOrg] ? repos[activeOrg].length : 0}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { 'aria-label': 'rows per page' },
                  native: true
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </tr>
          </tbody>
        </table>
      </Paper>
    </div>
  )
}

export default Repositories

function TablePaginationActions (props) {
  const { count, page, rowsPerPage, onChangePage } = props

  const handleFirstPageButtonClick = event => {
    onChangePage(event, 0)
  }

  const handleBackButtonClick = event => {
    onChangePage(event, page - 1)
  }

  const handleNextButtonClick = event => {
    onChangePage(event, page + 1)
  }

  const handleLastPageButtonClick = event => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
  }

  return (
    <>
      <IconButton onClick={handleFirstPageButtonClick} disabled={page === 0} aria-label='first page'>
        <FirstPageIcon />
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label='previous page'>
        <KeyboardArrowLeft />
      </IconButton>
      <IconButton onClick={handleNextButtonClick} disabled={page >= Math.ceil(count / rowsPerPage) - 1} aria-label='next page'>
        <KeyboardArrowRight />
      </IconButton>
      <IconButton onClick={handleLastPageButtonClick} disabled={page >= Math.ceil(count / rowsPerPage) - 1} aria-label='last page'>
        <LastPageIcon />
      </IconButton>
    </>
  )
}
