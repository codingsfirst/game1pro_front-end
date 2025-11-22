// src/Balance/ConfirmDepositPage.jsx
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PAYMENT_METHODS = [
  { id: "jazzcash", label: "JazzCash", icon: "📱" },
  { id: "easypaisa", label: "Easypaisa", icon: "⚡" },
  { id: "sadapay", label: "Sadapay", icon: "💳" },
  { id: "nayapay", label: "NayaPay", icon: "💸" },
  { id: "binance", label: "Binance", icon: "₿" },
];

// yahan apne real accounts set kar lena
const METHOD_ACCOUNTS = {
  jazzcash: {
    accountNumber: "0300-0000000",
    holderName: "Game1Pro JazzCash",
    instructions: "Send as mobile account payment only.",
  },
  easypaisa: {
    accountNumber: "0311-0000000",
    holderName: "Game1Pro Easypaisa",
    instructions: "Use Easypaisa app → Send Money → Mobile Account.",
  },
  sadapay: {
    accountNumber: "PK00-SADAPAY-000000000",
    holderName: "Game1Pro Sadapay",
    instructions: "Use IBAN transfer from Sadapay.",
  },
  nayapay: {
    accountNumber: "PK00-NAYAPAY-000000000",
    holderName: "Game1Pro NayaPay",
    instructions: "Use wallet to wallet transfer.",
  },
  binance: {
    accountNumber: "USDT-TRC20-G1P",
    holderName: "Game1Pro Binance",
    instructions: "Send USDT via TRC20 network only.",
  },
};

// 👇 Level calculation via total deposits (200 then +120% each level)
function calculateLevelFromDeposits(totalDeposits) {
  let level = 1;
  let threshold = 200; // Level 1 → Level 2 ke liye 200 PKR
  let used = 0;

  // Har next level ka requirement previous se 120% zyada
  while (totalDeposits - used >= threshold) {
    used += threshold;
    level += 1;
    threshold = Math.ceil(threshold * 1.2); // 120% increase
  }

  const remaining = totalDeposits - used;
  const toNext = Math.max(threshold - remaining, 0);

  return {
    level,
    nextLevelRequired: threshold,
    remainingToNext: toNext,
  };
}

function ConfirmDepositPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const passedState = location.state || {};
  const initialAmount = passedState.amount || "";
  const initialMethod = passedState.method || "jazzcash";

  // agar koi direct URL se aa jaye
  if (!passedState.amount || !passedState.method) {
    navigate("/add-balance");
  }

  const [sentAmount, setSentAmount] = useState(initialAmount);
  const [senderAccount, setSenderAccount] = useState("");
  const [senderName, setSenderName] = useState("");
  const [screenshotFile, setScreenshotFile] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const methodInfo = PAYMENT_METHODS.find((m) => m.id === initialMethod);
  const accountInfo = METHOD_ACCOUNTS[initialMethod];

  const handleSubmit = (e) => {
    e.preventDefault();

    const numericAmount = Number(sentAmount) || 0;

    console.log("Payment proof submit:", {
      method: initialMethod,
      sentAmount: numericAmount,
      senderAccount,
      senderName,
      screenshotFile,
    });

    // 1) Add Fund history localStorage me save karo
    let prevHistory = [];
    try {
      const raw = localStorage.getItem("g1p_addfund_history");
      if (raw) prevHistory = JSON.parse(raw);
    } catch (err) {
      // ignore
    }

    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10); // YYYY-MM-DD

    const newRecord = {
      id: Date.now(),
      type: "Add Fund",
      amount: numericAmount,
      account: methodInfo?.label || initialMethod,
      date: dateStr,
      status: "Submitted", // 👈 Status for Add Fund history tab
    };

    const updatedHistory = [newRecord, ...prevHistory];
    localStorage.setItem(
      "g1p_addfund_history",
      JSON.stringify(updatedHistory)
    );

    // 2) Total add funds calculate karo
    const totalDeposits = updatedHistory.reduce(
      (sum, item) => sum + (Number(item.amount) || 0),
      0
    );

    // 3) Level calculate karo (120% progression)
    const { level } = calculateLevelFromDeposits(totalDeposits);

    // 4) User object update karo (totalAddFund + level + balance)
    try {
      const rawUser = localStorage.getItem("g1p_user");
      const user = rawUser ? JSON.parse(rawUser) : {};

      user.totalAddFund = totalDeposits; // total add funds variable
      user.level = level;
      user.balance = (Number(user.balance) || 0) + numericAmount;

      localStorage.setItem("g1p_user", JSON.stringify(user));
    } catch (err) {
      // ignore for now, backend se sync baad me
    }

    // 5) UI state
    setSubmitted(true);

    setTimeout(() => {
      navigate("/home");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#040712] text-white flex flex-col">
      {/* HEADER */}
      <header className="sticky top-0 z-20 border-b border-slate-800 bg-[#040712]/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-1 rounded-full border border-slate-700 bg-slate-900/80 px-3 py-1 text-xs text-slate-200 hover:border-emerald-400"
            disabled={submitted}
          >
            <span className="text-sm">←</span>
            <span>Back</span>
          </button>

          <div className="flex flex-col items-center">
            <div className="text-xs sm:text-sm font-semibold">
              {submitted ? "Payment in Review" : "Confirm Payment"}
            </div>
            <div className="mt-0.5 text-[10px] text-emerald-300/90">
              {Number(initialAmount).toLocaleString()} PKR via{" "}
              {methodInfo?.label || ""}
            </div>
          </div>

          <div className="text-[10px] sm:text-xs text-slate-400 text-right">
            Game1Pro
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-4 pb-6 pt-3 gap-4">
        {submitted ? (
          // SUBMITTED STATE
          <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-xs rounded-2xl border border-emerald-500/50 bg-slate-900/90 px-4 py-6 text-center shadow-[0_0_30px_rgba(16,185,129,0.6)]">
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full border border-emerald-400/70 bg-emerald-500/10">
                <div className="h-5 w-5 rounded-full border-2 border-emerald-400 border-t-transparent animate-spin" />
              </div>
              <h2 className="text-sm sm:text-base font-semibold mb-1">
                Payment in Review
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-300 mb-2">
                We have received your payment proof. Please wait while we review
                your transaction.
              </p>
              <p className="text-[10px] sm:text-[11px] text-emerald-300">
                You will be redirected to Home in a moment…
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* ACCOUNT DETAILS CARD */}
            <section className="space-y-2">
              <h2 className="text-sm sm:text-base font-semibold">
                Payment Account Details
              </h2>
              <div className="rounded-2xl border border-emerald-500/40 bg-gradient-to-br from-emerald-500/15 via-slate-900 to-slate-900/90 p-3.5 shadow-[0_0_24px_rgba(16,185,129,0.6)]">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900/90 border border-emerald-400/70 text-lg">
                      {methodInfo?.icon}
                    </div>
                    <div className="leading-tight">
                      <div className="text-xs font-semibold">
                        {methodInfo?.label}
                      </div>
                      <div className="text-[10px] text-emerald-200">
                        Use this account & send exact amount
                      </div>
                    </div>
                  </div>
                  <div className="text-right text-[11px]">
                    <div className="text-slate-300">Amount to send</div>
                    <div className="font-semibold text-emerald-300">
                      {Number(initialAmount).toLocaleString()} PKR
                    </div>
                  </div>
                </div>

                <div className="mt-3 space-y-1.5 text-[11px] sm:text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Account Number</span>
                    <span className="font-mono text-slate-50">
                      {accountInfo?.accountNumber}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Account Holder</span>
                    <span className="text-slate-50 font-medium">
                      {accountInfo?.holderName}
                    </span>
                  </div>
                  <div className="text-[10px] text-emerald-200 mt-1.5">
                    {accountInfo?.instructions}
                  </div>
                </div>
              </div>
            </section>

            {/* FORM CARD */}
            <section>
              <form
                onSubmit={handleSubmit}
                className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/80 px-3.5 py-3.5 sm:px-4 sm:py-4 shadow-[0_0_24px_rgba(15,23,42,0.8)]"
              >
                <h3 className="text-xs sm:text-sm font-semibold mb-1">
                  Submit Payment Proof
                </h3>

                {/* Amount Sent */}
                <div className="space-y-1.5">
                  <label className="text-xs sm:text-sm text-slate-200">
                    Amount you sent (PKR)
                  </label>
                  <input
                    type="number"
                    min={100}
                    step={50}
                    value={sentAmount}
                    onChange={(e) => setSentAmount(e.target.value)}
                    className="block w-full rounded-2xl border border-slate-700 bg-slate-950/80 px-3 py-2 text-xs sm:text-sm text-slate-50 placeholder:text-slate-500 outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-500 transition"
                    required
                  />
                  <p className="text-[10px] sm:text-[11px] text-slate-400">
                    Please enter the exact amount you transferred from your
                    account.
                  </p>
                </div>

                {/* Sender account number */}
                <div className="space-y-1.5">
                  <label className="text-xs sm:text-sm text-slate-200">
                    Your account / wallet number
                  </label>
                  <input
                    type="text"
                    value={senderAccount}
                    onChange={(e) => setSenderAccount(e.target.value)}
                    placeholder="e.g. 0300-1234567"
                    className="block w-full rounded-2xl border border-slate-700 bg-slate-950/80 px-3 py-2 text-xs sm:text-sm text-slate-50 placeholder:text-slate-500 outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-500 transition"
                    required
                  />
                </div>

                {/* Sender name */}
                <div className="space-y-1.5">
                  <label className="text-xs sm:text-sm text-slate-200">
                    Account holder name
                  </label>
                  <input
                    type="text"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="Name shown in your app"
                    className="block w-full rounded-2xl border border-slate-700 bg-slate-950/80 px-3 py-2 text-xs sm:text-sm text-slate-50 placeholder:text-slate-500 outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-500 transition"
                    required
                  />
                </div>

                {/* Screenshot upload */}
                <div className="space-y-1.5">
                  <label className="text-xs sm:text-sm text-slate-200">
                    Upload payment screenshot
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setScreenshotFile(e.target.files?.[0] || null)
                    }
                    className="block w-full text-[11px] sm:text-xs text-slate-200 file:mr-2 file:rounded-xl file:border-0 file:bg-emerald-500/90 file:px-3 file:py-1.5 file:text-[11px] file:font-semibold file:text-slate-900 hover:file:brightness-110"
                    required
                  />
                  <p className="text-[10px] sm:text-[11px] text-slate-400">
                    Upload clear screenshot showing amount, date/time, and
                    transaction ID.
                  </p>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="mt-1 w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 via-sky-500 to-amber-400 px-4 py-2.5 text-sm sm:text-base font-semibold text-slate-900 shadow-[0_0_25px_rgba(34,197,94,0.7)] hover:brightness-110 active:scale-[0.98] transition"
                >
                  Submit Proof for Review
                  <span className="inline-block text-lg leading-none">✔</span>
                </button>

                <p className="text-[10px] sm:text-[11px] text-slate-500 text-center">
                  Our team will verify your payment and credit your Game1Pro
                  balance shortly.
                </p>
              </form>
            </section>
          </>
        )}
      </main>
    </div>
  );
}

export default ConfirmDepositPage;
