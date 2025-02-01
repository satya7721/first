'use client';

import React, { useEffect, useState } from 'react';
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
import { Search, MoreVertical } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function FeesPage() {
  interface Fee {
    id: number;
    description: string;
    amount: string;
    dueDate: string;
    status: string;
  }

  const [fees, setFees] = useState<Fee[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setFees([
        {
          id: 1,
          description: 'Tuition Fee',
          amount: '$1000',
          dueDate: '2025-03-10',
          status: 'Pending',
        },
        {
          id: 2,
          description: 'Library Fee',
          amount: '$200',
          dueDate: '2025-04-05',
          status: 'Paid',
        },
        {
          id: 3,
          description: 'Lab Fee',
          amount: '$150',
          dueDate: '2025-03-20',
          status: 'Pending',
        },
      ]);
    }, 1000);
  }, []);

  return (
    <DashboardLayout role="admin">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Fees Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input className="pl-8" placeholder="Search fees..." />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Description</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fees.length > 0
                ? fees.map((fee) => (
                    <TableRow key={fee.id}>
                      <TableCell className="min-w-[150px]">
                        {fee.description}
                      </TableCell>
                      <TableCell className="min-w-[100px]">
                        {fee.amount}
                      </TableCell>
                      <TableCell className="min-w-[120px]">
                        {fee.dueDate}
                      </TableCell>
                      <TableCell className="min-w-[100px]">
                        {fee.status}
                      </TableCell>
                      <TableCell className="min-w-[50px]">
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                : Array.from({ length: 3 }).map((_, index) => (
                    <TableRow key={index}>
                      <TableCell className="min-w-[150px]">
                        <Skeleton className="h-6 w-24 bg-gray-200 rounded" />
                      </TableCell>
                      <TableCell className="min-w-[100px]">
                        <Skeleton className="h-6 w-16 bg-gray-200 rounded" />
                      </TableCell>
                      <TableCell className="min-w-[120px]">
                        <Skeleton className="h-6 w-20 bg-gray-200 rounded" />
                      </TableCell>
                      <TableCell className="min-w-[100px]">
                        <Skeleton className="h-6 w-12 bg-gray-200 rounded" />
                      </TableCell>
                      <TableCell className="min-w-[50px]">
                        <Skeleton className="h-6 w-6 bg-gray-200 rounded" />
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
