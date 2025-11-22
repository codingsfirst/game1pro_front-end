// src/Home/HomePage.jsx
import { Link, useNavigate } from "react-router-dom";
import { games as mockGames } from "../data/games";
import ProfileCard from "../ProfileCard/ProfileCard";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#040712] text-white flex flex-col">
      <section className="mb-4 mt-1">
        <ProfileCard />
      </section>

      {/* MAIN CONTENT */}
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-4 pb-6 pt-3">
        {/* GAMES SECTION */}
        <section className="flex-1">
          <div className="mb-2 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-slate-100 sm:text-base">
                Popular Games
              </h2>
              <p className="text-[11px] text-slate-400 sm:text-xs">
                Tap a game to open its page
              </p>
            </div>
            <button
              type="button"
              onClick={() => navigate("/games")}
              className="rounded-full bg-slate-800/70 px-3 py-1 text-[11px] text-slate-200 hover:bg-slate-700/90"
            >
              View all
            </button>
          </div>
          {/* 3 per row, scrollable */}
          <div className="no-scrollbar grid max-h-[calc(100vh-260px)] grid-cols-3 gap-2 overflow-y-auto pb-2 sm:gap-3">
            {mockGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>

        </section>
      </main>
    </div>
  );
}

/* GAME CARD – exported for reuse */
export function GameCard({ game }) {
  return (
    <Link
      to={`/game/${game.id}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-slate-800 bg-slate-900/80 text-left shadow-[0_0_14px_rgba(15,23,42,0.8)] hover:border-emerald-400/80 hover:shadow-[0_0_20px_rgba(16,185,129,0.9)] transition-transform duration-150 hover:-translate-y-0.5"
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          src={game.image}
          alt={game.name}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform"
        />

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        {/* LIVE badge – mobile icon, desktop text */}
        <div className="absolute left-1.5 top-1.5 flex items-center gap-1 rounded-full bg-red-500/85 px-1.5 py-0.5 sm:px-2 sm:py-0.5 border border-red-400/70">
          <span className="text-[9px] sm:text-[10px]">🔴</span>
          <span className="hidden sm:inline text-[9px] font-semibold uppercase tracking-wide text-white">
            Live
          </span>
        </div>

        {/* High RTP badge – mobile icon, desktop text */}
        <div className="absolute right-1.5 top-1.5 flex items-center gap-1 rounded-full bg-emerald-500/90 px-1.5 py-0.5 sm:px-2 sm:py-0.5 border border-emerald-300/80">
          <span className="text-[9px] sm:text-[10px]">🎯</span>
          <span className="hidden sm:inline text-[9px] font-semibold uppercase tracking-wide text-slate-950">
            High RTP
          </span>
        </div>
      </div>

      <div className="flex-1 px-1.5 pb-1.5 pt-1">
        <div className="truncate text-[11px] font-semibold text-slate-100 sm:text-xs">
          {game.name}
        </div>
      </div>
    </Link>
  );
}

export default HomePage;
