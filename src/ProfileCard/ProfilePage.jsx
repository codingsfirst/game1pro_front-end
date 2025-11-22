// src/Profile/ProfilePage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
function getStoredUser() {
  try {
    const raw = localStorage.getItem("g1p_user");
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return null;
}

function getAddFundHistory() {
  try {
    const raw = localStorage.getItem("g1p_addfund_history");
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return [];
}

const mockProfile = {
  name: "Siku Handsome",
  userId: "G1P-102938",
  level: 12,
  avatarUrl: null,
  withdrawableAmount: 8200.5,
  withdrawStats: {
    success: 12,
    pending: 1,
    rejected: 0,
  },
};

const withdrawHistory = [
  {
    id: 1,
    type: "Withdraw",
    amount: 3000,
    account: "JazzCash - 0300-*****123",
    date: "2025-11-10",
    status: "Completed",
  },
  {
    id: 2,
    type: "Withdraw",
    amount: 2000,
    account: "Easypaisa - 0311-*****456",
    date: "2025-11-12",
    status: "Pending",
  },
  {
    id: 3,
    type: "Withdraw",
    amount: 1500,
    account: "Bank - Meezan ****789",
    date: "2025-11-05",
    status: "Completed",
  },
];

const addFundHistory = [
  {
    id: 1,
    type: "Add Fund",
    amount: 5000,
    account: "JazzCash - 0300-*****123",
    date: "2025-11-08",
    status: "Completed",
  },
  {
    id: 2,
    type: "Add Fund",
    amount: 1000,
    account: "Binance - USDT TRC20",
    date: "2025-11-03",
    status: "Completed",
  },
];

function ProfilePage() {
  const navigate = useNavigate();
const storedUser = getStoredUser();
 const localAddFundHistory = getAddFundHistory();
  const effectiveAddFundHistory = localAddFundHistory.length > 0 ? localAddFundHistory : addFundHistory;
  // history tab: 'withdraw' | 'addfund' | 'banks'
  const [activeTab, setActiveTab] = useState("withdraw");

  // profile & security form state (UI only for now)
  const [displayName, setDisplayName] = useState(mockProfile.name);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // bank / wallet form + CRUD state
  const [bankName, setBankName] = useState("");
  const [bankAccountName, setBankAccountName] = useState("");
  const [bankAccountNumber, setBankAccountNumber] = useState("");
  const [savedAccounts, setSavedAccounts] = useState([
    {
      id: 1,
      bankName: "JazzCash",
      bankAccountName: "Siku Handsome",
      bankAccountNumber: "0300-*****123",
    },
    {
      id: 2,
      bankName: "Easypaisa",
      bankAccountName: "Siku Handsome",
      bankAccountNumber: "0311-*****456",
    },
  ]); // max 3 allowed
  const [bankAlert, setBankAlert] = useState(null); // {type, message}
  const [editingAccountId, setEditingAccountId] = useState(null); // null = create, id = edit

  const handleProfileSave = (e) => {
    e.preventDefault();
    console.log("Profile update:", {
      displayName,
      currentPassword,
      newPassword,
      confirmPassword,
    });
    // TODO: backend integration
  };

  const handleBankSave = (e) => {
    e.preventDefault();
    setBankAlert(null);

    if (!bankName || !bankAccountName || !bankAccountNumber) {
      setBankAlert({
        type: "error",
        message:
          "Please fill bank / wallet name, holder name and account number.",
      });
      return;
    }

    // AGAR naya account add ho raha ho (edit nahi)
    if (!editingAccountId && savedAccounts.length >= 3) {
      setBankAlert({
        type: "error",
        message: "You can save maximum 3 payout accounts only.",
      });
      return;
    }

    if (editingAccountId) {
      // UPDATE
      const updated = savedAccounts.map((acc) =>
        acc.id === editingAccountId
          ? {
              ...acc,
              bankName,
              bankAccountName,
              bankAccountNumber,
            }
          : acc
      );
      setSavedAccounts(updated);
      setEditingAccountId(null);
      setBankAlert({
        type: "success",
        message: "Account updated successfully.",
      });
    } else {
      // CREATE
      const newAccount = {
        id: Date.now(),
        bankName,
        bankAccountName,
        bankAccountNumber,
      };
      setSavedAccounts((prev) => [...prev, newAccount]);
      setBankAlert({
        type: "success",
        message: "Bank / wallet account saved for future withdrawals.",
      });
    }

    // clear form
    setBankName("");
    setBankAccountName("");
    setBankAccountNumber("");
  };

  const handleBankEdit = (account) => {
    setBankAlert(null);
    setEditingAccountId(account.id);
    setBankName(account.bankName);
    setBankAccountName(account.bankAccountName);
    setBankAccountNumber(account.bankAccountNumber);
    // Optionally scroll to form
    const el = document.getElementById("bank-form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleBankDelete = (id) => {
    setBankAlert(null);
    setSavedAccounts((prev) => prev.filter((acc) => acc.id !== id));
    // agar same account edit ho raha tha to reset
    if (editingAccountId === id) {
      setEditingAccountId(null);
      setBankName("");
      setBankAccountName("");
      setBankAccountNumber("");
    }
  };

const formattedWithdrawable = (() => {
  const val =
    typeof profile.withdrawableAmount === "number"
      ? profile.withdrawableAmount
      : typeof profile.balance === "number"
      ? profile.balance
      : 0;

  return val.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
})();

const totalAddFundFormatted = (() => {
  const val =
    typeof profile.totalAddFund === "number" ? profile.totalAddFund : 0;

  return val.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
})();


  const currentHistory =
    activeTab === "withdraw"
      ? withdrawHistory
      : activeTab === "addfund"
      ? addFundHistory
      : []; // banks tab ke liye alag handle karenge

  return (
    <div className="min-h-screen bg-[#040712] text-white flex flex-col">
      {/* HEADER */}
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
            <div className="text-sm sm:text-base font-semibold">Profile</div>
            <div className="mt-0.5 text-[10px] text-slate-400">
              {mockProfile.userId}
            </div>
          </div>

          <div className="text-[10px] sm:text-xs text-slate-400 text-right">
            Game1Pro
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-4 pb-6 pt-3 gap-4">
        {/* TOP PROFILE CARD */}
        <section className="rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-emerald-900/40 p-4 sm:p-5 shadow-[0_0_26px_rgba(15,23,42,0.9)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Left: Avatar + info */}
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="relative">
              <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-2xl bg-gradient-to-br from-emerald-500 via-sky-500 to-amber-400 p-[2px] shadow-[0_0_18px_rgba(34,197,94,0.8)]">
                <div className="flex h-full w-full items-center justify-center rounded-2xl bg-slate-950 text-xl font-bold">
                  {mockProfile.name[0]}
                </div>
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(34,197,94,0.9)]" />
            </div>

            <div className="flex flex-col gap-0.5">
              <div className="text-sm sm:text-base font-semibold truncate">
                {mockProfile.name}
              </div>
              <div className="text-[11px] text-slate-300">
                ID: {mockProfile.userId}
              </div>
              <div className="inline-flex items-center gap-1 rounded-full bg-slate-900/80 border border-emerald-500/50 px-2 py-0.5 text-[10px] text-emerald-200">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Level {mockProfile.level}
              </div>
            </div>
          </div>

          {/* Right: withdrawable balance */}
          <div className="sm:text-right text-sm">
            <div className="text-[11px] sm:text-xs text-slate-300">
              Withdrawable Amount
            </div>
            <div className="flex sm:justify-end items-baseline gap-1 mt-0.5">
              <span className="text-[11px] text-emerald-300 sm:text-xs">
                PKR
              </span>
              <span className="bg-gradient-to-r from-emerald-400 via-sky-400 to-amber-300 bg-clip-text text-base sm:text-lg font-semibold text-transparent">
                {formattedWithdrawable}
              </span>
            </div>
            <div className="mt-1 text-[10px] text-slate-400">
              You can request withdraw up to this amount.
            </div>
          </div>
        </section>

        {/* WITHDRAW STATS */}
        <section className="grid grid-cols-3 gap-2 sm:gap-3 text-[11px] sm:text-xs">
          <StatCard
            label="Successful"
            value={mockProfile.withdrawStats.success}
            tone="success"
          />
          <StatCard
            label="Pending"
            value={mockProfile.withdrawStats.pending}
            tone="pending"
          />
          <StatCard
            label="Rejected"
            value={mockProfile.withdrawStats.rejected}
            tone="rejected"
          />
        </section>

        {/* HISTORY + SAVED BANKS TABS */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900/80 p-3.5 sm:p-4 space-y-3">
          <div className="flex items-center justify-between gap-2 mb-1">
            <h2 className="text-sm font-semibold">Profile History</h2>

            {/* Tabs: Withdraw / Add Fund / Saved Banks */}
            <div className="inline-flex rounded-full bg-slate-800/80 p-0.5 text-[11px] sm:text-xs">
              <button
                type="button"
                onClick={() => setActiveTab("withdraw")}
                className={`px-2.5 py-1 rounded-full font-medium transition ${
                  activeTab === "withdraw"
                    ? "bg-emerald-500 text-slate-900 shadow-[0_0_14px_rgba(16,185,129,0.8)]"
                    : "text-slate-300"
                }`}
              >
                Withdraw
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("addfund")}
                className={`px-2.5 py-1 rounded-full font-medium transition ${
                  activeTab === "addfund"
                    ? "bg-sky-500 text-slate-900 shadow-[0_0_14px_rgba(56,189,248,0.7)]"
                    : "text-slate-300"
                }`}
              >
                Add Fund
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("banks")}
                className={`px-2.5 py-1 rounded-full font-medium transition ${
                  activeTab === "banks"
                    ? "bg-amber-500 text-slate-900 shadow-[0_0_14px_rgba(245,158,11,0.7)]"
                    : "text-slate-300"
                }`}
              >
                Saved Banks
              </button>
            </div>
          </div>

          {/* CONTENT by tab */}
          {activeTab === "banks" ? (
            // Saved Banks TABLE
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
              <table className="min-w-full text-[10px] sm:text-xs">
                <thead className="bg-slate-900/80 text-slate-300">
                  <tr>
                    <th className="px-2 py-2 text-left font-medium">
                      Bank / Wallet
                    </th>
                    <th className="px-2 py-2 text-left font-medium">
                      Holder Name
                    </th>
                    <th className="px-2 py-2 text-left font-medium">
                      Account / Number
                    </th>
                    <th className="px-2 py-2 text-left font-medium">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {savedAccounts.map((acc) => (
                    <tr
                      key={acc.id}
                      className="border-t border-slate-800/80 hover:bg-slate-900/80"
                    >
                      <td className="px-2 py-2 text-slate-100">
                        {acc.bankName}
                      </td>
                      <td className="px-2 py-2 text-slate-300">
                        {acc.bankAccountName}
                      </td>
                      <td className="px-2 py-2 text-slate-400">
                        {acc.bankAccountNumber}
                      </td>
                      <td className="px-2 py-2">
                        <div className="flex gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleBankEdit(acc)}
                            className="rounded-full bg-emerald-500/10 border border-emerald-400/70 px-2 py-0.5 text-[9px] text-emerald-200 hover:bg-emerald-500/20"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => handleBankDelete(acc.id)}
                            className="rounded-full bg-rose-500/10 border border-rose-400/70 px-2 py-0.5 text-[9px] text-rose-200 hover:bg-rose-500/20"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {savedAccounts.length === 0 && (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-2 py-3 text-center text-slate-400"
                      >
                        No bank / wallet saved yet. Add accounts from the
                        Profile &amp; Security section below.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            // Withdraw / Add Fund history tables
            <>
              <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
                <table className="min-w-full text-[10px] sm:text-xs">
                  <thead className="bg-slate-900/80 text-slate-300">
                    <tr>
                      <th className="px-2 py-2 text-left font-medium">Type</th>
                      <th className="px-2 py-2 text-left font-medium">
                        Amount
                      </th>
                      <th className="px-2 py-2 text-left font-medium">
                        Account / Wallet
                      </th>
                      <th className="px-2 py-2 text-left font-medium">
                        Date
                      </th>
                      <th className="px-2 py-2 text-left font-medium">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentHistory.map((row) => (
                      <tr
                        key={row.id}
                        className="border-t border-slate-800/80 hover:bg-slate-900/80"
                      >
                        <td className="px-2 py-2 text-slate-100">
                          {row.type}
                        </td>
                        <td className="px-2 py-2 text-emerald-300">
                          {row.amount.toLocaleString()} PKR
                        </td>
                        <td className="px-2 py-2 text-slate-300">
                          {row.account}
                        </td>
                        <td className="px-2 py-2 text-slate-400">
                          {row.date}
                        </td>
                        <td className="px-2 py-2">
                          <StatusPill status={row.status} />
                        </td>
                      </tr>
                    ))}
                    {currentHistory.length === 0 && (
                      <tr>
                        <td
                          colSpan={5}
                          className="px-2 py-3 text-center text-slate-400"
                        >
                          No history found yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <p className="text-[10px] text-slate-400">
                History shows your recent add fund and withdraw requests with
                their status. For detailed support, you can contact Game1Pro
                support.
              </p>
            </>
          )}
        </section>

        {/* PROFILE & SECURITY + BANK CRUD */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900/80 p-3.5 sm:p-4 space-y-3 text-[11px] sm:text-sm">
          <h2 className="text-sm sm:text-base font-semibold mb-1">
            Profile &amp; Security
          </h2>

          {/* PROFILE FORM */}
          <form
            onSubmit={handleProfileSave}
            className="space-y-3 rounded-2xl border border-slate-800 bg-slate-950/70 p-3 sm:p-4"
          >
            {/* Profile picture (dummy) */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-2xl bg-gradient-to-br from-emerald-500 via-sky-500 to-amber-400 p-[2px]">
                  <div className="flex h-full w-full items-center justify-center rounded-2xl bg-slate-950 text-lg font-bold">
                    {mockProfile.name[0]}
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-xs sm:text-sm font-medium text-slate-100">
                  Profile Picture
                </div>
                <label className="inline-flex items-center gap-2 text-[10px] sm:text-xs text-emerald-300 cursor-pointer">
                  <span className="rounded-full bg-emerald-500/10 border border-emerald-400/60 px-3 py-1">
                    Change Photo
                  </span>
                  <input type="file" accept="image/*" className="hidden" />
                  <span className="text-slate-400">
                    (Dummy UI, will connect to backend)
                  </span>
                </label>
              </div>
            </div>

            {/* Name */}
            <div className="space-y-1.5">
              <label className="text-xs sm:text-sm text-slate-200">
                Profile Name
              </label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="block w-full rounded-2xl border border-slate-700 bg-slate-900/80 px-3 py-2 text-xs sm:text-sm text-slate-50 placeholder:text-slate-500 outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-500 transition"
                placeholder="Enter your display name"
              />
            </div>

            {/* Passwords */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
              <div className="space-y-1.5">
                <label className="text-xs sm:text-sm text-slate-200">
                  Current Password
                </label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="block w-full rounded-2xl border border-slate-700 bg-slate-900/80 px-3 py-2 text-xs sm:text-sm text-slate-50 placeholder:text-slate-500 outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-500 transition"
                  placeholder="Enter current password"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs sm:text-sm text-slate-200">
                  New Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="block w-full rounded-2xl border border-slate-700 bg-slate-900/80 px-3 py-2 text-xs sm:text-sm text-slate-50 placeholder:text-slate-500 outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-500 transition"
                  placeholder="Enter new password"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs sm:text-sm text-slate-200">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="block w-full rounded-2xl border border-slate-700 bg-slate-900/80 px-3 py-2 text-xs sm:text-sm text-slate-50 placeholder:text-slate-500 outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-500 transition"
                  placeholder="Re-enter new password"
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-1 w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 via-sky-500 to-amber-400 px-4 py-2.5 text-sm sm:text-base font-semibold text-slate-900 shadow-[0_0_22px_rgba(34,197,94,0.7)] hover:brightness-110 active:scale-[0.98] transition"
            >
              Save Profile Changes
            </button>
          </form>

          {/* BANK / WALLET ACCOUNT CRUD */}
          <form
            id="bank-form"
            onSubmit={handleBankSave}
            className="space-y-3 rounded-2xl border border-slate-800 bg-slate-950/70 p-3 sm:p-4"
          >
            <h3 className="text-xs sm:text-sm font-semibold text-slate-100">
              Saved Bank / Wallet for Withdraw
            </h3>

            {/* Alert message */}
            {bankAlert && (
              <div
                className={`text-[10px] sm:text-[11px] rounded-2xl px-3 py-2 border ${
                  bankAlert.type === "success"
                    ? "bg-emerald-500/10 border-emerald-400/70 text-emerald-200"
                    : "bg-rose-500/10 border-rose-400/70 text-rose-100"
                }`}
              >
                {bankAlert.message}
              </div>
            )}

            {/* Form fields */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
              <div className="space-y-1.5">
                <label className="text-xs sm:text-sm text-slate-200">
                  Bank / Wallet Name
                </label>
                <input
                  type="text"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  placeholder="e.g. JazzCash, Easypaisa, Meezan Bank"
                  className="block w-full rounded-2xl border border-slate-700 bg-slate-900/80 px-3 py-2 text-xs sm:text-sm text-slate-50 placeholder:text-slate-500 outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-500 transition"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs sm:text-sm text-slate-200">
                  Account Holder Name
                </label>
                <input
                  type="text"
                  value={bankAccountName}
                  onChange={(e) => setBankAccountName(e.target.value)}
                  placeholder="Name on the account"
                  className="block w-full rounded-2xl border border-slate-700 bg-slate-900/80 px-3 py-2 text-xs sm:text-sm text-slate-50 placeholder:text-slate-500 outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-500 transition"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs sm:text-sm text-slate-200">
                  Account / Wallet Number
                </label>
                <input
                  type="text"
                  value={bankAccountNumber}
                  onChange={(e) => setBankAccountNumber(e.target.value)}
                  placeholder="e.g. 0300-1234567 or IBAN"
                  className="block w-full rounded-2xl border border-slate-700 bg-slate-900/80 px-3 py-2 text-xs sm:text-sm text-slate-50 placeholder:text-slate-500 outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-500 transition"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <button
                type="submit"
                className="mt-1 w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 via-emerald-500 to-amber-400 px-4 py-2.5 text-sm sm:text-base font-semibold text-slate-900 shadow-[0_0_22px_rgba(56,189,248,0.7)] hover:brightness-110 active:scale-[0.98] transition disabled:opacity-60 disabled:cursor-not-allowed"
                disabled={
                  !editingAccountId && savedAccounts.length >= 3 // new add blocked if already 3
                }
              >
                {editingAccountId
                  ? "Update Saved Account"
                  : savedAccounts.length >= 3
                  ? "Maximum Accounts Saved"
                  : "Save Withdraw Account"}
              </button>

              {editingAccountId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingAccountId(null);
                    setBankName("");
                    setBankAccountName("");
                    setBankAccountNumber("");
                    setBankAlert(null);
                  }}
                  className="text-[10px] sm:text-[11px] text-slate-300 underline underline-offset-2"
                >
                  Cancel editing
                </button>
              )}
            </div>

            <p className="text-[10px] sm:text-[11px] text-slate-400">
              You can save up to{" "}
              <span className="text-emerald-300 font-semibold">3</span> payout
              accounts. We will use one of these when sending your approved
              withdrawals. Make sure details are 100% correct.
            </p>

            {/* Saved accounts list (compact cards) */}
            {savedAccounts.length > 0 && (
              <div className="mt-2 space-y-1.5">
                <div className="text-[10px] sm:text-[11px] text-slate-300">
                  Saved Accounts ({savedAccounts.length}/3)
                </div>
                <div className="space-y-1.5">
                  {savedAccounts.map((acc) => (
                    <div
                      key={acc.id}
                      className="rounded-2xl border border-slate-800 bg-slate-900/90 px-3 py-2 text-[10px] sm:text-[11px] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-slate-100 truncate">
                          {acc.bankName}
                        </div>
                        <div className="text-slate-300 truncate">
                          {acc.bankAccountName}
                        </div>
                        <div className="text-slate-400 truncate">
                          {acc.bankAccountNumber}
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 sm:flex-row flex-row-reverse">
                        <span className="text-[9px] text-emerald-300 sm:text-right">
                          Ready for withdraw
                        </span>
                        <button
                          type="button"
                          onClick={() => handleBankEdit(acc)}
                          className="rounded-full bg-emerald-500/10 border border-emerald-400/70 px-2 py-0.5 text-[9px] text-emerald-200 hover:bg-emerald-500/20"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleBankDelete(acc.id)}
                          className="rounded-full bg-rose-500/10 border border-rose-400/70 px-2 py-0.5 text-[9px] text-rose-200 hover:bg-rose-500/20"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </form>
        </section>
      </main>
    </div>
  );
}

function StatCard({ label, value, tone }) {
  let colorClasses =
    "border-slate-700 bg-slate-900/80 text-slate-200 shadow-[0_0_12px_rgba(15,23,42,0.8)]";
  if (tone === "success")
    colorClasses =
      "border-emerald-500/50 bg-emerald-500/10 text-emerald-100 shadow-[0_0_14px_rgba(16,185,129,0.7)]";
  if (tone === "pending")
    colorClasses =
      "border-amber-500/50 bg-amber-500/10 text-amber-100 shadow-[0_0_14px_rgba(245,158,11,0.6)]";
  if (tone === "rejected")
    colorClasses =
      "border-rose-500/50 bg-rose-500/10 text-rose-100 shadow-[0_0_14px_rgba(244,63,94,0.6)]";

  return (
    <div
      className={`rounded-2xl border px-3 py-2 flex flex-col gap-0.5 ${colorClasses}`}
    >
      <span className="text-[10px] sm:text-[11px]">{label}</span>
      <span className="text-sm sm:text-base font-semibold">{value}</span>
    </div>
  );
}

function StatusPill({ status }) {
  let cls =
    "bg-slate-800 text-slate-200 border border-slate-700 text-[9px] sm:text-[10px] px-2 py-0.5 rounded-full inline-flex items-center justify-center";

  if (status === "Completed") {
    cls =
      "bg-emerald-500/15 text-emerald-200 border border-emerald-400/60 text-[9px] sm:text-[10px] px-2 py-0.5 rounded-full inline-flex items-center justify-center";
  } else if (status === "Pending") {
    cls =
      "bg-amber-500/15 text-amber-200 border border-amber-400/60 text-[9px] sm:text-[10px] px-2 py-0.5 rounded-full inline-flex items-center justify-center";
  } else if (status === "Rejected") {
    cls =
      "bg-rose-500/15 text-rose-200 border border-rose-400/60 text-[9px] sm:text-[10px] px-2 py-0.5 rounded-full inline-flex items-center justify-center";
  }

  return <span className={cls}>{status}</span>;
}

export default ProfilePage;
