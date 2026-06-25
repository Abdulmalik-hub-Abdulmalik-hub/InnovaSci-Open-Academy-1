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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Users,
  Search,
  Filter,
  MoreVertical,
  UserPlus,
  Shield,
  Ban,
  CheckCircle,
  Trash2,
  Edit,
  Eye,
  Mail,
  Calendar,
  BookOpen,
  Award,
} from "lucide-react";
import { toast } from "react-hot-toast";

const mockUsers = [
  {
    id: "1",
    name: "Sarah Chen",
    email: "sarah.chen@example.com",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
    role: "STUDENT",
    status: "ACTIVE",
    enrolledCourses: 5,
    completedCourses: 2,
    joinDate: "2026-01-15",
    lastLogin: "2026-06-24",
  },
  {
    id: "2",
    name: "Michael Rodriguez",
    email: "michael.r@example.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    role: "STUDENT",
    status: "ACTIVE",
    enrolledCourses: 3,
    completedCourses: 1,
    joinDate: "2026-02-20",
    lastLogin: "2026-06-23",
  },
  {
    id: "3",
    name: "Emily Zhang",
    email: "emily.zhang@example.com",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
    role: "INSTRUCTOR",
    status: "ACTIVE",
    enrolledCourses: 8,
    completedCourses: 0,
    joinDate: "2025-11-10",
    lastLogin: "2026-06-24",
  },
  {
    id: "4",
    name: "James Park",
    email: "james.park@example.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
    role: "STUDENT",
    status: "SUSPENDED",
    enrolledCourses: 2,
    completedCourses: 0,
    joinDate: "2026-03-05",
    lastLogin: "2026-05-15",
  },
  {
    id: "5",
    name: "Lisa Wang",
    email: "lisa.wang@example.com",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80",
    role: "STUDENT",
    status: "ACTIVE",
    enrolledCourses: 7,
    completedCourses: 3,
    joinDate: "2025-12-01",
    lastLogin: "2026-06-24",
  },
  {
    id: "6",
    name: "Dr. Robert Smith",
    email: "robert.smith@example.com",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80",
    role: "INSTRUCTOR",
    status: "ACTIVE",
    enrolledCourses: 12,
    completedCourses: 0,
    joinDate: "2025-09-15",
    lastLogin: "2026-06-22",
  },
];

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedUser, setSelectedUser] = useState<typeof mockUsers[0] | null>(null);

  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleStatusChange = (userId: string, newStatus: string) => {
    toast.success(`User status updated to ${newStatus}`);
  };

  const handleRoleChange = (userId: string, newRole: string) => {
    toast.success(`User role updated to ${newRole}`);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-500/20 text-green-600";
      case "SUSPENDED":
        return "bg-red-500/20 text-red-600";
      case "PENDING":
        return "bg-yellow-500/20 text-yellow-600";
      default:
        return "bg-gray-500/20 text-gray-600";
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "SUPER_ADMIN":
        return "bg-purple-500/20 text-purple-600";
      case "INSTRUCTOR":
        return "bg-blue-500/20 text-blue-600";
      default:
        return "bg-gray-500/20 text-gray-600";
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">User Management</h1>
          <p className="text-muted-foreground">
            Manage platform users, roles, and permissions.
          </p>
        </div>
        <Button>
          <UserPlus className="h-4 w-4 mr-2" />
          Add User
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Users", value: mockUsers.length, icon: Users },
          { label: "Active", value: mockUsers.filter((u) => u.status === "ACTIVE").length, icon: CheckCircle },
          { label: "Suspended", value: mockUsers.filter((u) => u.status === "SUSPENDED").length, icon: Ban },
          { label: "Instructors", value: mockUsers.filter((u) => u.role === "INSTRUCTOR").length, icon: Shield },
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
                  <stat.icon className="h-6 w-6 text-brand-purple-600" />
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

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="STUDENT">Student</SelectItem>
                <SelectItem value="INSTRUCTOR">Instructor</SelectItem>
                <SelectItem value="SUPER_ADMIN">Admin</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="ACTIVE">Active</SelectItem>
                <SelectItem value="SUSPENDED">Suspended</SelectItem>
                <SelectItem value="PENDING">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Courses</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getRoleColor(user.role)}>
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(user.status)}>
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1 text-sm">
                        <BookOpen className="h-4 w-4" />
                        {user.enrolledCourses}
                      </span>
                      <span className="flex items-center gap-1 text-sm">
                        <Award className="h-4 w-4" />
                        {user.completedCourses}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {user.joinDate}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {user.lastLogin}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSelectedUser(user)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Select
                        value={user.role}
                        onValueChange={(value) => handleRoleChange(user.id, value)}
                      >
                        <SelectTrigger className="w-[130px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="STUDENT">Student</SelectItem>
                          <SelectItem value="INSTRUCTOR">Instructor</SelectItem>
                          <SelectItem value="SUPER_ADMIN">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button
                        variant={user.status === "ACTIVE" ? "destructive" : "default"}
                        size="sm"
                        onClick={() =>
                          handleStatusChange(
                            user.id,
                            user.status === "ACTIVE" ? "SUSPENDED" : "ACTIVE"
                          )
                        }
                      >
                        {user.status === "ACTIVE" ? (
                          <>
                            <Ban className="h-4 w-4 mr-1" />
                            Suspend
                          </>
                        ) : (
                          <>
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Activate
                          </>
                        )}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* User Detail Dialog */}
      <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
        <DialogContent className="max-w-2xl">
          {selectedUser && (
            <>
              <DialogHeader>
                <DialogTitle>User Details</DialogTitle>
                <DialogDescription>
                  View and manage user information
                </DialogDescription>
              </DialogHeader>
              <div className="flex items-start gap-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={selectedUser.avatar} />
                  <AvatarFallback className="text-2xl">
                    {getInitials(selectedUser.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-xl font-bold">{selectedUser.name}</h3>
                    <p className="text-muted-foreground">{selectedUser.email}</p>
                  </div>
                  <div className="flex gap-2">
                    <Badge className={getRoleColor(selectedUser.role)}>
                      {selectedUser.role}
                    </Badge>
                    <Badge className={getStatusColor(selectedUser.status)}>
                      {selectedUser.status}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Enrolled Courses</p>
                      <p className="font-medium">{selectedUser.enrolledCourses}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Completed Courses</p>
                      <p className="font-medium">{selectedUser.completedCourses}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Join Date</p>
                      <p className="font-medium">{selectedUser.joinDate}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Last Login</p>
                      <p className="font-medium">{selectedUser.lastLogin}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <Button variant="outline">
                  <Mail className="h-4 w-4 mr-2" />
                  Send Email
                </Button>
                <Button variant="destructive">
                  <Ban className="h-4 w-4 mr-2" />
                  Suspend User
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
