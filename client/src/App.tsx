import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { SiteShell } from "./components/SiteShell";
import About from "./pages/About";
import DearNadine from "./pages/DearNadine";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Podcast from "./pages/Podcast";
import Services from "./pages/Services";

function PublicRoutes() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/services" component={Services} />
      <Route path="/dear-nadine" component={DearNadine} />
      <Route path="/podcast" component={Podcast} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <SiteShell>
        <PublicRoutes />
      </SiteShell>
    </ErrorBoundary>
  );
}
