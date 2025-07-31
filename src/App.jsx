import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';
import AppRoutes from './routes/AppRoutes';
import SessionDebugger from './components/SessionDebugger';

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
        {/* <SessionDebugger /> */}
      </Router>
    </AuthProvider>
  );
}

export default App;