"use client";
import { useEffect } from "react";
import { authClient } from "../../lib/auth-client";
export default function Logout({ returnTo }: { returnTo: string }) { useEffect(() => { void authClient.signOut({ fetchOptions: { onSuccess: () => { window.location.href = returnTo; } } }); }, [returnTo]); return <p>Cerrando sesión…</p>; }
