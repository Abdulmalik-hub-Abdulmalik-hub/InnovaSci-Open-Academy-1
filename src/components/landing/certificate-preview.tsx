"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Award, CheckCircle, ExternalLink, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CertificatePreview() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Earn <span className="gradient-text">Recognized Certificates</span>
            </h2>
            <p className="text-muted-foreground mb-6">
              Complete courses and earn industry-recognized certificates that
              showcase your expertise to employers and the scientific community.
            </p>

            <div className="space-y-4 mb-8">
              {[
                "Verified digital certificates",
                "Unique verification codes",
                "Shareable on LinkedIn",
                "Lifetime validity",
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-4">
              <Button asChild>
                <Link href="/certificates">Verify Certificate</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/about#certificates">Learn More</Link>
              </Button>
            </div>
          </motion.div>

          {/* Right Content - Certificate Preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative max-w-md mx-auto">
              {/* Certificate */}
              <div className="bg-gradient-to-br from-brand-purple-50 to-brand-blue-50 dark:from-brand-purple-950/30 dark:to-brand-blue-950/30 rounded-xl p-8 border-4 border-dashed border-brand-purple-200 dark:border-brand-purple-800 shadow-2xl">
                {/* Header */}
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-brand-purple-600 to-brand-blue-600 flex items-center justify-center">
                      <svg
                        className="h-6 w-6 text-white"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M12 2L2 7l10 5 10-5-10-5z" />
                        <path d="M2 17l10 5 10-5" />
                        <path d="M2 12l10 5 10-5" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">
                    InnovaSci Open Academy
                  </p>
                </div>

                {/* Content */}
                <div className="text-center space-y-4">
                  <p className="text-sm text-muted-foreground">This is to certify that</p>
                  <h3 className="text-2xl font-bold">John Doe</h3>
                  <p className="text-sm text-muted-foreground">
                    has successfully completed
                  </p>
                  <h4 className="text-xl font-semibold">
                    Introduction to Computational Chemistry
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    with a grade of <span className="font-semibold">A+</span>
                  </p>
                </div>

                {/* Footer */}
                <div className="mt-8 pt-6 border-t border-border flex justify-between items-end">
                  <div>
                    <p className="text-xs text-muted-foreground">Date Issued</p>
                    <p className="text-sm font-medium">June 21, 2026</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Verification Code</p>
                    <p className="text-sm font-mono">ISA-2026-ABCD-1234</p>
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4"
              >
                <div className="bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg">
                  <Award className="h-8 w-8 text-brand-purple-600" />
                </div>
              </motion.div>

              {/* Verification badge */}
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 -left-4"
              >
                <div className="bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg flex items-center gap-2">
                  <Shield className="h-6 w-6 text-green-500" />
                  <span className="text-xs font-medium">Verified</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}