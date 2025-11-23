import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './components/theme-provider'
import { Layout } from './components/layout/layout'
import { ChatProvider } from './context/chat-context'
import { LoginPage } from './pages/login'
import { SignupPage } from './pages/signup'
import { ChatPage } from './pages/chat'
import { Testing } from './pages/testing'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
   const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
   if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
   }
   return <>{children}</>;
}

function App() {
   return (
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
         <BrowserRouter>
            <Routes>
               <Route path="/login" element={<LoginPage />} />
               <Route path="/signup" element={<SignupPage />} />
               <Route path="/testing" element={<Testing />} />
               <Route path="/" element={
                  <ProtectedRoute>
                     <ChatProvider>
                        <Layout />
                     </ChatProvider>
                  </ProtectedRoute>
               }>
                  <Route index element={<ChatPage />} />
               </Route>
            </Routes>
         </BrowserRouter>
      </ThemeProvider>
   )
}

export default App
