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
import { Plus, MoreVertical } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function StudentsPage() {
  const [students, setStudents] = useState([
    {
      id: 1,
      name: 'John Doe',
      parentPhone: '+1234567890',
      grade: '10th',
      batch: '2025',
      stream: 'PCM',
      feePaid: '$1000',
    },
    {
      id: 2,
      name: 'Jane Smith',
      parentPhone: '+1234567891',
      grade: '11th',
      batch: '2024',
      stream: 'PCB',
      feePaid: '$1200',
    },
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: '',
    parentPhone: '',
    grade: '',
    batch: '',
    stream: 'PCM',
    feePaid: '',
  });
  const [filters, setFilters] = useState({
    name: '',
    grade: '',
    batch: '',
    stream: '',
  });

  const handleAddStudent = () => {
    setStudents([...students, { id: students.length + 1, ...newStudent }]);
    setIsOpen(false);
    setNewStudent({
      name: '',
      parentPhone: '',
      grade: '',
      batch: '',
      stream: 'PCM',
      feePaid: '',
    });
  };

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(filters.name.toLowerCase()) &&
      student.grade.includes(filters.grade) &&
      student.batch.includes(filters.batch) &&
      student.stream.includes(filters.stream)
  );

  return (
    <DashboardLayout role="admin">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Students Management</CardTitle>
          <Button onClick={() => setIsOpen(true)}>
            <Plus className="w-4 h-4 mr-2" /> Add Student
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-4">
            <Input
              placeholder="Search by name..."
              onChange={(e) => setFilters({ ...filters, name: e.target.value })}
            />
            <Input
              placeholder="Filter by grade..."
              onChange={(e) =>
                setFilters({ ...filters, grade: e.target.value })
              }
            />
            <Input
              placeholder="Filter by batch..."
              onChange={(e) =>
                setFilters({ ...filters, batch: e.target.value })
              }
            />
            <Select
              onValueChange={(value) =>
                setFilters({ ...filters, stream: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Filter by stream" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PCM">PCM</SelectItem>
                <SelectItem value="PCB">PCB</SelectItem>
                <SelectItem value="Both">Both</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Parent Phone</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Batch</TableHead>
                <TableHead>Stream</TableHead>
                <TableHead>Fee Paid</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.parentPhone}</TableCell>
                  <TableCell>{student.grade}</TableCell>
                  <TableCell>{student.batch}</TableCell>
                  <TableCell>{student.stream}</TableCell>
                  <TableCell>{student.feePaid}</TableCell>
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

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Student</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Label>Name</Label>
            <Input
              value={newStudent.name}
              onChange={(e) =>
                setNewStudent({ ...newStudent, name: e.target.value })
              }
            />
            <Label>Parent Phone</Label>
            <Input
              value={newStudent.parentPhone}
              onChange={(e) =>
                setNewStudent({ ...newStudent, parentPhone: e.target.value })
              }
            />
            <Label>Grade</Label>
            <Input
              value={newStudent.grade}
              onChange={(e) =>
                setNewStudent({ ...newStudent, grade: e.target.value })
              }
            />
            <Label>Batch</Label>
            <Input
              value={newStudent.batch}
              onChange={(e) =>
                setNewStudent({ ...newStudent, batch: e.target.value })
              }
            />
            <Label>Stream</Label>
            <Select
              value={newStudent.stream}
              onValueChange={(value) =>
                setNewStudent({ ...newStudent, stream: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Stream" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PCM">PCM</SelectItem>
                <SelectItem value="PCB">PCB</SelectItem>
                <SelectItem value="Both">Both</SelectItem>
              </SelectContent>
            </Select>
            <Label>Fee Paid</Label>
            <Input
              value={newStudent.feePaid}
              onChange={(e) =>
                setNewStudent({ ...newStudent, feePaid: e.target.value })
              }
            />
            <Button className="w-full mt-4" onClick={handleAddStudent}>
              Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
