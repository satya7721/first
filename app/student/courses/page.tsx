'use client';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { BookOpen, Clock } from 'lucide-react';

export default function StudentCourses() {
  const courses = [
    {
      id: 1,
      name: 'Advanced Mathematics',
      instructor: 'Dr. Smith',
      progress: 65,
      nextClass: 'Monday, 10:00 AM',
      totalLessons: 24,
      completedLessons: 16,
      status: 'ongoing',
    },
    {
      id: 2,
      name: 'Physics Fundamentals',
      instructor: 'Prof. Johnson',
      progress: 42,
      nextClass: 'Tuesday, 2:00 PM',
      totalLessons: 20,
      completedLessons: 8,
      status: 'ongoing',
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">My Courses</h1>

      <div className="grid gap-6 md:grid-cols-2">
        {courses.map((course) => (
          <Card key={course.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{course.name}</CardTitle>
                  <CardDescription>{course.instructor}</CardDescription>
                </div>
                <Badge>{course.status}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Progress</span>
                  <span>{course.progress}%</span>
                </div>
                <Progress value={course.progress} className="h-2" />
              </div>

              <div className="flex justify-between items-center text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  <span>
                    {course.completedLessons}/{course.totalLessons} Lessons
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{course.nextClass}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button className="w-full">Continue Learning</Button>
                <Button variant="outline" className="w-full">
                  Materials
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
