import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PACKAGES = [
  { amount: 100, bonus: 3 },
  { amount: 250, bonus: 3 },
  { amount: 500, bonus: 3 },
  { amount: 1000, bonus: 5 },
  { amount: 3000, bonus: 7 },
  { amount: 10000, bonus: 7 },
];

const PAYMENT_METHODS = [
  { id: "jazzcash", label: "JazzCash", icon: "📱" },
  { id: "easypaisa", label: "Easypaisa", icon: "⚡" },
  { id: "sadapay", label: "Sadapay", icon: "💳" },
  { id: "nayapay", label: "NayaPay", icon: "💸" },
  { id: "binance", label: "Binance", icon: "₿" },
];

function AddBalancePage() {
  const navigate = useNavigate();
  const [amount, setAmount] = useState("100"); // default first package
  const [method, setMethod] = useState("jazzcash");

  const handleSubmit = (e) => {
    e.preventDefault();
    // yahan sirf next screen pe data pass karna hai
    navigate("/add-balance/confirm", {
      state: {
        amount,
        method,
      },
    });
  };

  const selectedPackage = PACKAGES.find(
    (p) => String(p.amount) === String(amount)
  );

  return (
    <div className="min-h-screen bg-[#040712] text-white flex flex-col">
      {/* HEADER (no main navbar) */}
      <header className="sticky top-0 z-20 border-b border-slate-800 bg-[#040712]/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-1 rounded-full border border-slate-700 bg-slate-900/80 px-3 py-1 text-xs text-slate-200 hover:border-emerald-400"
          >
            <span className="text-sm">←</span>
            <span>Back</span>
          </button>

          <div className="flex flex-col items-center">
            <div className="text-sm sm:text-base font-semibold">
              Add Balance
            </div>
            {selectedPackage && (
              <div className="mt-0.5 text-[10px] text-emerald-300/90">
                Selected: {selectedPackage.amount.toLocaleString()} PKR
                {selectedPackage.bonus
                  ? ` + ${selectedPackage.bonus}% extra`
                  : ""}
              </div>
            )}
          </div>

          <div className="text-[10px] sm:text-xs text-slate-400 text-right">
            Game1Pro
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-4 pb-6 pt-3 gap-4">
        {/* PACKAGES CARD */}
        <section className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <div>
              <h2 className="text-sm sm:text-base font-semibold">
                Choose a Package
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-400">
                Tap any chip to select amount with bonus.
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-2 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-1 text-[10px] text-emerald-200">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Bonus up to 7% extra</span>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-3 shadow-[0_0_24px_rgba(15,23,42,0.8)]">
            {/* Bonus legend top-right (for small screens) */}
            <div className="mb-3 flex justify-between items-center">
              <div className="text-[10px] sm:text-[11px] text-slate-400 max-w-[70%]">
                <span className="text-emerald-300">3% extra</span> on 100, 250,
                500 — <span className="text-emerald-300">5% extra</span> on
                1,000 — <span className="text-emerald-300">7% extra</span> on
                3,000 & 10,000.
              </div>
              <div className="sm:hidden rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-2 py-1 text-[9px] text-emerald-200">
                Bonus active
              </div>
            </div>

            {/* Packages grid */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {PACKAGES.map((pkg) => {
                const isActive = String(amount) === String(pkg.amount);
                return (
                  <button
                    key={pkg.amount}
                    type="button"
                    onClick={() => setAmount(String(pkg.amount))}
                    className={`relative rounded-2xl px-2.5 py-2 text-left text-[11px] sm:text-xs border transition ${
                      isActive
                        ? "border-emerald-400 bg-gradient-to-br from-emerald-500/20 via-sky-500/10 to-emerald-600/20 shadow-[0_0_16px_rgba(16,185,129,0.7)]"
                        : "border-slate-700 bg-slate-950/70 hover:border-emerald-400/80"
                    }`}
                  >
                    <div className="font-semibold text-slate-50">
                      {pkg.amount.toLocaleString()} PKR
                    </div>
                    {pkg.bonus ? (
                      <div className="mt-0.5 inline-flex items-center rounded-full bg-emerald-500/15 px-1.5 py-0.5 text-[9px] text-emerald-300 border border-emerald-500/40">
                        +{pkg.bonus}% extra
                      </div>
                    ) : (
                      <div className="mt-0.5 text-[9px] text-slate-500">
                        Standard
                      </div>
                    )}

                    {isActive && (
                      <span className="pointer-events-none absolute -top-1 -right-1 h-3 w-3 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.9)]" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* FORM: CUSTOM AMOUNT + METHODS + SUBMIT */}
        <section>
          <form
            onSubmit={handleSubmit}
            className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/80 px-3.5 py-3.5 sm:px-4 sm:py-4 shadow-[0_0_24px_rgba(15,23,42,0.8)]"
          >
            {/* Custom amount input (optional) */}
            <div className="space-y-1.5">
              <label className="text-xs sm:text-sm text-slate-200">
                Custom Amount (optional)
              </label>
              <input
                type="number"
                min={100}
                step={50}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="e.g. 1500"
                className="block w-full rounded-2xl border border-slate-700 bg-slate-950/80 px-3 py-2 text-xs sm:text-sm text-slate-50 placeholder:text-slate-500 outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-500 transition"
                required
              />
              <p className="text-[10px] sm:text-[11px] text-slate-400">
                Packages set a recommended amount. You can edit it manually if
                needed. Minimum deposit 100 PKR.
              </p>
            </div>

            {/* Payment method */}
            <div className="space-y-1.5">
              <label className="text-xs sm:text-sm text-slate-200">
                Select Payment Method
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] sm:text-xs">
                {PAYMENT_METHODS.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setMethod(m.id)}
                    className={`flex items-center gap-2 rounded-2xl border px-2.5 py-2 ${
                      method === m.id
                        ? "border-emerald-400 bg-emerald-500/10 text-emerald-300 shadow-[0_0_14px_rgba(16,185,129,0.6)]"
                        : "border-slate-700 bg-slate-900/80 text-slate-200 hover:border-emerald-400/70"
                    }`}
                  >
                    <span className="text-base">{m.icon}</span>
                    <span className="truncate">{m.label}</span>
                  </button>
                ))}
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-400">
                After selecting method, you’ll see exact account / wallet
                details on the next step.
              </p>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="mt-1 w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 via-sky-500 to-amber-400 px-4 py-2.5 text-sm sm:text-base font-semibold text-slate-900 shadow-[0_0_25px_rgba(34,197,94,0.7)] hover:brightness-110 active:scale-[0.98] transition"
            >
              Proceed to Deposit
              <span className="inline-block text-lg leading-none">➜</span>
            </button>

            <p className="text-[10px] sm:text-[11px] text-slate-500 text-center">
              This is a UI-only flow for now. Actual payment confirmation will
              be handled once backend is connected.
            </p>
          </form>
        </section>
      </main>
    </div>
  );
}

export default AddBalancePage;
