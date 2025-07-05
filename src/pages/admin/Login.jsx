import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import meshGradient from '../../assets/mesh-gradient.webp';


export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // You can customize these credentials
  const ADMIN_EMAIL = 'admin@example.com';
  const ADMIN_PASSWORD = 'admin123';

  const handleSubmit = async () => {
    setIsLoading(true);
    setError('');
    
    // Simulate login process
    setTimeout(() => {
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        console.log('Login successful, redirecting to dashboard...');
        // In a real app, you would use React Router
        // For demonstration, we'll show an alert and simulate redirect
        alert('Login successful! Redirecting to /admin/dashboard');
        // window.location.href = '/admin/dashboard'; // Uncomment for actual redirect
      } else {
        setError('Invalid email or password');
        console.log('Login failed - Invalid credentials');
      }
      
      setIsLoading(false);
    }, 2000);
  };

  return (
      <div className="w-full h-screen relative overflow-hidden" style={{backgroundImage: `url(${meshGradient})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}>
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/10"></div>
      
   

      {/* Login Card */}
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="w-[460px] px-8 py-10 rounded-3xl backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl">
          <div className="space-y-8">
            {/* Title */}
            <div className="text-center">
              <h1 className="text-white text-4xl font-semibold font-['Inter'] leading-10 mb-2">Login</h1>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-3 text-center">
                <span className="text-red-200 text-sm font-medium">{error}</span>
              </div>
            )}

            {/* Demo Credentials */}
            <div className="bg-blue-500/20 border border-blue-500/30 rounded-xl p-3 text-center">
              <div className="text-blue-200 text-xs font-medium mb-1">Demo Credentials:</div>
              <div className="text-blue-100 text-xs">Email: admin@example.com</div>
              <div className="text-blue-100 text-xs">Password: admin123</div>
            </div>

            {/* Form Fields */}
            <div className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <label className="block text-white text-sm font-semibold font-['Inter'] uppercase tracking-wide">
                  Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-12 px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/50 font-normal font-['IBM_Plex_Mono'] text-base leading-normal focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300"
                    placeholder="Enter Email"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className="block text-white text-sm font-semibold font-['Inter'] uppercase tracking-wide">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-12 px-4 py-3 pr-12 bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/50 font-normal font-['IBM_Plex_Mono'] text-base leading-normal focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300"
                    placeholder="Enter Password"
                    required
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full py-4 px-8 rounded-xl shadow-lg shadow-purple-500/25 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed"
              style={{backgroundColor: '#AA1E6B'}}
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span className="text-white text-base font-semibold font-['Inter'] uppercase tracking-tight">Logging in...</span>
                </div>
              ) : (
                <span className="text-white text-base font-semibold font-['Inter'] uppercase tracking-tight">Submit</span>
              )}
            </button>
          </div>
        </div>
      </div>

      
    </div>
  );
}