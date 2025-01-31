'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, AlertCircle } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export default function StudentExams() {
  const performanceData = [
    { testId: 'Test 1', score: 85 },
    { testId: 'Test 2', score: 78 },
    { testId: 'Test 3', score: 92 },
  ];

  const exams = [
    {
      id: 1,
      subject: 'Mathematics',
      type: 'Mid-term',
      date: '2025-02-15',
      time: '10:00 AM',
      duration: '20 minutes',
      room: 'Room 101',
      status: 'available',
      testId: 'MATH101',
    },
    {
      id: 2,
      subject: 'Physics',
      type: 'Final',
      date: '2025-02-18',
      time: '02:00 PM',
      duration: '20 minutes',
      room: 'Hall A',
      status: 'upcoming',
    },
    {
      id: 3,
      subject: 'Chemistry',
      type: 'Quiz',
      date: '2025-01-20',
      time: '11:00 AM',
      duration: '20 minutes',
      room: 'Room 205',
      status: 'completed',
      score: '85/100',
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Exams</h1>

      {/* Performance Graph */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Overview</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="testId" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#8884d8"
                strokeWidth={2}
                dot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Available Tests */}
      <Card>
        <CardHeader>
          <CardTitle>Available Tests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {exams
              .filter((exam) => exam.status === 'available')
              .map((exam) => (
                <Card key={exam.id}>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold">{exam.subject}</h3>
                        <p className="text-sm text-muted-foreground">
                          {exam.type}
                        </p>
                      </div>
                      <Badge>{exam.status}</Badge>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{exam.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4" />
                        <span>{exam.room}</span>
                      </div>
                    </div>

                    <Button className="w-full mt-4" asChild>
                      <a href={`/student/test/${exam.testId}`}>Start Test</a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* Completed Tests */}
      <Card>
        <CardHeader>
          <CardTitle>Completed Tests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {exams
              .filter((exam) => exam.status === 'completed')
              .map((exam) => (
                <Card key={exam.id}>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold">{exam.subject}</h3>
                        <p className="text-sm text-muted-foreground">
                          {exam.type}
                        </p>
                      </div>
                      <Badge variant="secondary">Score: {exam.score}</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
