// src/About/AboutPage.jsx
import React from "react";

function AboutPage() {
  return (
    <div className="min-h-screen bg-[#040712] text-white flex flex-col">
      {/* MAIN CONTENT */}
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-4 pb-6 pt-4 gap-4">
        {/* Hero / Intro */}
        <section className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900/90 via-slate-900/70 to-emerald-900/40 p-4 sm:p-5 shadow-[0_0_24px_rgba(15,23,42,0.8)]">
          <h1 className="text-lg sm:text-xl font-bold mb-2">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-sky-400 to-amber-400 bg-clip-text text-transparent">
              Game1Pro
            </span>
          </h1>
          <p className="text-[11px] sm:text-sm text-slate-300 leading-relaxed">
            Game1Pro is a modern online gaming platform designed for fast,
            smooth and rewarding gameplay. Our goal is simple: give players a{" "}
            <span className="text-emerald-300 font-medium">
              clean, mobile-first experience
            </span>{" "}
            with fair odds, instant feedback and clear account controls.
          </p>
          <p className="mt-2 text-[11px] sm:text-sm text-slate-300 leading-relaxed">
            From crash-style games to live spins and casino classics, we keep
            the interface simple and powerful so you can do the real thing:
            <span className="text-emerald-300 font-medium">
              {" "}
              play, win and repeat.
            </span>
          </p>
        </section>

        {/* Highlights */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <InfoCard
            title="Mobile-First Design"
            body="Optimized for small screens with clean controls, quick navigation and fast loading so you can play anywhere."
          />
          <InfoCard
            title="0% Withdraw Fee"
            body="You keep what you win. Withdrawals are designed with 0% deduction from our side on approved payouts."
          />
          <InfoCard
            title="Transparent Add Funds"
            body="Add balance through local wallets and bank options with clear bonus slabs and no hidden charges."
          />
        </section>

        {/* Deposit / Withdraw Policy */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 sm:p-5 space-y-3">
          <h2 className="text-sm sm:text-base font-semibold">
            Add Fund & Withdraw Policy
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Add Funds */}
            <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/5 p-3.5 text-[11px] sm:text-sm space-y-1.5">
              <div className="flex items-center gap-2 mb-1">
                <span className="h-6 w-6 flex items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300 text-xs">
                  ₊
                </span>
                <span className="font-semibold text-emerald-200">
                  Add Funds (Deposit)
                </span>
              </div>
              <p className="text-slate-200">
                You can add balance using methods like JazzCash, Easypaisa,
                Sadapay, NayaPay and Binance as shown on the Add Balance screen.
              </p>
              <ul className="mt-1.5 space-y-0.5 text-emerald-200">
                <li>• 3% extra bonus on 100, 250, 500 PKR</li>
                <li>• 5% extra bonus on 1,000 PKR</li>
                <li>• 7% extra bonus on 3,000 &amp; 10,000 PKR</li>
              </ul>
              <p className="mt-1 text-[10px] text-emerald-100/80">
                Bonuses are promotional and can change in future campaigns, but
                are always shown clearly before you confirm.
              </p>
            </div>

            {/* Withdraw */}
            <div className="rounded-2xl border border-sky-500/40 bg-sky-500/5 p-3.5 text-[11px] sm:text-sm space-y-1.5">
              <div className="flex items-center gap-2 mb-1">
                <span className="h-6 w-6 flex items-center justify-center rounded-full bg-sky-500/20 text-sky-300 text-xs">
                  ⤓
                </span>
                <span className="font-semibold text-sky-200">
                  Withdraw (0% Deduct)
                </span>
              </div>
              <p className="text-slate-200">
                Game1Pro follows a simple rule for withdrawals:
              </p>
              <ul className="mt-1.5 space-y-0.5 text-sky-200">
                <li>• 0% deduction from our side on approved withdrawals</li>
                <li>• Payouts are sent to your verified wallet / account</li>
                <li>
                  • Processing time is up to{" "}
                  <span className="font-semibold">2 hours max</span> (usually
                  faster), depending on payment channel &amp; workload
                </li>
              </ul>
              <p className="mt-1 text-[10px] text-sky-100/80">
                Any third-party bank or wallet fees (if applied by their side)
                are not controlled by Game1Pro.
              </p>
            </div>
          </div>
        </section>

        {/* Referral + Basic Help */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 sm:p-5 space-y-3 text-[11px] sm:text-sm">
          <h2 className="text-sm sm:text-base font-semibold">
            Referral Rewards & Account Help
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Referral info */}
            <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/5 p-3 space-y-1.5">
              <h3 className="text-xs sm:text-sm font-semibold text-emerald-200">
                Earn with Referrals
              </h3>
              <p className="text-slate-300">
                Share your unique referral ID with friends. When they create
                their Game1Pro account and start playing through your referral,
                you receive a bonus.
              </p>
              <ul className="mt-1.5 space-y-0.5 text-emerald-200">
                <li>• Share your referral ID from your profile</li>
                <li>• Friend signs up and plays through your link</li>
                <li>• You get <span className="font-semibold">100 PKR</span> per valid referral</li>
              </ul>
              <p className="mt-1 text-[10px] text-emerald-100/80">
                Referral rules and abuse checks may apply to keep the system
                fair for everyone.
              </p>
            </div>

            {/* Account help reference */}
            <div className="rounded-2xl border border-slate-700 bg-slate-900 p-3 space-y-1.5">
              <h3 className="text-xs sm:text-sm font-semibold text-slate-100">
                Need Help with Your Account?
              </h3>
              <p className="text-slate-300">
                If you need step-by-step guidance for creating an account,
                understanding referrals, deposits or withdrawals, you can use
                the{" "}
                <span className="text-emerald-300 font-medium">
                  Help section
                </span>{" "}
                inside Game1Pro.
              </p>
              <p className="text-[10px] text-slate-400">
                Open the bottom navigation &gt; tap{" "}
                <span className="text-emerald-300 font-semibold">Help</span> to
                see detailed articles for common questions.
              </p>
            </div>
          </div>
        </section>

        {/* Fair Play / Safety */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 sm:p-5 space-y-3 text-[11px] sm:text-sm">
          <h2 className="text-sm sm:text-base font-semibold">
            Fair Play & Responsible Use
          </h2>
          <p className="text-slate-300">
            Game1Pro is built to give players a fair and transparent experience.
            Game screens are designed step-by-step: login, add balance, browse
            games, track notifications and review your activity so you always
            know what is happening with your account.
          </p>
          <p className="text-slate-300">
            We encourage players to{" "}
            <span className="text-emerald-300 font-medium">
              set personal limits
            </span>
            , avoid chasing losses, and only play with money they can afford to
            use for entertainment.
          </p>
        </section>

        {/* Contact / Support */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 sm:p-5">
          <h2 className="text-sm sm:text-base font-semibold mb-1.5">
            Contact & Support
          </h2>
          <p className="text-[11px] sm:text-sm text-slate-300 mb-2">
            For support, payment confirmation, account questions or feedback,
            you can reach us directly:
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-[11px] sm:text-sm">
            <div>
              <span className="text-slate-400">Email: </span>
              <a
                href="mailto:gamesitegamer@gmail.com"
                className="text-emerald-300 hover:text-emerald-200 underline underline-offset-2"
              >
                gamesitegamer@gmail.com
              </a>
            </div>
            <div className="text-[10px] sm:text-[11px] text-slate-400">
              Response window may vary based on traffic, but we try to respond
              as soon as possible.
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function InfoCard({ title, body }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-3.5 shadow-[0_0_16px_rgba(15,23,42,0.7)] text-[11px] sm:text-sm">
      <h3 className="font-semibold mb-1 text-slate-50">{title}</h3>
      <p className="text-slate-300 text-[11px] sm:text-[12px] leading-relaxed">
        {body}
      </p>
    </div>
  );
}

export default AboutPage;
