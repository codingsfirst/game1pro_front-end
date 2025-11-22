// src/Game/GamesListPage.jsx
import { useNavigate } from "react-router-dom";
import { games } from "../data/games";
import ProfileCard from "../ProfileCard/ProfileCard"; // 👈 yahan se lo
import { GameCard } from "../Home/HomePage"; // 👈 GameCard HomePage se

function GamesListPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#040712] text-white flex flex-col">
      {/* Simple header (no main navbar) */}
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
          <div className="text-sm sm:text-base font-semibold">All Games</div>
          <div className="text-[10px] sm:text-xs text-slate-400">
            Game1Pro
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-4 pb-6 pt-3 gap-3">
        {/* Profile card (default mock user from ProfileCard) */}
        <section>
          <ProfileCard />
        </section>

        <section className="flex-1 flex flex-col">
          <div className="mb-2">
            <h2 className="text-sm font-semibold text-slate-100 sm:text-base">
              Browse all games
            </h2>
            <p className="text-[11px] text-slate-400 sm:text-xs">
              Tap any game to open its page
            </p>
          </div>

          <div className="no-scrollbar grid grid-cols-3 gap-2 overflow-y-auto pb-2 sm:gap-3">
            {games.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default GamesListPage;
