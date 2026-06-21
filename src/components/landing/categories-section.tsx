"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Dna,
  FlaskConical,
  Pill,
  Brain,
  Database,
  Code2,
  ChartLine,
  Microscope,
} from "lucide-react";

const categories = [
  {
    name: "Computational Chemistry",
    slug: "computational-chemistry",
    icon: FlaskConical,
    count: 24,
    color: "from-brand-purple-500 to-brand-purple-600",
  },
  {
    name: "Bioinformatics",
    slug: "bioinformatics",
    icon: Dna,
    count: 18,
    color: "from-brand-blue-500 to-brand-blue-600",
  },
  {
    name: "Drug Discovery",
    slug: "drug-discovery",
    icon: Pill,
    count: 15,
    color: "from-brand-teal-500 to-brand-teal-600",
  },
  {
    name: "Artificial Intelligence",
    slug: "artificial-intelligence",
    icon: Brain,
    count: 32,
    color: "from-purple-500 to-pink-500",
  },
  {
    name: "Data Science",
    slug: "data-science",
    icon: Database,
    count: 28,
    color: "from-blue-500 to-cyan-500",
  },
  {
    name: "Scientific Computing",
    slug: "scientific-computing",
    icon: Code2,
    count: 20,
    color: "from-green-500 to-emerald-500",
  },
  {
    name: "Research Methods",
    slug: "research-methods",
    icon: ChartLine,
    count: 12,
    color: "from-orange-500 to-amber-500",
  },
  {
    name: "Programming",
    slug: "programming",
    icon: Microscope,
    count: 35,
    color: "from-red-500 to-rose-500",
  },
];

export function CategoriesSection() {
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
            Browse by <span className="gradient-text">Category</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore courses across various scientific and technological disciplines.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  href={`/courses?category=${category.slug}`}
                  className="group block"
                >
                  <div className="relative bg-card rounded-xl p-6 border shadow-sm hover:shadow-lg hover:border-primary/50 transition-all duration-300 overflow-hidden">
                    {/* Background gradient */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity`}
                    />

                    {/* Icon */}
                    <div
                      className={`inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br ${category.color} mb-4`}
                    >
                      <Icon className="h-6 w-6 text-white" />
                    </div>

                    {/* Content */}
                    <h3 className="font-semibold text-base mb-1 group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {category.count} courses
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}