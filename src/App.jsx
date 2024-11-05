import {BrowserRouter, Routes,Route}from 'react-router-dom'
import HomePage from "./pages/HomePage"
import ListingDetailsPage from './pages/ListingDetailsPage'
import BookingPage from './pages/BookingPage'

function App () {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/listings/:id' element={<ListingDetailsPage/>}/>
        <Route path='/book/:id' element={<BookingPage/>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
