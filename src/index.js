import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import App from './App';
import {library} from '@fortawesome/fontawesome-svg-core'
import {faCheckCircle, faTimesCircle} from '@fortawesome/free-solid-svg-icons'

library.add(faCheckCircle, faTimesCircle)
const port = process.env.PORT || 3000;

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App/>);
