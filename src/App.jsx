import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from './pages/Home'
import ImageUploadForm from './pages/ImageUploadForm'


const App = () => {
  return (
    <BrowserRouter>

    <Routes>
    <Route path='/' element={<Home/>} />
    <Route path='/uppp' element={<ImageUploadForm/>} />

    </Routes>
    
    </BrowserRouter>
  )
}

export default App