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
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  FileText,
  Search,
  Filter,
  Download,
  RefreshCw,
  User,
  Settings,
  BookOpen,
  CreditCard,
  Users,
  Shield,
  Mail,
  AlertCircle,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { toast } from "react-hot-toast";

const mockLogs = [
  {
    id: "1",
    timestamp: "2026-06-24 14:32:15",
    user: { name: "Sarah Chen", email: "sarah@example.com", avatar: "" },
    action: "Course Published",
    module: "courses",
    details: "Published 'Introduction to Python'",
    ipAddress: "192.168.1.105",
    status: "success",
  },
  {
    id: "2",
    timestamp: "2026-06-24 14:28:45",
    user: { name: "Admin User", email: "admin@example.com", avatar: "" },
    action: "User Suspended",
    module: "users",
    details: "Suspended user james.park@example.com",
    ipAddress: "192.168.1.100",
    status: "success",
  },
  {
    id: "3",
    timestamp: "2026-06-24 14:15:22",
    user: { name: "Emily Zhang", email: "emily@example.com", avatar: "" },
    action: "Video Uploaded",
    module: "videos",
    details: "Uploaded video to 'Module 3 - Lesson 2'",
    ipAddress: "10.0.0.55",
    status: "success",
  },
  {
    id: "4",
    timestamp: "2026-06-24 13:45:00",
    user: { name: "System", email: "system@innovasci.com", avatar: "" },
    action: "Certificate Generated",
    module: "certificates",
    details: "Auto-generated certificate for user_id: abc-123",
    ipAddress: "localhost",
    status: "success",
  },
  {
    id: "5",
    timestamp: "2026-06-24 13:30:18",
    user: { name: "Michael Rodriguez", email: "michael@example.com", avatar: "" },
    action: "Payment Completed",
    module: "payments",
    details: "Payment of $49.99 for course 'ML Fundamentals'",
    ipAddress: "172.16.0.88",
    status: "success",
  },
  {
    id: "6",
    timestamp: "2026-06-24 13:15:33",
    user: { name: "Admin User", email: "admin@example.com", avatar: "" },
    action: "Role Updated",
    module: "roles",
    details: "Changed user role from STUDENT to INSTRUCTOR",
    ipAddress: "192.168.1.100",
    status: "success",
  },
  {
    id: "7",
    timestamp: "2026-06-24 12:45:00",
    user: { name: "Unknown", email: "unknown@example.com", avatar: "" },
    action: "Login Failed",
    module: "auth",
    details: "Failed login attempt - invalid credentials",
    ipAddress: "45.33.32.156",
    status: "error",
  },
  {
    id: "8",
    timestamp: "2026-06-24 12:30:00",
    user: { name: "Lisa Wang", email: "lisa@example.com", avatar: "" },
    action: "Newsletter Subscribed",
    module: "newsletter",
    details: "Subscribed to weekly digest",
    ipAddress: "192.168.1.110",
    status: "success",
  },
];

const getModuleIcon = (module: string) => {
  switch (module) {
    case "courses":
      return BookOpen;
    case "users":
      return Users;
    case "videos":
      return Shield;
    case "payments":
      return CreditCard;
    case "roles":
      return Shield;
    case "auth":
      return User;
    case "newsletter":
      return Mail;
    default:
      return Settings;
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "success":
      return CheckCircle;
    case "error":
      return XCircle;
    case "warning":
      return AlertCircle;
    default:
      return Clock;
  }
};

export default function AuditLogsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [moduleFilter, setModuleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredLogs = mockLogs.filter((log) => {
    const matchesSearch =
      log.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesModule = moduleFilter === "all" || log.module === moduleFilter;
    const matchesStatus = statusFilter === "all" || log.status === statusFilter;
    return matchesSearch && matchesModule && matchesStatus;
  });

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Audit Logs</h1>
          <p className="text-muted-foreground">
            Track all system activities and user actions.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Logs
          </Button>
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Logs", value: mockLogs.length },
          { label: "Successful", value: mockLogs.filter((l) => l.status === "success").length, color: "text-green-600" },
          { label: "Errors", value: mockLogs.filter((l) => l.status === "error").length, color: "text-red-600" },
          { label: "Modules", value: 8 },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-4 flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-brand-purple-500/20 flex items-center justify-center">
                  <FileText className="h-6 w-6 text-brand-purple-600" />
                </div>
                <div>
                  <p className={`text-2xl font-bold ${stat.color || ""}`}>{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search logs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={moduleFilter} onValueChange={setModuleFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Module" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Modules</SelectItem>
                <SelectItem value="courses">Courses</SelectItem>
                <SelectItem value="users">Users</SelectItem>
                <SelectItem value="videos">Videos</SelectItem>
                <SelectItem value="payments">Payments</SelectItem>
                <SelectItem value="roles">Roles</SelectItem>
                <SelectItem value="auth">Auth</SelectItem>
                <SelectItem value="newsletter">Newsletter</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="error">Error</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Logs Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Module</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log) => {
                const ModuleIcon = getModuleIcon(log.module);
                const StatusIcon = getStatusIcon(log.status);
                return (
                  <TableRow key={log.id}>
                    <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                      {log.timestamp}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={log.user.avatar} />
                          <AvatarFallback className="text-xs">
                            {getInitials(log.user.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{log.user.name}</p>
                          <p className="text-xs text-muted-foreground">{log.user.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{log.action}</p>
                        <p className="text-xs text-muted-foreground">{log.details}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="gap-1">
                        <ModuleIcon className="h-3 w-3" />
                        {log.module}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-mono text-sm">{log.ipAddress}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          log.status === "success"
                            ? "default"
                            : log.status === "error"
                            ? "destructive"
                            : "secondary"
                        }
                        className="gap-1"
                      >
                        <StatusIcon className="h-3 w-3" />
                        {log.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
