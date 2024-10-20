import { useState, useEffect } from "react";
import { supabase } from "./supabase";
import { Session } from "@supabase/supabase-js";

export function useAuthSession() {
  const [session, setSession] = useState<Session | null>(null);

  async function getInitialSession() {
    const currentSession = await supabase.auth.getSession();
    // To avoid a race condition with the auth state lisner, only set the
    // session if it is not null. Logout events will be handled by the listener.
    // Otherwise, the session starts as null, so missing a null update is fine.
    if (currentSession.data.session != null) {
      setSession(currentSession.data.session);
    }
  }

  useEffect(() => {
    getInitialSession();

    const listener = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });

    return () => {
      listener.data.subscription.unsubscribe();
    };
  }, []);

  return session;
}
