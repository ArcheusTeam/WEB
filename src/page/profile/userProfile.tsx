import React from 'react'
import { AppSidebar } from '@/components/app-sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { SiteHeader } from '@/components/site-header'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

/**
 * @param {{
 *   user: {
 *     id: string;
 *     email: string;
 *     role: 'user' | 'admin';
 *     createdAt: string;
 *   }
 * }} props
 */
const UserProfile = ({ user }: {
    user: {
      id: string
      email: string
      role: 'user' | 'admin'
      createdAt: string
    }
  }) => {
  const navigate = useNavigate();

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
                  alt="User"
                  className="w-20 h-20 rounded-full border-4 border-white absolute -bottom-10"
                />
              </div>
              <div className="mt-14 text-center">
                <h2 className="text-lg font-bold">Adela Parkson</h2>
                <p className="text-sm text-gray-500">Product Manager</p>
              </div>
              <div className="flex justify-between w-full mt-6 text-center">
                <div className="flex-1">
                  <p className="font-bold text-lg">17</p>
                  <p className="text-sm text-gray-500">Posts</p>
                </div>
                <div className="flex-1">
                  <p className="font-bold text-lg">9.7K</p>
                  <p className="text-sm text-gray-500">Followers</p>
                </div>
                <div className="flex-1">
                  <p className="font-bold text-lg">434</p>
                  <p className="text-sm text-gray-500">Following</p>
                </div>
              </div>
            </div>

            {/* Storage and Upload */}
            <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-md flex flex-col items-start">
                <div className="text-xl font-semibold mb-2">Your storage</div>
                <p className="text-sm text-gray-500 mb-4">Supervise your drive space in the easiest way</p>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div className="bg-purple-600 h-2 rounded-full w-[51%]"></div>
                </div>
                <p className="text-sm text-gray-500">25.6 GB / 50 GB</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-md text-center flex flex-col items-center justify-center">
                <div className="text-4xl text-purple-600">⬆</div>
                <p className="font-bold mt-2 text-purple-700">Upload Files</p>
                <p className="text-xs text-gray-500">PNG, JPG and GIF files are allowed</p>
              </div>
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
                As we live, our hearts turn colder. Cause pain is what we go through as we become older...
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500">Education</p>
                  <p className="font-medium">Stanford University</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Languages</p>
                  <p className="font-medium">English, Spanish, Italian</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default UserProfile
