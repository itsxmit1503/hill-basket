import React, { useState } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GlassCard } from '../components/GlassCard';
import { Mail, Lock, User, ArrowRight, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';

const LoginPage: React.FC = () => {
  type AuthView = 'login' | 'signup' | 'forgot-email' | 'forgot-code' | 'reset-password';
  const [view, setView] = useState<AuthView>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetCode, setResetCode] = useState('');
  const [enteredCode, setEnteredCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const { login, signup, checkEmailExists, resetPassword } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const success = await login(email, password);
      if (success) {
        if (email === 'admin@1234gmail.com') {
          navigate('/admin');
        } else {
          navigate(redirect);
        }
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const success = await signup(name, email, password);
      if (success) {
        navigate(redirect);
      } else {
        setError('User already exists');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const exists = await checkEmailExists(email);
      if (exists) {
        // Generate a 6-digit code
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        setResetCode(code);
        // Mock sending email
        console.log(`Sending reset code ${code} to ${email}`);
        alert(`Demo: Your reset code is ${code}`);
        setView('forgot-code');
      } else {
        setError('No account found with this email address.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (enteredCode === resetCode) {
      setView('reset-password');
    } else {
      setError('Invalid code. Please try again.');
    }
  };

  const handleResetPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      const success = await resetPassword(email, newPassword);
      if (success) {
        alert('Password reset successfully! Please login with your new password.');
        setView('login');
        setPassword('');
      } else {
        setError('Failed to reset password. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderContent = () => {
    switch (view) {
      case 'forgot-email':
        return (
          <>
            <div className="flex flex-col items-center mb-8">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-white shadow-lg mb-4">
                <Lock size={32} />
              </div>
              <h1 className="text-3xl font-poppins font-bold text-gray-800 dark:text-white">Forgot Password</h1>
              <p className="text-gray-500 dark:text-gray-400 mt-2 text-center">
                Enter your email address to receive a verification code.
              </p>
            </div>
            <form onSubmit={handleForgotEmailSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">Email Address</label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-field pl-11"
                    placeholder="name@example.com"
                  />
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                </div>
              </div>
              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 text-red-500 text-sm p-3 rounded-xl border border-red-100 dark:border-red-900/50">
                  {error}
                </div>
              )}
              <button type="submit" disabled={loading} className="btn-primary w-full py-3 flex items-center justify-center space-x-2 group disabled:opacity-70">
                <span>{loading ? 'Sending...' : 'Send Code'}</span>
                {!loading && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
              </button>
              <button type="button" onClick={() => setView('login')} className="w-full text-center text-sm text-gray-500 hover:text-primary font-bold">
                Back to Login
              </button>
            </form>
          </>
        );

      case 'forgot-code':
        return (
          <>
            <div className="flex flex-col items-center mb-8">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-white shadow-lg mb-4">
                <Lock size={32} />
              </div>
              <h1 className="text-3xl font-poppins font-bold text-gray-800 dark:text-white">Enter Code</h1>
              <p className="text-gray-500 dark:text-gray-400 mt-2 text-center">
                Enter the 6-digit code sent to {email}
              </p>
            </div>
            <form onSubmit={handleCodeSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">Verification Code</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={enteredCode}
                    onChange={(e) => setEnteredCode(e.target.value)}
                    className="input-field pl-11 tracking-widest text-lg"
                    placeholder="123456"
                    maxLength={6}
                  />
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                </div>
              </div>
              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 text-red-500 text-sm p-3 rounded-xl border border-red-100 dark:border-red-900/50">
                  {error}
                </div>
              )}
              <button type="submit" disabled={loading} className="btn-primary w-full py-3 flex items-center justify-center space-x-2 group disabled:opacity-70">
                <span>Verify Code</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button type="button" onClick={() => setView('forgot-email')} className="w-full text-center text-sm text-gray-500 hover:text-primary font-bold">
                Back to Email
              </button>
            </form>
          </>
        );

      case 'reset-password':
        return (
          <>
            <div className="flex flex-col items-center mb-8">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-white shadow-lg mb-4">
                <Lock size={32} />
              </div>
              <h1 className="text-3xl font-poppins font-bold text-gray-800 dark:text-white">Reset Password</h1>
              <p className="text-gray-500 dark:text-gray-400 mt-2 text-center">
                Create a new password for your account.
              </p>
            </div>
            <form onSubmit={handleResetPasswordSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">New Password</label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="input-field pl-11"
                    placeholder="••••••••"
                  />
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">Confirm Password</label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="input-field pl-11"
                    placeholder="••••••••"
                  />
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                </div>
              </div>
              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 text-red-500 text-sm p-3 rounded-xl border border-red-100 dark:border-red-900/50">
                  {error}
                </div>
              )}
              <button type="submit" disabled={loading} className="btn-primary w-full py-3 flex items-center justify-center space-x-2 group disabled:opacity-70">
                <span>{loading ? 'Resetting...' : 'Reset Password'}</span>
                {!loading && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
              </button>
            </form>
          </>
        );

      default: // login or signup
        return (
          <>
            <div className="flex flex-col items-center mb-8">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-white shadow-lg mb-4">
                <ShoppingCart size={32} />
              </div>
              <h1 className="text-3xl font-poppins font-bold text-gray-800 dark:text-white">
                {view === 'login' ? 'Welcome Back' : 'Create Account'}
              </h1>
              <p className="text-gray-500 dark:text-gray-400 mt-2 text-center">
                {view === 'login' ? 'Login to access your Hill Basket account' : 'Join Hill Basket for fresh local groceries'}
              </p>
            </div>

            <form onSubmit={view === 'login' ? handleLogin : handleSignup} className="space-y-6">
              {view === 'signup' && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">Full Name</label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="input-field pl-11"
                      placeholder="John Doe"
                    />
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">Email Address</label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-field pl-11"
                    placeholder="name@example.com"
                  />
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                  {view === 'login' && (
                    <button type="button" onClick={() => setView('forgot-email')} className="text-xs text-primary hover:underline">Forgot password?</button>
                  )}
                </div>
                <div className="relative">
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field pl-11"
                    placeholder="••••••••"
                  />
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                </div>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 dark:bg-red-900/20 text-red-500 text-sm p-3 rounded-xl border border-red-100 dark:border-red-900/50"
                >
                  {error}
                </motion.div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full py-3 flex items-center justify-center space-x-2 group disabled:opacity-70"
              >
                <span>{loading ? 'Processing...' : (view === 'login' ? 'Sign In' : 'Create Account')}</span>
                {!loading && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800 text-center">
              <p className="text-gray-500 dark:text-gray-400">
                {view === 'login' ? "Don't have an account?" : "Already have an account?"}
                <button
                  onClick={() => setView(view === 'login' ? 'signup' : 'login')}
                  className="ml-2 text-primary font-bold hover:underline"
                >
                  {view === 'login' ? 'Sign Up' : 'Log In'}
                </button>
              </p>
            </div>
          </>
        );
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4 bg-gradient-to-br from-primary/5 to-accent/5">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md"
      >
        <GlassCard className="p-8 shadow-2xl">
          {renderContent()}
        </GlassCard>
      </motion.div>
    </div>
  );
};

export default LoginPage;
