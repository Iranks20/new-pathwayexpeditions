import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import ToursPage from "@/pages/Tours";
import CarHirePage from "@/pages/CarHire";
import CarHireRatesPage from "@/pages/CarHireRates";
import TermsAndConditionsPage from "@/pages/TermsAndConditions";
import DestinationsPage from "@/pages/Destinations";
import AboutPage from "@/pages/About";
import ContactPage from "@/pages/Contact";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/tours" component={ToursPage} />
      <Route path="/car-hire" component={CarHirePage} />
      <Route path="/car-hire/rates" component={CarHireRatesPage} />
      <Route path="/destinations" component={DestinationsPage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/terms-and-conditions" component={TermsAndConditionsPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
