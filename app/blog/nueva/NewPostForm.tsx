"use client";
import { useState } from "react";

export default function NewPostForm() {
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setSaving(true);
    setMessage("");
    const values = Object.fromEntries(new FormData(form));
    try {
      const response = await fetch("/api/blog/posts", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(values) });
      const body = await response.json() as { error?: string };
      if (!response.ok) { setMessage(body.error || "No se pudo guardar la entrada."); return; }
      form.reset();
      setMessage("Borrador enviado. Un administrador podrá revisarlo y publicarlo.");
    } catch {
      setMessage("Ocurrió un problema de conexión. Intenta de nuevo.");
    } finally {
      setSaving(false);
    }
  }

  return <form className="contributor-post-form" onSubmit={submit}>
    <div className="contributor-form-grid">
      <label>Título de la entrada<input name="title" maxLength={180} required placeholder="¿Qué aprendiste o construiste?" /></label>
      <label>Categoría<input name="category" maxLength={60} defaultValue="Artículo" /></label>
      <label className="contributor-form-wide">Resumen<textarea name="excerpt" maxLength={500} rows={3} placeholder="Una breve introducción para quienes visiten el blog." /></label>
      <label className="contributor-form-wide">Contenido<textarea name="content" maxLength={50000} rows={14} required placeholder="Describe el problema, tu proceso, los resultados y lo que aprendiste." /></label>
      <label className="contributor-form-wide">Portada (opcional)<input name="coverImageUrl" type="url" placeholder="https://.../imagen.jpg" /><small>Usa una imagen HTTPS en JPG, PNG, WebP o AVIF.</small></label>
      <label>Repositorio de GitHub (opcional)<input name="githubUrl" type="url" placeholder="https://github.com/..." /></label>
      <label>Video de YouTube (opcional)<input name="youtubeUrl" type="url" placeholder="https://www.youtube.com/watch?v=..." /></label>
    </div>
    {message && <p className="contributor-form-message" role="status">{message}</p>}
    <div className="contributor-form-actions"><a href="/blog">Cancelar</a><button className="button primary" type="submit" disabled={saving}>{saving ? "Guardando…" : "Enviar a revisión →"}</button></div>
  </form>;
}
