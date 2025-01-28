"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ReviewType, ReviewStatus, Review } from "./types"
import { ClockIcon, SendIcon, FileIcon } from "lucide-react"

// Dummy data for reviews
const sampleReviews: Review[] = [
  {
    id: 1,
    studentId: "STU123",
    type: "exam-related",
    subject: "Question paper error in Data Structures Exam",
    description: "Question 5 had multiple correct answers but only one was accepted.",
    examId: 1,
    status: "under-review",
    submittedAt: "2025-01-25T10:00:00Z",
    lastUpdated: "2025-01-26T15:30:00Z",
    comments: [
      {
        id: 1,
        reviewId: 1,
        message: "We are reviewing the question with the subject matter expert.",
        author: "Prof. Smith",
        createdAt: "2025-01-26T15:30:00Z",
        isStaff: true
      }
    ]
  }
]

const reviewTypes: { value: ReviewType; label: string }[] = [
  { value: "exam-related", label: "Exam Related" },
  { value: "grade-dispute", label: "Grade Dispute" },
  { value: "technical-issue", label: "Technical Issue" },
  { value: "other", label: "Other" }
]

const getStatusColor = (status: ReviewStatus) => {
  const colors = {
    'pending': 'bg-yellow-100 text-yellow-800',
    'under-review': 'bg-blue-100 text-blue-800',
    'resolved': 'bg-green-100 text-green-800',
    'rejected': 'bg-red-100 text-red-800'
  }
  return colors[status] || colors['pending']
}

export default function ReviewPage() {
  const [reviews, setReviews] = useState<Review[]>(sampleReviews)
  const [newReview, setNewReview] = useState({
    type: "" as ReviewType,
    subject: "",
    description: "",
    examId: ""
  })

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // In a real app, this would be an API call
    const review: Review = {
      id: reviews.length + 1,
      studentId: "STU123",
      type: newReview.type,
      subject: newReview.subject,
      description: newReview.description,
      examId: newReview.examId ? parseInt(newReview.examId) : undefined,
      status: "pending",
      submittedAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      comments: []
    }

    setReviews([review, ...reviews])
    setNewReview({
      type: "" as ReviewType,
      subject: "",
      description: "",
      examId: ""
    })
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Review & Grievance Portal</h1>

      <Tabs defaultValue="submit" className="space-y-4">
        <TabsList>
          <TabsTrigger value="submit">Submit Review</TabsTrigger>
          <TabsTrigger value="history">Review History</TabsTrigger>
        </TabsList>

        <TabsContent value="submit">
          <Card>
            <CardHeader>
              <CardTitle>Submit New Review</CardTitle>
              <CardDescription>
                File a complaint or request a review for exam-related issues
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitReview} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="type">Review Type</Label>
                  <Select
                    value={newReview.type}
                    onValueChange={(value) => 
                      setNewReview({ ...newReview, type: value as ReviewType })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type of review" />
                    </SelectTrigger>
                    <SelectContent>
                      {reviewTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="examId">Exam ID (if applicable)</Label>
                  <Input
                    id="examId"
                    value={newReview.examId}
                    onChange={(e) => 
                      setNewReview({ ...newReview, examId: e.target.value })
                    }
                    placeholder="Enter exam ID"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    required
                    value={newReview.subject}
                    onChange={(e) => 
                      setNewReview({ ...newReview, subject: e.target.value })
                    }
                    placeholder="Brief subject of your review"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    required
                    value={newReview.description}
                    onChange={(e) => 
                      setNewReview({ ...newReview, description: e.target.value })
                    }
                    placeholder="Provide detailed information about your concern"
                    rows={5}
                  />
                </div>

                <div>
                  <Button type="submit" className="w-full">
                    <SendIcon className="w-4 h-4 mr-2" />
                    Submit Review
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Review History</CardTitle>
              <CardDescription>
                Track the status of your submitted reviews
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px] pr-4">
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <Card key={review.id} className="p-4">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-semibold">{review.subject}</h3>
                          <p className="text-sm text-gray-500">
                            {review.type.replace("-", " ").toUpperCase()}
                          </p>
                        </div>
                        <Badge variant="outline">
                          {review.status.replace("-", " ").toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-sm mb-4">{review.description}</p>
                      
                      <div className="space-y-2">
                        {review.comments?.map((comment) => (
                          <div
                            key={comment.id}
                            className={`p-3 rounded-lg ${
                              comment.isStaff ? 'bg-blue-50' : 'bg-gray-50'
                            }`}
                          >
                            <p className="text-sm">{comment.message}</p>
                            <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                              <span>{comment.author}</span>
                              <span>
                                <ClockIcon className="w-3 h-3 inline mr-1" />
                                {new Date(comment.createdAt).toLocaleString()}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-4 flex justify-between text-xs text-gray-500">
                        <span>Submitted: {new Date(review.submittedAt).toLocaleString()}</span>
                        <span>Last Updated: {new Date(review.lastUpdated).toLocaleString()}</span>
                      </div>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}