"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  Users,
  BookOpen,
  DollarSign,
  TrendingUp,
  TrendingDown,
  GraduationCap,
  Award,
  Eye,
  Download,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { toast } from "react-hot-toast";

const revenueData = [
  { month: "Jan", revenue: 12500, enrollments: 320 },
  { month: "Feb", revenue: 15800, enrollments: 385 },
  { month: "Mar", revenue: 18200, enrollments: 420 },
  { month: "Apr", revenue: 22100, enrollments: 510 },
  { month: "May", revenue: 19500, enrollments: 445 },
  { month: "Jun", revenue: 24800, enrollments: 580 },
];

const userGrowthData = [
  { month: "Jan", students: 1200, instructors: 25 },
  { month: "Feb", students: 1450, instructors: 28 },
  { month: "Mar", students: 1680, instructors: 32 },
  { month: "Apr", students: 1920, instructors: 35 },
  { month: "May", students: 2150, instructors: 38 },
  { month: "Jun", students: 2450, instructors: 42 },
];

const courseCompletionData = [
  { name: "Completed", value: 65, color: "#10b981" },
  { name: "In Progress", value: 25, color: "#3b82f6" },
  { name: "Not Started", value: 10, color: "#6b7280" },
];

const topCoursesData = [
  { name: "Python Basics", enrollments: 1250, completion: 78 },
  { name: "ML Fundamentals", enrollments: 980, completion: 72 },
  { name: "Data Analysis", enrollments: 875, completion: 68 },
  { name: "Bioinformatics", enrollments: 650, completion: 82 },
  { name: "Drug Discovery", enrollments: 520, completion: 75 },
];

const trafficSourcesData = [
  { source: "Direct", visitors: 4500 },
  { source: "Search", visitors: 3200 },
  { source: "Social", visitors: 2100 },
  { source: "Referral", visitors: 1200 },
  { source: "Email", visitors: 800 },
];

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState("30d");

  const stats = [
    {
      title: "Total Revenue",
      value: "$142,900",
      change: "+18.2%",
      trend: "up",
      icon: DollarSign,
      color: "text-green-600",
    },
    {
      title: "Active Users",
      value: "12,458",
      change: "+12.5%",
      trend: "up",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Total Enrollments",
      value: "45,231",
      change: "+23.1%",
      trend: "up",
      icon: GraduationCap,
      color: "text-brand-purple-600",
    },
    {
      title: "Certificates Issued",
      value: "3,892",
      change: "+8.7%",
      trend: "up",
      icon: Award,
      color: "text-brand-teal-600",
    },
    {
      title: "Avg. Completion Rate",
      value: "72%",
      change: "+3.2%",
      trend: "up",
      icon: TrendingUp,
      color: "text-orange-600",
    },
    {
      title: "Page Views",
      value: "1.2M",
      change: "-2.1%",
      trend: "down",
      icon: Eye,
      color: "text-gray-600",
    },
  ];

  const handleExport = (type: string) => {
    toast.success(`Exporting ${type} data...`);
  };

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Track your platform performance and user engagement.
          </p>
        </div>
        <div className="flex gap-4">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[180px]">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="12m">Last 12 months</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={() => handleExport("PDF")}>
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className={`p-2 rounded-lg bg-muted ${stat.color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <Badge
                      variant={stat.trend === "up" ? "default" : "destructive"}
                      className="flex items-center gap-1"
                    >
                      {stat.trend === "up" ? (
                        <ArrowUpRight className="h-3 w-3" />
                      ) : (
                        <ArrowDownRight className="h-3 w-3" />
                      )}
                      {stat.change}
                    </Badge>
                  </div>
                  <div className="mt-4">
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Revenue & Enrollments</span>
              <Button variant="ghost" size="sm" onClick={() => handleExport("Revenue")}>
                <Download className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="revenue"
                    stroke="#7c3aed"
                    strokeWidth={2}
                    dot={{ fill: "#7c3aed" }}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="enrollments"
                    stroke="#2563eb"
                    strokeWidth={2}
                    dot={{ fill: "#2563eb" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* User Growth Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>User Growth</span>
              <Button variant="ghost" size="sm" onClick={() => handleExport("Users")}>
                <Download className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={userGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="students" fill="#7c3aed" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="instructors" fill="#2563eb" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Course Completion */}
        <Card>
          <CardHeader>
            <CardTitle>Course Completion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={courseCompletionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {courseCompletionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Top Courses */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Top Performing Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topCoursesData.map((course, index) => (
                <div key={course.name} className="flex items-center gap-4">
                  <span className="text-sm font-medium text-muted-foreground w-6">
                    {index + 1}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium">{course.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {course.enrollments} enrolled
                      </span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${course.completion}%` }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        className="h-full bg-gradient-to-r from-brand-purple-500 to-brand-blue-500 rounded-full"
                      />
                    </div>
                  </div>
                  <Badge variant="outline">{course.completion}%</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Traffic Sources */}
      <Card>
        <CardHeader>
          <CardTitle>Traffic Sources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trafficSourcesData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="source" type="category" />
                <Tooltip />
                <Bar dataKey="visitors" fill="#0d9488" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
