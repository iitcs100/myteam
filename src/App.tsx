import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import Login from "./pages/Login";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { BASENAME, useStaticRedirect } from "./utils/redirect";
import Justin from "./pages/Justin";

function AppPage() {
  useStaticRedirect();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="justin" element={<Justin/>} />
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
