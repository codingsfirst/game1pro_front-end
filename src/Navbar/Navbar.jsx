// src/Navbar/Navbar.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../api/auth";

function Navbar() {
  const [navOpen, setNavOpen] = useState(false);
  const [activeRoute, setActiveRoute] = useState("home"); // 👈 pehle define
  const navigate = useNavigate();

  const hasNotifications = activeRoute === "home"; // 👈 ab yahan safe hai
  const navItems = ["Home", "Games", "About", "Help", "Logout"];

  const handleNavClick = (item) => {
    const route = item.toLowerCase();
    if (route === "logout") {
      logoutUser();
      setActiveRoute("home");
      setNavOpen(false);
      navigate("/auth");
      return;
    }
    setActiveRoute(route);
    setNavOpen(false);

    if (route === "home") navigate("/home");
    else if (route === "games") navigate("/games");
    else if (route === "about") navigate("/about");
    else if (route === "help")  navigate("/help"); // ya future help screen
    else if (route === "logout") navigate("/auth");
  };

  return (
    <>
      {/* TOP NAVBAR ONLY */}
      <header className="sticky top-0 z-40 border-b border-slate-800 bg-[#040712]/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          {/* Left: Logo + name */}
          <div className="flex items-center gap-2" onClick={()=>navigate("/home")}>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 via-sky-500 to-amber-400 shadow-[0_0_18px_rgba(34,197,94,0.7)] text-xs font-black tracking-tight">
              G1
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold sm:text-base" style={{color:"white"}}>Game1Pro</div>
              <div className="text-[10px] text-slate-400 sm:text-[11px]">
                Play • Win • Repeat
              </div>
            </div>
          </div>

          {/* Right: Notification + nav */}
          <div className="flex items-center gap-3">
            {/* Notification icon */}
            <button
              type="button"
              onClick={() => navigate("/notifications")}
              className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-700 bg-slate-900/80 text-slate-200 hover:border-emerald-400 transition"
            >
              <span className="text-lg">🔔</span>
              {hasNotifications && (
                <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.9)] animate-pulse" />
              )}
            </button>

            {/* Desktop nav */}
            <nav className="hidden gap-2 text-xs sm:text-sm md:flex">
              {navItems.map((item) => {
                const route = item.toLowerCase();
                const isActive = activeRoute === route;
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => handleNavClick(item)}
                    className={`rounded-full px-3 py-1.5 font-medium transition ${
                      isActive
                        ? "bg-emerald-500 text-slate-900 shadow-[0_0_14px_rgba(16,185,129,0.8)]"
                        : "bg-slate-800/60 text-slate-200 hover:bg-slate-700/80"
                    }`}
                  >
                    {item}
                  </button>
                );
              })}
            </nav>

            {/* Mobile nav toggle */}
            <button
              type="button"
              onClick={() => setNavOpen((v) => !v)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-700 bg-slate-900/80 text-slate-200 hover:border-emerald-400 md:hidden"
            >
              <span className="text-lg">{navOpen ? "✕" : "☰"}</span>
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE SIDEBAR OVERLAY */}
      {navOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <button
            type="button"
            onClick={() => setNavOpen(false)}
            className="h-full flex-1 bg-black/50 backdrop-blur-sm"
          />
          <div className="h-full w-3/4 max-w-xs bg-[#050816] border-l border-slate-800 shadow-[0_0_30px_rgba(0,0,0,0.8)] flex flex-col">
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 via-sky-500 to-amber-400 text-[11px] font-black">
                  G1
                </div>
                <div className="leading-tight">
                  <div className="text-xs font-semibold">Game1Pro</div>
                  <div className="text-[10px] text-slate-400">
                    Quick Navigation
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setNavOpen(false)}
                className="h-8 w-8 flex items-center justify-center rounded-full bg-slate-900/80 border border-slate-700 text-slate-200"
              >
                ✕
              </button>
            </div>

            <nav className="flex-1 px-4 py-3 space-y-2 text-sm">
              {navItems.map((item) => {
                const route = item.toLowerCase();
                const isActive = activeRoute === route;
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => handleNavClick(item)}
                    className={`flex w-full items-center justify-between rounded-xl px-3 py-2 font-medium transition ${
                      isActive
                        ? "bg-gradient-to-r from-emerald-500 to-sky-500 text-slate-900 shadow-[0_0_16px_rgba(16,185,129,0.8)]"
                        : "bg-slate-900/80 text-slate-100 hover:bg-slate-800"
                    }`}
                  >
                    <span>{item}</span>
                    {item === "Logout" ? (
                      <span className="text-xs">⏻</span>
                    ) : (
                      <span className="text-xs text-emerald-300/80">›</span>
                    )}
                  </button>
                );
              })}
            </nav>

            <div className="border-t border-slate-800 px-4 py-3 text-[11px] text-slate-400">
              Logged in as <span className="text-emerald-300">G1P-102938</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
