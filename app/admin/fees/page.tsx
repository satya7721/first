'use client';

import React from 'react';
import DashboardLayout from '@/components/ui/dashboard';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, CalendarDays } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function AttendancePage() {
  const students = [
    { id: 1, name: "John Doe", status: "Present" },
    { id: 2, name: "Jane Smith", status: "Absent" },
    { id: 3, name: "Bob Johnson", status: "Present" },
  ];

  return (
    <DashboardLayout role="admin">
            <Button variant="outline">
              <CalendarDays className="w-4 h-4 mr-2" /> Comming soon !!
            </Button>
    </DashboardLayout>
  );
}