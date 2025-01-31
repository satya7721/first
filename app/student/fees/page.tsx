'use client';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DollarSign, CreditCard, AlertCircle, CheckCircle } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function StudentFees() {
  const feeSummary = {
    totalFees: 12000,
    paidAmount: 8000,
    pendingAmount: 4000,
    nextDueDate: '2025-02-15',
  };

  const recentPayments = [
    {
      id: 1,
      date: '2025-01-15',
      amount: 2000,
      type: 'Tuition Fee',
      status: 'paid',
      transactionId: 'TXN123456',
    },
    {
      id: 2,
      date: '2024-12-15',
      amount: 2000,
      type: 'Tuition Fee',
      status: 'paid',
      transactionId: 'TXN123455',
    },
  ];

  const upcomingPayments = [
    {
      id: 1,
      dueDate: '2025-02-15',
      amount: 2000,
      type: 'Tuition Fee',
      status: 'pending',
    },
    {
      id: 2,
      dueDate: '2025-03-15',
      amount: 2000,
      type: 'Tuition Fee',
      status: 'pending',
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Fees & Payments</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Total Fees</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${feeSummary.totalFees}</div>
            <p className="text-xs text-muted-foreground">Academic year</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Paid Amount</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${feeSummary.paidAmount}</div>
            <p className="text-xs text-muted-foreground">Total paid</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Pending Amount
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">
              ${feeSummary.pendingAmount}
            </div>
            <p className="text-xs text-muted-foreground">To be paid</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Next Due Date</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{feeSummary.nextDueDate}</div>
            <p className="text-xs text-muted-foreground">
              For upcoming payment
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Payments</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Due Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {upcomingPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>{payment.dueDate}</TableCell>
                  <TableCell>{payment.type}</TableCell>
                  <TableCell>${payment.amount}</TableCell>
                  <TableCell>
                    <Button>Pay Now</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>{payment.date}</TableCell>
                  <TableCell className="font-mono">
                    {payment.transactionId}
                  </TableCell>
                  <TableCell>{payment.type}</TableCell>
                  <TableCell>${payment.amount}</TableCell>
                  <TableCell>
                    <Badge className="bg-green-500">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      {payment.status}
                    </Badge>
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
