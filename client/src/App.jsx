import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import {GuestLayout, AuthLayout} from './pages/Layout'
import Authpage from './pages/AuthPage'
import Homepage from './pages/Homepage'
import BuilderPage from './pages/BuilderPage'
import PreviewPage from './pages/PreviewPage'

const App = () => {
  return (
    <Routes>
      {/* Login Routes */}
      <Route element={<GuestLayout/>}>
        <Route path='/login' element={<Authpage mode="login"/>}/>
        <Route path='/register' element={<Authpage mode="register"/>}/>
      </Route>

      {/* Protected Routes */}
      <Route element={<AuthLayout/>}>
        <Route path='/' element={<Homepage />}/>
        <Route path='/builder/:id' element={<BuilderPage />}/>
        <Route path='/preview/:id' element={<PreviewPage />}/>
      </Route>


{/*Catch-all */}
<Route path='*' element={<Navigate to="/" replace />} />

    </Routes>
  )
}

export default App