import { getChatGPTUser, chatGPTSignInPath } from "../chatgpt-auth";
import RegistrationForm from "./RegistrationForm";

export const dynamic = "force-dynamic";
export default async function RegisterPage() {
  const identity = await getChatGPTUser();
  return <main className="portal-shell"><a className="portal-brand" href="/"><img src="/haic-logo.svg" alt="HAIC" /></a><section className="auth-card"><span className="kicker">CUENTA COMUNITARIA</span><h1>Accede al conocimiento completo.</h1><p>Tu cuenta gratuita permite consultar el detalle técnico de los proyectos, guardar una identidad de contribución y recibir permisos según tu participación.</p>{identity ? <RegistrationForm defaultName={identity.displayName} email={identity.email} /> : <><div className="identity-note"><b>Primero verificamos tu identidad</b><span>El acceso usa Sign in with ChatGPT; HAIC no almacena contraseñas.</span></div><a className="button primary wide" href={chatGPTSignInPath("/registro")}>Verificar identidad y continuar →</a></>}</section></main>;
}
