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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  HardDrive,
  Upload,
  FolderOpen,
  File,
  FileText,
  Image,
  Video,
  Trash2,
  Download,
  Eye,
  Copy,
  Search,
  Plus,
  Cloud,
  Database,
  Server,
} from "lucide-react";
import { toast } from "react-hot-toast";

const storageProviders = [
  { id: "1", name: "Supabase Storage", type: "supabase", status: "connected", storageUsed: "1.2 TB" },
  { id: "2", name: "Cloudflare R2", type: "cloudflare", status: "connected", storageUsed: "500 GB" },
  { id: "3", name: "AWS S3", type: "aws", status: "disconnected", storageUsed: "0 GB" },
  { id: "4", name: "Google Cloud Storage", type: "gcs", status: "disconnected", storageUsed: "0 GB" },
];

const files = [
  { id: "1", name: "course-thumbnails", type: "folder", size: "450 GB", files: 1245, updatedAt: "2026-06-24" },
  { id: "2", name: "course-videos", type: "folder", size: "800 GB", files: 456, updatedAt: "2026-06-23" },
  { id: "3", name: "course-materials", type: "folder", size: "120 GB", files: 2345, updatedAt: "2026-06-22" },
  { id: "4", name: "certificates", type: "folder", size: "50 GB", files: 3892, updatedAt: "2026-06-20" },
  { id: "5", name: "promotional", type: "folder", size: "25 GB", files: 156, updatedAt: "2026-06-15" },
];

const recentFiles = [
  { id: "1", name: "intro-python-thumbnail.jpg", type: "image", size: "2.4 MB", uploadedAt: "2026-06-24 14:30", bucket: "course-thumbnails" },
  { id: "2", name: "ml-basics-lesson1.mp4", type: "video", size: "245 MB", uploadedAt: "2026-06-24 13:15", bucket: "course-videos" },
  { id: "3", name: "python-cheatsheet.pdf", type: "document", size: "1.2 MB", uploadedAt: "2026-06-24 10:45", bucket: "course-materials" },
  { id: "4", name: "certificate-template.svg", type: "image", size: "156 KB", uploadedAt: "2026-06-23 16:20", bucket: "certificates" },
];

const getFileIcon = (type: string) => {
  switch (type) {
    case "folder":
      return FolderOpen;
    case "image":
      return Image;
    case "video":
      return Video;
    case "document":
      return FileText;
    default:
      return File;
  }
};

export default function StoragePage() {
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState("supabase");

  const stats = {
    totalStorage: "2.5 TB",
    usedStorage: "1.45 TB",
    availableStorage: "1.05 TB",
    totalFiles: 8756,
  };

  const usagePercent = (parseFloat(stats.usedStorage.split(" ")[0]) / parseFloat(stats.totalStorage.split(" ")[0])) * 100;

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Storage Manager</h1>
          <p className="text-muted-foreground">
            Manage file storage across multiple providers.
          </p>
        </div>
        <Button onClick={() => setShowUploadDialog(true)}>
          <Upload className="h-4 w-4 mr-2" />
          Upload Files
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Storage", value: stats.totalStorage, icon: HardDrive },
          { label: "Used", value: stats.usedStorage, icon: Database },
          { label: "Available", value: stats.availableStorage, icon: Cloud },
          { label: "Total Files", value: stats.totalFiles.toLocaleString(), icon: File },
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

      {/* Storage Usage */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Storage Usage</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span>Used: {stats.usedStorage}</span>
              <span>Total: {stats.totalStorage}</span>
            </div>
            <div className="h-4 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${usagePercent}%` }}
                transition={{ duration: 1 }}
                className="h-full bg-gradient-to-r from-brand-purple-500 to-brand-blue-500 rounded-full"
              />
            </div>
            <p className="text-sm text-muted-foreground">
              {usagePercent.toFixed(1)}% of storage used
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="buckets">
        <TabsList>
          <TabsTrigger value="buckets" className="gap-2">
            <FolderOpen className="h-4 w-4" />
            Buckets
          </TabsTrigger>
          <TabsTrigger value="providers" className="gap-2">
            <Server className="h-4 w-4" />
            Providers
          </TabsTrigger>
          <TabsTrigger value="recent" className="gap-2">
            <HardDrive className="h-4 w-4" />
            Recent Files
          </TabsTrigger>
        </TabsList>

        <TabsContent value="buckets" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Storage Buckets</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Files</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {files.map((file) => {
                    const Icon = getFileIcon(file.type);
                    return (
                      <TableRow key={file.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Icon className="h-5 w-5 text-muted-foreground" />
                            <span className="font-medium">{file.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{file.type}</Badge>
                        </TableCell>
                        <TableCell>{file.size}</TableCell>
                        <TableCell>{file.files.toLocaleString()}</TableCell>
                        <TableCell className="text-muted-foreground">
                          {file.updatedAt}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="providers" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {storageProviders.map((provider) => (
              <Card key={provider.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      {provider.type === "supabase" && <Database className="h-5 w-5" />}
                      {provider.type === "cloudflare" && <Cloud className="h-5 w-5" />}
                      {provider.type === "aws" && <Server className="h-5 w-5" />}
                      {provider.type === "gcs" && <HardDrive className="h-5 w-5" />}
                      {provider.name}
                    </CardTitle>
                    <Badge
                      variant={provider.status === "connected" ? "default" : "secondary"}
                    >
                      {provider.status}
                    </Badge>
                  </div>
                  <CardDescription>
                    Storage Used: {provider.storageUsed}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    {provider.status === "connected" ? (
                      <Button variant="outline" className="flex-1">
                        Configure
                      </Button>
                    ) : (
                      <Button className="flex-1">
                        <Plus className="h-4 w-4 mr-2" />
                        Connect
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recent" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Files</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>File</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Bucket</TableHead>
                    <TableHead>Uploaded</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentFiles.map((file) => {
                    const Icon = getFileIcon(file.type);
                    return (
                      <TableRow key={file.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Icon className="h-5 w-5 text-muted-foreground" />
                            <span className="font-medium">{file.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{file.type}</Badge>
                        </TableCell>
                        <TableCell>{file.size}</TableCell>
                        <TableCell className="text-muted-foreground">
                          {file.bucket}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {file.uploadedAt}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Copy className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Upload Dialog */}
      <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Upload Files</DialogTitle>
            <DialogDescription>
              Upload files to your storage
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Storage Provider</label>
              <select
                className="w-full p-2 rounded-md border bg-background"
                value={selectedProvider}
                onChange={(e) => setSelectedProvider(e.target.value)}
              >
                {storageProviders
                  .filter((p) => p.status === "connected")
                  .map((p) => (
                    <option key={p.id} value={p.type}>
                      {p.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Bucket</label>
              <select className="w-full p-2 rounded-md border bg-background">
                {files.map((f) => (
                  <option key={f.id} value={f.name}>
                    {f.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="border-2 border-dashed rounded-lg p-8 text-center">
              <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg font-medium mb-2">Drag and drop files here</p>
              <p className="text-sm text-muted-foreground mb-4">
                or click to browse
              </p>
              <Button variant="outline">Browse Files</Button>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowUploadDialog(false)}>
                Cancel
              </Button>
              <Button onClick={() => {
                setShowUploadDialog(false);
                toast.success("Files uploaded successfully");
              }}>
                Upload
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
