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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Shield,
  Plus,
  Edit,
  Trash2,
  Search,
  Check,
  Users,
  Key,
  Settings,
  Eye,
  BookOpen,
  Award,
  DollarSign,
  Mail,
} from "lucide-react";
import { toast } from "react-hot-toast";

const roles = [
  { id: "1", name: "SUPER_ADMIN", description: "Full system access", userCount: 2, color: "bg-purple-500" },
  { id: "2", name: "INSTRUCTOR", description: "Course creation and management", userCount: 15, color: "bg-blue-500" },
  { id: "3", name: "STUDENT", description: "Course enrollment and learning", userCount: 12441, color: "bg-green-500" },
];

const permissions = [
  { id: "1", key: "courses.view", name: "View Courses", category: "courses", icon: BookOpen },
  { id: "2", key: "courses.create", name: "Create Courses", category: "courses", icon: BookOpen },
  { id: "3", key: "courses.edit", name: "Edit Courses", category: "courses", icon: BookOpen },
  { id: "4", key: "courses.delete", name: "Delete Courses", category: "courses", icon: BookOpen },
  { id: "5", key: "users.view", name: "View Users", category: "users", icon: Users },
  { id: "6", key: "users.edit", name: "Edit Users", category: "users", icon: Users },
  { id: "7", key: "users.delete", name: "Delete Users", category: "users", icon: Users },
  { id: "8", key: "certificates.view", name: "View Certificates", category: "certificates", icon: Award },
  { id: "9", key: "certificates.issue", name: "Issue Certificates", category: "certificates", icon: Award },
  { id: "10", key: "payments.view", name: "View Payments", category: "payments", icon: DollarSign },
  { id: "11", key: "payments.manage", name: "Manage Payments", category: "payments", icon: DollarSign },
  { id: "12", key: "newsletter.send", name: "Send Newsletter", category: "newsletter", icon: Mail },
  { id: "13", key: "settings.view", name: "View Settings", category: "settings", icon: Settings },
  { id: "14", key: "settings.edit", name: "Edit Settings", category: "settings", icon: Settings },
  { id: "15", key: "audit.view", name: "View Audit Logs", category: "audit", icon: Eye },
];

const rolePermissions: Record<string, string[]> = {
  SUPER_ADMIN: permissions.map((p) => p.key),
  INSTRUCTOR: ["courses.view", "courses.create", "courses.edit", "users.view", "certificates.view", "certificates.issue"],
  STUDENT: ["courses.view", "certificates.view"],
};

export default function RolesPage() {
  const [selectedRole, setSelectedRole] = useState<string>("STUDENT");
  const [searchQuery, setSearchQuery] = useState("");
  const [newRole, setNewRole] = useState({ name: "", description: "" });
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  const currentRole = roles.find((r) => r.name === selectedRole);
  const currentPermissions = rolePermissions[selectedRole] || [];

  const filteredPermissions = permissions.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.key.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categories = Array.from(new Set(permissions.map((p) => p.category)));

  const hasPermission = (key: string) => currentPermissions.includes(key);

  const togglePermission = (key: string) => {
    toast.success(`Permission ${hasPermission(key) ? "removed from" : "added to"} ${selectedRole}`);
  };

  const handleCreateRole = () => {
    if (!newRole.name) {
      toast.error("Role name is required");
      return;
    }
    toast.success(`Role ${newRole.name} created successfully`);
    setShowCreateDialog(false);
    setNewRole({ name: "", description: "" });
  };

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Roles & Permissions</h1>
          <p className="text-muted-foreground">
            Manage roles and their associated permissions.
          </p>
        </div>
        <Button onClick={() => setShowCreateDialog(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create Role
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Roles List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Roles</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {roles.map((role) => (
              <button
                key={role.id}
                onClick={() => setSelectedRole(role.name)}
                className={`w-full px-4 py-3 text-left hover:bg-muted transition-colors flex items-center justify-between ${
                  selectedRole === role.name ? "bg-primary/10 border-l-2 border-primary" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`h-3 w-3 rounded-full ${role.color}`} />
                  <div>
                    <p className="font-medium">{role.name}</p>
                    <p className="text-xs text-muted-foreground">{role.userCount} users</p>
                  </div>
                </div>
              </button>
            ))}
          </CardContent>
        </Card>

        {/* Permissions Matrix */}
        <div className="lg:col-span-3 space-y-6">
          {/* Role Info */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`h-12 w-12 rounded-lg ${currentRole?.color} flex items-center justify-center`}>
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle>{currentRole?.name}</CardTitle>
                    <CardDescription>{currentRole?.description}</CardDescription>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  {selectedRole !== "SUPER_ADMIN" && selectedRole !== "STUDENT" && (
                    <Button variant="destructive" size="sm">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Search */}
          <Card>
            <CardContent className="p-4">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search permissions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          {/* Permissions Grid by Category */}
          {categories.map((category) => {
            const categoryPermissions = filteredPermissions.filter((p) => p.category === category);
            if (categoryPermissions.length === 0) return null;
            
            return (
              <Card key={category}>
                <CardHeader>
                  <CardTitle className="text-lg capitalize flex items-center gap-2">
                    {category === "courses" && <BookOpen className="h-5 w-5" />}
                    {category === "users" && <Users className="h-5 w-5" />}
                    {category === "certificates" && <Award className="h-5 w-5" />}
                    {category === "payments" && <DollarSign className="h-5 w-5" />}
                    {category === "newsletter" && <Mail className="h-5 w-5" />}
                    {category === "settings" && <Settings className="h-5 w-5" />}
                    {category === "audit" && <Eye className="h-5 w-5" />}
                    {category} Permissions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {categoryPermissions.map((permission) => (
                      <motion.div
                        key={permission.key}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <Checkbox
                            id={permission.key}
                            checked={hasPermission(permission.key)}
                            onCheckedChange={() => togglePermission(permission.key)}
                            disabled={selectedRole === "SUPER_ADMIN"}
                          />
                          <div>
                            <label
                              htmlFor={permission.key}
                              className="font-medium cursor-pointer"
                            >
                              {permission.name}
                            </label>
                            <p className="text-xs text-muted-foreground font-mono">
                              {permission.key}
                            </p>
                          </div>
                        </div>
                        {hasPermission(permission.key) && (
                          <Check className="h-4 w-4 text-green-600" />
                        )}
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Create Role Dialog */}
      {showCreateDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-background rounded-lg p-6 w-full max-w-md"
          >
            <h2 className="text-xl font-bold mb-4">Create New Role</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Role Name</label>
                <Input
                  placeholder="e.g., CONTENT_MANAGER"
                  value={newRole.name}
                  onChange={(e) => setNewRole({ ...newRole, name: e.target.value.toUpperCase() })}
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Description</label>
                <Input
                  placeholder="Role description"
                  value={newRole.description}
                  onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateRole}>Create Role</Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
