import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginModal from '../sections/LoginModal';
import RegisterModal from '../sections/RegisterModal';
import { sendPhoneOtp, verifyPhoneOtp, createUserProfile, getCurrentUser, signOut, verifyPhoneLoginOtp, signInWithPhonePassword } from '../services/supabaseService';
import { supabase } from '../services/supabaseService';
import type { Client } from '../services/supabaseService';

interface User extends Client {
  user_metadata?: {
    name?: string;
    phone?: string;
  };
}

interface LoginContextType {
  showLoginModal: boolean;
  setShowLoginModal: (show: boolean) => void;
  showRegisterModal: boolean;
  setShowRegisterModal: (show: boolean) => void;
  handleBookClick: () => void;
  isLoggedIn: boolean | null;
  isLoading: boolean;
  user: User | null;
  login: (phone: string, token: string) => Promise<boolean>;
  loginWithPassword: (phone: string, password: string) => Promise<boolean>;
  register: (name: string, phone: string, password: string) => Promise<{ success: boolean; otpSent?: boolean; error?: string }>;
  logout: () => Promise<void>;
  verifyOtp: (phone: string, token: string) => Promise<boolean>;
  sendOtp: (phone: string) => Promise<boolean>;
  completeRegistration: (userId: string, name: string, phone: string, password: string) => Promise<boolean>;
}

export const LoginContext = createContext<LoginContextType | undefined>(undefined);

export const useLogin = () => {
  const context = useContext(LoginContext);
  if (undefined === context) {
    throw new Error('useLogin must be used within a LoginProvider');
  }
  return context;
};

interface LoginProviderProps {
  children: ReactNode;
}

export const LoginProvider: React.FC<LoginProviderProps> = ({ children }) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null); // null = loading
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Initial session check
    const checkSession = async () => {
      try {
        const currentUser = await getCurrentUser();
        if (currentUser) {
          setIsLoggedIn(true);
          setUser(currentUser as User);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Session check error:', error);
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    };
    checkSession();

    // Listen for auth state changes (login, logout, token refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session?.user?.id);
      
      if (event === 'SIGNED_IN') {
        try {
          const currentUser = await getCurrentUser();
          if (currentUser) {
            setIsLoggedIn(true);
            setUser(currentUser as User);
          }
        } catch (error) {
          console.error('Error getting user after sign in:', error);
        }
      } else if (event === 'SIGNED_OUT') {
        setIsLoggedIn(false);
        setUser(null);
      } else if (event === 'TOKEN_REFRESHED') {
        // Refresh user data when token is refreshed
        try {
          const currentUser = await getCurrentUser();
          if (currentUser) {
            setUser(currentUser as User);
          }
        } catch (error) {
          console.error('Error refreshing user data:', error);
        }
      }
    });

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleBookClick = () => {
    if (isLoggedIn) {
      navigate('/dashboard');
    } else {
      setShowLoginModal(true);
    }
  };

  const sendOtp = async (phone: string): Promise<boolean> => {
    try {
      const success = await sendPhoneOtp(phone);
      return success;
    } catch (error: any) {
      console.error('Send OTP error:', error);
      alert(error.message || 'Failed to send OTP');
      return false;
    }
  };

  const verifyOtp = async (phone: string, token: string): Promise<boolean> => {
    try {
      const result = await verifyPhoneOtp(phone, token);
      if (result && result.user) {
        setIsLoggedIn(true);
        setUser(result.user as User);
        return true;
      }
      return false;
    } catch (error: any) {
      console.error('Verify OTP error:', error);
      alert(error.message || 'Invalid OTP');
      return false;
    }
  };

  const loginWithPassword = async (phone: string, password: string): Promise<boolean> => {
    try {
      const result = await signInWithPhonePassword(phone, password);
      if (result && result.user) {
        setIsLoggedIn(true);
        setUser(result.user as User);
        return true;
      } else {
        alert('Invalid phone number or password.');
        return false;
      }
    } catch (error: any) {
      console.error('Password login error:', error);
      alert(error.message || 'Login failed');
      return false;
    }
  };

  const login = async (phone: string, token: string): Promise<boolean> => {
    try {
      const result = await verifyPhoneLoginOtp(phone, token);
      if (result && result.user) {
        setIsLoggedIn(true);
        setUser(result.user as User);
        return true;
      } else {
        alert('Invalid phone number or OTP.');
        return false;
      }
    } catch (error: any) {
      console.error('Login error:', error);
      alert(error.message || 'Login failed');
      return false;
    }
  };

  const register = async (name: string, phone: string, password: string): Promise<{ success: boolean; otpSent?: boolean; error?: string }> => {
    try {
      // Basic validation
      if (name.trim().length < 2) {
        return { success: false, error: 'Name must be at least 2 characters long.' };
      }
      
      const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
      if (!phoneRegex.test(phone)) {
        return { success: false, error: 'Please enter a valid phone number.' };
      }
      
      if (password.length < 6) {
        return { success: false, error: 'Password must be at least 6 characters long.' };
      }

      // Send OTP to phone for verification
      const otpSent = await sendPhoneOtp(phone);
      if (otpSent) {
        return { success: true, otpSent: true };
      } else {
        return { success: false, error: 'Failed to send OTP. Please try again.' };
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      return { success: false, error: error.message || 'Registration failed' };
    }
  };

  // Function to complete registration after OTP verification
  const completeRegistration = async (userId: string, name: string, phone: string, password: string): Promise<boolean> => {
    try {
      const success = await createUserProfile(userId, name, phone, password);
      if (success) {
        // Refresh user data to get updated profile information
        const refreshedUser = await getCurrentUser();
        if (refreshedUser) {
          setUser(refreshedUser as User);
        }
      }
      return success;
    } catch (error: any) {
      console.error('Complete registration error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut();
      // The auth state listener will handle the state update
      setIsLoggedIn(false);
      setUser(null);
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleLoginSuccess = () => {
    setShowLoginModal(false);
    navigate('/dashboard');
  };

  const handleRegisterSuccess = () => {
    setShowRegisterModal(false);
    navigate('/dashboard');
  };

  return (
    <LoginContext.Provider value={{ 
      showLoginModal, 
      setShowLoginModal, 
      showRegisterModal, 
      setShowRegisterModal,
      handleBookClick, 
      isLoggedIn, 
      isLoading,
      user, 
      login,
      loginWithPassword,
      register,
      logout,
      verifyOtp,
      sendOtp,
      completeRegistration
    }}>
      {children}
      {showLoginModal && <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} onSuccess={handleLoginSuccess} />}
      {showRegisterModal && <RegisterModal isOpen={showRegisterModal} onClose={() => setShowRegisterModal(false)} onSuccess={handleRegisterSuccess} />}
    </LoginContext.Provider>
  );
};
