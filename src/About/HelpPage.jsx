// src/Help/HelpPage.jsx
import React from "react";

const articles = [
  {
    id: "account-create",
    title: "How to Create Your Game1Pro Account",
    tag: "Account",
    steps: [
      "Open the Game1Pro app or website and go to the Login / Sign Up screen.",
      "Tap on the 'Sign Up' tab.",
      "Enter your username, select your country, and add your mobile / WhatsApp number.",
      "Create a strong password and confirm it.",
      "Submit the form – your account will be created instantly.",
    ],
    note: "Make sure you use a real number that you can verify later for withdrawals.",
  },
  {
    id: "referral",
    title: "How Referral Works (Earn 100 PKR per Friend)",
    tag: "Referral",
    steps: [
      "Go to your profile or referral section to see your unique referral ID or link.",
      "Share this referral ID / link with your friends on WhatsApp, Instagram or anywhere.",
      "When your friend signs up using your referral and starts playing, your referral is counted.",
      "For each valid referral, you get 100 PKR credited to your Game1Pro balance.",
    ],
    note: "Fake, duplicate or self-referrals may be blocked to keep the system fair.",
  },
  {
    id: "add-fund",
    title: "How to Add Balance Safely",
    tag: "Add Funds",
    steps: [
      "From Home, tap on the '+ Add' button near your balance.",
      "Select a package amount (e.g., 100, 250, 500, 1000, 3000, 10000 PKR).",
      "Choose your payment method: JazzCash, Easypaisa, Sadapay, NayaPay or Binance.",
      "On the next screen, you will see the official Game1Pro account details.",
      "Send the money from your app, then enter your details and upload the payment screenshot.",
      "Submit for review – our team will verify and credit your balance.",
    ],
    note: "Always send payment only to the official accounts shown inside the app.",
  },
  {
    id: "withdraw",
    title: "How Withdrawals Work (0% Deduct, 2 Hours Max)",
    tag: "Withdraw",
    steps: [
      "Open the withdraw screen from your account section (will be visible in your profile area).",
      "Enter the amount you want to withdraw (within your available balance).",
      "Select your preferred payout method (JazzCash / Easypaisa / others).",
      "Submit your withdraw request with correct account details.",
      "Our team reviews the request and sends payment to your verified wallet / account.",
    ],
    note: "Game1Pro applies 0% deduction from our side. Processing time is up to 2 hours max (usually faster), but bank / wallet delays are not under our control.",
  },
];

function HelpPage() {
  return (
    <div className="min-h-screen bg-[#040712] text-white flex flex-col">
      {/* Header (simple, because main Navbar already above) */}
      <header className="sticky top-0 z-20 border-b border-slate-800 bg-[#040712]/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 via-sky-500 to-amber-400 text-[11px] font-black">
              ?
            </div>
            <div className="leading-tight">
              <div className="text-xs sm:text-sm font-semibold">Help Center</div>
              <div className="text-[10px] text-slate-400">
                Quick answers for Game1Pro
              </div>
            </div>
          </div>
          <div className="hidden sm:block text-[10px] sm:text-xs text-slate-400 text-right">
            Need more help?{" "}
            <a
              href="mailto:gamesitegamer@gmail.com"
              className="text-emerald-300 hover:text-emerald-200 underline underline-offset-2"
            >
              Contact support
            </a>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-4 pb-6 pt-4 gap-4">
        {/* Intro strip */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900/80 p-3.5 sm:p-4 text-[11px] sm:text-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <p className="text-slate-200 font-medium">
              Select a topic to see step-by-step help.
            </p>
            <p className="text-[10px] sm:text-[11px] text-slate-400">
              Account creating, referrals, add funds and withdraw — all explained
              in simple steps.
            </p>
          </div>
          <div className="text-[10px] text-emerald-300">
            Tip: Always double check account numbers before sending payments.
          </div>
        </section>

        {/* Articles list */}
        <section className="space-y-3">
          {articles.map((article) => (
            <article
              key={article.id}
              className="rounded-2xl border border-slate-800 bg-slate-900/80 p-3.5 sm:p-4 shadow-[0_0_16px_rgba(15,23,42,0.7)]"
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <h2 className="text-xs sm:text-sm font-semibold text-slate-50">
                  {article.title}
                </h2>
                <span className="text-[9px] sm:text-[10px] rounded-full bg-slate-800 px-2 py-0.5 text-slate-300 border border-slate-700">
                  {article.tag}
                </span>
              </div>

              <ol className="list-decimal list-inside space-y-0.5 text-[11px] sm:text-[12px] text-slate-300">
                {article.steps.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ol>

              {article.note && (
                <p className="mt-2 text-[10px] sm:text-[11px] text-emerald-300">
                  Note: {article.note}
                </p>
              )}
            </article>
          ))}
        </section>

        {/* Bottom contact hint for mobile */}
        <section className="sm:hidden rounded-2xl border border-slate-800 bg-slate-900/80 p-3 text-[10px] text-slate-400">
          Still need help? Email us at{" "}
          <a
            href="mailto:gamesitegamer@gmail.com"
            className="text-emerald-300 underline underline-offset-2"
          >
            gamesitegamer@gmail.com
          </a>
        </section>
      </main>
    </div>
  );
}

export default HelpPage;
