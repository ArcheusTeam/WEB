import { useState, useEffect } from 'react';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { SiteHeader } from '@/components/site-header';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { UploadForm } from '@/components/upload/UploadForm';
import { useAuth } from '@/hooks/useAuth.ts';
import { useUserApi } from '@/hooks/useUserApi';

const UserProfile = () => {
  const navigate = useNavigate();
  const { user: authUser } = useAuth();
  const { getUser } = useUserApi();
  const [user, setUser] = useState({
    id: '',
    email: '',
    role: 'user' as 'user' | 'admin',
    createdAt: '',
    username: '',
    posts: 0,
    followers: 0,
    following: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!authUser?.id) return;
      setLoading(true);
      setError(null);
      try {
        const response = await getUser(authUser.id);
        setUser({
          id: response.id,
          email: response.email,
          role: response.role,
          createdAt: response.createdAt.toDateString(),
          username: response.username || 'Anonymous',
          posts: response.posts?.length || 0,
          followers: response.followers?.length || 0,
          following: response.following?.length || 0,
        });
      } catch (err) {
        setError('Failed to load profile data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [authUser?.id, getUser]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;

  return (
      <SidebarProvider>
        <AppSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader />
          <div className="min-h-screen bg-gray-100 p-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Profile Card */}
              <div className="col-span-1 bg-white rounded-2xl p-6 shadow-md flex flex-col items-center">
                <div className="w-full h-32 bg-gradient-to-tr from-pink-400 to-purple-500 rounded-xl flex items-end justify-center relative">
                  <img
                      src="https://via.placeholder.com/100"
                      alt={`${user.username}'s profile`}
                      className="w-20 h-20 rounded-full border-4 border-white absolute -bottom-10"
                  />
                </div>
                <div className="mt-14 text-center">
                  <h2 className="text-lg font-bold">{user.username}</h2>
                  <p className="text-sm text-gray-500">{user.role === 'admin' ? 'Admin' : 'User'}</p>
                </div>
                <div className="flex justify-between w-full mt-6 text-center">
                  <div className="flex-1">
                    <p className="font-bold text-lg">{user.posts}</p>
                    <p className="text-sm text-gray-500">Posts</p>
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-lg">{user.followers}</p>
                    <p className="text-sm text-gray-500">Followers</p>
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-lg">{user.following}</p>
                    <p className="text-sm text-gray-500">Following</p>
                  </div>
                </div>
              </div>

              {/* Upload Form */}
              <div className="col-span-2 bg-white rounded-2xl p-6 shadow-md">
                <UploadForm onPublish={(content, image) => {
                  console.log('Publishing:', { content, image });
                }} />
              </div>

              {/* Complete Profile */}
              <div className="col-span-1 bg-white rounded-2xl p-6 shadow-md">
                <h3 className="text-lg font-semibold">Complete Your Profile</h3>
                <p className="text-sm text-gray-500 mt-2">
                  Stay on the pulse of distributed projects with an online whiteboard to plan, coordinate and discuss
                </p>
                <Button className="mt-4 w-full">Publish now</Button>
              </div>

              {/* All Projects */}
              <div className="col-span-2 bg-white rounded-2xl p-6 shadow-md mt-6">
                <h3 className="text-lg font-semibold mb-2">Generator</h3>
                <Button onClick={() => navigate('/generator')}>
                  Generate a Post
                </Button>
              </div>

              {/* General Information */}
              <div className="col-span-2 bg-white rounded-2xl p-6 shadow-md mt-6">
                <h3 className="text-lg font-semibold mb-2">General Information</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Joined: {new Date(user.createdAt).toLocaleDateString()}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="font-medium">{user.email}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Role</p>
                    <p className="font-medium">{user.role}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
  );
};

export { UserProfile };