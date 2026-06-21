"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
      setIsLoading(false);
      setEmail("");
    }, 1000);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-brand-purple-900 via-brand-blue-900 to-brand-teal-900 text-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-purple-500/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-blue-500/30 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Stay Updated
            </h2>
            <p className="text-white/80 mb-8">
              Subscribe to our newsletter to receive the latest course announcements,
              research news, and educational updates.
            </p>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-white"
                />
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-white text-brand-purple-900 hover:bg-white/90"
                >
                  {isLoading ? (
                    <span className="animate-pulse">Subscribing...</span>
                  ) : (
                    <>
                      Subscribe
                      <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center justify-center gap-2 text-green-400"
              >
                <CheckCircle className="h-5 w-5" />
                <span>Thank you for subscribing!</span>
              </motion.div>
            )}

            <p className="text-xs text-white/60 mt-4">
              By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}