"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { authenticatedUser } from "@/app/actions";
import type { User } from "@/types/user";
import Link from "next/link";


export default function Home() {

  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    authenticatedUser()
      .then(setUser)
      .catch(() => setUser(null));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">Q</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">QuickCoach</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" asChild>

              {user ? (
                <Link href="/overview">Hi {user.firstName} {user.lastName}!</Link>
              ) : (
                <Link href="/auth/signin">Login</Link>
              )}
            </Button>
            <Button>
              {user ? (
                 <Link href="/auth/signout">Logout</Link>
              ) : (
                <Link href="/auth/signup">Get Started</Link>
              )}
            </Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <Badge className="mb-4" variant="secondary">
            🔥 AI-Powered Personal Mentor
          </Badge>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Instant AI
            <span className="text-blue-600"> Coaching </span>
            for Any Problem
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Paste your technical or career problem and get step-by-step guidance, 
            personalized recommendations, and actionable solutions from your AI coach powered by DeepSeek.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button size="lg" className="text-lg px-8 py-6">
              Get Instant Coaching
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6">
              Try Demo Problem
            </Button>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">How QuickCoach Works</h3>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="text-center hover:shadow-lg transition-shadow border-2">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📝</span>
                </div>
                <CardTitle>1. Paste Your Problem</CardTitle>
                <CardDescription>
                  Share any technical challenge, career question, or learning goal. Be as detailed as you want.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow border-2">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🤖</span>
                </div>
                <CardTitle>2. AI Analysis</CardTitle>
                <CardDescription>
                  Our DeepSeek-powered AI coach analyzes your problem and creates a personalized action plan.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow border-2">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎯</span>
                </div>
                <CardTitle>3. Get Step-by-Step Guide</CardTitle>
                <CardDescription>
                  Receive actionable steps, resources, and recommendations. Track progress and rate usefulness.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📚</span>
              </div>
              <CardTitle>Session History</CardTitle>
              <CardDescription>
                View all your past coaching sessions, organized by date and topic for easy reference.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏷️</span>
              </div>
              <CardTitle>Smart Tagging</CardTitle>
              <CardDescription>
                Automatically tag topics like "Python", "Career", "Leadership" to find relevant sessions quickly.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⭐</span>
              </div>
              <CardTitle>Rate & Improve</CardTitle>
              <CardDescription>
                Rate the usefulness of each coaching session to help improve future recommendations.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Stats Section */}
        <div className="mt-20 bg-white rounded-2xl shadow-xl p-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">5K+</div>
              <div className="text-gray-600">Problems Solved</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">25K+</div>
              <div className="text-gray-600">Coaching Sessions</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">98%</div>
              <div className="text-gray-600">User Satisfaction</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-600 mb-2">50+</div>
              <div className="text-gray-600">Topic Categories</div>
            </div>
          </div>
        </div>

        {/* Demo Section */}
        <div className="mb-20 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-center text-gray-900 mb-8">See It In Action</h3>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="mb-4">
                <span className="text-sm font-medium text-gray-500">Example Problem:</span>
                <div className="mt-2 p-4 bg-gray-50 rounded-lg border-l-4 border-blue-500">
                  <p className="text-gray-700">"I'm learning Python and struggling with understanding decorators. Can you help me understand what they are and provide practical examples?"</p>
                </div>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">AI Coach Response:</span>
                <div className="mt-2 p-4 bg-blue-50 rounded-lg border-l-4 border-green-500">
                  <div className="space-y-2">
                    <p className="text-gray-700 font-medium">🎯 Step-by-Step Learning Plan:</p>
                    <ul className="text-gray-700 space-y-1 ml-4">
                      <li>• <strong>Concept</strong>: Decorators are functions that modify other functions</li>
                      <li>• <strong>Practice</strong>: Start with @property and @staticmethod</li>
                      <li>• <strong>Build</strong>: Create a timing decorator for performance monitoring</li>
                      <li>• <strong>Resources</strong>: Python.org docs + Real Python tutorial</li>
                    </ul>
                    <div className="mt-3 flex gap-2">
                      <Badge variant="secondary">Python</Badge>
                      <Badge variant="secondary">Decorators</Badge>
                      <Badge variant="secondary">Functions</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 mt-20 border-t border-gray-200">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">Q</span>
            </div>
            <span className="text-gray-600">© 2025 QuickCoach. All rights reserved.</span>
          </div>
          <div className="flex space-x-6 text-sm text-gray-600">
            <a href="#" className="hover:text-blue-600 transition-colors">Privacy</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Terms</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
