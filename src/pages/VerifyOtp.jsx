import { useState } from 'react';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShieldCheck, ArrowLeft } from 'lucide-react';

export default function VerifyOtp() {
  const [otp, setOtp] = useState('');
  const [err, setErr] = useState('');
  const location = useLocation();
  const email = location.state?.email;
  const navigate = useNavigate();

  const handleVerify = async (e) => {
    e.preventDefault();
    setErr('');
    try {
      const res = await axios.post('http://localhost:5000/verify-otp', { email, otp });
      if (res.status === 200) {
        navigate('/login', { state: { verified: true } });
      }
    } catch {
      setErr('Invalid or expired code. Request a new one from registration.');
    }
  };

  return (
    <div className="cro-page-narrow">
      <div className="w-full max-w-md">
        <Link
          to="/register"
          className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-olx-dark hover:text-olx-muted"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>

        <div className="cro-card">
          <div className="mb-6 flex justify-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-olx-teal/20 text-olx-dark">
              <ShieldCheck className="h-7 w-7" strokeWidth={2.25} />
            </span>
          </div>
          <h1 className="cro-h1 text-center">Verify your email</h1>
          <p className="cro-lead mx-auto mt-2 text-center">
            Enter the code we sent to <span className="font-bold text-olx-dark">{email || 'your inbox'}</span>.
          </p>

          {err && <div className="cro-alert-error mt-6">{err}</div>}

          <form onSubmit={handleVerify} className="mt-8 space-y-5">
            <div>
              <label className="cro-label">Verification code</label>
              <input
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="6-digit code"
                className="cro-input"
                inputMode="numeric"
                autoComplete="one-time-code"
              />
            </div>
            <button type="submit" className="cro-btn-primary">
              Confirm & continue
            </button>
          </form>

          <p className="cro-trust mt-6">Didn’t get an email? Check spam or request a new code from the sign-up page.</p>

          <p className="mt-6 text-center text-sm text-olx-muted">
            <Link to="/login" className="font-extrabold text-olx-dark underline decoration-olx-teal">
              Sign in instead
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
