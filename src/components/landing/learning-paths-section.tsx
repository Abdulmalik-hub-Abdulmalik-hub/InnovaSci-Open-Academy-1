"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Clock, BookOpen, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface LearningPath {
  id: string;
  title: string;
  slug: string;
  description?: string | null;
  thumbnailUrl?: string | null;
  difficulty?: string;
  estimatedHours?: number | null;
  courseCount?: number;
  enrolledCount?: number;
}

interface LearningPathsSectionProps {
  paths?: LearningPath[];
}

export function LearningPathsSection({ paths = [] }: LearningPathsSectionProps) {
  const defaultPaths: LearningPath[] = paths.length > 0 ? paths : [
    {
      id: "1",
      title: "Computational Chemistry",
      slug: "computational-chemistry",
      description: "Master molecular modeling, quantum chemistry calculations, and computational drug design techniques.",
      thumbnailUrl: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&q=80",
      difficulty: "INTERMEDIATE",
      estimatedHours: 40,
      courseCount: 5,
      enrolledCount: 1200,
    },
    {
      id: "2",
      title: "Bioinformatics",
      slug: "bioinformatics",
      description: "Learn DNA sequence analysis, protein structure prediction, and genomic data science.",
      thumbnailUrl: "https://images.unsplash.com/photo-1628595351029-c2bf17511435?w=800&q=80",
      difficulty: "ADVANCED",
      estimatedHours: 60,
      courseCount: 8,
      enrolledCount: 950,
    },
    {
      id: "3",
      title: "Drug Discovery",
      slug: "drug-discovery",
      description: "Explore target identification, lead optimization, and clinical trial design methodologies.",
      thumbnailUrl: "https://images.unsplash.com/photo-1576671081837-49000212a370?w=800&q=80",
      difficulty: "EXPERT",
      estimatedHours: 80,
      courseCount: 10,
      enrolledCount: 680,
    },
    {
      id: "4",
      title: "Scientific Programming",
      slug: "scientific-programming",
      description: "Develop programming skills for scientific computing with Python, R, and Julia.",
      thumbnailUrl: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80",
      difficulty: "BEGINNER",
      estimatedHours: 30,
      courseCount: 4,
      enrolledCount: 2100,
    },
    {
      id: "5",
      title: "Data Science for Scientists",
      slug: "data-science-for-scientists",
      description: "Apply machine learning and statistical analysis to scientific research problems.",
      thumbnailUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
      difficulty: "INTERMEDIATE",
      estimatedHours: 45,
      courseCount: 6,
      enrolledCount: 1850,
    },
    {
      id: "6",
      title: "Artificial Intelligence",
      slug: "artificial-intelligence",
      description: "Understand AI fundamentals, neural networks, and their applications in science.",
      thumbnailUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
      difficulty: "ADVANCED",
      estimatedHours: 50,
      courseCount: 7,
      enrolledCount: 2400,
    },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Learning <span className="gradient-text">Paths</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Follow structured learning paths designed by experts to take you from
            beginner to professional in your chosen field.
          </p>
        </motion.div>

        {/* Paths Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {defaultPaths.map((path, index) => (
            <motion.div
              key={path.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="course-card overflow-hidden h-full flex flex-col group">
                {/* Thumbnail */}
                <Link href={`/learning-paths/${path.slug}`} className="block relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={path.thumbnailUrl || "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=80"}
                    alt={path.title}
                    fill
                    className="object-cover course-thumbnail transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  {path.difficulty && (
                    <Badge className="absolute top-3 left-3 bg-background/80 backdrop-blur-sm">
                      {path.difficulty}
                    </Badge>
                  )}
                </Link>

                <CardHeader className="p-4 pb-2">
                  <Link href={`/learning-paths/${path.slug}`}>
                    <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                      {path.title}
                    </h3>
                  </Link>
                  {path.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                      {path.description}
                    </p>
                  )}
                </CardHeader>

                <CardContent className="p-4 pt-0 flex-1">
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <BookOpen className="h-4 w-4" />
                      {path.courseCount} courses
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {path.estimatedHours}h
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {path.enrolledCount?.toLocaleString()}
                    </span>
                  </div>
                </CardContent>

                <CardFooter className="p-4 pt-0">
                  <Button asChild variant="outline" className="w-full gap-2 group/btn">
                    <Link href={`/learning-paths/${path.slug}`}>
                      View Path
                      <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button asChild size="lg" variant="outline" className="gap-2">
            <Link href="/learning-paths">
              Explore All Learning Paths
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}