"use client";
import { useSession } from "next-auth/react";

export default function SettingsPage() {
  const { data: session } = useSession();

  return (
    <main className="min-h-screen bg-gradient-to-tr from-purple-900 via-black to-black text-white px-6 py-10">
      <div className="max-w-4xl mx-auto backdrop-blur-lg bg-white/5 rounded-xl border border-white/10 shadow-xl p-8">
        {/* Header */}
        <h1 className="text-3xl font-bold mb-6 border-b border-white/10 pb-4">Settings</h1>

        {/* Profile Summary */}
        <div className="flex items-center space-x-4 mb-10">
          <img
            src={`${session && session?.user?.image}`}
            alt="avatar"
            className="w-14 h-14 rounded-full border border-white/20"
          />
          <div>
            <p className="text-lg font-medium">{session?.user?.email}</p>
            <p className="text-sm text-gray-400">Account settings and preferences</p>
          </div>
        </div>

        {/* Settings Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 cursor-pointer">
          {/* Account Settings */}
          <div className="bg-white/5 rounded-lg p-6 border border-white/10 hover:border-purple-500 transition">
            <h2 className="text-xl font-semibold mb-2">Account</h2>
            <p className="text-sm text-gray-400">Update your email, username or profile picture</p>
            <button className="mt-4 cursor-pointer px-4 py-1.5 rounded-full border hover:bg-white hover:text-black transition text-sm uppercase">
              Edit
            </button>
          </div>

          {/* Security */}
          <div className="bg-white/5 rounded-lg p-6 border cursor-pointer border-white/10 hover:border-purple-500 transition">
            <h2 className="text-xl font-semibold mb-2">Security</h2>
            <p className="text-sm text-gray-400">Change your password or manage sessions</p>
            <button className="mt-4 cursor-pointer px-4 py-1.5 rounded-full border hover:bg-white hover:text-black transition text-sm uppercase">
              Manage
            </button>
          </div>

          {/* Appearance */}
          <div className="bg-white/5 rounded-lg p-6 border cursor-pointer border-white/10 hover:border-purple-500 transition">
            <h2 className="text-xl font-semibold mb-2">Appearance</h2>
            <p className="text-sm text-gray-400">Theme & UI preferences</p>
            <button className="mt-4 cursor-pointer px-4 py-1.5 rounded-full border hover:bg-white hover:text-black transition text-sm uppercase">
              Customize
            </button>
          </div>

          {/* Notifications */}
          <div className="bg-white/5 rounded-lg p-6 border border-white/10 hover:border-purple-500 transition">
            <h2 className="text-xl font-semibold mb-2">Notifications</h2>
            <p className="text-sm text-gray-400">Email & push notifications preferences</p>
            <button className="mt-4 px-4 cursor-pointer py-1.5 rounded-full border hover:bg-white hover:text-black transition text-sm uppercase">
              Configure
            </button>
          </div>

          {/* Danger Zone */}
          <div className="bg-red-900/10 border border-red-500 p-6 rounded-lg col-span-1 md:col-span-2">
            <h2 className="text-xl font-semibold text-red-500 mb-2">Danger Zone</h2>
            <p className="text-sm text-red-300">Delete your account permanently</p>
            <button className="mt-4 cursor-pointer px-4 py-1.5 rounded-full border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition text-sm uppercase">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
