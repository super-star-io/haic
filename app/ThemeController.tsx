"use client";

import { useEffect } from "react";
import { authClient } from "../lib/auth-client";

export type ThemePreference = "light" | "dark" | "system";

export function applyTheme(theme: ThemePreference) {
  const root = document.documentElement;
  const dark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
  root.dataset.theme = theme;
  root.dataset.resolvedTheme = dark ? "dark" : "light";
  localStorage.setItem("haic-theme", theme);
}

export default function ThemeController() {
  const { data: session } = authClient.useSession();
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const refreshSystem = () => {
      const saved = (localStorage.getItem("haic-theme") || "system") as ThemePreference;
      if (saved === "system") applyTheme("system");
    };
    media.addEventListener("change", refreshSystem);
    return () => media.removeEventListener("change", refreshSystem);
  }, []);
  useEffect(() => {
    if (!session?.user) return;
    let active = true;
    void fetch("/api/me", { cache: "no-store" }).then(async (response) => {
      if (!response.ok || !active) return;
      const payload = await response.json() as { user?: { theme?: ThemePreference } };
      if (payload.user?.theme && active) applyTheme(payload.user.theme);
    });
    return () => { active = false; };
  }, [session?.user]);
  return null;
}
