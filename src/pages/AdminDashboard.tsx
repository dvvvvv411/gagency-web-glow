
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import FluidBackground from '@/components/backgrounds/FluidBackground';
import { AnimatedSection } from '@/components/ui/animated-section';
import { 
  Users, 
  Shield, 
  Settings, 
  Activity,
  UserCheck,
  Crown,
  LogOut
} from 'lucide-react';

interface Profile {
  id: string;
  email: string;
  full_name: string;
  created_at: string;
  role: 'admin' | 'user';
}

const AdminDashboard = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, signOut, isAdmin } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (isAdmin) {
      fetchProfiles();
    }
  }, [isAdmin]);

  const fetchProfiles = async () => {
    try {
      setLoading(true);
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (profilesError) throw profilesError;

      // Fetch user roles
      const { data: rolesData, error: rolesError } = await supabase
        .from('user_roles')
        .select('user_id, role');

      if (rolesError) throw rolesError;

      // Combine profile data with roles
      const profilesWithRoles = profilesData?.map(profile => {
        const userRole = rolesData?.find(role => role.user_id === profile.id);
        return {
          ...profile,
          role: userRole?.role || 'user'
        };
      }) || [];

      setProfiles(profilesWithRoles);
    } catch (error) {
      console.error('Error fetching profiles:', error);
      toast({
        title: "Fehler",
        description: "Fehler beim Laden der Benutzer.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleUserRole = async (userId: string, currentRole: 'admin' | 'user') => {
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    
    try {
      const { error } = await supabase
        .from('user_roles')
        .update({ role: newRole })
        .eq('user_id', userId);

      if (error) throw error;

      toast({
        title: "Rolle aktualisiert",
        description: `Benutzerrolle erfolgreich zu ${newRole === 'admin' ? 'Administrator' : 'Benutzer'} geändert.`,
      });

      fetchProfiles();
    } catch (error) {
      console.error('Error updating user role:', error);
      toast({
        title: "Fehler",
        description: "Fehler beim Aktualisieren der Benutzerrolle.",
        variant: "destructive",
      });
    }
  };

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Abgemeldet",
      description: "Sie wurden erfolgreich abgemeldet.",
    });
  };

  if (!isAdmin) {
    return (
      <FluidBackground className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md mx-auto bg-white/70 backdrop-blur-sm">
          <CardHeader className="text-center">
            <Shield className="w-12 h-12 mx-auto text-red-500 mb-4" />
            <CardTitle className="text-red-600">Zugriff verweigert</CardTitle>
            <CardDescription>
              Sie haben keine Berechtigung, diese Seite anzuzeigen.
            </CardDescription>
          </CardHeader>
        </Card>
      </FluidBackground>
    );
  }

  return (
    <FluidBackground className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <AnimatedSection className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Administrator Dashboard
              </h1>
              <p className="text-gray-600">
                Willkommen, {user?.email}
              </p>
            </div>
            <Button 
              onClick={handleSignOut}
              variant="outline"
              className="flex items-center gap-2"
            >
              <LogOut size={16} />
              Abmelden
            </Button>
          </div>
        </AnimatedSection>

        {/* Stats Cards */}
        <AnimatedSection className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8" delay={100}>
          <Card className="bg-white/70 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Gesamte Benutzer</CardTitle>
              <Users className="h-4 w-4 text-primary-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{profiles.length}</div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Administratoren</CardTitle>
              <Crown className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {profiles.filter(p => p.role === 'admin').length}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Aktive Benutzer</CardTitle>
              <Activity className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {profiles.filter(p => p.role === 'user').length}
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Users Management */}
        <AnimatedSection delay={200}>
          <Card className="bg-white/70 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCheck className="h-5 w-5" />
                Benutzerverwaltung
              </CardTitle>
              <CardDescription>
                Verwalten Sie Benutzerrollen und Berechtigungen
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
                </div>
              ) : (
                <div className="space-y-4">
                  {profiles.map((profile) => (
                    <div
                      key={profile.id}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-white/50"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              {profile.full_name || 'Unbekannt'}
                            </h3>
                            <p className="text-sm text-gray-600">{profile.email}</p>
                          </div>
                          <Badge 
                            variant={profile.role === 'admin' ? 'default' : 'secondary'}
                            className={profile.role === 'admin' ? 'bg-yellow-100 text-yellow-800 border-yellow-300' : ''}
                          >
                            {profile.role === 'admin' ? 'Administrator' : 'Benutzer'}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          Registriert: {new Date(profile.created_at).toLocaleDateString('de-DE')}
                        </p>
                      </div>
                      
                      {profile.id !== user?.id && (
                        <Button
                          onClick={() => toggleUserRole(profile.id, profile.role)}
                          variant={profile.role === 'admin' ? 'destructive' : 'default'}
                          size="sm"
                          className="ml-4"
                        >
                          {profile.role === 'admin' ? 'Admin entfernen' : 'Zu Admin machen'}
                        </Button>
                      )}
                    </div>
                  ))}
                  
                  {profiles.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      Keine Benutzer gefunden.
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </AnimatedSection>
      </div>
    </FluidBackground>
  );
};

export default AdminDashboard;
