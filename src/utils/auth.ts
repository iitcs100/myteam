import { useState, useEffect } from "react";
import { supabase } from "./supabase";
import { Session } from "@supabase/supabase-js";

export function useAuthSession() {
  const [session, setSession] = useState<Session | null>(null);

  async function getSession() {
    const session = await supabase.auth.getSession();
    setSession(session.data.session);
  }

  useEffect(() => {
    getSession();
    const listener = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => listener.data.subscription.unsubscribe();
  }, []);

  return session;
}
