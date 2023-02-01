import React from 'react'
import ReactDOM from 'react-dom/client'
import MainPage from './containers/MainPage'
import { Provider } from "react-redux";
import store from './app/store';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <MainPage />
    </Provider>
  </React.StrictMode>,
)