import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Phone, UserPlus, KeyRound, Send, Check, Car } from 'lucide-react';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    role: 'user'
  });
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);

  const handleSendOtp = async () => {
    if (!formData.email) return setMessage('Enter your email first.');
    setOtpLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/auth/send-otp', {
        email: formData.email
      });
      setMessage(res.data.message || 'OTP sent to your email.');
      setOtpSent(true);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to send OTP.');
    } finally {
      setOtpLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) return setMessage('Enter OTP first.');
    setVerifyLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/auth/verify-email', {
        email: formData.email,
        otp
      });
      setMessage(res.data.message || 'Email verified successfully.');
      setOtpVerified(true);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Invalid OTP.');
    } finally {
      setVerifyLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!otpVerified) return setMessage('Please verify your email first.');
    setRegisterLoading(true);
    try {
      await axios.post('http://localhost:5000/api/auth/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        role: formData.role
      });
      setMessage('Success! Redirecting to sign in…');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Registration failed.');
    } finally {
      setRegisterLoading(false);
    }
  };

  return (
    <div className="cro-page-narrow py-10 sm:py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-olx-teal to-teal-600 text-white shadow-premium-lg ring-1 ring-white/20">
            <Car className="h-8 w-8" strokeWidth={2.5} />
          </div>
          <h1 className="cro-section-title">Create your account</h1>
          <p className="cro-lead mx-auto">
            One account to browse, save, and list vehicles. Verify your email so we can keep your account secure.
          </p>
        </div>

        <div className="cro-card">
          {message && (
            <div className="mb-6 rounded-xl border border-olx-border bg-slate-50 px-4 py-3 text-center text-sm font-medium text-olx-dark">
              {message}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="cro-label">Full name</label>
              <div className="relative">
                <User className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-olx-muted" />
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="cro-input-has-icon"
                  placeholder="As on your ID"
                />
              </div>
            </div>

            <div>
              <label className="cro-label">Email</label>
              <div className="flex gap-2">
                <div className="relative min-w-0 flex-1">
                  <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-olx-muted" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="cro-input-has-icon"
                    placeholder="you@example.com"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleSendOtp}
                  disabled={otpLoading || otpSent}
                  className="shrink-0 rounded-xl bg-olx-teal px-4 py-3 text-sm font-extrabold text-olx-dark shadow-sm transition hover:brightness-105 disabled:opacity-50"
                >
                  <Send className="mx-auto h-4 w-4 sm:mr-1 sm:inline" />
                  <span className="hidden sm:inline">{otpLoading ? '…' : otpSent ? 'Sent' : 'Send OTP'}</span>
                </button>
              </div>
              <p className="mt-1.5 text-xs text-olx-muted">We’ll send a one-time code to confirm it’s you.</p>
            </div>

            {otpSent && !otpVerified && (
              <div>
                <label className="cro-label">Verification code</label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <KeyRound className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-olx-muted" />
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="cro-input-has-icon"
                      placeholder="6-digit code"
                      inputMode="numeric"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleVerifyOtp}
                    disabled={verifyLoading}
                    className="shrink-0 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-extrabold text-white shadow-sm transition hover:bg-emerald-700 disabled:opacity-50"
                  >
                    <Check className="mr-1 inline h-4 w-4" />
                    {verifyLoading ? '…' : 'Verify'}
                  </button>
                </div>
              </div>
            )}

            <div>
              <label className="cro-label">Phone</label>
              <div className="relative">
                <Phone className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-olx-muted" />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="cro-input-has-icon"
                  placeholder="+91…"
                  autoComplete="tel"
                />
              </div>
            </div>

            <div>
              <label className="cro-label">Password</label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-olx-muted" />
                <input
                  type="password"
                  required
                  minLength={6}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="cro-input-has-icon"
                  placeholder="At least 6 characters"
                  autoComplete="new-password"
                />
              </div>
            </div>

            <div>
              <label className="cro-label">I want to</label>
              <div className="relative">
                <KeyRound className="pointer-events-none absolute left-3.5 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-olx-muted" />
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="cro-input-has-icon cursor-pointer appearance-none"
                >
                  <option value="user">Buy vehicles</option>
                  <option value="seller">Sell vehicles</option>
                </select>
              </div>
            </div>

            <button type="submit" disabled={registerLoading} className="cro-btn-primary">
              <UserPlus className="h-5 w-5" strokeWidth={2.25} />
              <span>{registerLoading ? 'Creating account…' : 'Create account'}</span>
            </button>
          </form>

          <p className="cro-trust">By signing up you agree to our terms. You can change email alerts anytime.</p>

          <p className="mt-6 text-center text-sm text-olx-muted">
            Already registered?{' '}
            <Link
              to="/login"
              className="font-extrabold text-olx-dark underline decoration-olx-teal decoration-2 underline-offset-2"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
