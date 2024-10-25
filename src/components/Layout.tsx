import { Box, Flex, Text } from "@radix-ui/themes";
import { Link } from "react-router-dom";
import { useAuthSession } from "../utils/auth";
import { Avatar } from "@radix-ui/themes";

function Header() {
  const session = useAuthSession();

  return (
    <Box>
      <Flex justify="between" align="center">
        <Text weight="bold">GetForked</Text>
        <Flex justify="end" gap="4" align="center">
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Avatar
            src={session?.user?.user_metadata.avatar_url}
            fallback={session?.user?.user_metadata.name.charAt(0)}
          />
        </Flex>
      </Flex>
    </Box>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Box p="2">
      <Header />
      <Box>{children}</Box>
    </Box>
  );
}
