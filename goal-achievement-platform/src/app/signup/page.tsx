"use client";
import { useState } from "react";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Password strength checker
  const checkStrength = (value: string) => {
    if (value.length < 6) return "Weak";
    if (/[A-Z]/.test(value) && /[0-9]/.test(value) && /[^A-Za-z0-9]/.test(value))
      return "Strong";
    return "Medium";
  };

  const handleSignup = async (e: any) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match ❌");
      return;
    }

    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Store fullName into Firebase Auth Profile
      await updateProfile(userCredential.user, {
        displayName: fullName,
      });

      // Reset fields
      setFullName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      toast.success("Account created successfully 🎉");
      router.push("/dashboard");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <Toaster position="top-right" />
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Create Account 
        </h2>

        {/* Full Name */}
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="border w-full px-4 py-3 mb-4 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
          required
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          className="border w-full px-4 py-3 mb-4 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* Password */}
        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="border w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordStrength(checkStrength(e.target.value));
            }}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-500"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* Password strength */}
        {password && (
          <p
            className={`mb-2 text-sm ${
              passwordStrength === "Strong"
                ? "text-green-600"
                : passwordStrength === "Medium"
                ? "text-yellow-600"
                : "text-red-600"
            }`}
          >
            Password strength: {passwordStrength}
          </p>
        )}

        {/* Confirm Password */}
        <div className="relative mb-4">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            className="border w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-500"
          >
            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* Submit */}
        <button
          onClick={handleSignup}
          disabled={passwordStrength !== "Strong" || password !== confirmPassword || loading}
          className={`w-full py-3 rounded-lg text-white font-semibold transition ${
            passwordStrength === "Strong" && password === confirmPassword && !loading
              ? "bg-green-500 hover:bg-green-600"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          {loading ? "Creating..." : "Create Account"}
        </button>

        {/* Already have an account */}
        <p className="text-center mt-6 text-gray-600 text-sm">
          Already have an account?{" "}
          <span
            onClick={() => router.push("/login")}
            className="text-blue-600 cursor-pointer font-medium hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}