import React from "react";
import { Router } from 'react-router-dom';
import Routes from './routes';
import history from './history';
import { AuthProvider } from './contexts/AuthContext';

import GlobalStyle from './GlobalCss';




function App() {
  return (
    <div>
      <AuthProvider>
      <Router history={history}>
        <Routes />
      </Router>
    </AuthProvider>
    <GlobalStyle />
    </div>
  );
}

export default App;
