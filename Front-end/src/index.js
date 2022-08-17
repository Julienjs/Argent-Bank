import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './router/App';
import { BrowserRouter } from 'react-router-dom'
import reportWebVitals from './reportWebVitals';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Provider } from 'react-redux';
import { persistor, store } from "./app/store"
import { PersistGate } from 'redux-persist/integration/react';
import Loader from './components/Loader';
// import { persistStore } from 'redux-persist'

// let persistor = persistStore(store);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={<Loader />} persistor={persistor}>
        <Navbar />
        <App />
        <Footer />
      </PersistGate>
    </Provider>
  </BrowserRouter>
);

reportWebVitals();
