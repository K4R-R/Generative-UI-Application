import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';

export function LoginPage() {
   const navigate = useNavigate()
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');

   const handleLogin = (e: React.FormEvent) => {
      e.preventDefault();
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userEmail', email);
      navigate('/');
   };

   return (
      <div className="min-h-screen flex items-center justify-center bg-black p-4">
         <div className="flex flex-col items-center w-full">
            <div className="mb-8 text-center space-y-2">
               <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
               <p className="text-sm text-gray-400">Enter your credentials to access the platform</p>
            </div>

            <Card className="w-[420px]">
               <CardHeader>
                  <CardTitle>Login</CardTitle>
                  <CardDescription>Enter your email to access your account.</CardDescription>
               </CardHeader>
               <CardContent>
                  <form onSubmit={handleLogin} className="space-y-4">
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
                        Login
                     </Button>

                     <div className="text-center text-sm">
                        Don't have an account?{' '}
                        <Link to="/signup" className="underline">
                           Sign Up
                        </Link>
                     </div>
                  </form>
               </CardContent>
            </Card>
         </div>
      </div>
   );
}
