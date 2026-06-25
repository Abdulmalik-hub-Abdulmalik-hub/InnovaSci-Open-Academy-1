"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BookOpen,
  Play,
  Clock,
  CheckCircle,
  Search,
  Filter,
  Grid,
  List,
  ChevronRight,
  Users,
  Award,
} from "lucide-react";

const enrolledCourses = [
  {
    id: "1",
    title: "Introduction to Computational Chemistry",
    thumbnail: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400&q=80",
    instructor: "Dr. Sarah Johnson",
    progress: 75,
    totalLessons: 24,
    completedLessons: 18,
    lastLesson: "Molecular Dynamics Simulation",
    duration: "20 hours",
    category: "Chemistry",
    certificateIssued: false,
  },
  {
    id: "2",
    title: "Machine Learning for Scientists",
    thumbnail: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&q=80",
    instructor: "Prof. Michael Chen",
    progress: 45,
    totalLessons: 32,
    completedLessons: 14,
    lastLesson: "Neural Networks Basics",
    duration: "30 hours",
    category: "Data Science",
    certificateIssued: false,
  },
  {
    id: "3",
    title: "Drug Discovery Fundamentals",
    thumbnail: "https://images.unsplash.com/photo-1576671081837-49000212a370?w=400&q=80",
    instructor: "Dr. Emily Rodriguez",
    progress: 20,
    totalLessons: 28,
    completedLessons: 6,
    lastLesson: "Target Identification",
    duration: "25 hours",
    category: "Pharmaceutical",
    certificateIssued: false,
  },
  {
    id: "4",
    title: "Python for Bioinformatics",
    thumbnail: "https://images.unsplash.com/photo-1628595351029-c2bf17511435?w=400&q=80",
    instructor: "Dr. James Park",
    progress: 100,
    totalLessons: 20,
    completedLessons: 20,
    lastLesson: "Sequence Analysis",
    duration: "15 hours",
    category: "Bioinformatics",
    certificateIssued: true,
  },
];

export default function MyCoursesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const categories = Array.from(new Set(enrolledCourses.map((c) => c.category)));

  const filteredCourses = enrolledCourses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || course.category === categoryFilter;
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "in-progress" && course.progress > 0 && course.progress < 100) ||
      (statusFilter === "completed" && course.progress === 100) ||
      (statusFilter === "not-started" && course.progress === 0);
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const stats = {
    total: enrolledCourses.length,
    inProgress: enrolledCourses.filter((c) => c.progress > 0 && c.progress < 100).length,
    completed: enrolledCourses.filter((c) => c.progress === 100).length,
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">My Courses</h1>
        <p className="text-muted-foreground">
          Track your learning progress and continue your courses.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="h-12 w-12 rounded-lg bg-brand-purple-500/20 flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-brand-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.total}</p>
              <p className="text-sm text-muted-foreground">Enrolled Courses</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="h-12 w-12 rounded-lg bg-brand-blue-500/20 flex items-center justify-center">
              <Play className="h-6 w-6 text-brand-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.inProgress}</p>
              <p className="text-sm text-muted-foreground">In Progress</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="h-12 w-12 rounded-lg bg-brand-teal-500/20 flex items-center justify-center">
              <Award className="h-6 w-6 text-brand-teal-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.completed}</p>
              <p className="text-sm text-muted-foreground">Completed</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="not-started">Not Started</SelectItem>
          </SelectContent>
        </Select>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="flex gap-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("grid")}
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("list")}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Course Grid/List */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
                <div className="relative aspect-video">
                  <Image
                    src={course.thumbnail}
                    alt={course.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <Badge
                    className="absolute top-3 left-3"
                    variant={course.progress === 100 ? "default" : "secondary"}
                  >
                    {course.progress === 100 ? "Completed" : `${course.progress}% Complete`}
                  </Badge>
                  {course.certificateIssued && (
                    <Badge className="absolute top-3 right-3" variant="default">
                      <Award className="h-3 w-3 mr-1" />
                      Certified
                    </Badge>
                  )}
                </div>
                <CardContent className="p-4 flex-1">
                  <Badge variant="outline" className="mb-2">
                    {course.category}
                  </Badge>
                  <h3 className="font-semibold mb-1 line-clamp-1">{course.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    by {course.instructor}
                  </p>
                  <p className="text-sm text-muted-foreground mb-3">
                    Last lesson: {course.lastLesson}
                  </p>
                  <Progress value={course.progress} className="mb-3" />
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <CheckCircle className="h-4 w-4" />
                      {course.completedLessons}/{course.totalLessons} lessons
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {course.duration}
                    </span>
                  </div>
                </CardContent>
                <div className="p-4 pt-0">
                  <Button className="w-full gap-2" asChild>
                    <Link href={`/dashboard/courses/${course.id}`}>
                      <Play className="h-4 w-4" />
                      {course.progress > 0 ? "Continue Learning" : "Start Course"}
                    </Link>
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="flex flex-col md:flex-row">
                  <div className="relative w-full md:w-80 aspect-video md:aspect-auto">
                    <Image
                      src={course.thumbnail}
                      alt={course.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <Badge variant="outline" className="mb-2">
                          {course.category}
                        </Badge>
                        <h3 className="font-semibold text-lg mb-1">{course.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          by {course.instructor}
                        </p>
                        <p className="text-sm text-muted-foreground mb-3">
                          Last lesson: {course.lastLesson}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {course.certificateIssued && (
                          <Badge variant="default">
                            <Award className="h-3 w-3 mr-1" />
                            Certified
                          </Badge>
                        )}
                        <Badge
                          variant={course.progress === 100 ? "default" : "secondary"}
                        >
                          {course.progress === 100 ? "Completed" : `${course.progress}%`}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-6 mb-4">
                      <Progress value={course.progress} className="flex-1" />
                      <span className="text-sm text-muted-foreground whitespace-nowrap">
                        {course.completedLessons}/{course.totalLessons} lessons
                      </span>
                      <span className="text-sm text-muted-foreground whitespace-nowrap flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {course.duration}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button className="gap-2" asChild>
                        <Link href={`/dashboard/courses/${course.id}`}>
                          <Play className="h-4 w-4" />
                          {course.progress > 0 ? "Continue" : "Start"}
                        </Link>
                      </Button>
                      <Button variant="outline" asChild>
                        <Link href={`/courses/${course.id}`}>
                          View Course
                          <ChevronRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No courses found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filter criteria.
          </p>
        </div>
      )}
    </div>
  );
}
