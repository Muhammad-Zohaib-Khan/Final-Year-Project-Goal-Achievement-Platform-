"use client";
import { useState } from "react";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [fullName, setFullName] = useState("");
  const router = useRouter();

  // Password strength checker
  const checkStrength = (value: string) => {
    if (value.length < 6) return "Weak";
    if (
      /[A-Z]/.test(value) &&
      /[0-9]/.test(value) &&
      /[^A-Za-z0-9]/.test(value)
    )
      return "Strong";
    return "Medium";
  };

  const handleSignup = async (e: any) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setFullName("");
      setEmail("");
      setPassword("");
      // Store fullName into Firebase Auth Profile
      await updateProfile(userCredential.user, {
        displayName: fullName,
      });

      console.log("User signed up:", userCredential.user);

      // ✅ Redirect to dashboard after signup
      router.push("/dashboard");
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-2xl shadow-md w-80">
        <h2 className="text-xl font-bold mb-4 text-center">Signup</h2>

        {/* Full Name */}
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="border p-2 w-full rounded mb-3"
          required
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          className="border w-full px-3 py-2 mb-3 rounded-md"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* Password with eye toggle */}
        <div className="relative mb-1">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="border w-full px-3 py-2 rounded-md"
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
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>

        {/* Password strength indicator */}
        {password && (
          <p
            className={
              passwordStrength === "Strong"
                ? "text-green-600 mb-3 text-sm"
                : passwordStrength === "Medium"
                ? "text-yellow-600 mb-3 text-sm"
                : "text-red-600 mb-3 text-sm"
            }
          >
            Password strength: {passwordStrength}
          </p>
        )}

        {/* Submit */}
        <button
          onClick={handleSignup}
          disabled={passwordStrength !== "Strong"}
          className={`w-full py-2 rounded-lg text-white ${
            passwordStrength === "Strong"
              ? "bg-green-500 hover:bg-green-600"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Create Account
        </button>
      </div>
    </div>
  );
}
