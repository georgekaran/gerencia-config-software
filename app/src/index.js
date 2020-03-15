import React from 'react';
import ReactDOM from 'react-dom';

import "./assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/scss/argon-dashboard-react.scss";

import Routes from './router/Routes';

ReactDOM.render(<Routes />, document.getElementById('root'));
