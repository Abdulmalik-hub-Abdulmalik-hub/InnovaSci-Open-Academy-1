"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Play, BookOpen, Users, Award, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden hero-pattern">
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-teal-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            {/* Title - Now at the top */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
            >
              <span className="gradient-text">InnovaSci</span>
              <br />
              <span className="text-foreground">Open Academy</span>
            </motion.h1>

            {/* Badge - Now underneath the title */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center mb-6"
            >
              <Image
                src="/assets/images/brand-logo-horizontal.svg"
                alt="Powered by InnovaSci AI Labs"
                width={280}
                height={70}
                className="h-auto w-auto object-contain"
              />
            </motion.div>

            {/* Mission Statement */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto lg:mx-0"
            >
              Our mission is to democratize high-quality scientific and technological 
              education through open-access learning. We are dedicated to empowering a 
              global community of innovators, researchers, and learners with the skills 
              and knowledge needed to solve complex real-world challenges.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap justify-center lg:justify-start gap-8 mb-8"
            >
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">10K+</div>
                <div className="text-sm text-muted-foreground">Learners</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">100+</div>
                <div className="text-sm text-muted-foreground">Courses</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">50+</div>
                <div className="text-sm text-muted-foreground">Instructors</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">30+</div>
                <div className="text-sm text-muted-foreground">Countries</div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button size="xl" asChild className="gap-2">
                <Link href="/courses">
                  Start Learning
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button size="xl" variant="outline" asChild className="gap-2">
                <Link href="/learning-paths">
                  <Play className="h-5 w-5" />
                  Browse Learning Paths
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Content - Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="relative hidden lg:block"
          >
            <div className="relative">
              {/* Main visual */}
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border bg-gradient-to-br from-brand-purple-600/20 to-brand-blue-600/20 backdrop-blur-sm">
                <div className="aspect-video bg-gradient-to-br from-brand-purple-900/50 to-brand-blue-900/50 p-8 flex items-center justify-center">
                  <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                    <FeatureCard
                      icon={BookOpen}
                      title="Learn"
                      description="Access world-class courses"
                      delay={0.5}
                    />
                    <FeatureCard
                      icon={Users}
                      title="Connect"
                      description="Join global community"
                      delay={0.6}
                    />
                    <FeatureCard
                      icon={Award}
                      title="Earn"
                      description="Get certified credentials"
                      delay={0.7}
                    />
                    <FeatureCard
                      icon={Sparkles}
                      title="Grow"
                      description="Advance your career"
                      delay={0.8}
                    />
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 z-20"
              >
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-4 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-brand-teal-500/20 flex items-center justify-center">
                    <Award className="h-5 w-5 text-brand-teal-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">New Certificate!</p>
                    <p className="text-xs text-muted-foreground">Just earned</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 -left-4 z-20"
              >
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-4 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-brand-purple-500/20 flex items-center justify-center">
                    <Users className="h-5 w-5 text-brand-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">+500 Learners</p>
                    <p className="text-xs text-muted-foreground">This week</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  description,
  delay,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-colors"
    >
      <Icon className="h-8 w-8 text-white mb-2" />
      <h3 className="text-white font-semibold">{title}</h3>
      <p className="text-white/70 text-sm">{description}</p>
    </motion.div>
  );
}