"use client";

import { useState } from "react";
import { applyTheme, type ThemePreference as ThemeValue } from "../ThemeController";

const options: Array<{ value: ThemeValue; icon: string; title: string; description: string }> = [
  { value: "light", icon: "☀", title: "Claro", description: "Fondo luminoso y contraste editorial." },
  { value: "dark", icon: "◐", title: "Oscuro", description: "Menos brillo para ambientes con poca luz." },
  { value: "system", icon: "◫", title: "Sistema", description: "Sigue automáticamente tu dispositivo." },
];

export default function ThemePreference({ initialTheme }: { initialTheme: ThemeValue }) {
  const [theme, setTheme] = useState<ThemeValue>(initialTheme);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
  async function select(next: ThemeValue) {
    const previous = theme;
    setTheme(next); setSaving(true); setMessage(""); applyTheme(next);
    try {
      const response = await fetch("/api/me/theme", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ theme: next }) });
      const body = await response.json() as { error?: string };
      if (!response.ok) { setTheme(previous); applyTheme(previous); setMessage(body.error || "No pudimos guardar el tema."); }
      else setMessage("Preferencia guardada.");
    } catch {
      setTheme(previous); applyTheme(previous); setMessage("No pudimos guardar el tema.");
    } finally { setSaving(false); }
  }
  return <section className="theme-preference" aria-labelledby="theme-title"><div><span className="kicker">APARIENCIA</span><h2 id="theme-title">Elige cómo ver HAIC.</h2><p>Tu preferencia se guarda en tu cuenta y se aplica en todo el sitio.</p></div><div className="theme-options" role="radiogroup" aria-label="Tema visual">{options.map(option => <button type="button" role="radio" aria-checked={theme === option.value} className={theme === option.value ? "active" : ""} onClick={() => void select(option.value)} disabled={saving} key={option.value}><span>{option.icon}</span><b>{option.title}</b><small>{option.description}</small><i>{theme === option.value ? "Seleccionado" : "Elegir"}</i></button>)}</div>{message && <p className="theme-message" role="status">{message}</p>}</section>;
}
