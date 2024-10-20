import { useState, useEffect } from "react";
import { supabase } from "./supabase";
import { Session } from "@supabase/supabase-js";

async function upsertUserFromSession(session: Session) {
  // Upsert means to update a record if it exists, or insert it if it does not.
  await supabase.from("user").upsert({
    id: session.user.id,
    name: session.user.user_metadata.full_name ?? "No Name",
  });
}

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
      // Update state so the app can know whether the user is logged in or out.
      setSession(newSession);
      // If the user logged in, update the database with their information.
      if (newSession != null) {
        upsertUserFromSession(newSession);
      }
    });

    return () => {
      listener.data.subscription.unsubscribe();
    };
  }, []);

  return session;
}
