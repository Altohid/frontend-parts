import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

export default function VerifyOtp() {
  const [otp, setOtp] = useState("");
  const location = useLocation();
  const email = location.state?.email;
  const navigate = useNavigate();

  const handleVerify = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:5000/verify-otp", { email, otp });
    if (res.status === 200) {
      alert("Email verified!");
      navigate("/login");
    }
  };

  return (
    <form onSubmit={handleVerify}>
      <h3>Enter OTP sent to {email}</h3>
      <input value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Enter OTP" />
      <button type="submit">Verify</button>
    </form>
  );
}
