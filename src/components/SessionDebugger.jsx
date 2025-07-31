import React from 'react';
import { useAuth } from '../auth/AuthContext';
import { testAuth, testSessionPersistence } from '../api/Admin/profile';
import { checkSessionHealth } from '../utils/sessionUtils';
import { getTemporarySession, clearTemporarySession } from '../utils/temporarySession';

const SessionDebugger = () => {
  const { admin, isAuthenticated, lastAuthCheck, refreshAuth } = useAuth();

  const handleTestAuth = async () => {
    const result = await testAuth();
    console.log('Auth test result:', result);
  };

  const handleTestPersistence = () => {
    testSessionPersistence();
  };

  const handleRefreshAuth = async () => {
    const success = await refreshAuth();
    console.log('Auth refresh:', success ? 'Success' : 'Failed');
  };

  const handleCheckHealth = () => {
    checkSessionHealth();
  };

  const handleCheckTempSession = () => {
    const tempSession = getTemporarySession();
    console.log('Temporary session:', tempSession);
  };

  const handleClearTempSession = () => {
    clearTemporarySession();
    console.log('Cleared temporary session');
  };

  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    return (
      <div style={{ 
        position: 'fixed', 
        bottom: '10px', 
        right: '10px', 
        padding: '10px', 
        background: '#f0f0f0', 
        border: '1px solid #ccc',
        borderRadius: '5px',
        fontSize: '12px',
        zIndex: 9999
      }}>
        <h4>🔧 Session Debugger</h4>
        <p>Auth: {isAuthenticated ? '✅' : '❌'}</p>
        <p>Admin: {admin?.name || 'None'}</p>
        <p>Last Check: {lastAuthCheck ? new Date(lastAuthCheck).toLocaleTimeString() : 'Never'}</p>
        
        <div style={{ marginTop: '10px' }}>
          <button onClick={handleTestAuth} style={{ margin: '2px', padding: '4px 8px', fontSize: '10px' }}>
            Test Auth
          </button>
          <button onClick={handleTestPersistence} style={{ margin: '2px', padding: '4px 8px', fontSize: '10px' }}>
            Test Persistence
          </button>
          <button onClick={handleRefreshAuth} style={{ margin: '2px', padding: '4px 8px', fontSize: '10px' }}>
            Refresh Auth
          </button>
          <button onClick={handleCheckHealth} style={{ margin: '2px', padding: '4px 8px', fontSize: '10px' }}>
            Check Health
          </button>
          <button onClick={handleCheckTempSession} style={{ margin: '2px', padding: '4px 8px', fontSize: '10px' }}>
            Check Temp
          </button>
          <button onClick={handleClearTempSession} style={{ margin: '2px', padding: '4px 8px', fontSize: '10px' }}>
            Clear Temp
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default SessionDebugger;
