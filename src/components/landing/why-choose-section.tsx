"use client";

import { motion } from "framer-motion";
import {
  BookOpen,
  FlaskConical,
  Briefcase,
  Globe,
  Award,
  Code,
  Sparkles,
  Monitor,
} from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Open Access Learning",
    description: "Free and accessible education for everyone, anywhere in the world.",
  },
  {
    icon: FlaskConical,
    title: "Research-Focused Education",
    description: "Learn from the latest research methodologies and scientific practices.",
  },
  {
    icon: Briefcase,
    title: "Industry-Relevant Skills",
    description: "Gain skills that are directly applicable to real-world careers.",
  },
  {
    icon: Globe,
    title: "Global Community",
    description: "Connect with learners and experts from around the globe.",
  },
  {
    icon: Award,
    title: "Certificate-Based Learning",
    description: "Earn recognized certificates to showcase your achievements.",
  },
  {
    icon: Code,
    title: "Practical Projects",
    description: "Build real projects to apply your knowledge.",
  },
  {
    icon: Sparkles,
    title: "Scientific Innovation",
    description: "Stay at the forefront of scientific and technological innovation.",
  },
  {
    icon: Monitor,
    title: "Modern Learning Experience",
    description: "Enjoy an intuitive, engaging, and effective learning platform.",
  },
];

export function WhyChooseSection() {
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
            Why Choose <span className="gradient-text">InnovaSci</span>?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We are committed to providing world-class education that empowers the
            next generation of scientists, researchers, and innovators.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-background rounded-xl p-6 border shadow-sm hover:shadow-lg hover:border-brand-purple-200 dark:hover:border-brand-purple-800 transition-all duration-300 h-full">
                  <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-brand-purple-500/20 to-brand-blue-500/20 flex items-center justify-center mb-4 group-hover:from-brand-purple-500/30 group-hover:to-brand-blue-500/30 transition-colors">
                    <Icon className="h-6 w-6 text-brand-purple-600 dark:text-brand-purple-400" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}