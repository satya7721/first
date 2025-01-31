'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Users,
  GraduationCap,
  Calendar,
  BookOpen,
  DollarSign,
  LogOut,
  PieChart,
  Menu,
  X,
} from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

interface DashboardLayoutProps {
  children: React.ReactNode;
  role: 'admin' | 'student';
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  role,
}) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const adminMenuItems = [
    { icon: <PieChart size={20} />, label: 'Overview', href: '/admin' },
    { icon: <Users size={20} />, label: 'Students', href: '/admin/students' },
    { icon: <BookOpen size={20} />, label: 'Courses', href: '/admin/courses' },
    { icon: <GraduationCap size={20} />, label: 'Exams', href: '/admin/exams' },
    {
      icon: <Calendar size={20} />,
      label: 'Attendance',
      href: '/admin/attendance',
    },
    { icon: <DollarSign size={20} />, label: 'Fees', href: '/admin/fees' },
  ];

  const studentMenuItems = [
    { icon: <PieChart size={20} />, label: 'Overview', href: '/student' },
    {
      icon: <BookOpen size={20} />,
      label: 'My Courses',
      href: '/student/courses',
    },
    {
      icon: <GraduationCap size={20} />,
      label: 'Exams',
      href: '/student/exams',
    },
    {
      icon: <Calendar size={20} />,
      label: 'Attendance',
      href: '/student/attendance',
    },
    { icon: <DollarSign size={20} />, label: 'Fees', href: '/student/fees' },
  ];

  const menuItems = role === 'admin' ? adminMenuItems : studentMenuItems;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen transition-transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } bg-white border-r border-gray-200 w-64`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">TutorHub</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden"
          >
            <X size={20} />
          </Button>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.href}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 text-gray-700 hover:text-gray-900"
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
            <li className="pt-4 mt-4 border-t">
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <LogOut size={20} />
                Logout
              </Button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className={`p-4 ${isSidebarOpen ? 'lg:ml-64' : ''}`}>
        <div className="mb-4 flex justify-between items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(true)}
            className={`lg:hidden ${isSidebarOpen ? 'hidden' : ''}`}
          >
            <Menu size={20} />
          </Button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
