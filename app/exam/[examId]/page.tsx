// app/exam/[examId]/page.tsx
"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Clock } from "lucide-react"

// Sample exam data - replace with API call
const getExamData = (examId: string) => ({
  id: examId,
  subject: "Data Structures",
  duration: 120, // in minutes
  questions: [
    {
      id: 1,
      question: "What is the time complexity of QuickSort in the average case?",
      options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
      correct: 1
    },
    {
      id: 2,
      question: "Which data structure is best suited for implementing a LIFO system?",
      options: ["Queue", "Stack", "Linked List", "Array"],
      correct: 1
    },
    {
      id: 3,
      question: "What is the space complexity of a binary search tree?",
      options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
      correct: 1
    }
  ]
})

export default function ExamPage() {
  const router = useRouter()
  const params = useParams()
  const examId = params.examId as string

  const [examData, setExamData] = useState(null)
  const [responses, setResponses] = useState({})
  const [timeLeft, setTimeLeft] = useState(0)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)

  useEffect(() => {
    // In real app, fetch from API
    const data = getExamData(examId)
    setExamData(data)
    setTimeLeft(data.duration * 60) // Convert minutes to seconds
  }, [examId])

  useEffect(() => {
    if (!hasStarted || !timeLeft) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          handleSubmit()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [hasStarted, timeLeft])

  const handleStartExam = () => {
    setHasStarted(true)
  }

  const handleAnswerSelect = (questionId: number, optionIndex: string) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: parseInt(optionIndex)
    }))
  }

  const handleSubmit = async () => {
    // Here you would send responses to your API
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      setIsSubmitted(true)
      setTimeout(() => {
        router.push('/dashboard')
      }, 2000)
    } catch (error) {
      console.error('Error submitting exam:', error)
    }
  }

  if (!examData) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>
  }

  if (isSubmitted) {
    return (
      <div className="container mx-auto p-4">
        <Alert>
          <AlertDescription>
            Your exam has been submitted successfully! Redirecting to dashboard...
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  if (!hasStarted) {
    return (
      <div className="container mx-auto p-4">
        <Card>
          <CardHeader>
            <CardTitle>{examData.subject} Examination</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <AlertDescription>
                - Duration: {examData.duration} minutes
                <br />
                - Total Questions: {examData.questions.length}
                <br />
                - Once started, you must complete the exam
                <br />
                - Timer will start immediately after clicking Start
              </AlertDescription>
            </Alert>
            <Button onClick={handleStartExam} className="w-full">
              Start Exam
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>{examData.subject} Examination</CardTitle>
            <Badge variant="outline" className="text-lg">
              <Clock className="w-4 h-4 mr-2" />
              {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="space-y-8">
            {examData.questions.map((question, index) => (
              <div key={question.id} className="space-y-4">
                <h3 className="font-medium">
                  Question {index + 1}: {question.question}
                </h3>
                <RadioGroup
                  onValueChange={(value) => handleAnswerSelect(question.id, value)}
                  value={responses[question.id]?.toString()}
                >
                  {question.options.map((option, optIndex) => (
                    <div key={optIndex} className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={optIndex.toString()}
                        id={`q${question.id}-opt${optIndex}`}
                      />
                      <Label htmlFor={`q${question.id}-opt${optIndex}`}>{option}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            ))}
            <div className="flex justify-between items-center">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push('/dashboard')}
              >
                Exit Exam
              </Button>
              <Button type="submit">
                Submit Exam
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}