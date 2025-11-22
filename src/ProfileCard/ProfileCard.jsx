// src/ProfileCard/ProfileCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

// Default mock user (fallback)
const defaultUser = {
  name: "Siku Handsome",
  username: "Siku Handsome",
  userId: "G1P-102938",
  _id: "G1P-102938",
  level: 12,
  balance: 12500.75,
  avatarUrl: null,
};

export default function ProfileCard({ user }) {
  // Try to read from localStorage first
  let storedUser = null;
  try {
    const raw = localStorage.getItem("g1p_user");
    if (raw) storedUser = JSON.parse(raw);
  } catch (error) {
    // ignore parse error; fallback will handle
  }

  const mergedUser = user || storedUser || defaultUser;

  return (
    <div className="mx-auto flex max-w-5xl px-4 pt-3">
      <Card user={mergedUser} />
    </div>
  );
}

export function Card({ user }) {
  const navigate = useNavigate();

  if (!user) return null;

  const handleOpenProfile = () => {
    navigate("/profile");
  };

  const displayName = user.username || user.name || "Guest Player";
  const displayId = user.userId || user._id || "N/A";
  const level = user.level || 1;
  const balanceNumber =
    typeof user.balance === "number" ? user.balance : Number(user.balance) || 0;

  const formattedBalance = balanceNumber.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <div className="relative flex items-center gap-3 rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-emerald-900/40 p-3 shadow-[0_0_24px_rgba(15,23,42,0.8)] w-full">
      {/* Avatar (clickable) */}
      <div
        className="relative cursor-pointer"
        onClick={handleOpenProfile}
        aria-hidden="true"
      >
        <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-emerald-500 via-sky-500 to-amber-400 p-[2px] shadow-[0_0_16px_rgba(34,197,94,0.7)] sm:h-14 sm:w-14">
          <div className="flex h-full w-full items-center justify-center rounded-2xl bg-slate-950 text-lg font-bold">
            {displayName?.[0] ?? "G"}
          </div>
        </div>
        <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(34,197,94,0.9)]" />
      </div>

      {/* Info (name/id bhi clickable) */}
      <div
        className="flex flex-1 flex-col justify-between cursor-pointer"
        onClick={handleOpenProfile}
        aria-hidden="true"
      >
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold sm:text-base">
              {displayName}
            </div>
            <div className="text-[11px] text-slate-400 sm:text-xs">
              ID: {displayId}
            </div>
          </div>
          <span className="hidden rounded-full bg-slate-800/70 px-2 py-1 text-[10px] text-slate-300 sm:inline">
            Level {level}
          </span>
        </div>

        <div className="mt-1 flex items-center justify-between">
          <div className="text-[11px] text-slate-400 sm:text-xs">
            Available Balance
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-[11px] text-emerald-300 sm:text-xs">
              PKR
            </span>
            <span className="bg-gradient-to-r from-emerald-400 via-sky-400 to-amber-300 bg-clip-text text-sm font-semibold text-transparent sm:text-base">
              {formattedBalance}
            </span>
          </div>
        </div>
      </div>

      {/* Add balance button */}
      <button
        type="button"
        className="absolute -right-0.5 -top-0.5 rounded-full bg-gradient-to-r from-emerald-500 to-sky-500 px-3 py-1 text-[10px] font-semibold text-slate-900 shadow-[0_0_14px_rgba(16,185,129,0.8)] hover:brightness-110 active:scale-[0.97] transition"
        onClick={() => navigate("/add-balance")}
      >
        + Add
      </button>
    </div>
  );
}
