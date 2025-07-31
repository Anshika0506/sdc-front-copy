// Temporary session management for when backend doesn't set cookies
// This is a workaround until backend properly sets HTTP-only cookies

const SESSION_KEY = 'admin_session';
const SESSION_EXPIRY_KEY = 'admin_session_expiry';
const SESSION_DURATION = 60 * 60 * 1000; // 1 hour

// Store session data temporarily
export const storeTemporarySession = (adminData) => {
  const expiryTime = new Date().getTime() + SESSION_DURATION;
  localStorage.setItem(SESSION_KEY, JSON.stringify(adminData));
  localStorage.setItem(SESSION_EXPIRY_KEY, expiryTime.toString());
  console.log('📱 Stored temporary session for 1 hour');
};

// Get session data if not expired
export const getTemporarySession = () => {
  const sessionData = localStorage.getItem(SESSION_KEY);
  const expiryTime = localStorage.getItem(SESSION_EXPIRY_KEY);
  
  if (!sessionData || !expiryTime) {
    return null;
  }
  
  const now = new Date().getTime();
  const expiry = parseInt(expiryTime);
  
  if (now > expiry) {
    console.log('⏰ Temporary session expired');
    clearTemporarySession();
    return null;
  }
  
  const timeLeft = Math.round((expiry - now) / (1000 * 60)); // minutes
  console.log(`📱 Temporary session valid for ${timeLeft} more minutes`);
  
  return JSON.parse(sessionData);
};

// Clear session data
export const clearTemporarySession = () => {
  localStorage.removeItem(SESSION_KEY);
  localStorage.removeItem(SESSION_EXPIRY_KEY);
  console.log('🗑️ Cleared temporary session');
};

// Check if session is close to expiring (within 5 minutes)
export const isSessionCloseToExpiry = () => {
  const expiryTime = localStorage.getItem(SESSION_EXPIRY_KEY);
  if (!expiryTime) return false;
  
  const now = new Date().getTime();
  const expiry = parseInt(expiryTime);
  const fiveMinutes = 5 * 60 * 1000;
  
  return (expiry - now) < fiveMinutes;
};

// Extend session (simulate cookie refresh)
export const extendTemporarySession = () => {
  const sessionData = getTemporarySession();
  if (sessionData) {
    storeTemporarySession(sessionData);
    console.log('🔄 Extended temporary session for another hour');
    return true;
  }
  return false;
};
