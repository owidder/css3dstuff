import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

import clickApp from './reducers';

import './index.css';
import App from './App';

let store = createStore(clickApp);

render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);
