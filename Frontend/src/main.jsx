import { StrictMode } from 'react'
import ReactDom from 'react-dom/client'
import React from 'react'

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,

} from "react-router-dom";

import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AppLayout from './views/AppLayout.jsx'
import About from './views/About.jsx'
import Contact from './views/Contact.jsx'
import Dashboard from './views/Dashboard.jsx'
import Home from './views/Home.jsx'
import Login from './views/Login.jsx'
import Signup from './views/Signup.jsx'
import NotFound from './views/NotFound.jsx'
import Aup from './Components/Aup.jsx';
import QuestionPage from './Components/QuestionPage';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AppLayout />}>
      <Route index element={<Home />} />
      <Route path="login" element={<Login />}/>
      <Route path="signup" element={<Signup />}/>
      <Route path="dashboard" element={<Dashboard />}/>
      <Route path="about" element={<About />}/>
      <Route path="contact" element={<Contact />}/>
      <Route path="*" element={<NotFound />}/>
      <Route path="aup" element={<Aup />}/>
      <Route path="/questionnaire" element={< QuestionPage />} />

    </Route>
  )
);

ReactDom.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
