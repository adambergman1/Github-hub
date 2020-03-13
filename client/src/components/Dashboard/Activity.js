import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, Tooltip } from 'recharts'
import { Paper, List, ListSubheader, ListItem, ListItemText } from '@material-ui/core'

const Activity = ({ data }) => {
  return (
    data &&
    data.length > 1 && (
      <div className='activity-feed'>
        <Paper>
          <List
            subheader={
              <ListSubheader style={{ background: '#eee' }}>
                {' '}
                Activity feed
              </ListSubheader>
            }
          >
            <ListItem>
              <ListItemText primary='Showing the 100 latest activities' />
            </ListItem>
            <ListItem>
              <BarChart
                width={650}
                height={300}
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5
                }}
              >
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='name' />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey='Amount' fill='#8884d8' />
              </BarChart>
            </ListItem>
          </List>
        </Paper>
      </div>
    )
  )
}

export default Activity
