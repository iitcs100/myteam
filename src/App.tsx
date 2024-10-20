import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { Layout } from "./components/Layout";
import Login from "./pages/Login";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

const BASENAME = "/myteam";
const REDIRECT_PATHNAME_KEY = "myteam__pathname";
const REDIRECT_SEARCH_KEY = "myteam__search";
const REDIRECT_HASH_KEY = "myteam__hash";

function useStaticRedirect() {
  // Handle redirect on static site
  const navigateTo = useNavigate();
  useEffect(() => {
    const redirectFullPathname = localStorage.getItem(REDIRECT_PATHNAME_KEY);
    const redirectSearch = localStorage.getItem(REDIRECT_SEARCH_KEY) ?? "";
    const redirectHash = localStorage.getItem(REDIRECT_HASH_KEY) ?? "";
    if (redirectFullPathname) {
      localStorage.setItem(REDIRECT_PATHNAME_KEY, "");
      const redirectPathname = redirectFullPathname.substring(BASENAME.length);
      // Hash parameters must come after query (search) parameters, otherwise
      // the query parameters will become part of the hash parameters.
      const redirectUrl = `${redirectPathname}${redirectSearch}${redirectHash}`;
      navigateTo(redirectUrl);
    }
  }, [navigateTo]);
}

function AppPage() {
  useStaticRedirect();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default function App() {
  return (
    <Router basename={BASENAME}>
      <Layout>
        <AppPage />
      </Layout>
    </Router>
  );
}
