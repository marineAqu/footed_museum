import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import styles from './css/index.module.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <div className={styles.container}>
        <App />
    </div>
  
);



