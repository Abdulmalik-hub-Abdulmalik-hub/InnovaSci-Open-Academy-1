"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Award,
  Search,
  Download,
  Eye,
  Shield,
  CheckCircle,
  Clock,
  XCircle,
  Plus,
  Copy,
  ExternalLink,
} from "lucide-react";
import { toast } from "react-hot-toast";

const certificates = [
  {
    id: "1",
    verificationCode: "ISA-2026-PYTH-ABCD",
    user: { name: "Sarah Chen", email: "sarah@example.com", avatar: "" },
    course: "Introduction to Python",
    grade: "A",
    issuedAt: "2026-05-15",
    expiresAt: "2029-05-15",
    status: "active",
  },
  {
    id: "2",
    verificationCode: "ISA-2026-DATA-EFGH",
    user: { name: "Michael Rodriguez", email: "michael@example.com", avatar: "" },
    course: "Data Analysis with R",
    grade: "A+",
    issuedAt: "2026-04-20",
    expiresAt: "2029-04-20",
    status: "active",
  },
  {
    id: "3",
    verificationCode: "ISA-2026-MLPR-IJKL",
    user: { name: "Emily Zhang", email: "emily@example.com", avatar: "" },
    course: "Machine Learning for Scientists",
    grade: "B+",
    issuedAt: "2026-03-10",
    expiresAt: "2029-03-10",
    status: "active",
  },
  {
    id: "4",
    verificationCode: "ISA-2025-BIO-MNOP",
    user: { name: "James Park", email: "james@example.com", avatar: "" },
    course: "Bioinformatics Basics",
    grade: "A",
    issuedAt: "2025-12-01",
    expiresAt: "2028-12-01",
    status: "revoked",
  },
];

const getInitials = (name: string) => {
  return name.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2);
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case "active":
      return <Badge className="bg-green-500/20 text-green-600"><CheckCircle className="h-3 w-3 mr-1" />Active</Badge>;
    case "revoked":
      return <Badge className="bg-red-500/20 text-red-600"><XCircle className="h-3 w-3 mr-1" />Revoked</Badge>;
    case "expired":
      return <Badge className="bg-yellow-500/20 text-yellow-600"><Clock className="h-3 w-3 mr-1" />Expired</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

export default function AdminCertificatesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedCertificate, setSelectedCertificate] = useState<typeof certificates[0] | null>(null);

  const filteredCertificates = certificates.filter((cert) => {
    const matchesSearch =
      cert.verificationCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.course.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || cert.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: certificates.length,
    active: certificates.filter((c) => c.status === "active").length,
    revoked: certificates.filter((c) => c.status === "revoked").length,
    thisMonth: 45,
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success("Verification code copied!");
  };

  const handleRevoke = (cert: typeof certificates[0]) => {
    toast.success(`Certificate ${cert.verificationCode} revoked`);
  };

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Certificate Management</h1>
          <p className="text-muted-foreground">
            View, verify, and manage all certificates.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Issue Certificate
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Certificates", value: stats.total, icon: Award },
          { label: "Active", value: stats.active, icon: CheckCircle, color: "text-green-600" },
          { label: "Revoked", value: stats.revoked, icon: XCircle, color: "text-red-600" },
          { label: "Issued This Month", value: stats.thisMonth, icon: Award },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-4 flex items-center gap-4">
                <div className={`h-12 w-12 rounded-lg bg-muted flex items-center justify-center ${stat.color || "text-brand-purple-600"}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Certificate Verification */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Verify Certificate
          </CardTitle>
          <CardDescription>
            Enter a verification code to validate any certificate
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 max-w-xl">
            <Input
              placeholder="Enter verification code (e.g., ISA-2026-PYTH-ABCD)"
              className="flex-1 font-mono"
            />
            <Button>
              <Shield className="h-4 w-4 mr-2" />
              Verify
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search certificates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              className="p-2 rounded-md border bg-background"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="revoked">Revoked</option>
              <option value="expired">Expired</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Certificates Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Certificate</TableHead>
                <TableHead>Recipient</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Issued</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCertificates.map((cert) => (
                <TableRow key={cert.id}>
                  <TableCell>
                    <div>
                      <p className="font-mono font-medium text-sm">{cert.verificationCode}</p>
                      <p className="text-xs text-muted-foreground">Expires: {cert.expiresAt}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={cert.user.avatar} />
                        <AvatarFallback className="text-xs">
                          {getInitials(cert.user.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{cert.user.name}</p>
                        <p className="text-xs text-muted-foreground">{cert.user.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{cert.course}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{cert.grade}</Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {cert.issuedAt}
                  </TableCell>
                  <TableCell>{getStatusBadge(cert.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSelectedCertificate(cert)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleCopyCode(cert.verificationCode)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      {cert.status === "active" && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRevoke(cert)}
                          className="text-red-600"
                        >
                          <XCircle className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Certificate Detail Dialog */}
      <Dialog open={!!selectedCertificate} onOpenChange={() => setSelectedCertificate(null)}>
        <DialogContent className="max-w-2xl">
          {selectedCertificate && (
            <>
              <DialogHeader>
                <DialogTitle>Certificate Details</DialogTitle>
                <DialogDescription>
                  Certificate #{selectedCertificate.verificationCode}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-brand-purple-100 to-brand-blue-100 dark:from-brand-purple-900/30 dark:to-brand-blue-900/30 rounded-lg p-8 text-center">
                  <Award className="h-16 w-16 mx-auto mb-4 text-brand-purple-600" />
                  <h2 className="text-2xl font-bold mb-2">Certificate of Completion</h2>
                  <p className="text-muted-foreground mb-4">This certifies that</p>
                  <p className="text-3xl font-bold gradient-text mb-4">
                    {selectedCertificate.user.name}
                  </p>
                  <p className="text-muted-foreground mb-4">has successfully completed</p>
                  <p className="text-xl font-semibold mb-6">{selectedCertificate.course}</p>
                  <div className="flex justify-center gap-8 text-sm text-muted-foreground">
                    <div>
                      <p>Grade</p>
                      <p className="font-semibold">{selectedCertificate.grade}</p>
                    </div>
                    <div>
                      <p>Issued</p>
                      <p className="font-semibold">{selectedCertificate.issuedAt}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div>
                      <p className="text-sm text-muted-foreground">Verification Code</p>
                      <p className="font-mono font-medium">{selectedCertificate.verificationCode}</p>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => handleCopyCode(selectedCertificate.verificationCode)}>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div>
                      <p className="text-sm text-muted-foreground">Verification URL</p>
                      <p className="text-sm font-mono">https://innovasci.com/verify/{selectedCertificate.verificationCode}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Open
                    </Button>
                  </div>
                </div>

                <div className="flex justify-between">
                  <div>
                    {getStatusBadge(selectedCertificate.status)}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF
                    </Button>
                    {selectedCertificate.status === "active" && (
                      <Button variant="destructive" onClick={() => {
                        handleRevoke(selectedCertificate);
                        setSelectedCertificate(null);
                      }}>
                        Revoke Certificate
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
