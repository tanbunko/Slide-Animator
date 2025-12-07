import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import LoginPage from "@/pages/login";
import ProjectListPage from "@/pages/project-list";
import CreateProjectPage from "@/pages/create-project";
import WorkspacePage from "@/pages/workspace";
import { I18nProvider } from "@/lib/i18n";

function Router() {
  return (
    <Switch>
      {/* Route flow as per the new requirements */}
      <Route path="/" component={LoginPage} />
      <Route path="/dashboard" component={ProjectListPage} />
      <Route path="/create" component={CreateProjectPage} />
      <Route path="/workspace/:id" component={WorkspacePage} />
      
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <I18nProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </QueryClientProvider>
    </I18nProvider>
  );
}

export default App;
