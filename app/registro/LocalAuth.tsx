"use client";
import { useState } from "react";
import { authClient } from "../../lib/auth-client";

export default function LocalAuth() {
  const [mode, setMode] = useState<"signup" | "signin">("signup");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(""); setPending(true);
    const form = new FormData(event.currentTarget); const email = String(form.get("email") ?? ""); const password = String(form.get("password") ?? "");
    const result = mode === "signup"
      ? await authClient.signUp.email({ name: String(form.get("name") ?? ""), email, password, callbackURL: "/registro?complete=1" })
      : await authClient.signIn.email({ email, password, callbackURL: "/perfil" });
    if (result.error) { setError(result.error.message ?? "No fue posible completar el acceso."); setPending(false); return; }
    window.location.href = mode === "signup" ? "/registro?complete=1" : "/perfil";
  }
  return <div className="local-auth"><div className="auth-tabs"><button className={mode === "signup" ? "active" : ""} onClick={() => setMode("signup")} type="button">Crear cuenta</button><button className={mode === "signin" ? "active" : ""} onClick={() => setMode("signin")} type="button">Ya tengo cuenta</button></div><form className="auth-form compact" onSubmit={submit}>{mode === "signup" && <label>Nombre<input name="name" required maxLength={100} /></label>}<label>Correo<input name="email" type="email" required autoComplete="email" /></label><label>Contraseña<input name="password" type="password" required minLength={8} autoComplete={mode === "signup" ? "new-password" : "current-password"} /></label>{error && <p className="form-error">{error}</p>}<button className="button primary wide" disabled={pending}>{pending ? "Procesando…" : mode === "signup" ? "Crear cuenta local →" : "Iniciar sesión →"}</button></form></div>;
}
