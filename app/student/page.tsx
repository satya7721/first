'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, BookOpen, GraduationCap, AlertCircle } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function StudentOverview() {
  const stats = [
    {
      title: 'Attendance Rate',
      value: '85%',
      icon: <Calendar className="h-4 w-4 text-muted-foreground" />,
      subtitle: 'Last 30 days',
    },
    {
      title: 'Active Courses',
      value: '4',
      icon: <BookOpen className="h-4 w-4 text-muted-foreground" />,
      subtitle: 'Currently enrolled',
    },
    {
      title: 'Upcoming Exams',
      value: '2',
      icon: <GraduationCap className="h-4 w-4 text-muted-foreground" />,
      subtitle: 'Next 7 days',
    },
    {
      title: 'Due Assignments',
      value: '3',
      icon: <AlertCircle className="h-4 w-4 text-muted-foreground" />,
      subtitle: 'Pending submission',
    },
  ];

  const upcomingExams = [
    { id: 1, subject: 'Mathematics', date: '2025-02-15', time: '10:00 AM' },
    { id: 2, subject: 'Physics', date: '2025-02-18', time: '02:00 PM' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.subtitle}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Exams</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Subject</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {upcomingExams.map((exam) => (
                <TableRow key={exam.id}>
                  <TableCell className="font-medium">{exam.subject}</TableCell>
                  <TableCell>{exam.date}</TableCell>
                  <TableCell>{exam.time}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
