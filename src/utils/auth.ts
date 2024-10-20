import { useState, useEffect } from "react";
import { supabase } from "./supabase";
import { Session } from "@supabase/supabase-js";

export function useAuthSession() {
  const [session, setSession] = useState<Session | null>(null);

  async function getInitialSession() {
    const currentSession = await supabase.auth.getSession();
    console.log("get initial session", { currentSession });
    // To avoid a race condition with the auth state lisner, only set the
    // session if it is not null. Logout events will be handled by the listener.
    if (currentSession.data.session != null) {
      setSession(currentSession.data.session);
    }
  }

  useEffect(() => {
    getInitialSession();

    const listener = supabase.auth.onAuthStateChange((event, newSession) => {
      console.log("auth state change", { event, newSession });
      setSession(newSession);
    });

    return () => {
      console.log("unsubscribing", { session });
      listener.data.subscription.unsubscribe();
    };
  }, []);

  console.log("hook return", { session });
  return session;
}
