"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { CalendarDays, Clock, GraduationCap, User } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import router from "next/router"
// Dummy data
const studentInfo = {
  name: "John Doe",
  id: "STU123",
  course: "Computer Science",
  semester: "4th",
  email: "john.doe@university.edu"
}
export interface Exam {
    id: number
    subject: string
    code: string // e.g., "CS101"
    date: string
    time: string
    duration: number // in minutes
    venue: string
    totalQuestions: number
    totalMarks: number
    passingPercentage: number
  }
  

const upcomingExams = [
  { id: 1, subject: "Data Structures", date: "2025-02-15", time: "10:00 AM", venue: "Hall A" },
  { id: 2, subject: "Database Systems", date: "2025-02-20", time: "2:00 PM", venue: "Hall B" },
  { id: 3, subject: "Web Development", date: "2025-02-25", time: "11:00 AM", venue: "Lab 1" }
]

const pastExams = [
  { subject: "Programming Basics", date: "2024-12", marks: 85 },
  { subject: "Computer Networks", date: "2024-11", marks: 78 },
  { subject: "Operating Systems", date: "2024-10", marks: 92 },
  { subject: "Software Engineering", date: "2024-09", marks: 88 },
  { subject: "Algorithm Design", date: "2024-08", marks: 75 }
]

export default function Dashboard() {
    const handleStartExam = (examId :string) => {
        router.push(`/exam/${examId}`)
      }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Student Dashboard</h1>
      
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="exams">Exams</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Student Information</CardTitle>
              <CardDescription>Your personal and academic details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span className="font-medium">Name:</span> {studentInfo.name}
                  </div>
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4" />
                    <span className="font-medium">Course:</span> {studentInfo.course}
                  </div>
                </div>
                <div className="space-y-2">
                  <div><span className="font-medium">Student ID:</span> {studentInfo.id}</div>
                  <div><span className="font-medium">Semester:</span> {studentInfo.semester}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Alert>
            <AlertDescription>
              Welcome back! You have {upcomingExams.length} upcoming exams.
            </AlertDescription>
          </Alert>
        </TabsContent>

        <TabsContent value="exams" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Exams</CardTitle>
              <CardDescription>Schedule of your next examinations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingExams.map((exam) => (
                  <div key={exam.id} className="flex items-center justify-between border-b pb-4">
                    <div>
                      <h3 className="font-medium">{exam.subject}</h3>
                      <div className="text-sm text-gray-500">
                        <CalendarDays className="h-4 w-4 inline mr-1" />
                        {exam.date} at {exam.time}
                      </div>
                    </div>
                    <div className="text-sm">{exam.venue}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Academic Performance</CardTitle>
              <CardDescription>Your exam results and progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={pastExams}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="marks" 
                      stroke="#2563eb" 
                      strokeWidth={2}
                      dot={{ fill: "#2563eb" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-6 space-y-2">
                {pastExams.map((exam, index) => (
                  <div key={index} className="flex justify-between items-center border-b pb-2">
                    <span>{exam.subject}</span>
                    <span className="font-medium">{exam.marks}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="exams" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Available Exams</CardTitle>
            <CardDescription>Your scheduled examinations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingExams.map((exam) => (
                <div key={exam.id} className="flex items-center justify-between border-b pb-4">
                  <div>
                    <h3 className="font-medium">{exam.subject}</h3>
                    <div className="text-sm text-gray-500">
                      <CalendarDays className="h-4 w-4 inline mr-1" />
                      {exam.date} at {exam.time}
                    </div>
                    <div className="text-sm text-gray-500">
                      <Clock className="h-4 w-4 inline mr-1" />
                      Duration: {exam.duration}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 items-end">
                    <Badge variant={exam.status === 'available' ? 'default' : 'secondary'}>
                      {exam.status}
                    </Badge>
                    {exam.status === 'available' && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="default" size="sm">
                            Start Exam
                          </Button>s
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>{exam.subject} Examination</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <Alert>
                              <AlertDescription>
                                - Duration: {exam.duration}
                                <br />
                                - Total Questions: {exam.totalQuestions}
                                <br />
                                - Once started, you must complete the exam
                              </AlertDescription>
                            </Alert>
                            <Button onClick={() => handleStartExam(exam.id)} className="w-full">
                              Begin Exam Now
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      </Tabs>
    </div>
  )
}