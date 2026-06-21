"use client";

import { motion } from "framer-motion";
import {
  Users,
  BookOpen,
  GraduationCap,
  DollarSign,
  Award,
  TrendingUp,
  TrendingDown,
  Eye,
  Download,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock data for demonstration
const stats = [
  {
    title: "Total Users",
    value: "12,458",
    change: "+12.5%",
    trend: "up",
    icon: Users,
    color: "text-blue-600",
  },
  {
    title: "Active Courses",
    value: "156",
    change: "+8.2%",
    trend: "up",
    icon: BookOpen,
    color: "text-brand-purple-600",
  },
  {
    title: "Enrollments",
    value: "45,231",
    change: "+23.1%",
    trend: "up",
    icon: GraduationCap,
    color: "text-brand-teal-600",
  },
  {
    title: "Revenue",
    value: "$89,542",
    change: "-2.3%",
    trend: "down",
    icon: DollarSign,
    color: "text-green-600",
  },
];

const recentEnrollments = [
  { id: 1, user: "Sarah Chen", course: "Computational Chemistry Basics", date: "2 hours ago" },
  { id: 2, user: "Michael Rodriguez", course: "Machine Learning for Scientists", date: "3 hours ago" },
  { id: 3, user: "Emily Zhang", course: "Drug Discovery Fundamentals", date: "5 hours ago" },
  { id: 4, user: "James Park", course: "Python for Bioinformatics", date: "6 hours ago" },
  { id: 5, user: "Lisa Wang", course: "Data Visualization in Science", date: "8 hours ago" },
];

const recentActivity = [
  { type: "enrollment", message: "New enrollment in Machine Learning for Scientists", time: "2 min ago" },
  { type: "certificate", message: "Certificate issued to Sarah Chen", time: "15 min ago" },
  { type: "payment", message: "Payment received: $49.99", time: "30 min ago" },
  { type: "course", message: "New course published: Advanced Drug Discovery", time: "1 hour ago" },
  { type: "user", message: "New user registered: Michael Rodriguez", time: "2 hours ago" },
];

export default function AdminDashboardPage() {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here&apos;s what&apos;s happening with your platform.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
                      variant={stat.trend === "up" ? "success" : "destructive"}
                      className="flex items-center gap-1"
                    >
                      {stat.trend === "up" ? (
                        <TrendingUp className="h-3 w-3" />
                      ) : (
                        <TrendingDown className="h-3 w-3" />
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

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Enrollments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Recent Enrollments
              <Badge variant="secondary">Last 24 hours</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentEnrollments.map((enrollment) => (
                  <TableRow key={enrollment.id}>
                    <TableCell className="font-medium">{enrollment.user}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {enrollment.course}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {enrollment.date}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3 pb-4 border-b last:border-0 last:pb-0"
                >
                  <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                  <div className="flex-1">
                    <p className="text-sm">{activity.message}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-brand-purple-100 text-brand-purple-600">
              <BookOpen className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold">Create New Course</h3>
              <p className="text-sm text-muted-foreground">
                Add a new course to your catalog
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-brand-blue-100 text-brand-blue-600">
              <Award className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold">Issue Certificates</h3>
              <p className="text-sm text-muted-foreground">
                Generate certificates for students
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-brand-teal-100 text-brand-teal-600">
              <Download className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold">Export Reports</h3>
              <p className="text-sm text-muted-foreground">
                Download analytics reports
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}