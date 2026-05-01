import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, RefreshCw, Settings as SettingsIcon, ShieldCheck, Subtitles, HelpCircle, LogOut, ChevronRight, ChevronLeft, Check } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import BottomNav from "@/components/BottomNav";
import TopBar from "@/components/TopBar";
import { useAuth, AVATARS } from "@/contexts/AuthContext";

type View = "main" | "edit" | "mal" | "player" | "security" | "subtitle" | "help";

const Profile = () => {
  const { user, isLoggedIn, logout, setAvatar } = useAuth();
  const navigate = useNavigate();
  const [view, setView] = useState<View>("main");
  const [username, setUsername] = useState(user?.username || "");

  if (!isLoggedIn || !user) {
    return (
      <div className="min-h-screen bg-background pb-14 md:pb-0">
        <Sidebar />
        <BottomNav />
        <div className="md:ml-[70px]">
          <TopBar />
          <div className="flex items-center justify-center h-[60vh]">
            <div className="text-center">
              <User size={48} className="text-muted-foreground mx-auto mb-4" />
              <p className="text-foreground font-display font-bold text-lg mb-2">Sign in to view your profile</p>
              <Link to="/signin" className="bg-primary text-primary-foreground text-sm font-semibold px-5 py-2 rounded-md hover:opacity-90 transition inline-block">Sign In</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const items = [
    { id: "edit" as View, icon: User, label: "Edit profile" },
    { id: "mal" as View, icon: RefreshCw, label: "MAL Import / Export" },
    { id: "player" as View, icon: SettingsIcon, label: "Player Settings" },
    { id: "security" as View, icon: ShieldCheck, label: "Security" },
    { id: "subtitle" as View, icon: Subtitles, label: "Subtitle settings" },
    { id: "help" as View, icon: HelpCircle, label: "Help center" },
  ];

  const BackHeader = ({ title }: { title: string }) => (
    <div className="flex items-center gap-3 mb-6">
      <button onClick={() => setView("main")} className="text-foreground hover:text-primary"><ChevronLeft size={22} /></button>
      <h2 className="text-foreground font-display font-bold text-lg">{title}</h2>
    </div>
  );

  return (
    <div className="min-h-screen bg-background pb-14 md:pb-0">
      <Sidebar />
      <BottomNav />
      <div className="md:ml-[70px]">
        <TopBar />
        <div className="px-4 md:px-6 py-6 max-w-2xl mx-auto">
          {view === "main" && (
            <>
              <h1 className="text-foreground font-display font-bold text-2xl mb-6">Profile</h1>
              <div className="flex items-center gap-4 mb-8">
                <img src={user.avatar} alt={user.username} className="w-20 h-20 rounded-full border-2 border-primary/40" />
                <div>
                  <h2 className="text-foreground font-display font-bold text-xl">{user.username}</h2>
                  <p className="text-muted-foreground text-sm">{user.email}</p>
                </div>
              </div>
              <div className="space-y-2">
                {items.map(({ id, icon: Icon, label }) => (
                  <button
                    key={id}
                    onClick={() => setView(id)}
                    className="w-full flex items-center justify-between bg-card border border-border rounded-lg px-4 py-4 hover:bg-secondary transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-foreground"><Icon size={18} /></div>
                      <span className="text-foreground font-semibold">{label}</span>
                    </div>
                    <ChevronRight size={18} className="text-muted-foreground" />
                  </button>
                ))}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-4 mt-4 text-destructive font-semibold hover:bg-destructive/10 rounded-lg transition-colors"
                >
                  <LogOut size={18} /> Log out
                </button>
              </div>
            </>
          )}

          {view === "edit" && (
            <>
              <BackHeader title="Edit profile" />
              <div className="space-y-6">
                <div>
                  <p className="text-foreground font-semibold text-sm mb-3">Avatar</p>
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                    {AVATARS.map((av) => (
                      <button
                        key={av}
                        onClick={() => setAvatar(av)}
                        className={`relative w-full aspect-square rounded-full overflow-hidden border-2 transition ${user.avatar === av ? "border-primary" : "border-transparent hover:border-muted-foreground"}`}
                      >
                        <img src={av} alt="" className="w-full h-full" />
                        {user.avatar === av && (
                          <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                            <Check size={20} className="text-primary" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-foreground font-semibold text-sm mb-1 block">Username</label>
                  <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-secondary text-foreground text-sm rounded-md px-3 py-2.5 outline-none"
                  />
                </div>
                <div>
                  <label className="text-foreground font-semibold text-sm mb-1 block">Email</label>
                  <input value={user.email} disabled className="w-full bg-muted text-muted-foreground text-sm rounded-md px-3 py-2.5 outline-none" />
                </div>
                <button onClick={() => setView("main")} className="bg-primary text-primary-foreground font-semibold text-sm px-5 py-2.5 rounded-md hover:opacity-90 transition">Save</button>
              </div>
            </>
          )}

          {view === "mal" && (
            <>
              <BackHeader title="MAL Import / Export" />
              <div className="flex gap-2 mb-4 border-b border-border">
                <button className="text-primary font-semibold text-sm px-3 py-2 border-b-2 border-primary">Import</button>
                <button className="text-muted-foreground text-sm px-3 py-2">Export</button>
              </div>
              <p className="text-muted-foreground text-xs mb-2">If an anime is available in your MAL list but not on the site, it will not be imported.</p>
              <p className="text-muted-foreground text-xs mb-4">This process takes a moment, please be patient.</p>
              <label className="text-foreground font-semibold text-sm mb-1 block">Mal username</label>
              <input placeholder="MyAnimeList username" className="w-full bg-secondary text-foreground text-sm rounded-md px-3 py-2.5 outline-none mb-4" />
              <p className="text-foreground font-semibold text-sm mb-2">Stats</p>
              <div className="space-y-2 mb-6">
                {["Watching", "Plan to Watch", "Completed", "Dropped", "On-Hold"].map((s) => (
                  <label key={s} className="flex items-center gap-2 text-foreground text-sm">
                    <input type="checkbox" className="accent-primary" /> {s}
                  </label>
                ))}
              </div>
              <button className="w-full bg-primary text-primary-foreground font-semibold text-sm py-2.5 rounded-md hover:opacity-90 transition">Import</button>
            </>
          )}

          {view === "player" && (
            <>
              <BackHeader title="Player Settings" />
              <div className="space-y-3">
                {[
                  { label: "Auto Play Next Episode", value: true },
                  { label: "Auto Skip Intro", value: false },
                  { label: "Auto Skip Outro", value: false },
                  { label: "Default Quality", value: "1080p" },
                ].map((opt) => (
                  <div key={opt.label} className="flex items-center justify-between bg-card border border-border rounded-lg px-4 py-3">
                    <span className="text-foreground text-sm">{opt.label}</span>
                    <span className="text-muted-foreground text-xs">{String(opt.value)}</span>
                  </div>
                ))}
              </div>
            </>
          )}

          {view === "security" && (
            <>
              <BackHeader title="Security" />
              <div className="space-y-3">
                <div className="flex items-center justify-between bg-card border border-border rounded-lg px-4 py-3">
                  <span className="text-foreground text-sm">Remember me</span>
                  <input type="checkbox" defaultChecked className="accent-primary" />
                </div>
                <button className="w-full bg-primary text-primary-foreground font-semibold text-sm py-2.5 rounded-md hover:opacity-90 transition">Change password</button>
              </div>
            </>
          )}

          {view === "subtitle" && (
            <>
              <BackHeader title="Subtitle settings" />
              <p className="text-muted-foreground text-xs mb-4">Lorem Ipsum is simply dummy text.</p>
              <div className="space-y-3">
                {["Size", "Style", "Color", "Position", "Shadow", "Opacity"].map((s) => (
                  <div key={s} className="flex items-center justify-between bg-card border border-border rounded-lg px-4 py-3">
                    <span className="text-foreground text-sm">{s}</span>
                    <span className="text-muted-foreground text-xs">Default</span>
                  </div>
                ))}
                <button className="w-full bg-primary text-primary-foreground font-semibold text-sm py-2.5 rounded-md hover:opacity-90 transition">Save</button>
              </div>
            </>
          )}

          {view === "help" && (
            <>
              <BackHeader title="Help center" />
              <p className="text-muted-foreground text-sm">For support, please contact us via Discord or email.</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
