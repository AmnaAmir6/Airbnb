import {BrowserRouter, Routes,Route , Navigate}from 'react-router-dom'
import HomePage from "./pages/HomePage"
import ListingDetailsPage from './pages/ListingDetailsPage'
import BookingPage from './pages/BookingPage'
import { useAuthStore } from './store/AuthStore'
import LoginPage from './pages/Login'
import SignUpPage from './pages/SignUp'

function App () {

  const {user}= useAuthStore();
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={
          user ? <HomePage/> : <Navigate to='/login' />}
        />
        <Route path='/login' element={
          user ? <Navigate to='/' /> : <LoginPage/>}
        />
        <Route path='/signup' element={<SignUpPage/>}/>
        <Route path='/listings/:id' element={<ListingDetailsPage/>}/>
        <Route path='/book/:id' element={<BookingPage/>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
