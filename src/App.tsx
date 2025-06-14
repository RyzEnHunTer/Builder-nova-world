import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AdminProvider, useAdmin } from "@/contexts/AdminContext";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import Index from "./pages/Index";
import About from "./pages/About";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAdmin();
  return isAuthenticated ? (
    <>{children}</>
  ) : (
    <Navigate to="/admin/login" replace />
  );
};

// Admin Layout (without navigation/footer)
const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

// Public Layout (with navigation/footer)
const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AdminProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route
              path="/"
              element={
                <PublicLayout>
                  <Index />
                </PublicLayout>
              }
            />
            <Route
              path="/about"
              element={
                <PublicLayout>
                  <About />
                </PublicLayout>
              }
            />
            <Route
              path="/gallery"
              element={
                <PublicLayout>
                  <Gallery />
                </PublicLayout>
              }
            />
            <Route
              path="/contact"
              element={
                <PublicLayout>
                  <Contact />
                </PublicLayout>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin/login"
              element={
                <AdminLayout>
                  <AdminLogin />
                </AdminLayout>
              }
            />
            <Route
              path="/admin"
              element={
                <AdminLayout>
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                </AdminLayout>
              }
            />

            {/* Redirect /admin/* to /admin */}
            <Route path="/admin/*" element={<Navigate to="/admin" replace />} />

            {/* 404 Route */}
            <Route
              path="*"
              element={
                <PublicLayout>
                  <NotFound />
                </PublicLayout>
              }
            />
          </Routes>
        </BrowserRouter>
      </AdminProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
