'use client';

import React, { useState } from 'react';
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
import { Search, Plus, MoreVertical, Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function ExamsPage() {
  const [exams, setExams] = useState([
    {
      id: 1,
      name: 'Mathematics Mid-term',
      date: '2025-02-15',
      duration: '2 hours',
      status: 'Upcoming',
    },
    {
      id: 2,
      name: 'Physics Quiz',
      date: '2025-02-10',
      duration: '1 hour',
      status: 'Upcoming',
    },
    {
      id: 3,
      name: 'Chemistry Final',
      date: '2025-01-28',
      duration: '3 hours',
      status: 'Completed',
    },
  ]);

  const [newExam, setNewExam] = useState({
    name: '',
    date: '',
    duration: '',
    mcqs: '',
  });

  const addExam = () => {
    setExams([
      ...exams,
      { id: exams.length + 1, ...newExam, status: 'Upcoming' },
    ]);
    setNewExam({ name: '', date: '', duration: '', mcqs: '' });
  };

  return (
    <DashboardLayout role="admin">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Exams Management</CardTitle>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" /> Create Exam
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Exam</DialogTitle>
              </DialogHeader>
              <Label>Exam Name</Label>
              <Input
                value={newExam.name}
                onChange={(e) =>
                  setNewExam({ ...newExam, name: e.target.value })
                }
              />
              <Label>Date</Label>
              <Input
                type="date"
                value={newExam.date}
                onChange={(e) =>
                  setNewExam({ ...newExam, date: e.target.value })
                }
              />
              <Label>Duration</Label>
              <Input
                value={newExam.duration}
                onChange={(e) =>
                  setNewExam({ ...newExam, duration: e.target.value })
                }
              />
              <Label>MCQs (JSON format)</Label>
              <Textarea
                value={newExam.mcqs}
                onChange={(e) =>
                  setNewExam({ ...newExam, mcqs: e.target.value })
                }
              />
              <Button onClick={addExam}>Add Exam</Button>
            </DialogContent>
          </Dialog>
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
                    <Badge
                      variant={
                        exam.status === 'Upcoming' ? 'default' : 'secondary'
                      }
                    >
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
