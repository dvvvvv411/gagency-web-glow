
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Layout from "@/components/Layout";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Careers from "./pages/Careers";
import AppointmentBooking from "./pages/AppointmentBooking";
import EmploymentContract from "./pages/EmploymentContract";
import AdminDashboard from "./pages/AdminDashboard";
import Impressum from "./pages/Impressum";
import Datenschutz from "./pages/Datenschutz";
import AGB from "./pages/AGB";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Index />} />
              <Route path="auth" element={<Auth />} />
              <Route path="about" element={<About />} />
              <Route path="services" element={<Services />} />
              <Route path="contact" element={<Contact />} />
              <Route path="careers" element={<Careers />} />
              <Route path="appointment-booking" element={<AppointmentBooking />} />
              <Route path="employment-contract" element={<EmploymentContract />} />
              <Route path="impressum" element={<Impressum />} />
              <Route path="datenschutz" element={<Datenschutz />} />
              <Route path="agb" element={<AGB />} />
              
              <Route 
                path="admin" 
                element={
                  <ProtectedRoute requireAdmin>
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
