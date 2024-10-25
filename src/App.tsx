import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import Login from "./pages/Login";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Vinesh from "./pages/Vinesh";
import { BASENAME, useStaticRedirect } from "./utils/redirect";

function AppPage() {
  useStaticRedirect();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/vinesh" element={<Vinesh />} />
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
