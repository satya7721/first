'use client';

import React from 'react';
import DashboardLayout from '@/components/ui/dashboard';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, MoreVertical, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function ExamsPage() {
  const exams = [
    { 
      id: 1, 
      name: "Mathematics Mid-term", 
      date: "2025-02-15", 
      duration: "2 hours",
      status: "Upcoming"
    },
    { 
      id: 2, 
      name: "Physics Quiz", 
      date: "2025-02-10", 
      duration: "1 hour",
      status: "Upcoming"
    },
    { 
      id: 3, 
      name: "Chemistry Final", 
      date: "2025-01-28", 
      duration: "3 hours",
      status: "Completed"
    },
  ];

  return (
    <DashboardLayout role="admin">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Exams Management</CardTitle>
          <Button>
            <Plus className="w-4 h-4 mr-2" /> Create Exam
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input className="pl-8" placeholder="Search exams..." />
            </div>
            <Button variant="outline">Filters</Button>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Exam Name</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {exams.map((exam) => (
                <TableRow key={exam.id}>
                  <TableCell>{exam.name}</TableCell>
                  <TableCell>{exam.date}</TableCell>
                  <TableCell>{exam.duration}</TableCell>
                  <TableCell>
                    <Badge variant={exam.status === 'Upcoming' ? 'default' : 'secondary'}>
                      {exam.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="flex gap-2">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
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
