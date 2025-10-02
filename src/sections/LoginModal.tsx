import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, X, Smartphone, Key } from 'lucide-react';
import { LoginContext } from '../contexts/LoginContext';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const context = useContext(LoginContext);
  const { loginWithPassword } = context || {};

  useEffect(() => {
    if (!isOpen) {
      // Reset form when closing
      setPhone('');
      setPassword('');
      setLoading(false);
      setError('');
      setSuccessMessage('');
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (loginWithPassword && phone && password) {
      try {
        const success = await loginWithPassword(phone, password);
        if (success) {
          setSuccessMessage('Login successful! Welcome back.');
          if (onSuccess) {
            onSuccess();
          } else {
            navigate('/dashboard');
          }
          setTimeout(() => onClose(), 1500);
        } else {
          setError('Invalid phone number or password. Please try again.');
        }
      } catch (error: any) {
        setError(error.message || 'Login failed. Please try again.');
      } finally {
        setLoading(false);
      }
    } else {
      setError('Please enter your phone number and password.');
      setLoading(false);
    }
  };



  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleCancel = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm transition-opacity duration-300 ease-in-out opacity-100"
      style={{ opacity: isOpen ? 1 : 0 }}
      onClick={handleBackdropClick}
    >
      <div className="w-full max-w-3xl mx-auto">
        <div className="w-full bg-gray-900/80 backdrop-blur-md rounded-xl p-8 shadow-2xl border border-white/20 transform transition-all duration-300 ease-out scale-100 opacity-100" 
             style={{ 
               transform: isOpen ? 'scale(1) translateY(0)' : 'scale(0.95) translateY(-10px)',
               opacity: isOpen ? 1 : 0 
             }}>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-white">
              Sign In
            </h2>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Error/Success Messages */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-sm">
              {error}
            </div>
          )}

          {successMessage && (
            <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-300 text-sm">
              {successMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Phone Number
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                  placeholder="Enter your phone number (e.g., +40712345678)"
                  required
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Include country code (+40 for Romania)</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                <a href="#" className="text-gold-light hover:text-gold underline">Forgot password?</a>
              </p>
            </div>

            <button
              type="submit"
              disabled={loading || !phone || !password}
              className="w-full bg-gradient-to-r from-gold-light to-gold text-black font-bold py-3 rounded-3xl hover:bg-gold-light transition-colors disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black mr-2 inline"></div>
                  Signing In...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>


          {/* Register link */}
          <div className="text-center mt-4">
            <p className="text-sm text-gray-400">
              Don't have an account?{' '}
              <button
                onClick={() => {
                  onClose();
                  // Trigger register modal - this would need context access
                  const loginContext = context as any;
                  loginContext?.setShowRegisterModal?.(true);
                }}
                className="text-gold-light hover:text-gold font-medium underline"
              >
                Create one
              </button>
            </p>
          </div>

          {/* Cancel */}
          <button
            onClick={handleCancel}
            className="w-full mt-4 bg-white/10 backdrop-blur-md text-white py-3 rounded-3xl hover:bg-white/20 transition-colors"
          >
            <X className="inline w-4 h-4 mr-2" />
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
