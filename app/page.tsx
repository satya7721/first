'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { GraduationCap, Users, Calendar, BookOpen } from 'lucide-react';
import Link from 'next/link';

const HomePage = () => {
  const features = [
    {
      title: 'Student Management',
      description:
        'Effortlessly manage student records, attendance, and academic progress',
      icon: <Users className="w-10 h-10 text-blue-500" />,
    },
    {
      title: 'Online Examinations',
      description: 'Conduct secure online exams and assess student performance',
      icon: <GraduationCap className="w-10 h-10 text-green-500" />,
    },
    {
      title: 'Course Management',
      description: 'Organize and track courses, materials, and schedules',
      icon: <BookOpen className="w-10 h-10 text-purple-500" />,
    },
    {
      title: 'Attendance Tracking',
      description: 'Monitor student attendance and generate detailed reports',
      icon: <Calendar className="w-10 h-10 text-orange-500" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Welcome to TutorHub
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Your complete solution for managing tuition centers, students, and
            online examinations
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Get Started
            </Button>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
            <Link href="/login">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Login
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mb-4">{feature.icon}</div>
                <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* Statistics Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-4xl font-bold text-blue-600 mb-2">1000+</h3>
              <p className="text-gray-600">Active Students</p>
            </div>
            <div className="text-center">
              <h3 className="text-4xl font-bold text-green-600 mb-2">50+</h3>
              <p className="text-gray-600">Expert Teachers</p>
            </div>
            <div className="text-center">
              <h3 className="text-4xl font-bold text-purple-600 mb-2">100+</h3>
              <p className="text-gray-600">Online Courses</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-blue-600 text-white rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg mb-6">
            Join thousands of students and teachers already using our platform
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="bg-white text-blue-600 hover:bg-gray-100"
          >
            Sign Up Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
