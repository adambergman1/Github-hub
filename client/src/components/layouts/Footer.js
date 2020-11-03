import React from 'react'
import { Container, Grid, Link, Typography } from '@material-ui/core'

const Footer = () => {
  return (
    <footer className='footer'>
      <Container>
        <Grid>
          <Grid item xs={12}>
            <Typography variant='body1'>Made by{' '}
              <Link color='inherit' style={{ borderBottom: '1px solid #999' }} component='a' href='https://github.com/adambergman1' target='_blank'>Adam Bergman</Link>.
            </Typography>
            <Typography variant='caption' style={{ color: '#ddd' }}>
        Developed during the course "<Link color='inherit' href='https://coursepress.gitbook.io/1dv612/' target='_blank'>Web Application Architectures And Frameworks</Link>"
         at Linnaeus University, early spring 2020.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </footer>
  )
}

export default Footer
