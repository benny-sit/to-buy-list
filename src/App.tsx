import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Container from './Container'
import { ListProvider } from './ListContext'
import Nav from './Nav'

function App() {

  return (
    <BrowserRouter>
    <ListProvider>
    <div className='max-h-screen flex flex-col h-screen font-body'>
      <Nav />
      <Container/>
    </div>
    </ListProvider>
    </BrowserRouter>
  )
}

export default App
