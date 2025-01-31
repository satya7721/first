"use client"
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  
interface LoginFormProps {
    role: string;
}

const handleLogin = (role: string, e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    // Add your login logic here
    console.log(`${role} login attempt`);
};

const LoginForm: React.FC<LoginFormProps> = ({ role }) => (
    <form onSubmit={(e) => handleLogin(role, e)}>
        <div className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor={`${role}-email`}>Email</Label>
                <Input
                    id={`${role}-email`}
                    placeholder="name@example.com"
                    type="email"
                    required
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor={`${role}-password`}>Password</Label>
                <div className="relative">
                    <Input
                        id={`${role}-password`}
                        type={showPassword ? "text" : "password"}
                        required
                    />
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 -translate-y-1/2"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? 
                            <EyeOff className="h-4 w-4" /> : 
                            <Eye className="h-4 w-4" />
                        }
                    </Button>
                </div>
            </div>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                Login as {role}
            </Button>
        </div>
    </form>
);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="w-full max-w-md p-4">
        <Link href="/">
          <Button variant="ghost" className="mb-4">
            ← Back to Home
          </Button>
        </Link>
        
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Welcome to TutorHub</CardTitle>
            <CardDescription className="text-center">
              Please login to continue
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <Tabs defaultValue="student" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="student">Student</TabsTrigger>
                <TabsTrigger value="admin">Admin</TabsTrigger>
              </TabsList>
              <TabsContent value="student">
                <LoginForm role="Student" />
              </TabsContent>
              <TabsContent value="admin">
                <LoginForm role="Admin" />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;