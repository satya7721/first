'use client';

import React from 'react';
import DashboardLayout from '@/components/ui/dashboard';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, MoreVertical } from "lucide-react";

export default function StudentsPage() {
  const students = [
    { id: 1, name: "John Doe", grade: "10th", contact: "+1234567890", status: "Active" },
    { id: 2, name: "Jane Smith", grade: "11th", contact: "+1234567891", status: "Active" },
    { id: 3, name: "Bob Johnson", grade: "9th", contact: "+1234567892", status: "Inactive" },
  ];

  return (
    <DashboardLayout role="admin">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Students Management</CardTitle>
          <Button>
            <Plus className="w-4 h-4 mr-2" /> Add Student
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input className="pl-8" placeholder="Search students..." />
            </div>
            <Button variant="outline">Filters</Button>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.grade}</TableCell>
                  <TableCell>{student.contact}</TableCell>
                  <TableCell>{student.status}</TableCell>
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