import React, { useState, useRef, useEffect } from 'react';
import './styles/App.css';
import Posts from './pages/Posts.jsx'
import About from './pages/About.jsx'
import {BrowserRouter, Route, Switch, Routes} from 'react-router-dom'

function App() {


  return (
    <BrowserRouter>
      <div className='navbar'>

      </div>
      <Switch>
        <Route exact path="/about" >
          <About />
        </Route>
        <Route path="/posts" >
          <Posts />
        </Route>
      </Switch>

    </BrowserRouter>


  );
}

export default App;
