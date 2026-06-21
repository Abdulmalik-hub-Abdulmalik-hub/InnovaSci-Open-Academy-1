"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Plus, Search, MoreHorizontal, Edit, Trash2, Eye, Copy, Archive, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { getStatusColor, formatPrice, formatDate } from "@/lib/utils";
import { useAuth } from "@/components/providers/auth-provider";

// Mock data for demonstration
const mockCourses = [
  {
    id: "1",
    title: "Introduction to Computational Chemistry",
    slug: "intro-computational-chemistry",
    code: "ISA-CHEM001",
    category: "Computational Chemistry",
    difficulty_level: "BEGINNER",
    duration_hours: 24,
    price: 0,
    is_free: true,
    status: "PUBLISHED",
    enrolled_count: 1234,
    thumbnail_url: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400&q=80",
    created_at: "2026-01-15",
  },
  {
    id: "2",
    title: "Machine Learning for Scientists",
    slug: "ml-for-scientists",
    code: "ISA-AI002",
    category: "Artificial Intelligence",
    difficulty_level: "INTERMEDIATE",
    duration_hours: 36,
    price: 49.99,
    is_free: false,
    status: "PUBLISHED",
    enrolled_count: 856,
    thumbnail_url: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&q=80",
    created_at: "2026-02-20",
  },
  {
    id: "3",
    title: "Drug Discovery Fundamentals",
    slug: "drug-discovery-fundamentals",
    code: "ISA-DRUG003",
    category: "Drug Discovery",
    difficulty_level: "ADVANCED",
    duration_hours: 48,
    price: 79.99,
    is_free: false,
    status: "REVIEW",
    enrolled_count: 324,
    thumbnail_url: "https://images.unsplash.com/photo-1576671081837-49000212a370?w=400&q=80",
    created_at: "2026-03-10",
  },
  {
    id: "4",
    title: "Python Programming for Bioinformatics",
    slug: "python-bioinformatics",
    code: "ISA-BIO004",
    category: "Bioinformatics",
    difficulty_level: "BEGINNER",
    duration_hours: 20,
    price: 0,
    is_free: true,
    status: "DRAFT",
    enrolled_count: 0,
    thumbnail_url: "https://images.unsplash.com/photo-1628595351029-c2bf17511435?w=400&q=80",
    created_at: "2026-04-05",
  },
  {
    id: "5",
    title: "Data Science for Research",
    slug: "data-science-research",
    code: "ISA-DS005",
    category: "Data Science",
    difficulty_level: "INTERMEDIATE",
    duration_hours: 32,
    price: 59.99,
    is_free: false,
    status: "ARCHIVED",
    enrolled_count: 567,
    thumbnail_url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80",
    created_at: "2026-01-01",
  },
];

export default function AdminCoursesPage() {
  const { user } = useAuth();
  const [courses, setCourses] = useState(mockCourses);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<typeof mockCourses[0] | null>(null);

  const categories = [...new Set(courses.map((c) => c.category))];

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || course.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || course.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handlePublish = (courseId: string) => {
    setCourses(courses.map(c => 
      c.id === courseId ? { ...c, status: "PUBLISHED" } : c
    ));
  };

  const handleArchive = (courseId: string) => {
    setCourses(courses.map(c => 
      c.id === courseId ? { ...c, status: "ARCHIVED" } : c
    ));
  };

  const handleDelete = (courseId: string) => {
    setCourses(courses.filter(c => c.id !== courseId));
  };

  const handleDuplicate = (course: typeof mockCourses[0]) => {
    const newCourse = {
      ...course,
      id: `${Date.now()}`,
      title: `${course.title} (Copy)`,
      slug: `${course.slug}-copy`,
      code: `ISA-COPY${Date.now()}`,
      status: "DRAFT" as const,
      enrolled_count: 0,
      created_at: new Date().toISOString().split("T")[0],
    };
    setCourses([newCourse, ...courses]);
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Courses</h1>
          <p className="text-muted-foreground">
            Manage your course catalog and content
          </p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Create Course
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Course</DialogTitle>
              <DialogDescription>
                Fill in the details to create a new course
              </DialogDescription>
            </DialogHeader>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Course Title</Label>
                  <Input id="title" placeholder="Enter course title" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="code">Course Code</Label>
                  <Input id="code" placeholder="ISA-XXX" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Difficulty Level</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="BEGINNER">Beginner</SelectItem>
                      <SelectItem value="INTERMEDIATE">Intermediate</SelectItem>
                      <SelectItem value="ADVANCED">Advanced</SelectItem>
                      <SelectItem value="EXPERT">Expert</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price ($)</Label>
                  <Input id="price" type="number" placeholder="0.00" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (hours)</Label>
                  <Input id="duration" type="number" placeholder="24" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Short Description</Label>
                <textarea
                  id="description"
                  className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Brief description of the course"
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Create Course</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Courses", value: courses.length, color: "text-blue-600" },
          { label: "Published", value: courses.filter(c => c.status === "PUBLISHED").length, color: "text-green-600" },
          { label: "Draft", value: courses.filter(c => c.status === "DRAFT").length, color: "text-yellow-600" },
          { label: "Total Enrollments", value: courses.reduce((acc, c) => acc + c.enrolled_count, 0).toLocaleString(), color: "text-purple-600" },
        ].map((stat, index) => (
          <Card key={stat.label}>
            <CardContent className="p-4">
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
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
                <SelectItem value="PUBLISHED">Published</SelectItem>
                <SelectItem value="DRAFT">Draft</SelectItem>
                <SelectItem value="REVIEW">Review</SelectItem>
                <SelectItem value="ARCHIVED">Archived</SelectItem>
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
          </div>
        </CardContent>
      </Card>

      {/* Courses Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Courses ({filteredCourses.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Enrollments</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCourses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-20 rounded overflow-hidden flex-shrink-0">
                        <Image
                          src={course.thumbnail_url}
                          alt={course.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium line-clamp-1">{course.title}</p>
                        <p className="text-xs text-muted-foreground">{course.code}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{course.category}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(course.status)}>
                      {course.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatPrice(course.price)}</TableCell>
                  <TableCell>{course.enrolled_count.toLocaleString()}</TableCell>
                  <TableCell>{formatDate(course.created_at)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <a href={`/courses/${course.slug}`} target="_blank">
                            <Eye className="mr-2 h-4 w-4" />
                            View
                          </a>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <a href={`/admin/courses/${course.id}`}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </a>
                        </DropdownMenuItem>
                        {course.status !== "PUBLISHED" && (
                          <DropdownMenuItem onClick={() => handlePublish(course.id)}>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Publish
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem onClick={() => handleDuplicate(course)}>
                          <Copy className="mr-2 h-4 w-4" />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {course.status !== "ARCHIVED" && (
                          <DropdownMenuItem onClick={() => handleArchive(course.id)}>
                            <Archive className="mr-2 h-4 w-4" />
                            Archive
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem
                          onClick={() => handleDelete(course.id)}
                          className="text-destructive focus:text-destructive"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}