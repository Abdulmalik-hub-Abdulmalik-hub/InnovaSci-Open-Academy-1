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
  Video,
  Search,
  Upload,
  Play,
  Clock,
  HardDrive,
  Eye,
  Edit,
  Trash2,
  Plus,
  Filter,
} from "lucide-react";
import { toast } from "react-hot-toast";

const mockVideos = [
  {
    id: "1",
    title: "Introduction to Molecular Dynamics",
    course: "Computational Chemistry Basics",
    lesson: "Module 1 - Lesson 3",
    duration: 1845,
    provider: "SUPABASE",
    views: 2450,
    status: "published",
    size: "245 MB",
    uploadedAt: "2026-05-15",
  },
  {
    id: "2",
    title: "Neural Network Fundamentals",
    course: "Machine Learning for Scientists",
    lesson: "Module 2 - Lesson 1",
    duration: 2400,
    provider: "BUNNY_STREAM",
    views: 1890,
    status: "published",
    size: "312 MB",
    uploadedAt: "2026-05-12",
  },
  {
    id: "3",
    title: "Protein Structure Prediction",
    course: "Bioinformatics Advanced",
    lesson: "Module 3 - Lesson 2",
    duration: 3200,
    provider: "CLOUDFLARE_STREAM",
    views: 980,
    status: "draft",
    size: "425 MB",
    uploadedAt: "2026-06-01",
  },
  {
    id: "4",
    title: "Drug-Target Interaction Analysis",
    course: "Drug Discovery Fundamentals",
    lesson: "Module 4 - Lesson 1",
    duration: 2100,
    provider: "SUPABASE",
    views: 1560,
    status: "published",
    size: "278 MB",
    uploadedAt: "2026-05-20",
  },
];

const formatDuration = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }
  return `${minutes}:${secs.toString().padStart(2, "0")}`;
};

export default function VideosPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [providerFilter, setProviderFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showUploadDialog, setShowUploadDialog] = useState(false);

  const filteredVideos = mockVideos.filter((video) => {
    const matchesSearch =
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.course.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesProvider = providerFilter === "all" || video.provider === providerFilter;
    const matchesStatus = statusFilter === "all" || video.status === statusFilter;
    return matchesSearch && matchesProvider && matchesStatus;
  });

  const handleDelete = (id: string) => {
    toast.success("Video deleted successfully");
  };

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Video Management</h1>
          <p className="text-muted-foreground">
            Manage course videos and video providers.
          </p>
        </div>
        <Button onClick={() => setShowUploadDialog(true)}>
          <Upload className="h-4 w-4 mr-2" />
          Upload Video
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Videos", value: mockVideos.length },
          { label: "Total Views", value: mockVideos.reduce((sum, v) => sum + v.views, 0).toLocaleString() },
          { label: "Total Duration", value: formatDuration(mockVideos.reduce((sum, v) => sum + v.duration, 0)) },
          { label: "Storage Used", value: "1.2 TB" },
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
                  <Video className="h-6 w-6 text-brand-purple-600" />
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
                placeholder="Search videos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={providerFilter} onValueChange={setProviderFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Provider" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Providers</SelectItem>
                <SelectItem value="SUPABASE">Supabase</SelectItem>
                <SelectItem value="BUNNY_STREAM">Bunny Stream</SelectItem>
                <SelectItem value="CLOUDFLARE_STREAM">Cloudflare Stream</SelectItem>
                <SelectItem value="VIMEO">Vimeo</SelectItem>
                <SelectItem value="YOUTUBE">YouTube</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Videos Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Video</TableHead>
                <TableHead>Course / Lesson</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Provider</TableHead>
                <TableHead>Views</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Size</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVideos.map((video) => (
                <TableRow key={video.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-16 rounded bg-muted flex items-center justify-center">
                        <Play className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <span className="font-medium">{video.title}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm">{video.course}</p>
                      <p className="text-xs text-muted-foreground">{video.lesson}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="flex items-center gap-1 text-sm">
                      <Clock className="h-4 w-4" />
                      {formatDuration(video.duration)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{video.provider}</Badge>
                  </TableCell>
                  <TableCell>
                    <span className="flex items-center gap-1 text-sm">
                      <Eye className="h-4 w-4" />
                      {video.views.toLocaleString()}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={video.status === "published" ? "default" : "secondary"}
                    >
                      {video.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="flex items-center gap-1 text-sm">
                      <HardDrive className="h-4 w-4" />
                      {video.size}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(video.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Upload Dialog */}
      <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Upload Video</DialogTitle>
            <DialogDescription>
              Upload a new video to your course
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="border-2 border-dashed rounded-lg p-8 text-center">
              <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg font-medium mb-2">Drag and drop your video here</p>
              <p className="text-sm text-muted-foreground mb-4">
                or click to browse files
              </p>
              <Button variant="outline">Browse Files</Button>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Video Title</label>
              <Input placeholder="Enter video title" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Course</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="comp-chem">Computational Chemistry Basics</SelectItem>
                  <SelectItem value="ml-sci">Machine Learning for Scientists</SelectItem>
                  <SelectItem value="bioinfo">Bioinformatics Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Lesson</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select lesson" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mod1-less1">Module 1 - Lesson 1</SelectItem>
                  <SelectItem value="mod1-less2">Module 1 - Lesson 2</SelectItem>
                  <SelectItem value="mod2-less1">Module 2 - Lesson 1</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Video Provider</label>
              <Select defaultValue="supabase">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="supabase">Supabase Storage</SelectItem>
                  <SelectItem value="bunny">Bunny Stream</SelectItem>
                  <SelectItem value="cloudflare">Cloudflare Stream</SelectItem>
                  <SelectItem value="vimeo">Vimeo</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowUploadDialog(false)}>
                Cancel
              </Button>
              <Button onClick={() => {
                setShowUploadDialog(false);
                toast.success("Video uploaded successfully");
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
