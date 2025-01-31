'use client';

import React from 'react';
import DashboardLayout from '@/components/ui/dashboard';
import { Button } from '@/components/ui/button';
import { CalendarDays } from 'lucide-react';

export default function AttendancePage() {
  return (
    <DashboardLayout role="admin">
      <Button variant="outline">
        <CalendarDays className="w-4 h-4 mr-2" /> Comming soon !!
      </Button>
    </DashboardLayout>
  );
}
