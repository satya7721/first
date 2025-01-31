'use client';

import React from 'react';
import DashboardLayout from '@/components/ui/dashboard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Search, Plus, MoreVertical } from 'lucide-react';

export default function CoursesPage() {
  const courses = [
    {
      id: 1,
      name: 'Mathematics',
      teacher: 'Dr. Smith',
      students: 35,
      status: 'Active',
    },
    {
      id: 2,
      name: 'Physics',
      teacher: 'Mr. Johnson',
      students: 28,
      status: 'Active',
    },
    {
      id: 3,
      name: 'Chemistry',
      teacher: 'Mrs. Davis',
      students: 30,
      status: 'Active',
    },
  ];

  return (
    <DashboardLayout role="admin">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Courses Management</CardTitle>
          <Button>
            <Plus className="w-4 h-4 mr-2" /> Add Course
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input className="pl-8" placeholder="Search courses..." />
            </div>
            <Button variant="outline">Filters</Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course Name</TableHead>
                <TableHead>Teacher</TableHead>
                <TableHead>Students</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell>{course.name}</TableCell>
                  <TableCell>{course.teacher}</TableCell>
                  <TableCell>{course.students}</TableCell>
                  <TableCell>{course.status}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
