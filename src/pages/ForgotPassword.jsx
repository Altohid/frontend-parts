import React, { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await axios.post("http://localhost:5000/api/auth/forgot-password", { email });
      setMessage("✅ OTP sent to your email.");
      setStep(2);
    } catch (err) {
      setMessage(err.response?.data?.message || "❌ Error sending OTP.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await axios.post("http://localhost:5000/api/auth/reset-password", {
        email,
        otp,
        newPassword,
      });
      setMessage("🎉 Password reset successful! You can now log in.");
      setStep(3);
    } catch (err) {
      setMessage(err.response?.data?.message || "❌ Error resetting password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4 pt-16">
      <div className="max-w-md w-full bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl">
        <h2 className="text-2xl font-bold text-white text-center mb-4">
          Forgot Password
        </h2>

        {message && (
          <div className="bg-purple-500/20 border border-purple-500 text-purple-200 px-4 py-3 rounded-lg mb-4 text-center">
            {message}
          </div>
        )}

        {step === 1 && (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <input
              type="email"
              required
              placeholder="Enter your registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:shadow-lg transition"
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <input
              type="text"
              required
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-500"
            />
            <input
              type="password"
              required
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:shadow-lg transition"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        )}

        {step === 3 && (
          <a
            href="/login"
            className="block mt-4 text-center text-purple-400 hover:text-purple-300"
          >
            Back to Login
          </a>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
