// import '../src-commented/node_modules/semantic-ui-css/semantic.min.css'
// import './App.css'

import React from 'react';
import ReactDOM from 'react-dom';
import rootReducer from './Reducers/rootReducer'
// import PawnsLogo from './Images/pawnsOutline.png'

import { Provider } from 'react-redux'
import { createStore } from 'redux'

import App from './App';
import Nav from './Components/global/nav/index';


const store = createStore(
    rootReducer, 
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

ReactDOM.render(
    <Provider store={ store }>
        <Nav />
        <App />
    </Provider>
    // <body>
    //     <App />
    // </body>
    , 
    document.getElementById('root')
);

