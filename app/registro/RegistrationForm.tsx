"use client";
import { useState } from "react";

export default function RegistrationForm({ defaultName, email }: { defaultName: string; email: string }) {
  const [message, setMessage] = useState(""); const [saving, setSaving] = useState(false);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setSaving(true); setMessage(""); const form = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/me", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: form.get("name"), organization: form.get("organization"), bio: form.get("bio") }) });
      const data = await response.json().catch(() => ({ error: "El servidor devolvió una respuesta inválida." })) as { error?: string };
      if (!response.ok) { setMessage(data.error ?? "No pudimos guardar tu perfil."); setSaving(false); return; }
      window.location.assign("/perfil");
    } catch {
      setMessage("Se perdió la conexión con el servidor. Intenta nuevamente.");
      setSaving(false);
    }
  }
  return <form className="auth-form" onSubmit={submit}>
    <label>Correo verificado<input value={email} disabled /></label>
    <label>Nombre<input name="name" defaultValue={defaultName} required maxLength={100} /></label>
    <label>Organización o comunidad<input name="organization" placeholder="Opcional" maxLength={120} /></label>
    <label>¿Qué te interesa construir?<textarea name="bio" placeholder="Cuéntanos brevemente" maxLength={500} rows={4} /></label>
    {message && <p className="form-error">{message}</p>}
    <button className="button primary" disabled={saving}>{saving ? "Creando cuenta…" : "Crear mi cuenta HAIC →"}</button>
  </form>;
}
