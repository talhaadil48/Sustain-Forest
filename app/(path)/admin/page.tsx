"use client"

import { useState, useEffect, useMemo } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts"

interface User {
  id: string
  name: string
  created_at: string
}

interface Review {
  id: string
  content: string
  star: number
  user_id: string
  created_at: string
}

export default function AdminPage() {
  const [users, setUsers] = useState<User[]>([])
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("analytics")
  const router = useRouter()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      // Fetch users
      const { data: usersData, error: usersError } = await supabase
        .from("users")
        .select("*")
        .order("created_at", { ascending: false })

      if (usersError) {
        console.error("Error fetching users:", usersError)
      } else {
        setUsers(usersData || [])
      }

      // Fetch reviews
      const { data: reviewsData, error: reviewsError } = await supabase
        .from("reviews")
        .select("*")
        .order("created_at", { ascending: false })

      if (reviewsError) {
        console.error("Error fetching reviews:", reviewsError)
      } else {
        setReviews(reviewsData || [])
      }
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    // Remove auth cookie
    document.cookie = "admin-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT"
    router.push("/login")
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${i < rating ? "text-yellow-400" : "text-gray-300"}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))
  }

  // Analytics calculations
  const analyticsData = useMemo(() => {
    // User growth over time
    const userGrowthData = users
      .reduce((acc: any[], user) => {
        const date = new Date(user.created_at).toLocaleDateString()
        const existing = acc.find((item) => item.date === date)
        if (existing) {
          existing.users += 1
        } else {
          acc.push({ date, users: 1 })
        }
        return acc
      }, [])
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

    // Reviews over time
    const reviewGrowthData = reviews
      .reduce((acc: any[], review) => {
        const date = new Date(review.created_at).toLocaleDateString()
        const existing = acc.find((item) => item.date === date)
        if (existing) {
          existing.reviews += 1
        } else {
          acc.push({ date, reviews: 1 })
        }
        return acc
      }, [])
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

    // Rating distribution
    const ratingDistribution = [1, 2, 3, 4, 5].map((rating) => ({
      rating: `${rating} Star${rating > 1 ? "s" : ""}`,
      count: reviews.filter((review) => review.star === rating).length,
      value: rating,
    }))

    // Average rating over time
    const avgRatingData = reviews
      .reduce((acc: any[], review) => {
        const date = new Date(review.created_at).toLocaleDateString()
        const existing = acc.find((item) => item.date === date)
        if (existing) {
          existing.totalRating += review.star
          existing.count += 1
          existing.avgRating = existing.totalRating / existing.count
        } else {
          acc.push({
            date,
            totalRating: review.star,
            count: 1,
            avgRating: review.star,
          })
        }
        return acc
      }, [])
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

    // Monthly stats
    const monthlyStats = reviews
      .reduce((acc: any[], review) => {
        const month = new Date(review.created_at).toLocaleDateString("en-US", { year: "numeric", month: "short" })
        const existing = acc.find((item) => item.month === month)
        if (existing) {
          existing.reviews += 1
          existing.totalRating += review.star
          existing.avgRating = existing.totalRating / existing.reviews
        } else {
          acc.push({
            month,
            reviews: 1,
            totalRating: review.star,
            avgRating: review.star,
          })
        }
        return acc
      }, [])
      .sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime())

    const averageRating =
      reviews.length > 0 ? reviews.reduce((sum, review) => sum + review.star, 0) / reviews.length : 0
    const totalReviews = reviews.length
    const totalUsers = users.length
    const reviewsThisWeek = reviews.filter((review) => {
      const reviewDate = new Date(review.created_at)
      const weekAgo = new Date()
      weekAgo.setDate(weekAgo.getDate() - 7)
      return reviewDate >= weekAgo
    }).length

    return {
      userGrowthData,
      reviewGrowthData,
      ratingDistribution,
      avgRatingData,
      monthlyStats,
      averageRating,
      totalReviews,
      totalUsers,
      reviewsThisWeek,
    }
  }, [users, reviews])

  const COLORS = ["#ef4444", "#f97316", "#eab308", "#22c55e", "#16a34a"]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      {/* Header */}
      <div className="bg-white border-b border-green-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                  />
                </svg>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Admin Panel</h1>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 border border-green-300 text-green-700 rounded-lg hover:bg-green-50 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          <div className="bg-white rounded-lg border border-green-200 p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-800">{analyticsData.totalUsers}</p>
              </div>
              <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                />
              </svg>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-green-200 p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Reviews</p>
                <p className="text-2xl font-bold text-gray-800">{analyticsData.totalReviews}</p>
              </div>
              <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-green-200 p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Rating</p>
                <p className="text-2xl font-bold text-gray-800">{analyticsData.averageRating.toFixed(1)}</p>
                <div className="flex items-center mt-1">{renderStars(Math.round(analyticsData.averageRating))}</div>
              </div>
              <svg className="h-8 w-8 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-green-200 p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Reviews This Week</p>
                <p className="text-2xl font-bold text-gray-800">{analyticsData.reviewsThisWeek}</p>
              </div>
              <svg className="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg border border-green-200 overflow-hidden">
          <div className="border-b border-green-200">
            <nav className="flex space-x-4 sm:space-x-8 px-4 sm:px-6 overflow-x-auto">
              <button
                onClick={() => setActiveTab("analytics")}
                className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === "analytics"
                    ? "border-green-500 text-green-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Analytics
              </button>
              <button
                onClick={() => setActiveTab("users")}
                className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === "users"
                    ? "border-green-500 text-green-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Users
              </button>
              <button
                onClick={() => setActiveTab("reviews")}
                className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === "reviews"
                    ? "border-green-500 text-green-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Reviews
              </button>
            </nav>
          </div>

          <div className="p-4 sm:p-6">
            {loading ? (
              <div className="text-center py-8 text-gray-500">Loading data...</div>
            ) : (
              <>
                {activeTab === "analytics" && (
                  <div className="space-y-8">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Analytics Dashboard</h2>

                    {/* Charts Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                      {/* User Growth Chart */}
                      <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
                        <h3 className="text-lg font-medium text-gray-800 mb-4">User Registration Over Time</h3>
                        <div className="h-64 sm:h-80">
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={analyticsData.userGrowthData}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="date" tick={{ fontSize: 12 }} interval="preserveStartEnd" />
                              <YAxis tick={{ fontSize: 12 }} />
                              <Tooltip />
                              <Area type="monotone" dataKey="users" stroke="#16a34a" fill="#16a34a" fillOpacity={0.3} />
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>
                      </div>

                      {/* Reviews Growth Chart */}
                      

                      {/* Rating Distribution */}
                      <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
                        <h3 className="text-lg font-medium text-gray-800 mb-4">Rating Distribution</h3>
                        <div className="h-64 sm:h-80">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={analyticsData.ratingDistribution}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ rating, count }) => (count > 0 ? `${rating}: ${count}` : "")}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="count"
                              >
                                {analyticsData.ratingDistribution.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                              </Pie>
                              <Tooltip />
                              <Legend />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                      </div>

                      {/* Average Rating Trend */}
                      
                    </div>

                    {/* Monthly Statistics */}
                    <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
                      <h3 className="text-lg font-medium text-gray-800 mb-4">Monthly Statistics</h3>
                      <div className="h-64 sm:h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={analyticsData.monthlyStats}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                            <YAxis tick={{ fontSize: 12 }} />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="reviews" fill="#16a34a" name="Reviews" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "users" && (
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Users</h2>
                    {users.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">No users found</div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Name
                              </th>
                              <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Created At
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {users.map((user) => (
                              <tr key={user.id}>
                                <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                  {user.name}
                                </td>
                                <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {formatDate(user.created_at)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "reviews" && (
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Reviews</h2>
                    {reviews.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">No reviews found</div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Name
                              </th>
                              <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Rating
                              </th>
                              <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Content
                              </th>
                              <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Created At
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {reviews.map((review) => (
                              <tr key={review.id}>
                                <td className="px-3 sm:px-6 py-4 text-sm text-gray-900 max-w-xs">
                                  <div className="truncate" title={review.content}>
                                     {users.find((user) => user.id === review.user_id)?.name || "Unknown User"}
                                  </div>
                                </td>
                                <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  <div className="flex items-center space-x-1">
                                    {renderStars(review.star || 0)}
                                    <span className="ml-2 text-sm text-gray-600">({review.star || 0}/5)</span>
                                  </div>
                                </td>
                                <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                                {review.content}
                                </td>
                                <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {formatDate(review.created_at)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
