import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import TopAppBar from './TopAppBar';
import TaskBar from './TaskBar';

export default function Layout() {
  const location = useLocation();
  const darkPages = ['/menu', '/rewards', '/profile'];
  const isDark = darkPages.includes(location.pathname);

  return (
    <div className={`min-h-screen flex flex-col relative pb-24 md:pb-0 ${isDark ? 'bg-[#121414]' : 'bg-surface'}`}>
      <TopAppBar isDark={isDark} />
      <main className="flex-1 w-full">
        <Outlet />
      </main>
      <TaskBar isDark={isDark} />
    </div>
  );
}
