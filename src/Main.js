import React from 'react'
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import App from './App';
import More from './More/More';
import "./index.css"

function Main() {
  return (
    <>
      <BrowserRouter class="links">
      <Link className='link' to="/">Home</Link>
      <Link className='link1' to="/more">More</Link>
        <Routes>
          <Route path="/" element={<App />}/>
           <Route path="/more" element={<More />}/>
          {/*<Route path="/gallery" element={<Gallery />}/> */}
        </Routes>
      </BrowserRouter>
      </>
  )
}

export default Main