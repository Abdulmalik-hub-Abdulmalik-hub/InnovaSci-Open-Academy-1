import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, Users, BarChart, BookOpen, Award, Play, CheckCircle, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { getDifficultyColor, formatPrice } from "@/lib/utils";

// Mock course data - in production this would come from database
const getCourse = async (slug: string) => {
  const courses: Record<string, {
    id: string;
    title: string;
    slug: string;
    short_description: string;
    full_description: string;
    learning_outcomes: string[];
    prerequisites: string[];
    category: string;
    difficulty_level: string;
    duration_hours: number;
    language: string;
    thumbnail_url: string;
    price: number;
    is_free: boolean;
    enrolled_count: number;
    rating: number;
    lessons_count: number;
    instructor: {
      name: string;
      avatar: string;
      bio: string;
    };
    syllabus: {
      title: string;
      lessons: { title: string; duration: number; isPreview: boolean }[];
    }[];
  }> = {
    "intro-computational-chemistry": {
      id: "1",
      title: "Introduction to Computational Chemistry",
      slug: "intro-computational-chemistry",
      short_description: "Learn the fundamentals of computational chemistry, including molecular modeling, quantum chemistry, and drug design principles.",
      full_description: `This comprehensive course introduces you to the exciting world of computational chemistry. You'll learn how to use computer simulations to understand molecular behavior, predict chemical reactions, and design new molecules.

The course covers:
- Basic principles of molecular mechanics
- Introduction to quantum chemistry
- Molecular dynamics simulations
- Drug discovery and design
- Hands-on projects with industry-standard tools

By the end of this course, you'll have a solid foundation in computational chemistry and be ready to apply these techniques in your research or career.`,
      learning_outcomes: [
        "Understand the fundamental principles of computational chemistry",
        "Apply molecular modeling techniques to solve chemical problems",
        "Perform quantum chemistry calculations",
        "Design and analyze molecular dynamics simulations",
        "Use computational tools for drug discovery applications",
      ],
      prerequisites: [
        "Basic knowledge of chemistry",
        "Understanding of undergraduate-level physics",
        "Familiarity with computer basics",
      ],
      category: "Computational Chemistry",
      difficulty_level: "BEGINNER",
      duration_hours: 24,
      language: "English",
      thumbnail_url: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1200&q=80",
      price: 0,
      is_free: true,
      enrolled_count: 1234,
      rating: 4.8,
      lessons_count: 24,
      instructor: {
        name: "Dr. Sarah Chen",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
        bio: "Dr. Chen is a leading researcher in computational chemistry with over 15 years of experience in drug discovery and molecular modeling.",
      },
      syllabus: [
        {
          title: "Module 1: Introduction to Molecular Modeling",
          lessons: [
            { title: "What is Computational Chemistry?", duration: 15, isPreview: true },
            { title: "Historical Perspective", duration: 20, isPreview: false },
            { title: "Tools and Software Overview", duration: 25, isPreview: false },
            { title: "Setting Up Your Environment", duration: 30, isPreview: true },
          ],
        },
        {
          title: "Module 2: Molecular Mechanics",
          lessons: [
            { title: "Force Fields Fundamentals", duration: 35, isPreview: false },
            { title: "Energy Minimization", duration: 40, isPreview: false },
            { title: "Geometry Optimization", duration: 45, isPreview: false },
            { title: "Practical Exercise", duration: 60, isPreview: false },
          ],
        },
        {
          title: "Module 3: Quantum Chemistry",
          lessons: [
            { title: "Introduction to Quantum Mechanics", duration: 30, isPreview: false },
            { title: "Hartree-Fock Theory", duration: 45, isPreview: false },
            { title: "Density Functional Theory", duration: 50, isPreview: false },
            { title: "Hands-on Calculations", duration: 60, isPreview: false },
          ],
        },
      ],
    },
  };

  return courses[slug] || null;
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourse(slug);
  
  if (!course) {
    return { title: "Course Not Found" };
  }

  return {
    title: course.title,
    description: course.short_description,
    openGraph: {
      title: course.title,
      description: course.short_description,
      images: [course.thumbnail_url],
    },
  };
}

