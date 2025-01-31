'use client';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Calendar, Clock, CheckCircle, XCircle } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function StudentAttendance() {
  const attendanceStats = {
    overall: 85,
    thisMonth: 90,
    totalClasses: 120,
    attendedClasses: 102,
  };

  const recentAttendance = [
    {
      id: 1,
      date: '2025-02-01',
      subject: 'Mathematics',
      status: 'present',
      time: '10:00 AM',
      duration: '1 hour',
    },
    {
      id: 2,
      date: '2025-02-01',
      subject: 'Physics',
      status: 'present',
      time: '11:30 AM',
      duration: '1 hour',
    },
    {
      id: 3,
      date: '2025-01-31',
      subject: 'Chemistry',
      status: 'absent',
      time: '09:00 AM',
      duration: '1 hour',
    },
  ];

  const subjectWiseAttendance = [
    { subject: 'Mathematics', attended: 34, total: 40, percentage: 85 },
    { subject: 'Physics', attended: 32, total: 35, percentage: 91 },
    { subject: 'Chemistry', attended: 36, total: 45, percentage: 80 },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Attendance</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Overall Attendance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{attendanceStats.overall}%</div>
            <Progress value={attendanceStats.overall} className="h-2 mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {attendanceStats.thisMonth}%
            </div>
            <Progress value={attendanceStats.thisMonth} className="h-2 mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Total Classes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {attendanceStats.totalClasses}
            </div>
            <p className="text-xs text-muted-foreground">Academic year</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Classes Attended
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {attendanceStats.attendedClasses}
            </div>
            <p className="text-xs text-muted-foreground">Academic year</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Subject-wise Attendance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {subjectWiseAttendance.map((subject) => (
              <div key={subject.subject} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{subject.subject}</span>
                  <span>{subject.percentage}%</span>
                </div>
                <Progress value={subject.percentage} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  {subject.attended} out of {subject.total} classes attended
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Attendance</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentAttendance.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>{record.date}</TableCell>
                  <TableCell>{record.subject}</TableCell>
                  <TableCell>{record.time}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {record.status === 'present' ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-500" />
                      )}
                      <span className="capitalize">{record.status}</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
