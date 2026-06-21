"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Clock, Users, BookOpen, Star, Play } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn, formatPrice, formatDuration, getDifficultyColor } from "@/lib/utils";

interface CourseCardProps {
  id: string;
  title: string;
  shortDescription?: string | null;
  thumbnailUrl?: string | null;
  category?: string | null;
  difficultyLevel?: string;
  durationHours?: number | null;
  price?: string | number;
  isFree?: boolean;
  enrolledCount?: number;
  rating?: number;
  slug: string;
  className?: string;
}

export function CourseCard({
  id,
  title,
  shortDescription,
  thumbnailUrl,
  category,
  difficultyLevel,
  durationHours,
  price,
  isFree,
  enrolledCount,
  rating,
  slug,
  className,
}: CourseCardProps) {
  const defaultImage = "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=80";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={cn("course-card overflow-hidden h-full flex flex-col", className)}>
        {/* Thumbnail */}
        <Link href={`/courses/${slug}`} className="block relative aspect-video overflow-hidden">
          <Image
            src={thumbnailUrl || defaultImage}
            alt={title}
            fill
            className="object-cover course-thumbnail transition-transform duration-500"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
            <div className="bg-white/90 rounded-full p-3">
              <Play className="h-6 w-6 text-primary fill-primary" />
            </div>
          </div>
          {/* Category Badge */}
          {category && (
            <Badge className="absolute top-3 left-3 bg-background/80 backdrop-blur-sm text-foreground hover:bg-background/80">
              {category}
            </Badge>
          )}
          {/* Free Badge */}
          {isFree && (
            <Badge className="absolute top-3 right-3 bg-green-500 text-white">
              Free
            </Badge>
          )}
        </Link>

        <CardHeader className="p-4 pb-2 flex-1">
          <Link href={`/courses/${slug}`}>
            <h3 className="font-semibold text-lg line-clamp-2 hover:text-primary transition-colors">
              {title}
            </h3>
          </Link>
          {shortDescription && (
            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
              {shortDescription}
            </p>
          )}
        </CardHeader>

        <CardContent className="p-4 pt-0">
          {/* Meta info */}
          <div className="flex flex-wrap gap-2 items-center text-sm text-muted-foreground">
            {difficultyLevel && (
              <span className={cn("px-2 py-0.5 rounded text-xs font-medium", getDifficultyColor(difficultyLevel))}>
                {difficultyLevel}
              </span>
            )}
            {durationHours && (
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {durationHours}h
              </span>
            )}
            {enrolledCount !== undefined && (
              <span className="flex items-center gap-1">
                <Users className="h-3.5 w-3.5" />
                {enrolledCount.toLocaleString()}
              </span>
            )}
            {rating !== undefined && (
              <span className="flex items-center gap-1 text-yellow-500">
                <Star className="h-3.5 w-3.5 fill-current" />
                {rating.toFixed(1)}
              </span>
            )}
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0 flex items-center justify-between">
          <div className="font-bold text-lg">
            {formatPrice(isFree ? 0 : price || 0)}
          </div>
          <Button asChild size="sm">
            <Link href={`/courses/${slug}`}>View Course</Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

// Skeleton loader for course cards
export function CourseCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-video bg-muted animate-pulse" />
      <CardHeader className="p-4">
        <div className="h-6 bg-muted rounded animate-pulse w-3/4" />
        <div className="h-4 bg-muted rounded animate-pulse w-full mt-2" />
        <div className="h-4 bg-muted rounded animate-pulse w-2/3 mt-1" />
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="flex gap-2">
          <div className="h-5 w-20 bg-muted rounded animate-pulse" />
          <div className="h-5 w-16 bg-muted rounded animate-pulse" />
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <div className="h-8 w-24 bg-muted rounded animate-pulse" />
        <div className="h-8 w-24 bg-muted rounded animate-pulse" />
      </CardFooter>
    </Card>
  );
}