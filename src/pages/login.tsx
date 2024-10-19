import { useState } from "react";
import { supabase } from "../utils/supabase";
import { useAuthSession } from "../utils/auth";

function CurrentUser() {
  const session = useAuthSession();
  if (session == null) {
    return <p>You are not logged in.</p>;
  }

  return <p>You are logged in as {session.user.user_metadata.full_name}.</p>;
}

function LoginButtons() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: document.location.href,
      },
    });

    if (error) {
      setErrorMessage(error.message);
    } else {
      setErrorMessage(null);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <>
      <button onClick={handleGoogleLogin}>Sign in with Google</button>
      <button onClick={handleLogout}>Sign out</button>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </>
  );
}

export default function Login() {
  return (
    <>
      <div>Login</div>
      <CurrentUser />
      <LoginButtons />
    </>
  );
}
