"use client";
import { useState, useRef, useEffect } from "react";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const emailRef = useRef(null);

  useEffect(() => {
    if (emailRef.current) {
      emailRef.current.focus();
    }
  }, []);

  const handleResetRequest = async () => {
    setError("");
    setSuccess("");
    const res = await fetch("/api/request-reset-token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    if (!res.ok) setError(data.error || "Failed to send reset email");
    else setSuccess("Reset email sent. Check your inbox!");
  };

  const handleResetPassword = async () => {
    setError("");
    setSuccess("");
    const res = await fetch("/api/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, resetToken, newPassword }),
    });
    const data = await res.json();
    if (!res.ok) setError(data.error || "Failed to reset password");
    else setSuccess("Password reset successful! You can now log in.");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
      <div className="p-6 bg-gray-800 rounded-md w-96">
        <h2 className="text-xl font-bold mb-4 text-center">Reset Password</h2>
        {error && <p className="text-red-500 mb-4" role="alert">{error}</p>}
        {success && <p className="text-green-500 mb-4" role="status">{success}</p>}
        <label htmlFor="email" className="block mb-1">Email Address</label>
        <input
          ref={emailRef}
          id="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-3 bg-gray-700 rounded"
          aria-required="true"
        />
        <label htmlFor="resetToken" className="block mb-1">Reset Token</label>
        <input
          id="resetToken"
          type="text"
          placeholder="Reset Token"
          value={resetToken}
          onChange={(e) => setResetToken(e.target.value)}
          className="w-full p-2 mb-3 bg-gray-700 rounded"
          aria-required="true"
        />
        <label htmlFor="newPassword" className="block mb-1">New Password</label>
        <input
          id="newPassword"
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full p-2 mb-3 bg-gray-700 rounded"
          aria-required="true"
        />
        <button 
          onClick={handleResetPassword} 
          className="w-full bg-blue-500 p-2 rounded"
          aria-label="Reset Password"
        >
          Reset Password
        </button>
        <button 
          onClick={handleResetRequest} 
          className="w-full bg-gray-600 mt-2 p-2 rounded"
          aria-label="Request Reset Token"
        >
          Request Reset Token
        </button>
      </div>
    </div>
  );
}