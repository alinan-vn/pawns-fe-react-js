import 'semantic-ui-css/semantic.min.css'

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import rootReducer from './Reducers/rootReducer'
import PawnsLogo from './Images/pawnsOutline.png'

import { Provider } from 'react-redux'
import { createStore } from 'redux'


const store = createStore(
    rootReducer, 
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

const siteStyle = {
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundImage: `url(${PawnsLogo})`
}

ReactDOM.render(
    <div style={siteStyle}>
        <Provider store={ store }>
            <App />
        </Provider>
    </div>
    , 
    document.getElementById('root')
);

