// src/Notifications/NotificationsPage.jsx
import { useNavigate } from "react-router-dom";

const mockUser = {
  name: "Siku Handsome",
  userId: "G1P-102938",
};

const notifications = [
  {
    id: 1,
    title: "Welcome to Game1Pro!",
    message: "Your account has been created successfully.",
    time: "2 min ago",
    read: false,
  },
  {
    id: 2,
    title: "Bonus credited",
    message: "You received a 500 PKR welcome bonus.",
    time: "10 min ago",
    read: false,
  },
  {
    id: 3,
    title: "Match result update",
    message: "Your last bet has been settled.",
    time: "1 hour ago",
    read: true,
  },
  {
    id: 4,
    title: "Security reminder",
    message: "Never share your OTP or password with anyone.",
    time: "Yesterday",
    read: true,
  },
];

function NotificationsPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#040712] text-white flex flex-col">
      {/* DIFFERENT HEADER STYLE */}
      <header className="sticky top-0 z-20 bg-gradient-to-r from-emerald-600/90 via-sky-600/90 to-emerald-700/90 backdrop-blur border-b border-emerald-400/60">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-1 rounded-full bg-black/20 px-3 py-1 text-xs text-white"
          >
            <span className="text-sm">←</span>
            <span>Back</span>
          </button>
          <div className="text-sm sm:text-base font-semibold">
            Notifications
          </div>
          <div className="text-[10px] sm:text-xs text-emerald-50/90">
            {mockUser.userId}
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-4 pb-6 pt-3 gap-3">
        {/* Small profile strip */}
        <section className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900/80 px-3 py-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 via-sky-500 to-amber-400 text-xs font-bold">
            {mockUser.name[0]}
          </div>
          <div className="flex-1 min-w-0">
            <div className="truncate text-sm font-semibold">
              {mockUser.name}
            </div>
            <div className="text-[11px] text-slate-400">
              All game & account alerts
            </div>
          </div>
          <span className="rounded-full bg-emerald-500/10 border border-emerald-400/50 px-2 py-1 text-[10px] text-emerald-300">
            {notifications.filter((n) => !n.read).length} New
          </span>
        </section>

        {/* Notifications list */}
        <section className="flex-1 overflow-y-auto no-scrollbar space-y-2">
          {notifications.map((n) => (
            <article
              key={n.id}
              className={`rounded-2xl px-3 py-2.5 border ${
                n.read
                  ? "bg-slate-900/70 border-slate-800"
                  : "bg-slate-900 border-emerald-500/60 shadow-[0_0_18px_rgba(16,185,129,0.6)]"
              }`}
            >
              <div className="flex items-start gap-2">
                {/* dot / icon */}
                <div className="mt-1">
                  {n.read ? (
                    <span className="h-2 w-2 rounded-full bg-slate-600 inline-block" />
                  ) : (
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.9)] inline-block" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-xs sm:text-sm font-semibold truncate">
                      {n.title}
                    </h3>
                    <span className="text-[10px] text-slate-400">
                      {n.time}
                    </span>
                  </div>
                  <p className="mt-0.5 text-[11px] sm:text-xs text-slate-300">
                    {n.message}
                  </p>
                  {!n.read && (
                    <span className="mt-1 inline-flex items-center rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] text-emerald-300 border border-emerald-400/50">
                      Unread
                    </span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}

export default NotificationsPage;
