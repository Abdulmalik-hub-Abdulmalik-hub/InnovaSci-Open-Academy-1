"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    name: "Dr. Sarah Chen",
    role: "Research Scientist at Pfizer",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80",
    content: "InnovaSci Open Academy transformed my understanding of computational drug design. The courses are taught by industry experts and the hands-on projects gave me practical skills I use daily.",
    rating: 5,
  },
  {
    name: "Michael Rodriguez",
    role: "PhD Candidate in Bioinformatics",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
    content: "The quality of instruction is exceptional. I've completed three learning paths and each one has significantly advanced my research capabilities. Highly recommended for any scientist.",
    rating: 5,
  },
  {
    name: "Dr. James Park",
    role: "Professor of Chemistry",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80",
    content: "I recommend InnovaSci to all my graduate students. The platform bridges the gap between theoretical knowledge and practical application in ways that traditional education cannot.",
    rating: 5,
  },
  {
    name: "Emily Zhang",
    role: "AI Research Engineer",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80",
    content: "The AI and machine learning courses are cutting-edge. The community aspect is fantastic - I've made valuable connections with researchers from around the world.",
    rating: 5,
  },
];

export function TestimonialsSection() {
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
            What Our <span className="gradient-text">Learners</span> Say
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join thousands of scientists, researchers, and learners who have
            transformed their careers through our platform.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full relative overflow-hidden">
                <CardContent className="p-6">
                  {/* Quote Icon */}
                  <Quote className="absolute top-4 right-4 h-8 w-8 text-muted/20" />

                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>

                  {/* Content */}
                  <p className="text-muted-foreground mb-6 relative z-10">
                    &ldquo;{testimonial.content}&rdquo;
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                      <AvatarFallback>
                        {testimonial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}