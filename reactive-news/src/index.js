import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, browserHistory} from 'react-router';
import {Provider} from 'react-redux';

import routes from './route';
import App from './components/app';
import configureStore from './stores/configureStore';

const store = configureStore();

ReactDOM.render(<Provider store={store}>
                    <Router history={browserHistory} routes={routes}/>
                </Provider>,
         document.getElementById('app')
);
