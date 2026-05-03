import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User, RefreshCw, Settings as SettingsIcon, ShieldCheck, Subtitles,
  HelpCircle, LogOut, ChevronRight, ChevronLeft, Check, Upload, Download,
} from "lucide-react";
import Sidebar from "@/components/Sidebar";
import BottomNav from "@/components/BottomNav";
import TopBar from "@/components/TopBar";
import { Switch } from "@/components/ui/switch";
import { useAuth, AVATARS } from "@/contexts/AuthContext";
import { useList } from "@/contexts/ListContext";
import { toast } from "sonner";
import { fetchAnilistUserList, exportListToXml } from "@/lib/anilist";

type View = "main" | "edit" | "mal" | "player" | "security" | "subtitle" | "help";
type ImportTab = "import" | "export";
type ImportProvider = "mal" | "anilist" | "simkl";

const Profile = () => {
  const { user, isLoggedIn, logout, setAvatar } = useAuth();
  const { listItems, favorites, addToList } = useList();
  const navigate = useNavigate();
  const [view, setView] = useState<View>("main");
  const [username, setUsername] = useState(user?.username || "");

  // Import/Export state
  const [importTab, setImportTab] = useState<ImportTab>("import");
  const [importProvider, setImportProvider] = useState<ImportProvider>("mal");
  const [importUsername, setImportUsername] = useState("");
  const [importing, setImporting] = useState(false);

  // Player toggles
  const [autoplay, setAutoplay] = useState(true);
  const [skipIntro, setSkipIntro] = useState(false);
  const [skipOutro, setSkipOutro] = useState(false);
  const [quality, setQuality] = useState("1080p");

  // Security
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);

  // Subtitle settings
  const [subSize, setSubSize] = useState("Medium");
  const [subColor, setSubColor] = useState("White");
  const [subPosition, setSubPosition] = useState("Bottom");
  const [subStyle, setSubStyle] = useState("Default");
  const [subShadow, setSubShadow] = useState("Soft");
  const [subOpacity, setSubOpacity] = useState("100%");

  // Avatar upload
  const [customAvatars, setCustomAvatars] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem("yugen_custom_avatars") || "[]"); } catch { return []; }
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleLogout = () => { logout(); navigate("/"); };

  const items = [
    { id: "edit" as View, icon: User, label: "Edit profile" },
    { id: "mal" as View, icon: RefreshCw, label: "MAL / AniList / SIMKL Import / Export" },
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

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      toast("Image must be smaller than 2MB", { position: "top-right" });
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const url = reader.result as string;
      const next = [url, ...customAvatars].slice(0, 12);
      setCustomAvatars(next);
      localStorage.setItem("yugen_custom_avatars", JSON.stringify(next));
      setAvatar(url);
      toast("Avatar uploaded", { position: "top-right" });
    };
    reader.readAsDataURL(file);
  };

  const allAvatars = [...customAvatars, ...AVATARS];

  const runImport = async () => {
    if (!importUsername.trim()) {
      toast("Enter a username", { position: "top-right" });
      return;
    }
    setImporting(true);
    try {
      if (importProvider === "anilist") {
        const entries = await fetchAnilistUserList(importUsername.trim());
        const statusMap: Record<string, "plan-to-watch" | "watching" | "completed" | "dropped"> = {
          PLANNING: "plan-to-watch", CURRENT: "watching", REPEATING: "watching",
          COMPLETED: "completed", DROPPED: "dropped", PAUSED: "plan-to-watch",
        };
        let imported = 0;
        for (const e of entries) {
          const cat = statusMap[e.status];
          if (!cat) continue;
          const slug = (e.media.title.romaji || e.media.title.english || `anilist-${e.media.id}`).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
          const title = e.media.title.english || e.media.title.romaji || "Untitled";
          addToList(slug, title, "from-blue-600 to-purple-700", cat, e.media.episodes ?? undefined);
          imported++;
        }
        toast(`Imported ${imported} entries from AniList`, { position: "top-right" });
      } else {
        toast(`${importProvider.toUpperCase()} OAuth setup required — coming soon`, { position: "top-right" });
      }
    } catch (err) {
      toast(err instanceof Error ? err.message : "Import failed", { position: "top-right" });
    } finally {
      setImporting(false);
    }
  };

  const malFileRef = useRef<HTMLInputElement>(null);
  const handleMalFileImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const text = await file.text();
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(text, "application/xml");
      const animeNodes = Array.from(doc.getElementsByTagName("anime"));
      if (animeNodes.length === 0) throw new Error("No <anime> entries found");
      const statusMap: Record<string, "plan-to-watch" | "watching" | "completed" | "dropped"> = {
        "Plan to Watch": "plan-to-watch", "Watching": "watching",
        "Completed": "completed", "Dropped": "dropped", "On-Hold": "plan-to-watch",
      };
      let imported = 0;
      animeNodes.forEach((n) => {
        const title = n.getElementsByTagName("series_title")[0]?.textContent?.trim() || "";
        const status = n.getElementsByTagName("my_status")[0]?.textContent?.trim() || "";
        const epsTxt = n.getElementsByTagName("my_watched_episodes")[0]?.textContent;
        const eps = epsTxt ? parseInt(epsTxt, 10) : undefined;
        const cat = statusMap[status];
        if (!title || !cat) return;
        const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
        addToList(slug, title, "from-blue-600 to-purple-700", cat, eps);
        imported++;
      });
      toast(`Imported ${imported} entries from MAL file`, { position: "top-right" });
    } catch (err) {
      toast(err instanceof Error ? err.message : "Failed to parse MAL file", { position: "top-right" });
    } finally {
      if (malFileRef.current) malFileRef.current.value = "";
    }
  };

  const runExport = (format: "xml" | "json") => {
    const all = [
      ...favorites.map((f) => ({ title: f.title, status: "Favorite", episodesWatched: 0 })),
      ...listItems.map((i) => ({
        title: i.title,
        status: i.category === "plan-to-watch" ? "Plan to Watch" : i.category.charAt(0).toUpperCase() + i.category.slice(1),
        episodesWatched: i.episodesWatched || 0,
      })),
    ];
    const content = format === "xml" ? exportListToXml(all) : JSON.stringify(all, null, 2);
    const blob = new Blob([content], { type: format === "xml" ? "application/xml" : "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `yugen-list.${format}`;
    a.click();
    URL.revokeObjectURL(url);
    toast(`Exported ${all.length} entries`, { position: "top-right" });
  };

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
                  <button key={id} onClick={() => setView(id)} className="w-full flex items-center justify-between bg-card border border-border rounded-lg px-4 py-4 hover:bg-secondary transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-foreground"><Icon size={18} /></div>
                      <span className="text-foreground font-semibold">{label}</span>
                    </div>
                    <ChevronRight size={18} className="text-muted-foreground" />
                  </button>
                ))}
                <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-4 mt-4 text-destructive font-semibold hover:bg-destructive/10 rounded-lg transition-colors">
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
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-foreground font-semibold text-sm">Avatar</p>
                    <button onClick={() => fileInputRef.current?.click()} className="flex items-center gap-1.5 text-primary text-xs font-semibold hover:underline">
                      <Upload size={12} /> Upload your own
                    </button>
                    <input ref={fileInputRef} type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" />
                  </div>
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 max-h-[420px] overflow-y-auto pr-1">
                    {allAvatars.map((av, idx) => (
                      <button key={`${av}-${idx}`} onClick={() => setAvatar(av)}
                        className={`relative w-full aspect-square rounded-full overflow-hidden border-2 transition ${user.avatar === av ? "border-primary" : "border-transparent hover:border-muted-foreground"}`}>
                        <img src={av} alt="" className="w-full h-full object-cover" />
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
                  <input value={username} onChange={(e) => setUsername(e.target.value)} className="w-full bg-secondary text-foreground text-sm rounded-md px-3 py-2.5 outline-none" />
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
              <BackHeader title="MAL / AniList / SIMKL Import / Export" />

              {/* Provider tabs */}
              <div className="flex gap-2 mb-4 bg-card border border-border rounded-md p-1">
                {(["mal", "anilist", "simkl"] as ImportProvider[]).map((p) => (
                  <button key={p} onClick={() => setImportProvider(p)}
                    className={`flex-1 text-xs font-semibold px-3 py-2 rounded transition ${importProvider === p ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                    {p === "mal" ? "MyAnimeList" : p === "anilist" ? "AniList" : "SIMKL"}
                  </button>
                ))}
              </div>

              {/* Import / Export tabs */}
              <div className="flex gap-2 mb-4 border-b border-border">
                <button onClick={() => setImportTab("import")}
                  className={`text-sm px-3 py-2 border-b-2 transition ${importTab === "import" ? "text-primary border-primary font-semibold" : "text-muted-foreground border-transparent"}`}>
                  Import
                </button>
                <button onClick={() => setImportTab("export")}
                  className={`text-sm px-3 py-2 border-b-2 transition ${importTab === "export" ? "text-primary border-primary font-semibold" : "text-muted-foreground border-transparent"}`}>
                  Export
                </button>
              </div>

              {importTab === "import" ? (
                <>
                  <p className="text-muted-foreground text-xs mb-2">If an anime is in your {importProvider === "mal" ? "MAL" : importProvider === "anilist" ? "AniList" : "SIMKL"} list but not on the site, it will not be imported.</p>
                  {importProvider === "anilist" && (
                    <p className="text-muted-foreground text-xs mb-4">AniList uses the public GraphQL API — no login required for public profiles.</p>
                  )}
                  {importProvider !== "anilist" && (
                    <p className="text-muted-foreground text-xs mb-4">{importProvider.toUpperCase()} requires OAuth setup; entries will be merged with your existing list.</p>
                  )}
                  <label className="text-foreground font-semibold text-sm mb-1 block">{importProvider === "mal" ? "MAL" : importProvider === "anilist" ? "AniList" : "SIMKL"} username</label>
                  <input value={importUsername} onChange={(e) => setImportUsername(e.target.value)}
                    placeholder={`${importProvider === "mal" ? "MyAnimeList" : importProvider === "anilist" ? "AniList" : "SIMKL"} username`}
                    className="w-full bg-secondary text-foreground text-sm rounded-md px-3 py-2.5 outline-none mb-4" />
                  <p className="text-foreground font-semibold text-sm mb-2">Merge into</p>
                  <div className="space-y-2 mb-6">
                    {["Watching", "Plan to Watch", "Completed", "Dropped", "On-Hold"].map((s) => (
                      <label key={s} className="flex items-center gap-2 text-foreground text-sm">
                        <input type="checkbox" defaultChecked className="accent-primary" /> {s}
                      </label>
                    ))}
                  </div>
                  <button onClick={runImport} disabled={importing}
                    className="w-full bg-primary text-primary-foreground font-semibold text-sm py-2.5 rounded-md hover:opacity-90 transition disabled:opacity-50">
                    {importing ? "Importing..." : "Import"}
                  </button>
                </>
              ) : (
                <>
                  <p className="text-muted-foreground text-xs mb-4">
                    Export your YugenAnime list. The XML format is compatible with MyAnimeList; JSON works for AniList and SIMKL imports.
                  </p>
                  <div className="bg-card border border-border rounded-lg p-4 mb-4">
                    <p className="text-foreground text-sm font-semibold mb-1">Your list</p>
                    <p className="text-muted-foreground text-xs">
                      {favorites.length} favorites · {listItems.length} list entries
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <button onClick={() => runExport("xml")} className="flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold text-sm py-2.5 rounded-md hover:opacity-90 transition">
                      <Download size={14} /> Export XML
                    </button>
                    <button onClick={() => runExport("json")} className="flex items-center justify-center gap-2 bg-secondary text-foreground font-semibold text-sm py-2.5 rounded-md hover:bg-secondary/80 transition">
                      <Download size={14} /> Export JSON
                    </button>
                  </div>
                </>
              )}
            </>
          )}

          {view === "player" && (
            <>
              <BackHeader title="Player Settings" />
              <div className="space-y-3">
                <div className="flex items-center justify-between bg-card border border-border rounded-lg px-4 py-3">
                  <span className="text-foreground text-sm">Auto Play Next Episode</span>
                  <Switch checked={autoplay} onCheckedChange={setAutoplay} />
                </div>
                <div className="flex items-center justify-between bg-card border border-border rounded-lg px-4 py-3">
                  <span className="text-foreground text-sm">Auto Skip Intro</span>
                  <Switch checked={skipIntro} onCheckedChange={setSkipIntro} />
                </div>
                <div className="flex items-center justify-between bg-card border border-border rounded-lg px-4 py-3">
                  <span className="text-foreground text-sm">Auto Skip Outro</span>
                  <Switch checked={skipOutro} onCheckedChange={setSkipOutro} />
                </div>
                <div className="flex items-center justify-between bg-card border border-border rounded-lg px-4 py-3">
                  <span className="text-foreground text-sm">Default Quality</span>
                  <select value={quality} onChange={(e) => setQuality(e.target.value)} className="bg-secondary text-foreground text-xs rounded px-2 py-1 outline-none">
                    {["360p", "480p", "720p", "1080p"].map((q) => <option key={q} value={q}>{q}</option>)}
                  </select>
                </div>
              </div>
            </>
          )}

          {view === "security" && (
            <>
              <BackHeader title="Security" />
              <div className="space-y-3">
                <div>
                  <label className="text-foreground font-semibold text-sm mb-1 block">New password</label>
                  <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full bg-secondary text-foreground text-sm rounded-md px-3 py-2.5 outline-none" />
                </div>
                <div>
                  <label className="text-foreground font-semibold text-sm mb-1 block">Confirm new password</label>
                  <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-secondary text-foreground text-sm rounded-md px-3 py-2.5 outline-none" />
                </div>
                <div className="flex items-center justify-between bg-card border border-border rounded-lg px-4 py-3">
                  <span className="text-foreground text-sm">Remember me</span>
                  <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="accent-primary" />
                </div>
                <button
                  onClick={() => {
                    if (!newPassword || newPassword.length < 6) return toast("Password must be at least 6 characters", { position: "top-right" });
                    if (newPassword !== confirmPassword) return toast("Passwords do not match", { position: "top-right" });
                    toast("Password changed", { position: "top-right" });
                    setNewPassword(""); setConfirmPassword("");
                  }}
                  className="w-full bg-primary text-primary-foreground font-semibold text-sm py-2.5 rounded-md hover:opacity-90 transition">
                  Change password
                </button>
              </div>
            </>
          )}

          {view === "subtitle" && (
            <>
              <BackHeader title="Subtitle settings" />
              <p className="text-muted-foreground text-xs mb-4">Customize how subtitles appear during playback.</p>
              <div className="space-y-3">
                {[
                  { label: "Size", value: subSize, set: setSubSize, options: ["Tiny", "Small", "Medium", "Large", "Huge", "X-Large"] },
                  { label: "Color", value: subColor, set: setSubColor, options: ["White", "Yellow", "Cyan", "Green", "Pink", "Red", "Black"] },
                  { label: "Position", value: subPosition, set: setSubPosition, options: ["Bottom", "Bottom-Center", "Center", "Top-Center", "Top"] },
                  { label: "Style", value: subStyle, set: setSubStyle, options: ["Default", "Bold", "Italic", "Outlined", "Boxed", "Monospace"] },
                  { label: "Shadow", value: subShadow, set: setSubShadow, options: ["None", "Soft", "Medium", "Strong", "Glow"] },
                  { label: "Opacity", value: subOpacity, set: setSubOpacity, options: ["25%", "50%", "75%", "100%"] },
                ].map((s) => (
                  <div key={s.label} className="flex items-center justify-between bg-card border border-border rounded-lg px-4 py-3">
                    <span className="text-foreground text-sm">{s.label}</span>
                    <select value={s.value} onChange={(e) => s.set(e.target.value)} className="bg-secondary text-foreground text-xs rounded px-2 py-1 outline-none">
                      {s.options.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>
                ))}
                <button onClick={() => toast("Subtitle settings saved", { position: "top-right" })}
                  className="w-full bg-primary text-primary-foreground font-semibold text-sm py-2.5 rounded-md hover:opacity-90 transition">
                  Save
                </button>
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
