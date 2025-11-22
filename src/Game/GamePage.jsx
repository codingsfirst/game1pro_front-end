// src/Game/GamePage.jsx
import { Link, useParams, useNavigate } from "react-router-dom";
import { games } from "../data/games";

function GamePage() {
  const { gameId } = useParams();
  const navigate = useNavigate();

  const game = games.find((g) => g.id === gameId);

  if (!game) {
    return (
      <div className="min-h-screen bg-[#040712] text-white flex flex-col items-center justify-center px-4">
        <p className="mb-4 text-sm text-slate-300">
          Game not found for ID:{" "}
          <span className="text-emerald-400">{gameId}</span>
        </p>
        <Link
          to="/home"
          className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-900"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#040712] text-white flex flex-col">
      {/* simple top bar */}
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
          <div className="text-xs text-slate-400">
            Game1Pro • <span className="text-emerald-400">Live</span>
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-4 py-4 gap-4">
        {/* Game banner */}
        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80 shadow-[0_0_24px_rgba(15,23,42,0.9)]">
          <div className="relative h-52 w-full sm:h-64">
            <img
              src={game.image}
              alt={game.name}
              className="h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

            <div className="absolute left-4 bottom-4">
              <div className="mb-1 inline-flex items-center gap-2">
                {/* LIVE badge */}
                <span className="inline-flex items-center gap-1 rounded-full bg-red-500 px-1.5 py-0.5 sm:px-2 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wide text-white">
                  <span className="text-[9px] sm:text-[11px]">🔴</span>
                  <span className="hidden sm:inline">Live</span>
                </span>

                {/* High RTP badge */}
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500 px-1.5 py-0.5 sm:px-2 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wide text-slate-900">
                  <span className="text-[9px] sm:text-[11px]">🎯</span>
                  <span className="hidden sm:inline">High RTP</span>
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold">{game.name}</h1>
              <p className="text-[11px] sm:text-xs text-slate-300">
                Mode: {game.tag}
              </p>
            </div>
          </div>
        </div>

        {/* Just simple info, no demo/start buttons */}
        <section className="space-y-2 text-sm text-slate-300">
          <p>
            You are viewing{" "}
            <span className="text-emerald-300 font-semibold">{game.name}</span>{" "}
            on Game1Pro. This page is ready to connect with the real game engine
            / iframe / API when backend is integrated.
          </p>
          <p className="text-xs text-slate-500">
            Design note: as per requirement, no demo or start buttons are shown
            here — only game image, title, and labels (Live, High RTP).
          </p>
        </section>
      </main>
    </div>
  );
}

export default GamePage;
