
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import FluidBackground from '@/components/backgrounds/FluidBackground';
import { Shield } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requireAdmin = false }) => {
  const { user, loading, isAdmin } = useAuth();

  if (loading) {
    return (
      <FluidBackground className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md mx-auto bg-white/70 backdrop-blur-sm">
          <CardContent className="flex items-center justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          </CardContent>
        </Card>
      </FluidBackground>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (requireAdmin && !isAdmin) {
    return (
      <FluidBackground className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md mx-auto bg-white/70 backdrop-blur-sm">
          <CardHeader className="text-center">
            <Shield className="w-12 h-12 mx-auto text-red-500 mb-4" />
            <CardTitle className="text-red-600">Zugriff verweigert</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600">
              Sie haben keine Berechtigung, diese Seite anzuzeigen.
            </p>
          </CardContent>
        </Card>
      </FluidBackground>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
