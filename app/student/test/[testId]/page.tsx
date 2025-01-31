'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';
import { Progress } from '@/components/ui/progress';
import { use } from 'react';

interface TestPageProps {
  params: Promise<{ testId: string }>;
}

// Mock test data - in a real app, this would be an API call
const getTestQuestions = (testId: string) => {
  return [
    {
      id: 1,
      question: 'What is the value of π (pi) to two decimal places?',
      options: ['3.14', '3.16', '3.12', '3.18'],
      correctAnswer: '3.14',
    },
    {
      id: 2,
      question: 'Which of these is not a prime number?',
      options: ['2', '3', '4', '5'],
      correctAnswer: '4',
    },
    // Add more questions as needed
  ];
};

export default function TestPage({ params }: TestPageProps) {
  const router = useRouter();
  const { testId } = use(params);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [timeLeft, setTimeLeft] = useState(20 * 60); // 20 minutes in seconds
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [questions] = useState(() => getTestQuestions(testId));

  const handleSubmit = () => {
    // Calculate score
    let score = 0;
    questions.forEach((q, index) => {
      if (answers[index] === q.correctAnswer) score++;
    });

    // Store score in localStorage for demo purposes
    // In a real app, you'd send this to your backend
    const testResults = JSON.parse(localStorage.getItem('testResults') || '[]');
    testResults.push({
      testId,
      score: (score / questions.length) * 100,
    });
    localStorage.setItem('testResults', JSON.stringify(testResults));

    router.push('/student/exams');
  };

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      handleSubmit();
    }
  }, [timeLeft, handleSubmit]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleAnswer = (answer: string) => {
    setAnswers({ ...answers, [currentQuestion]: answer });
  };

  return (
    <div className="container max-w-3xl mx-auto p-4 space-y-6">
      {/* Timer and Progress */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center mb-4">
            <div className="text-2xl font-bold">
              Time Left: {formatTime(timeLeft)}
            </div>
            <div className="text-sm">
              Question {currentQuestion + 1} of {questions.length}
            </div>
          </div>
          <Progress
            value={((currentQuestion + 1) / questions.length) * 100}
            className="h-2"
          />
        </CardContent>
      </Card>

      {/* Question Card */}
      <Card>
        <CardHeader>
          <CardTitle>Question {currentQuestion + 1}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <p className="text-lg">{questions[currentQuestion].question}</p>

            <RadioGroup
              value={answers[currentQuestion] || ''}
              onValueChange={handleAnswer}
            >
              {questions[currentQuestion].options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`}>{option}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => setCurrentQuestion((prev) => Math.max(0, prev - 1))}
          disabled={currentQuestion === 0}
        >
          Previous
        </Button>

        {currentQuestion === questions.length - 1 ? (
          <Button onClick={() => setShowSubmitDialog(true)}>Submit Test</Button>
        ) : (
          <Button
            onClick={() =>
              setCurrentQuestion((prev) =>
                Math.min(questions.length - 1, prev + 1)
              )
            }
          >
            Next
          </Button>
        )}
      </div>

      {/* Submit Confirmation Dialog */}
      <AlertDialog open={showSubmitDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Submit Test?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to submit your test? You cannot undo this
              action.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowSubmitDialog(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Submit</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
