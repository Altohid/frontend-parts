import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, KeyRound, Lock, ArrowLeft } from 'lucide-react';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
      setMessage('Check your inbox for a reset code.');
      setStep(2);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Could not send code. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await axios.post('http://localhost:5000/api/auth/reset-password', {
        email,
        otp,
        newPassword
      });
      setMessage('Password updated. You can sign in with your new password.');
      setStep(3);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Reset failed. Check the code and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cro-page-narrow">
      <div className="w-full max-w-md">
        <Link
          to="/login"
          className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-olx-dark hover:text-olx-muted"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to sign in
        </Link>

        <div className="mb-8 text-center">
          <h1 className="cro-section-title">Reset your password</h1>
          <p className="cro-lead mx-auto">
            {step === 1 && 'Enter the email you used to register. We’ll send a short code — no spam.'}
            {step === 2 && 'Enter the code from your email and choose a new password.'}
            {step === 3 && 'You’re all set. Use your new password next time you sign in.'}
          </p>
        </div>

        <div className="cro-card">
          {message && (
            <div
              className={`mb-6 rounded-xl border px-4 py-3 text-center text-sm font-medium ${
                step === 3
                  ? 'border-emerald-200 bg-emerald-50 text-emerald-900'
                  : 'border-olx-border bg-slate-50 text-olx-dark'
              }`}
            >
              {message}
            </div>
          )}

          {step === 1 && (
            <form onSubmit={handleSendOtp} className="space-y-5">
              <div>
                <label className="cro-label">Email</label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-olx-muted" />
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="cro-input-has-icon"
                    autoComplete="email"
                  />
                </div>
              </div>
              <button type="submit" disabled={loading} className="cro-btn-primary">
                {loading ? 'Sending…' : 'Send reset code'}
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleResetPassword} className="space-y-5">
              <div>
                <label className="cro-label">Code from email</label>
                <div className="relative">
                  <KeyRound className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-olx-muted" />
                  <input
                    type="text"
                    required
                    placeholder="Enter code"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="cro-input-has-icon"
                    inputMode="numeric"
                  />
                </div>
              </div>
              <div>
                <label className="cro-label">New password</label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-olx-muted" />
                  <input
                    type="password"
                    required
                    placeholder="At least 6 characters"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="cro-input-has-icon"
                    autoComplete="new-password"
                  />
                </div>
              </div>
              <button type="submit" disabled={loading} className="cro-btn-primary">
                {loading ? 'Updating…' : 'Update password'}
              </button>
            </form>
          )}

          {step === 3 && (
            <Link to="/login" className="cro-btn-primary !no-underline">
              Go to sign in
            </Link>
          )}

          {step !== 3 && (
            <p className="mt-6 text-center text-sm text-olx-muted">
              Remembered it?{' '}
              <Link to="/login" className="font-extrabold text-olx-dark underline decoration-olx-teal">
                Sign in
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
