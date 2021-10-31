import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

// ReactDOM.render(

//     <React.StrictMode>
//       <App />
//     </React.StrictMode>
// ,
//   document.getElementById("root")
// );
serviceWorker.unregister();
