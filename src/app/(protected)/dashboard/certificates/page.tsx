"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Award,
  Download,
  ExternalLink,
  Search,
  CheckCircle,
  Calendar,
  Shield,
  Copy,
  Share2,
  Mail,
} from "lucide-react";
import { toast } from "react-hot-toast";

const certificates = [
  {
    id: "1",
    title: "Python Programming Basics",
    course: "Introduction to Python Programming",
    instructor: "Prof. Michael Chen",
    issueDate: "2026-05-15",
    expirationDate: "2029-05-15",
    verificationCode: "ISA-2026-PYTH-ABCD",
    grade: "A",
    thumbnail: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&q=80",
    status: "active",
  },
  {
    id: "2",
    title: "Data Analysis Fundamentals",
    course: "Data Analysis with R",
    instructor: "Dr. Sarah Johnson",
    issueDate: "2026-04-20",
    expirationDate: "2029-04-20",
    verificationCode: "ISA-2026-DATA-EFGH",
    grade: "A+",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80",
    status: "active",
  },
  {
    id: "3",
    title: "Machine Learning Practitioner",
    course: "Machine Learning for Scientists",
    instructor: "Prof. Michael Chen",
    issueDate: "2026-03-10",
    expirationDate: "2029-03-10",
    verificationCode: "ISA-2026-MLPR-IJKL",
    grade: "B+",
    thumbnail: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&q=80",
    status: "active",
  },
];

export default function CertificatesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCertificate, setSelectedCertificate] = useState<typeof certificates[0] | null>(null);
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<{
    valid: boolean;
    certificate?: typeof certificates[0];
  } | null>(null);

  const filteredCertificates = certificates.filter(
    (cert) =>
      cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.verificationCode.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleVerify = async () => {
    if (!verificationCode.trim()) return;
    
    setIsVerifying(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const found = certificates.find(
        (c) => c.verificationCode.toLowerCase() === verificationCode.toLowerCase()
      );
      setVerificationResult({
        valid: !!found,
        certificate: found,
      });
      if (!found) {
        toast.error("Certificate not found");
      }
    } finally {
      setIsVerifying(false);
    }
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success("Verification code copied!");
  };

  const handleDownload = (cert: typeof certificates[0]) => {
    toast.success(`Downloading certificate for ${cert.title}...`);
  };

  const handleShare = (cert: typeof certificates[0]) => {
    toast.success("Share link copied to clipboard!");
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">My Certificates</h1>
        <p className="text-muted-foreground">
          View, download, and verify your earned certificates.
        </p>
      </div>

      {/* Verification Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Verify Certificate
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Input
                type="text"
                placeholder="Enter verification code (e.g., ISA-2026-PYTH-ABCD)"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                className="font-mono"
              />
            </div>
            <Button onClick={handleVerify} disabled={isVerifying}>
              {isVerifying ? "Verifying..." : "Verify"}
            </Button>
          </div>
          {verificationResult && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-4 p-4 rounded-lg ${
                verificationResult.valid
                  ? "bg-green-500/10 text-green-700 dark:text-green-400"
                  : "bg-red-500/10 text-red-700 dark:text-red-400"
              }`}
            >
              <div className="flex items-center gap-2">
                {verificationResult.valid ? (
                  <>
                    <CheckCircle className="h-5 w-5" />
                    <span className="font-semibold">Valid Certificate</span>
                  </>
                ) : (
                  <>
                    <Shield className="h-5 w-5" />
                    <span className="font-semibold">Certificate Not Found</span>
                  </>
                )}
              </div>
              {verificationResult.valid && verificationResult.certificate && (
                <div className="mt-2 text-sm">
                  <p>Issued to: Certificate Holder</p>
                  <p>Course: {verificationResult.certificate.course}</p>
                  <p>Issued on: {verificationResult.certificate.issueDate}</p>
                </div>
              )}
            </motion.div>
          )}
        </CardContent>
      </Card>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search certificates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Certificates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCertificates.map((cert, index) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-40 bg-gradient-to-br from-brand-purple-600 to-brand-blue-600 flex items-center justify-center">
                <div className="text-center text-white">
                  <Award className="h-12 w-12 mx-auto mb-2" />
                  <p className="text-sm font-medium opacity-80">InnovaSci Open Academy</p>
                </div>
                <Badge
                  className="absolute top-3 right-3"
                  variant={cert.status === "active" ? "default" : "secondary"}
                >
                  {cert.status}
                </Badge>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-1">{cert.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{cert.course}</p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Grade</span>
                    <Badge variant="outline">{cert.grade}</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Issued</span>
                    <span>{cert.issueDate}</span>
                  </div>
                </div>
                <div className="space-y-2 mb-4">
                  <p className="text-xs text-muted-foreground">Verification Code</p>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 text-xs bg-muted px-2 py-1 rounded font-mono">
                      {cert.verificationCode}
                    </code>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleCopyCode(cert.verificationCode)}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1 gap-2"
                    onClick={() => setSelectedCertificate(cert)}
                  >
                    <ExternalLink className="h-4 w-4" />
                    View
                  </Button>
                  <Button className="flex-1 gap-2" onClick={() => handleDownload(cert)}>
                    <Download className="h-4 w-4" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredCertificates.length === 0 && (
        <div className="text-center py-12">
          <Award className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No certificates found</h3>
          <p className="text-muted-foreground">
            Complete courses to earn certificates.
          </p>
          <Button className="mt-4" asChild>
            <Link href="/courses">Browse Courses</Link>
          </Button>
        </div>
      )}

      {/* Certificate Detail Dialog */}
      <Dialog open={!!selectedCertificate} onOpenChange={() => setSelectedCertificate(null)}>
        <DialogContent className="max-w-2xl">
          {selectedCertificate && (
            <>
              <DialogHeader>
                <DialogTitle>Certificate Details</DialogTitle>
                <DialogDescription>
                  Certificate of Completion
                </DialogDescription>
              </DialogHeader>
              <div className="relative aspect-[1.4/1] bg-gradient-to-br from-brand-purple-100 to-brand-blue-100 dark:from-brand-purple-900/30 dark:to-brand-blue-900/30 rounded-lg p-8 flex flex-col items-center justify-center">
                <div className="absolute top-4 left-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Award className="h-5 w-5" />
                    InnovaSci Open Academy
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-center mb-4">Certificate of Completion</h2>
                <p className="text-center text-muted-foreground mb-2">
                  This is to certify that
                </p>
                <p className="text-3xl font-bold text-center mb-4 gradient-text">
                  Certificate Holder
                </p>
                <p className="text-center text-muted-foreground mb-2">
                  has successfully completed
                </p>
                <p className="text-xl font-semibold text-center mb-6">
                  {selectedCertificate.course}
                </p>
                <div className="flex items-center gap-8 text-sm text-muted-foreground">
                  <div>
                    <p>Grade: {selectedCertificate.grade}</p>
                  </div>
                  <div>
                    <p>Issued: {selectedCertificate.issueDate}</p>
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Shield className="h-4 w-4" />
                    Verification: {selectedCertificate.verificationCode}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-2"
                    onClick={() => handleCopyCode(selectedCertificate.verificationCode)}
                  >
                    <Copy className="h-3 w-3" />
                    Copy Code
                  </Button>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" className="gap-2" onClick={() => handleShare(selectedCertificate)}>
                  <Share2 className="h-4 w-4" />
                  Share
                </Button>
                <Button className="gap-2" onClick={() => handleDownload(selectedCertificate)}>
                  <Download className="h-4 w-4" />
                  Download PDF
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
