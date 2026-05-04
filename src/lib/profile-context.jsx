import { createContext, useContext, useState } from "react";

const Ctx = createContext(null);

export function ProfileProvider({ children }) {
  const [profile, setProfileState] = useState({
    name: "Alex Stone",
    email: "alex.stone@fintrack.app",
    plan: "Premium",
    avatar: null,
  });
  const [view, setView] = useState("dashboard");

  const setProfile = (p) => setProfileState((prev) => ({ ...prev, ...p }));

  return (
    <Ctx.Provider value={{ profile, setProfile, view, setView }}>
      {children}
    </Ctx.Provider>
  );
}

export function useProfile() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useProfile must be used inside ProfileProvider");
  return v;
}

export function getInitials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase())
    .join("");
}
