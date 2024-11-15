import { useState } from 'react';
import {
  BrowserRouter as Router,
  BrowserRouter,
  HashRouter
} from "react-router-dom";
import Routers from './routes';
import './assets/css/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <div>
       <HashRouter basename={'/'}>
          <Routers  />
        </HashRouter>
    </div>
  )
}

export default App
