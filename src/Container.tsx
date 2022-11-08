import React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { ListProvider } from './ListContext'
import BuyList from './ListComponents/BuyList'
import LogCard from './LogCard'

export default function Container() {
  return (
      <div className='lg:container mx-auto bg-gray-100 flex justify-center overflow-y-auto grow w-full shadow-md'>
        <Routes>
          <Route path='/'  element={<BuyList />}/>
          <Route path='/get-in' element={<LogCard />} />
        </Routes>
      </div>
  )
}
