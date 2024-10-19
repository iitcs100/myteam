import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Login from "./pages/login";
import Home from "./pages/home";

const BASENAME = "myteam";
const REDIRECT_PATHNAME_KEY = `myteam__pathname`;

function AppRoutes() {
  // Handle redirect on static site
  const navigateTo = useNavigate();
  useEffect(() => {
    const redirectFullPathname = localStorage.getItem(REDIRECT_PATHNAME_KEY);
    if (redirectFullPathname) {
      localStorage.setItem(REDIRECT_PATHNAME_KEY, "");
      const redirectPathname = redirectFullPathname.substring(BASENAME.length);
      navigateTo(redirectPathname);
    }
  }, [navigateTo]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default function App() {
  return (
    <Router basename={BASENAME}>
      <AppRoutes />
    </Router>
  );
}
