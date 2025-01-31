'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users, DollarSign, BookOpen, GraduationCap,
  TrendingUp, ArrowUpRight, ArrowDownRight
} from "lucide-react";
import DashboardLayout from '@/components/ui/dashboard';

export default function AdminDashboard() {
  const stats = [
    {
      title: "Total Students",
      value: "2,856",
      change: "+12%",
      trend: "up",
      icon: <Users className="h-8 w-8 text-blue-600" />
    },
    {
      title: "Revenue",
      value: "$45,231",
      change: "+8%",
      trend: "up",
      icon: <DollarSign className="h-8 w-8 text-green-600" />
    },
    {
      title: "Active Courses",
      value: "24",
      change: "-3%",
      trend: "down",
      icon: <BookOpen className="h-8 w-8 text-purple-600" />
    },
    {
      title: "Upcoming Exams",
      value: "12",
      change: "+4%",
      trend: "up",
      icon: <GraduationCap className="h-8 w-8 text-orange-600" />
    }
  ];

  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                {stat.icon}
                <div className={`flex items-center text-sm ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                  {stat.trend === 'up' ? 
                    <ArrowUpRight className="ml-1 h-4 w-4" /> : 
                    <ArrowDownRight className="ml-1 h-4 w-4" />
                  }
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-sm text-gray-600">{stat.title}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <Users className="h-8 w-8 text-blue-600" />
                <div>
                  <h4 className="font-semibold">New Student Registration</h4>
                  <p className="text-sm text-gray-600">John Doe enrolled in Mathematics Course</p>
                </div>
                <span className="ml-auto text-sm text-gray-500">2 hours ago</span>
              </div>
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <GraduationCap className="h-8 w-8 text-green-600" />
                <div>
                  <h4 className="font-semibold">Exam Completed</h4>
                  <p className="text-sm text-gray-600">Physics Mid-term results published</p>
                </div>
                <span className="ml-auto text-sm text-gray-500">5 hours ago</span>
              </div>
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <DollarSign className="h-8 w-8 text-purple-600" />
                <div>
                  <h4 className="font-semibold">Fee Payment</h4>
                  <p className="text-sm text-gray-600">15 students completed their fee payment</p>
                </div>
                <span className="ml-auto text-sm text-gray-500">1 day ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}