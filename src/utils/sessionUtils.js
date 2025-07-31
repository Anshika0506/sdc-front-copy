// Session management utilities

// Parse cookie string to get specific cookie value
export const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop().split(';').shift();
  }
  return null;
};

// Check if authentication cookie exists
export const hasAuthCookie = () => {
  // Common authentication cookie names
  const authCookieNames = ['token', 'auth', 'jwt', 'session', 'authToken', 'access_token'];
  
  for (const cookieName of authCookieNames) {
    if (getCookie(cookieName)) {
      console.log(`🍪 Found auth cookie: ${cookieName}`);
      return true;
    }
  }
  
  console.log('🍪 No authentication cookies found');
  console.log('🍪 Available cookies:', document.cookie);
  return false;
};

// Log all cookies for debugging
export const debugCookies = () => {
  console.log('🍪 All cookies:', document.cookie);
  
  if (!document.cookie) {
    console.log('🍪 No cookies found');
    return;
  }
  
  const cookies = document.cookie.split(';');
  cookies.forEach(cookie => {
    const [name, value] = cookie.trim().split('=');
    console.log(`🍪 Cookie: ${name} = ${value}`);
  });
};

// Check session health
export const checkSessionHealth = () => {
  console.log('🔍 Session Health Check:');
  console.log('🍪 Has auth cookie:', hasAuthCookie());
  console.log('🕐 Current time:', new Date().toISOString());
  debugCookies();
};

// Session duration constants (1 hour)
export const SESSION_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds
export const REFRESH_INTERVAL = 5 * 60 * 1000;  // 5 minutes in milliseconds
