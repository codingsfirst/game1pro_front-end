// src/Auth/AuthPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { loginUser, signupUser } from "../api/auth";

function AuthPage() {
  const [activeTab, setActiveTab] = useState("login");

  // LOGIN state
  const [loginPhone, setLoginPhone] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // SIGNUP state
  const [signupUsername, setSignupUsername] = useState("");
  const [signupPhone, setSignupPhone] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("");
  const [signupReferralCode, setSignupReferralCode] = useState(""); // 👈 NEW

  // Common UI state
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const navigate = useNavigate();

  const normalizePhone = (phone) => {
    if (!phone) return "";
    if (phone.startsWith("+")) return phone;
    return `+${phone}`;
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setLoading(true);

    try {
      if (!loginPhone || !loginPassword) {
        throw new Error("Please enter phone and password.");
      }

      const payload = {
        phone: normalizePhone(loginPhone.trim()),
        password: loginPassword,
      };

      await loginUser(payload);

      setSuccessMsg("Login successful. Redirecting...");
      setTimeout(() => {
        navigate("/home");
      }, 800);
    } catch (err) {
      setErrorMsg(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setLoading(true);

    try {
      if (signupPassword !== signupConfirmPassword) {
        throw new Error("Password and Confirm Password do not match.");
      }

      const payload = {
        username: signupUsername.trim(),
        phone: normalizePhone(signupPhone),
        password: signupPassword,
        referralCode: signupReferralCode.trim() || undefined, // 👈 NEW
      };

      await signupUser(payload);

      setSuccessMsg("Account created & logged in. Redirecting...");
      setTimeout(() => {
        navigate("/home");
      }, 800);
    } catch (err) {
      setErrorMsg(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#040712] text-white flex items-center justify-center px-4 py-6">
      {/* Glow background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="pointer-events-none absolute -top-40 -left-32 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 -right-32 h-80 w-80 rounded-full bg-sky-500/25 blur-3xl" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_#1f2937_0,_#020617_55%,_#000000_100%)] opacity-80" />
      </div>

      <div className="w-full max-w-5xl flex flex-col-reverse lg:flex-row gap-8 lg:gap-12 items-center">
        {/* LEFT: branding */}
        <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium uppercase tracking-wide">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Official Game1Pro Login</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-sky-400 to-amber-400 bg-clip-text text-transparent">
              Game1Pro Arena
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300/80 max-w-md mx-auto lg:mx-0">
            Login or create your Game1Pro account to enjoy fast deposits, secure
            gameplay, live matches, tournaments and premium gaming experience.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-slate-200">
            <FeaturePill label="Instant deposits & withdrawals" />
            <FeaturePill label="Live games & tournaments" />
            <FeaturePill label="24/7 secure access" />
          </div>
        </div>

        {/* RIGHT: card */}
        <div className="w-full lg:w-1/2">
          <div className="relative rounded-3xl border border-slate-800/70 bg-slate-900/60 backdrop-blur-xl shadow-[0_0_40px_rgba(0,0,0,0.6)]">
            <div className="absolute inset-x-6 -top-[1px] h-[2px] bg-gradient-to-r from-emerald-400 via-sky-400 to-amber-400" />

            <div className="p-5 sm:p-6 md:p-7">
              {/* Tabs */}
              <div className="mb-6">
                <div className="relative flex rounded-full bg-slate-800/70 p-1">
                  <div
                    className={`absolute top-1 bottom-1 w-1/2 rounded-full bg-gradient-to-r from-emerald-500 to-sky-500 shadow-[0_0_16px_rgba(34,197,94,0.6)] transition-transform duration-300 ${
                      activeTab === "login"
                        ? "translate-x-0"
                        : "translate-x-full"
                    }`}
                  />
                  <TabButton
                    active={activeTab === "login"}
                    onClick={() => {
                      setActiveTab("login");
                      setErrorMsg("");
                      setSuccessMsg("");
                    }}
                  >
                    Login
                  </TabButton>
                  <TabButton
                    active={activeTab === "signup"}
                    onClick={() => {
                      setActiveTab("signup");
                      setErrorMsg("");
                      setSuccessMsg("");
                    }}
                  >
                    Sign Up
                  </TabButton>
                </div>
              </div>

              {/* Status messages */}
              {(errorMsg || successMsg) && (
                <div className="mb-3 text-[11px] sm:text-xs">
                  {errorMsg && (
                    <div className="mb-1 rounded-2xl border border-rose-500/60 bg-rose-500/10 px-3 py-2 text-rose-100">
                      {errorMsg}
                    </div>
                  )}
                  {successMsg && (
                    <div className="rounded-2xl border border-emerald-500/60 bg-emerald-500/10 px-3 py-2 text-emerald-100">
                      {successMsg}
                    </div>
                  )}
                </div>
              )}

              {/* Forms */}
              <div className="space-y-4">
                {activeTab === "login" ? (
                  <form
                    onSubmit={handleLoginSubmit}
                    className="space-y-4 animate-[fadeIn_0.2s_ease-out]"
                  >
                    <div className="space-y-1.5">
                      <label className="text-xs sm:text-sm text-slate-200">
                        Contact Number
                      </label>
                      <input
                        type="tel"
                        value={loginPhone}
                        onChange={(e) => setLoginPhone(e.target.value)}
                        placeholder="Enter your registered contact number"
                        className="block w-full rounded-2xl border border-slate-700 bg-slate-900/80 px-3 py-2 text-xs sm:text-sm text-slate-50 placeholder:text-slate-500 outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-500 transition"
                        required
                      />
                    </div>

                    <AuthInput
                      label="Password"
                      placeholder="Enter your password"
                      type="password"
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                    />

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs sm:text-sm">
                      <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border-slate-600 bg-slate-900 text-emerald-500 focus:ring-emerald-500"
                        />
                        <span className="text-slate-200">Remember me</span>
                      </label>
                      <button
                        type="button"
                        className="text-emerald-300 hover:text-emerald-200 underline-offset-2 hover:underline text-left sm:text-right"
                      >
                        Forgot password?
                      </button>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="mt-1 w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 via-sky-500 to-amber-400 px-4 py-2.5 text-sm sm:text-base font-semibold text-slate-900 shadow-[0_0_25px_rgba(34,197,94,0.7)] hover:brightness-110 active:scale-[0.98] transition disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {loading ? "Logging in..." : "Login to Account"}
                      <span className="inline-block text-lg leading-none">
                        ▶
                      </span>
                    </button>

                    <p className="text-[11px] sm:text-xs text-slate-400 text-center">
                      New here?{" "}
                      <button
                        type="button"
                        onClick={() => setActiveTab("signup")}
                        className="text-emerald-300 hover:text-emerald-200 underline underline-offset-2"
                      >
                        Create a free account
                      </button>
                    </p>
                  </form>
                ) : (
                  <form
                    onSubmit={handleSignupSubmit}
                    className="space-y-4 animate-[fadeIn_0.2s_ease-out]"
                  >
                    <AuthInput
                      label="Username"
                      placeholder="Choose your gaming username"
                      required
                      value={signupUsername}
                      onChange={(e) => setSignupUsername(e.target.value)}
                    />

                    {/* Contact with country code */}
                    <div className="space-y-1.5">
                      <label className="text-xs sm:text-sm text-slate-200">
                        Contact Number
                      </label>

                      <div className="rounded-2xl border border-slate-700 bg-slate-900/80 px-2 py-1.5">
                        <PhoneInput
                          country={"pk"}
                          value={signupPhone}
                          onChange={setSignupPhone}
                          enableSearch
                          inputProps={{
                            name: "phone",
                            required: true,
                          }}
                          containerClass="w-full"
                          inputClass="!bg-transparent !border-none !text-slate-50 !text-xs sm:!text-sm !w-full !shadow-none focus:!outline-none"
                          buttonClass="!bg-transparent !border-none !px-2 !text-slate-100"
                          dropdownClass="!bg-slate-900 !border !border-slate-700 !text-slate-50"
                          searchClass="!bg-slate-800 !border !border-slate-700 !text-slate-50"
                        />
                      </div>

                      <p className="text-[10px] sm:text-[11px] text-slate-400">
                        Select your country and enter a valid WhatsApp / mobile
                        number for secure login and verification.
                      </p>
                    </div>

                    {/* Referral ID (optional) */}
                    <AuthInput
                      label="Referral ID (optional)"
                      placeholder="Enter referral code / ID if someone referred you"
                      required={false}
                      value={signupReferralCode}
                      onChange={(e) => setSignupReferralCode(e.target.value)}
                    />

                    <AuthInput
                      label="Password"
                      type="password"
                      placeholder="Create a strong password"
                      required
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                    />

                    <AuthInput
                      label="Confirm Password"
                      type="password"
                      placeholder="Re-enter your password"
                      required
                      value={signupConfirmPassword}
                      onChange={(e) =>
                        setSignupConfirmPassword(e.target.value)
                      }
                    />

                    <button
                      type="submit"
                      disabled={loading}
                      className="mt-1 w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 via-emerald-500 to-amber-400 px-4 py-2.5 text-sm sm:text-base font-semibold text-slate-900 shadow-[0_0_25px_rgba(56,189,248,0.7)] hover:brightness-110 active:scale-[0.98] transition disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {loading ? "Creating account..." : "Create Account"}
                      <span className="inline-block text-lg leading-none">
                        ✦
                      </span>
                    </button>

                    <p className="text-[11px] sm:text-xs text-slate-400 text-center">
                      Already have an account?{" "}
                      <button
                        type="button"
                        onClick={() => setActiveTab("login")}
                        className="text-emerald-300 hover:text-emerald-200 underline underline-offset-2"
                      >
                        Login here
                      </button>
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}
      </style>
    </div>
  );
}

/* Reusable components */

function TabButton({ active, children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative z-10 flex-1 px-4 py-2 text-xs sm:text-sm font-semibold transition ${
        active ? "text-slate-900" : "text-slate-300 hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}

function AuthInput({
  label,
  placeholder,
  type = "text",
  required,
  value,
  onChange,
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs sm:text-sm text-slate-200">{label}</label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="block w-full rounded-2xl border border-slate-700 bg-slate-900/80 px-3 py-2 text-xs sm:text-sm text-slate-50 placeholder:text-slate-500 outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-500 transition"
      />
    </div>
  );
}

function FeaturePill({ label }) {
  return (
    <div className="flex items-center gap-2 rounded-2xl bg-slate-800/60 border border-slate-700/80 px-3 py-2">
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
      <span className="text-[11px] sm:text-xs text-slate-100/90">{label}</span>
    </div>
  );
}

export default AuthPage;
