import './index.scss'
import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import store from './store'
import Routes from './routes'

// establishes socket connection
import './socket'

// import '../public/assets/css/bootstrap.min.css';
// import '../public/assets/css/animate.min.css';
// import '../public/assets/sass/light-bootstrap-dashboard.css';
// import '../public/assets/css/demo.css';
// import '../public/assets/css/pe-icon-7-stroke.css';

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('app')
)
