import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import DotGrid from '../components/react-bits/dot-grid';

export function SignupPage() {
   const navigate = useNavigate();
   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');

   const handleSignup = (e: React.FormEvent) => {
      e.preventDefault();
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userEmail', email);
      navigate('/');
   };

   return (
      <div className="min-h-screen flex items-center justify-center bg-transparent p-8">
         <DotGrid
                     dotSize={5}
                     gap={15}
                     baseColor="#222222"
                     activeColor="#2a9dfa"
                     proximity={160}
                     shockRadius={250}
                     shockStrength={5}
                     resistance={750}
                     returnDuration={1.5}
                     style={{ position: 'absolute',zIndex: -1 }}
                  />
         <div className="flex flex-col items-center w-full">
            <div className="mb-8 text-center space-y-2">
               <h1 className="text-2xl font-bold text-foreground">Create an account</h1>
               <p className="text-sm text-gray-400">Enter your information to get started</p>
            </div>

            <Card className="max-w-[420px] w-full opacity-90">
               <CardHeader>
                  <CardTitle>Sign Up</CardTitle>
                  <CardDescription>Create your account to continue.</CardDescription>
               </CardHeader>
               <CardContent>
                  <form onSubmit={handleSignup} className="space-y-4">
                     <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                           Name
                        </label>
                        <Input
                           id="name"
                           type="text"
                           placeholder="John Doe"
                           value={name}
                           onChange={(e) => setName(e.target.value)}
                           required
                        />
                     </div>

                     <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                           Email
                        </label>
                        <Input
                           id="email"
                           type="email"
                           placeholder="m@example.com"
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                           required
                        />
                     </div>

                     <div className="space-y-2">
                        <label htmlFor="password" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                           Password
                        </label>
                        <Input
                           id="password"
                           type="password"
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                           required
                        />
                     </div>

                     <Button type="submit" className="w-full">
                        Sign Up
                     </Button>

                     <div className="text-center text-sm">
                        Already have an account?{' '}
                        <Link to="/login" className="underline">
                           Login
                        </Link>
                     </div>
                  </form>
               </CardContent>
            </Card>
         </div>
      </div>
   );
}
