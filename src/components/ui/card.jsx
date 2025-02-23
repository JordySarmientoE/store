import { Card, CardHeader, Typography } from '@material-tailwind/react'
import React from 'react'

const CardForm = ({ name, children, buttons = [] }) => {
  return (
    <Card>
      <CardHeader variant="gradient" className="mb-4 p-6 bg-gradient-to-r from-blue-500 to-indigo-500 flex justify-between items-center">
        <Typography variant="h6" color="white">
          {name}
        </Typography>
        {buttons.map((button, index) => (
          <React.Fragment key={index}>{button}</React.Fragment>
        ))}
      </CardHeader>
      {children}
    </Card>
  )
}

export default CardForm;
