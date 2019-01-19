import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';

import 'es6-promise/dist/es6-promise.js';
import 'es6-promise/dist/es6-promise.auto.js';
import './lib/Object';

import App from './components/App';
import store from './store';

render(
    <Provider store = {store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>,
    document.getElementById('app')
);

