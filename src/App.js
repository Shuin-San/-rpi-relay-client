import React, { useState } from 'react'
import ClientComponent from './client/ioClient'
import { Container, Grid } from '@material-ui/core'

function App() {
  return (
    <Container
      maxWidth='lg'
      style={{
        minHeight: '100vh',
        backgroundColor: '#8d99ae',
        fontFamily: 'Roboto',
      }}
    >
      <div style={{ paddingTop: 10 }}>
        <h1>Raspberry Pi Garden waterer</h1>
      </div>
      <ClientComponent />
    </Container>
  )
}

export default App
