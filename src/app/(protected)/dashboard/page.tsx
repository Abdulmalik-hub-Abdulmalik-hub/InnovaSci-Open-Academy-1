"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { BookOpen, Award, Clock, TrendingUp, Play, ChevronRight, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/components/providers/auth-provider";
import { formatRelativeTime } from "@/lib/utils";

// Mock data for demonstration
const enrolledCourses = [
  {
    id: "1",
    title: "Introduction to Computational Chemistry",
    thumbnail: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400&q=80",
    progress: 75,
    totalLessons: 24,
    completedLessons: 18,
    lastLesson: "Molecular Dynamics Simulation",
  },
  {
    id: "2",
    title: "Machine Learning for Scientists",
    thumbnail: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&q=80",
    progress: 45,
    totalLessons: 32,
    completedLessons: 14,
    lastLesson: "Neural Networks Basics",
  },
  {
    id: "3",
    title: "Drug Discovery Fundamentals",
    thumbnail: "https://images.unsplash.com/photo-1576671081837-49000212a370?w=400&q=80",
    progress: 20,
    totalLessons: 28,
    completedLessons: 6,
    lastLesson: "Target Identification",
  },
];

const recentCertificates = [
  {
    id: "1",
    title: "Python Programming Basics",
    date: "2026-05-15",
    verificationCode: "ISA-2026-PYTH-ABCD",
  },
  {
    id: "2",
    title: "Data Analysis with R",
    date: "2026-04-20",
    verificationCode: "ISA-2026-DATA-EFGH",
  },
];

const learningStats = [
  { label: "Courses Enrolled", value: "12" },
  { label: "Courses Completed", value: "3" },
  { label: "Learning Hours", value: "86" },
  { label: "Certificates Earned", value: "5" },
];

export default function StudentDashboardPage() {
  const { user } = useAuth();

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Welcome back, {user?.user_metadata?.full_name?.split(" ")[0] || "Student"}!
        </h1>
        <p className="text-muted-foreground">
          Continue your learning journey and track your progress.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {learningStats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-3xl font-bold gradient-text">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Continue Learning */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Continue Learning</h2>
          <Button variant="ghost" asChild className="gap-2">
            <Link href="/dashboard/courses">
              View All
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrolledCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative aspect-video">
                  <Image
                    src={course.thumbnail}
                    alt={course.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <Badge className="absolute top-3 left-3 bg-white/90 text-foreground">
                    {course.progress}% Complete
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2 line-clamp-1">{course.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Last lesson: {course.lastLesson}
                  </p>
                  <Progress value={course.progress} className="mb-4" />
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {course.completedLessons}/{course.totalLessons} lessons
                    </span>
                    <Button size="sm" asChild className="gap-2">
                      <Link href={`/dashboard/courses/${course.id}`}>
                        <Play className="h-3 w-3" />
                        Resume
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Certificates */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Recent Certificates
              <Button variant="ghost" size="sm" asChild className="gap-2">
                <Link href="/dashboard/certificates">
                  View All
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentCertificates.map((cert) => (
                <div
                  key={cert.id}
                  className="flex items-center gap-4 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-brand-purple-500 to-brand-blue-500 flex items-center justify-center">
                    <Award className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium truncate">{cert.title}</h4>
                    <p className="text-xs text-muted-foreground">
                      Issued: {formatRelativeTime(cert.date)}
                    </p>
                  </div>
                  <Button size="sm" variant="outline">
                    Download
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Deadlines */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Deadlines</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
                <div className="h-10 w-10 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center">
                  <Calendar className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">Assignment Due</h4>
                  <p className="text-xs text-muted-foreground">
                    Computational Chemistry - Module 5 Quiz
                  </p>
                </div>
                <Badge variant="warning">Due in 3 days</Badge>
              </div>
              <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
                <div className="h-10 w-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                  <Clock className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">Course Expiry</h4>
                  <p className="text-xs text-muted-foreground">
                    Machine Learning - Access expires
                  </p>
                </div>
                <Badge variant="info">15 days left</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recommended Courses */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Recommended for You</h2>
          <Button variant="ghost" asChild className="gap-2">
            <Link href="/courses">
              Browse Courses
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Advanced Python for Data Science",
              category: "Programming",
              level: "Advanced",
              students: 1234,
            },
            {
              title: "Bioinformatics with R",
              category: "Bioinformatics",
              level: "Intermediate",
              students: 856,
            },
            {
              title: "AI in Drug Discovery",
              category: "Artificial Intelligence",
              level: "Expert",
              students: 654,
            },
          ].map((course, index) => (
            <motion.div
              key={course.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <Badge variant="secondary" className="mb-2">
                    {course.category}
                  </Badge>
                  <h4 className="font-semibold mb-1">{course.title}</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    {course.level} • {course.students.toLocaleString()} students
                  </p>
                  <Button size="sm" className="w-full">
                    Enroll Now
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}