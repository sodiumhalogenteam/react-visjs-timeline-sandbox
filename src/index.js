import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SHTimeline from './SHTimeline'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render( < SHTimeline / > , document.getElementById('root'));
registerServiceWorker();