import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, Phone, UserPlus, KeyRound, Send, Check } from "lucide-react";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "user",
  });
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  // Separate loading states
  const [otpLoading, setOtpLoading] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);

  // Send OTP
  const handleSendOtp = async () => {
    if (!formData.email) return setMessage("⚠️ Enter your email first.");
    setOtpLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/auth/send-otp", {
        email: formData.email,
      });
      setMessage(res.data.message || "✅ OTP sent to your email.");
      setOtpSent(true);
    } catch (err) {
      setMessage(err.response?.data?.message || "❌ Failed to send OTP.");
    } finally {
      setOtpLoading(false);
    }
  };

  // Verify OTP
  const handleVerifyOtp = async () => {
    if (!otp) return setMessage("⚠️ Enter OTP first.");
    setVerifyLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/auth/verify-email", {
        email: formData.email,
        otp,
      });
      setMessage(res.data.message || "🎉 Email verified successfully!");
      setOtpVerified(true);
    } catch (err) {
      setMessage(err.response?.data?.message || "❌ Invalid OTP.");
    } finally {
      setVerifyLoading(false);
    }
  };

  // Final registration
  const handleRegister = async (e) => {
    e.preventDefault();
    if (!otpVerified) return setMessage("⚠️ Please verify your email first.");
    setRegisterLoading(true);
    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        name: formData.name, // ✅ lowercase 'name'
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        role: formData.role,
      });
      setMessage("🎉 Registration successful! Redirecting...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setMessage(err.response?.data?.message || "❌ Registration failed.");
    } finally {
      setRegisterLoading(false);
    }
  };



  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4"
      style={{ backgroundImage: "url('/lamborghini_car_steering_wheel_211123_1280x720.jpg')" }}
    >
      <div className="max-w-md w-full bg-gray-900/80 border border-white/30 rounded-2xl p-8 shadow-xl mt-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
          <p className="text-gray-300">Join AutoMart today</p>
        </div>


        {message && (
          <div className="bg-purple-500/20 border border-purple-500 text-purple-200 px-4 py-3 rounded-lg mb-4 text-center">
            {message}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-white mb-2">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-500"
                placeholder="Your name"
              />
            </div>
          </div>

          {/* Email + Send OTP */}
          <div>
            <label className="block text-white mb-2">Email</label>
            <div className="flex gap-2">
              <div className="relative flex-grow">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-500"
                  placeholder="your@email.com"
                />
              </div>
              <button
                type="button"
                onClick={handleSendOtp}
                disabled={otpLoading || otpSent}
                className="px-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:shadow-lg transition flex items-center justify-center"
              >
                <Send className="w-4 h-4 mr-1" />
                {otpLoading ? "..." : otpSent ? "Sent" : "Send OTP"}
              </button>
            </div>
          </div>

          {/* OTP Field */}
          {otpSent && !otpVerified && (
            <div>
              <label className="block text-white mb-2">Enter OTP</label>
              <div className="relative flex gap-2">
                <div className="relative flex-grow">
                  <KeyRound className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-500"
                    placeholder="Enter OTP"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleVerifyOtp}
                  disabled={verifyLoading}
                  className="px-4 bg-green-500 text-white rounded-lg font-semibold hover:shadow-lg transition flex items-center justify-center"
                >
                  <Check className="w-4 h-4 mr-1" />
                  {verifyLoading ? "..." : "Verify"}
                </button>
              </div>
            </div>
          )}

          {/* Phone */}
          <div>
            <label className="block text-white mb-2">Phone</label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-500"
                placeholder="+91XXXX"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-white mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="password"
                required
                minLength="6"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-500"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Role */}
          <div>
            <label className="block text-white mb-2">Register as</label>
            <div className="relative">
              <KeyRound className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-500"
              >
                <option value="user" className="text-black">Buyer</option>
                <option value="seller" className="text-black">Seller</option>
              </select>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={registerLoading}
            className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:shadow-lg transition flex items-center justify-center space-x-2"
          >
            <UserPlus className="w-5 h-5" />
            <span>{registerLoading ? "Registering..." : "Sign Up"}</span>
          </button>
        </form>

        <p className="text-center text-gray-300 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-purple-400 hover:text-purple-300 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