export default async function CourseDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const course = await getCourse(slug);

  if (!course) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-brand-purple-900 via-brand-blue-900 to-brand-teal-900 text-white py-16">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-white/20 text-white mb-4">{course.category}</Badge>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                {course.title}
              </h1>
              <p className="text-lg text-white/80 mb-6">
                {course.short_description}
              </p>
              
              <div className="flex flex-wrap gap-4 mb-6">
                <span className="flex items-center gap-2">
                  <Badge className={getDifficultyColor(course.difficulty_level)}>
                    {course.difficulty_level}
                  </Badge>
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {course.enrolled_count.toLocaleString()} students
                </span>
                <span className="flex items-center gap-1">
                  <BarChart className="h-4 w-4" />
                  {course.rating} rating
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {course.duration_hours}h
                </span>
                <span className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  {course.lessons_count} lessons
                </span>
              </div>

              <div className="flex items-center gap-3 mb-6">
                <Image
                  src={course.instructor.avatar}
                  alt={course.instructor.name}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <div>
                  <p className="font-medium">{course.instructor.name}</p>
                  <p className="text-sm text-white/70">Course Instructor</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="gap-2" asChild>
                  <Link href="/auth/register">
                    {course.is_free ? "Enroll for Free" : `Enroll for ${formatPrice(course.price)}`}
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                  <Play className="h-4 w-4 mr-2" />
                  Preview Course
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-video rounded-xl overflow-hidden shadow-2xl">
                <Image
                  src={course.thumbnail_url}
                  alt={course.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                  <Button size="lg" variant="ghost" className="text-white">
                    <Play className="h-12 w-12" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Tabs */}
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="w-full justify-start">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="syllabus">Syllabus</TabsTrigger>
                  <TabsTrigger value="instructor">Instructor</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>About This Course</CardTitle>
                    </CardHeader>
                    <CardContent className="prose prose-sm max-w-none">
                      <p className="whitespace-pre-line">{course.full_description}</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>What You&apos;ll Learn</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {course.learning_outcomes.map((outcome, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span>{outcome}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Prerequisites</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {course.prerequisites.map((prereq, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="h-5 w-5 rounded-full border-2 border-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                              <div className="h-2 w-2 rounded-full bg-muted" />
                            </div>
                            <span>{prereq}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="syllabus" className="space-y-4">
                  {course.syllabus.map((module, moduleIndex) => (
                    <Card key={moduleIndex}>
                      <CardHeader>
                        <CardTitle className="text-lg">{module.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <ul className="space-y-2">
                          {module.lessons.map((lesson, lessonIndex) => (
                            <li
                              key={lessonIndex}
                              className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                {lesson.isPreview ? (
                                  <div className="h-8 w-8 rounded-full bg-brand-purple-100 text-brand-purple-600 flex items-center justify-center">
                                    <Play className="h-4 w-4" />
                                  </div>
                                ) : (
                                  <div className="h-8 w-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center">
                                    <Lock className="h-4 w-4" />
                                  </div>
                                )}
                                <div>
                                  <p className="font-medium">{lesson.title}</p>
                                  <p className="text-sm text-muted-foreground">
                                    {lesson.duration} min
                                  </p>
                                </div>
                              </div>
                              {lesson.isPreview && (
                                <Button size="sm" variant="ghost">
                                  Preview
                                </Button>
                              )}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="instructor" className="space-y-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-6">
                        <Image
                          src={course.instructor.avatar}
                          alt={course.instructor.name}
                          width={120}
                          height={120}
                          className="rounded-full"
                        />
                        <div>
                          <h3 className="text-xl font-bold">{course.instructor.name}</h3>
                          <p className="text-muted-foreground mb-4">Course Instructor</p>
                          <p className="text-sm">{course.instructor.bio}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Course Includes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <span>{course.duration_hours} hours on-demand video</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <BookOpen className="h-5 w-5 text-muted-foreground" />
                    <span>{course.lessons_count} lessons</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Award className="h-5 w-5 text-muted-foreground" />
                    <span>Certificate of completion</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-muted-foreground" />
                    <span>Full lifetime access</span>
                  </div>
                  <Separator />
                  <div className="text-center">
                    <p className="text-3xl font-bold">
                      {formatPrice(course.is_free ? 0 : course.price)}
                    </p>
                    {course.is_free ? (
                      <Badge variant="success" className="mt-2">Free</Badge>
                    ) : (
                      <Button className="w-full mt-4" size="lg" asChild>
                        <Link href="/auth/register">Enroll Now</Link>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}