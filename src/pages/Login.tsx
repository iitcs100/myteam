import { useState } from "react";
import { supabase } from "../utils/supabase";
import { useAuthSession } from "../utils/auth";
import { EnterIcon, ExitIcon } from "@radix-ui/react-icons";
import { Box, Button, Flex } from "@radix-ui/themes";

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
    // Redirect back to the current page, but exclude any URL hash or parameters.
    const redirectTo = `${document.location.origin}${document.location.pathname}`;
    console.log("google login", { redirectTo });
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo },
    });

    console.log("google login result", { error });
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
    <Box>
      <Flex gap="2">
        <Button onClick={handleGoogleLogin} variant="outline">
          <EnterIcon />
          Sign in with Google
        </Button>
        <Button onClick={handleLogout} variant="outline" color="ruby">
          <ExitIcon />
          Sign out
        </Button>
      </Flex>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </Box>
  );
}

export default function Login() {
  return (
    <div>
      <h1>Login</h1>
      <CurrentUser />
      <LoginButtons />
    </div>
  );
}
