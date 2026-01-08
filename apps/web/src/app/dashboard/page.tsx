'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { auth } from '@/lib/auth'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChefHat,
  LogOut,
  Sparkles,
  ShoppingCart,
  DollarSign,
} from 'lucide-react'

interface User {
  id: string
  email: string
  name?: string
  provider: string
  createdAt: string
}

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadUser = async () => {
      if (!auth.isAuthenticated()) {
        router.push('/login')
        return
      }

      const userData = await auth.getCurrentUser()

      if (!userData) {
        router.push('/login')
        return
      }

      setUser(userData)
      setLoading(false)
    }

    loadUser()
  }, [router])

  const handleLogout = () => {
    auth.logout()
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-green-600 border-r-transparent"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <ChefHat className="h-6 w-6 text-green-600" />
            <span className="text-xl font-bold text-gray-900">
              StoreToStove
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              {user?.name || user?.email}
            </span>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.name?.split(' ')[0] || 'Chef'}! 👋
          </h1>
          <p className="mt-2 text-gray-600">
            Your personalized recipe and shopping assistant
          </p>
        </div>

        {/* Quick Actions */}
        <div className="mb-8 grid gap-6 md:grid-cols-3">
          <Card className="cursor-pointer transition-shadow hover:shadow-lg">
            <CardHeader>
              <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
                <Sparkles className="h-5 w-5 text-purple-600" />
              </div>
              <CardTitle>Generate Recipe</CardTitle>
              <CardDescription>
                Get AI-powered recipe suggestions based on your preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" disabled>
                Coming Soon
              </Button>
            </CardContent>
          </Card>

          <Card className="cursor-pointer transition-shadow hover:shadow-lg">
            <CardHeader>
              <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                <ShoppingCart className="h-5 w-5 text-blue-600" />
              </div>
              <CardTitle>Shopping List</CardTitle>
              <CardDescription>
                Manage your shopping lists and organize by store
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" disabled>
                Coming Soon
              </Button>
            </CardContent>
          </Card>

          <Card className="cursor-pointer transition-shadow hover:shadow-lg">
            <CardHeader>
              <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
              <CardTitle>Price Estimates</CardTitle>
              <CardDescription>
                See cost breakdowns and price per protein metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" disabled>
                Coming Soon
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* User Info Card */}
        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>Your StoreToStove account details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between border-b pb-2">
              <span className="text-sm font-medium text-gray-600">Email:</span>
              <span className="text-sm text-gray-900">{user?.email}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-sm font-medium text-gray-600">Name:</span>
              <span className="text-sm text-gray-900">
                {user?.name || 'Not set'}
              </span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-sm font-medium text-gray-600">
                Provider:
              </span>
              <span className="text-sm text-gray-900">
                {user?.provider || 'dev'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium text-gray-600">
                Member since:
              </span>
              <span className="text-sm text-gray-900">
                {user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString()
                  : 'Today'}
              </span>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
