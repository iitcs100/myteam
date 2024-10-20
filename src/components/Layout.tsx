import { Box, Container, Flex, Text } from "@radix-ui/themes";
import { Link } from "react-router-dom";
import { useAuthSession } from "../utils/auth";
import { Avatar } from "@radix-ui/themes";

function Header() {
  const session = useAuthSession();

  return (
    <Box>
      <Flex justify="between" align="center">
        <Text weight="bold">myTeam</Text>
        <Flex justify="end" gap="4" align="center">
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          {session?.user && (
            <Avatar
              src={session.user.user_metadata.avatar_url}
              fallback={session.user.user_metadata.name}
            />
          )}
        </Flex>
      </Flex>
    </Box>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Container p="2" size="3">
      <Header />
      <Box>{children}</Box>
    </Container>
  );
}
