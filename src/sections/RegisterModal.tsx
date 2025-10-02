import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Phone, Lock, X, Check, Smartphone, Key } from 'lucide-react';
import { LoginContext } from '../contexts/LoginContext';
import { getCurrentUser } from '../services/supabaseService';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [step, setStep] = useState<'form' | 'otp'>('form');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const context = useContext(LoginContext);
  const { register, verifyOtp, sendOtp, completeRegistration } = context || {};

  useEffect(() => {
    if (!isOpen) {
      // Reset form when closing
      setStep('form');
      setName('');
      setPhone('');
      setPassword('');
      setOtp('');
      setLoading(false);
      setError('');
      setSuccessMessage('');
    }
  }, [isOpen]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (register) {
      try {
        const result = await register(name, phone, password);
        
        if (result.success && result.otpSent) {
          setStep('otp');
          setSuccessMessage('OTP sent to your phone. Please enter the 6-digit code.');
        } else if (result.error) {
          setError(result.error);
        }
      } catch (error: any) {
        setError(error.message || 'Registration failed');
      } finally {
        setLoading(false);
      }
    } else {
      setError('Register function is not available.');
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (verifyOtp && phone && otp && completeRegistration) {
      try {
        const success = await verifyOtp(phone, otp);
        if (success) {
          // Wait a moment for user state to update, then get current user
          await new Promise(resolve => setTimeout(resolve, 100));
          
          const currentUser = await getCurrentUser();
          console.log('Current user after OTP:', currentUser);
          console.log('Name from form:', name);
          console.log('Phone from form:', phone);
          console.log('Password from form:', password);
          
          if (currentUser && currentUser.id) {
            // Complete registration by creating user profile with password
            const profileSuccess = await completeRegistration(currentUser.id, name, phone, password);
            console.log('Profile creation success:', profileSuccess);
            
            if (profileSuccess) {
              setSuccessMessage('Registration successful! Welcome!');
              if (onSuccess) {
                onSuccess();
              } else {
                navigate('/dashboard');
              }
              setTimeout(() => onClose(), 1500);
            } else {
              setError('Registration successful but failed to save profile. Please contact support.');
            }
          } else {
            setError('User authentication failed. Please try again.');
          }
        } else {
          setError('Invalid OTP. Please try again.');
        }
      } catch (error: any) {
        console.error('OTP submit error:', error);
        setError(error.message || 'OTP verification failed');
      } finally {
        setLoading(false);
      }
    } else {
      setError('Please enter the OTP code.');
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setLoading(true);
    setError('');
    if (sendOtp && phone) {
      try {
        const success = await sendOtp(phone);
        if (success) {
          setSuccessMessage('OTP resent to your phone.');
        } else {
          setError('Failed to resend OTP. Please try again.');
        }
      } catch (error: any) {
        setError(error.message || 'Failed to resend OTP');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleBackToForm = () => {
    setStep('form');
    setError('');
    setOtp('');
    setSuccessMessage('');
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
              {step === 'form' ? 'Create Account' : 'Verify Phone Number'}
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

          {/* Step 1: Registration Form */}
          {step === 'form' && (
            <form onSubmit={handleFormSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              </div>

              {/* Phone Field */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
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

              {/* Password Field */}
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
                    placeholder="Create a password (minimum 6 characters)"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || !name || !phone || !password}
                className="w-full bg-gradient-to-r from-gold-light to-gold text-black font-bold py-3 rounded-3xl hover:bg-gold-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                    Sending verification code...
                  </>
                ) : (
                  <>
                    <Smartphone className="w-5 h-5" />
                    Send Verification Code
                  </>
                )}
              </button>
            </form>
          )}

          {/* Step 2: OTP Verification */}
          {step === 'otp' && (
            <form onSubmit={handleOtpSubmit} className="space-y-6">
              {/* Header */}
              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-green-500/20 rounded-full flex items-center justify-center border border-green-500/30">
                  <Smartphone className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Verify your phone number</h3>
                <p className="text-gray-400">
                  We've sent a 6-digit verification code to<br />
                  <span className="font-semibold text-white">{phone}</span>
                </p>
              </div>

              {/* OTP Input */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 text-center">
                  Enter verification code
                </label>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    maxLength={6}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent text-center text-xl font-mono tracking-widest uppercase"
                    placeholder="000000"
                    required
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Didn't receive the code?{' '}
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={loading}
                    className="text-gold-light hover:text-gold font-medium disabled:opacity-50 underline"
                  >
                    Resend code
                  </button>
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || otp.length !== 6}
                className="w-full bg-gradient-to-r from-gold-light to-gold text-black font-bold py-3 rounded-3xl hover:bg-gold-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                    Verifying...
                  </>
                ) : (
                  <>
                    <Check className="w-5 h-5" />
                    Verify & Create Account
                  </>
                )}
              </button>

              {/* Back Button */}
              <button
                type="button"
                onClick={handleBackToForm}
                className="w-full text-gray-400 hover:text-white transition-colors text-sm py-2 border-t border-gray-700"
              >
                ← Back to registration form
              </button>
            </form>
          )}

          {/* Cancel Button */}
          <button
            onClick={handleCancel}
            className="w-full mt-6 bg-white/10 backdrop-blur-md text-white py-3 rounded-3xl hover:bg-white/20 transition-colors flex items-center justify-center gap-2"
          >
            <X className="w-4 h-4" />
            Cancel Registration
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;
