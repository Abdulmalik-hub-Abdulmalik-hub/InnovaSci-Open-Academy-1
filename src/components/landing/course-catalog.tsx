"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CourseCard, CourseCardSkeleton } from "@/components/course/course-card";
import { useState, useEffect } from "react";

interface Course {
  id: string;
  title: string;
  slug: string;
  short_description?: string | null;
  thumbnail_url?: string | null;
  category?: string | null;
  difficulty_level?: string;
  duration_hours?: number | null;
  price?: string | number;
  is_free?: boolean;
  enrolled_count?: number;
  rating?: number;
}

interface CourseCatalogProps {
  initialCourses?: Course[];
}

export function CourseCatalog({ initialCourses = [] }: CourseCatalogProps) {
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [isLoading, setIsLoading] = useState(!initialCourses.length);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [difficultyFilter, setDifficultyFilter] = useState("all");

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await fetch("/api/courses?status=published&limit=12");
        if (response.ok) {
          const data = await response.json();
          setCourses(data.courses || []);
        }
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      } finally {
        setIsLoading(false);
      }
    }

    if (!initialCourses.length) {
      fetchCourses();
    }
  }, [initialCourses.length]);

  const categories = [...new Set(courses.map((c) => c.category).filter(Boolean))];
  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.short_description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || course.category === categoryFilter;
    const matchesDifficulty =
      difficultyFilter === "all" || course.difficulty_level === difficultyFilter;
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Explore Our <span className="gradient-text">Courses</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover cutting-edge courses in computational chemistry, bioinformatics,
            artificial intelligence, and more. All designed by leading experts.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row gap-4 mb-8 max-w-4xl mx-auto"
        >
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
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat || ""}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="BEGINNER">Beginner</SelectItem>
              <SelectItem value="INTERMEDIATE">Intermediate</SelectItem>
              <SelectItem value="ADVANCED">Advanced</SelectItem>
              <SelectItem value="EXPERT">Expert</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {isLoading ? (
            Array.from({ length: 8 }).map((_, i) => (
              <CourseCardSkeleton key={i} />
            ))
          ) : filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <CourseCard
                key={course.id}
                id={course.id}
                title={course.title}
                slug={course.slug}
                shortDescription={course.short_description}
                thumbnailUrl={course.thumbnail_url}
                category={course.category}
                difficultyLevel={course.difficulty_level}
                durationHours={course.duration_hours}
                price={course.price}
                isFree={course.is_free}
                enrolledCount={course.enrolled_count}
                rating={course.rating}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">
                No courses found matching your criteria.
              </p>
            </div>
          )}
        </div>

        {/* View All Button */}
        {filteredCourses.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button asChild size="lg" variant="outline" className="gap-2">
              <Link href="/courses">
                View All Courses
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
}