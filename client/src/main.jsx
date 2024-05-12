// import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import store from './redux/store'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import "./assets/sass/index.scss"
import 'react-toastify/dist/ReactToastify.css'
import { GoogleOAuthProvider } from '@react-oauth/google'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <GoogleOAuthProvider clientId="761296977490-909jqrg02japjfhjeeje3a8e7t7no7rj.apps.googleusercontent.com">
        <App />
      </GoogleOAuthProvider>
    </Provider>
  </BrowserRouter>,
)
