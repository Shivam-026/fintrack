import { useRef, useState } from "react";
import { Camera, Check, Trash2, User } from "lucide-react";
import { useProfile, getInitials } from "@/lib/profile-context";

export function SettingsView() {
  const { profile, setProfile } = useProfile();
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [plan, setPlan] = useState(profile.plan);
  const [saved, setSaved] = useState(false);
  const fileRef = useRef(null);

  const onPick = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => setProfile({ avatar: reader.result });
    reader.readAsDataURL(file);
  };

  const onSave = (e) => {
    e.preventDefault();
    setProfile({ name: name.trim() || profile.name, email: email.trim() || profile.email, plan });
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  };

  const onRemoveAvatar = () => setProfile({ avatar: null });

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-border bg-card p-6 shadow-card">
        <div className="mb-6">
          <h3 className="text-base font-semibold tracking-tight text-foreground">Profile</h3>
          <p className="text-xs text-muted-foreground">Update your name, email, and avatar.</p>
        </div>

        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
          <div className="relative">
            <div
              className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-2xl text-2xl font-semibold text-primary-foreground shadow-lg"
              style={profile.avatar ? undefined : { background: "var(--gradient-primary)" }}
            >
              {profile.avatar ? (
                <img src={profile.avatar} alt={profile.name} className="h-full w-full object-cover" />
              ) : (
                getInitials(profile.name) || <User className="h-8 w-8" />
              )}
            </div>
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="absolute -bottom-1.5 -right-1.5 flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-primary text-primary-foreground shadow-md transition hover:bg-primary-hover"
              aria-label="Upload avatar"
            >
              <Camera className="h-4 w-4" />
            </button>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onPick} />
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground">{profile.name}</p>
            <p className="text-xs text-muted-foreground">PNG or JPG, up to a few MB.</p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-medium text-foreground transition hover:bg-surface-elevated"
              >
                Upload new
              </button>
              {profile.avatar && (
                <button
                  type="button"
                  onClick={onRemoveAvatar}
                  className="flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-medium text-danger transition hover:bg-surface-elevated"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Remove
                </button>
              )}
            </div>
          </div>
        </div>

        <form onSubmit={onSave} className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Username">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-10 w-full rounded-xl border border-border bg-surface px-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </Field>
          <Field label="Email">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-10 w-full rounded-xl border border-border bg-surface px-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </Field>
          <Field label="Plan">
            <select
              value={plan}
              onChange={(e) => setPlan(e.target.value)}
              className="h-10 w-full rounded-xl border border-border bg-surface px-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              <option>Free</option>
              <option>Premium</option>
              <option>Enterprise</option>
            </select>
          </Field>

          <div className="flex items-end justify-end gap-2 sm:col-span-2">
            {saved && (
              <span className="flex items-center gap-1.5 text-xs font-medium text-success">
                <Check className="h-3.5 w-3.5" /> Saved
              </span>
            )}
            <button
              type="submit"
              className="rounded-xl px-4 py-2 text-sm font-medium text-primary-foreground shadow-md transition hover:opacity-90"
              style={{ background: "var(--gradient-primary)" }}
            >
              Save changes
            </button>
          </div>
        </form>
      </section>

      <section className="rounded-2xl border border-border bg-card p-6 shadow-card">
        <h3 className="text-base font-semibold tracking-tight text-foreground">Preferences</h3>
        <p className="text-xs text-muted-foreground">Quick toggles (visual only).</p>
        <div className="mt-4 space-y-3">
          {[
            { label: "Email notifications", desc: "Weekly summary of your spending." },
            { label: "Two-factor auth", desc: "Adds an extra layer of security." },
            { label: "Share usage analytics", desc: "Helps us improve FinTrack." },
          ].map((p, i) => (
            <Toggle key={p.label} label={p.label} desc={p.desc} defaultChecked={i !== 2} />
          ))}
        </div>
      </section>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}

function Toggle({ label, desc, defaultChecked }) {
  const [on, setOn] = useState(!!defaultChecked);
  return (
    <div className="flex items-center justify-between rounded-xl border border-border bg-surface px-4 py-3">
      <div>
        <p className="text-sm font-medium text-foreground">{label}</p>
        <p className="text-xs text-muted-foreground">{desc}</p>
      </div>
      <button
        type="button"
        onClick={() => setOn((v) => !v)}
        className={`relative h-6 w-11 rounded-full transition ${on ? "bg-primary" : "bg-muted"}`}
        aria-pressed={on}
      >
        <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${on ? "left-5" : "left-0.5"}`} />
      </button>
    </div>
  );
}
