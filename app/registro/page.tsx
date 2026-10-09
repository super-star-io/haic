import { getChatGPTUser } from "../chatgpt-auth";
import { redirect } from "next/navigation";
import RegistrationForm from "./RegistrationForm";
import GoogleSignIn from "./GoogleSignIn";
import LocalAuth from "./LocalAuth";

export const dynamic = "force-dynamic";
export default async function RegisterPage({ searchParams }: { searchParams: Promise<{ return_to?: string; complete?: string }> }) {
  const identity = await getChatGPTUser();
  const params = await searchParams;
  const callbackURL = params.return_to?.startsWith("/") && !params.return_to.startsWith("//") ? params.return_to : "/perfil";
  const completingProfile = params.complete === "1";
  if (identity && !completingProfile) redirect(callbackURL);
  const googleEnabled = Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET);
  return <main className="portal-shell"><a className="portal-brand" href="/"><img src="/haic-logo.svg" alt="HAIC" /></a><section className="auth-card"><span className="kicker">CUENTA COMUNITARIA</span><h1>Accede al conocimiento completo.</h1><p>Tu cuenta gratuita permite consultar el detalle técnico de los proyectos, guardar una identidad de contribución y recibir permisos según tu participación.</p>{identity ? <RegistrationForm defaultName={identity.displayName} email={identity.email} /> : <><LocalAuth />{googleEnabled && <><div className="auth-divider"><span>o</span></div><GoogleSignIn callbackURL={callbackURL} /></>}</>}</section></main>;
}
