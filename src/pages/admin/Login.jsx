import React, { useState, useEffect } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import meshGradient from '../../assets/mesh-gradient.webp';
import { useNavigate } from 'react-router-dom';
import { loginAdmin } from '../../api/Admin/GetLoginAPi';
import { useAuth } from '../../auth/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      console.log('🔄 Starting login process...');
      
      const res = await loginAdmin(email, password);
      console.log('📥 Login response:', res);

      // Handle different response structures
      let token, name, adminId, adminEmail;

      if (res.token) {
        // Direct structure
        token = res.token;
        name = res.name;
        adminId = res.adminId || res.id;
        adminEmail = res.email;
      } else if (res.data && res.data.token) {
        // Nested structure
        token = res.data.token;
        name = res.data.name;
        adminId = res.data.adminId || res.data.id;
        adminEmail = res.data.email;
      } else {
        throw new Error('Invalid response structure from server');
      }

      if (!token) {
        throw new Error('No token received from server');
      }

      // Use AuthContext login function
      login({ token, name, adminId, email: adminEmail });

      console.log("✅ Login successful!");
      console.log("➡ JWT Token:", token);
      console.log("👤 Logged in as:", name);
      console.log("🆔 Admin ID:", adminId);

      // Navigate to dashboard
      navigate('/admin/dashboard');

      // Clear fields on success
      setEmail('');
      setPassword('');
      setShowPassword(false);

    } catch (err) {
      console.error('🚨 Login error:', err);
      setError(err?.message || 'Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-screen relative overflow-hidden" 
         style={{ 
           backgroundImage: `url(${meshGradient})`, 
           backgroundSize: 'cover', 
           backgroundPosition: 'center', 
           backgroundRepeat: 'no-repeat' 
         }}>
      <div className="absolute inset-0 bg-black/10" />
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="w-[460px] px-8 py-10 rounded-3xl backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="text-center">
              <h1 className="text-white text-4xl font-semibold">Login</h1>
            </div>

            {error && (
              <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-3 text-center">
                <span className="text-red-200 text-sm font-medium">{error}</span>
              </div>
            )}

            <div className="space-y-6">
              <div>
                <label className="block text-white text-sm font-semibold uppercase">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-12 px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter Email"
                  required
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="block text-white text-sm font-semibold uppercase">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-12 px-4 py-3 pr-12 bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter Password"
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white"
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 px-8 rounded-xl shadow-lg shadow-purple-500/25 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200"
              style={{ backgroundColor: '#AA1E6B' }}
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span className="text-white text-base font-semibold uppercase">Logging in...</span>
                </div>
              ) : (
                <span className="text-white text-base font-semibold uppercase">Submit</span>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}