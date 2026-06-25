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
  Mail,
  Send,
  Users,
  Eye,
  Clock,
  CheckCircle,
  TrendingUp,
  Plus,
  Search,
  Play,
  Pause,
  BarChart3,
  Calendar,
  User,
} from "lucide-react";
import { toast } from "react-hot-toast";

const campaigns = [
  {
    id: "1",
    name: "June Newsletter",
    subject: "New Courses Available This Month",
    sentCount: 8542,
    openRate: 42.5,
    clickRate: 12.3,
    status: "sent",
    sentAt: "2026-06-15",
  },
  {
    id: "2",
    name: "Weekly Digest #24",
    subject: "Your Weekly Learning Summary",
    sentCount: 7820,
    openRate: 38.2,
    clickRate: 8.7,
    status: "sent",
    sentAt: "2026-06-10",
  },
  {
    id: "3",
    name: "Course Announcement",
    subject: "Introducing: Advanced Drug Discovery",
    sentCount: 0,
    openRate: 0,
    clickRate: 0,
    status: "draft",
    sentAt: null,
  },
  {
    id: "4",
    name: "Summer Sale",
    subject: "50% Off All Courses This Summer!",
    scheduledFor: "2026-07-01",
    sentCount: 0,
    openRate: 0,
    clickRate: 0,
    status: "scheduled",
    sentAt: null,
  },
];

const subscribers = [
  { id: "1", email: "sarah@example.com", subscribedAt: "2026-01-15", status: "active" },
  { id: "2", email: "michael@example.com", subscribedAt: "2026-02-20", status: "active" },
  { id: "3", email: "emily@example.com", subscribedAt: "2026-03-05", status: "active" },
  { id: "4", email: "james@example.com", subscribedAt: "2026-04-10", status: "unsubscribed" },
  { id: "5", email: "lisa@example.com", subscribedAt: "2026-05-01", status: "active" },
];

export default function NewsletterPage() {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCampaign, setSelectedCampaign] = useState<typeof campaigns[0] | null>(null);

  const stats = {
    totalSubscribers: 8542,
    activeSubscribers: 8120,
    unsubscribed: 422,
    avgOpenRate: 40.35,
  };

  const filteredSubscribers = subscribers.filter((s) =>
    s.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Newsletter</h1>
          <p className="text-muted-foreground">
            Manage email campaigns and subscribers.
          </p>
        </div>
        <Button onClick={() => setShowCreateDialog(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create Campaign
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Subscribers", value: stats.totalSubscribers, icon: Users },
          { label: "Active", value: stats.activeSubscribers, icon: CheckCircle },
          { label: "Unsubscribed", value: stats.unsubscribed, icon: User },
          { label: "Avg Open Rate", value: `${stats.avgOpenRate}%`, icon: TrendingUp },
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

      <Tabs defaultValue="campaigns">
        <TabsList>
          <TabsTrigger value="campaigns" className="gap-2">
            <Send className="h-4 w-4" />
            Campaigns
          </TabsTrigger>
          <TabsTrigger value="subscribers" className="gap-2">
            <Users className="h-4 w-4" />
            Subscribers
          </TabsTrigger>
          <TabsTrigger value="analytics" className="gap-2">
            <BarChart3 className="h-4 w-4" />
            Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Email Campaigns</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Campaign</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Sent</TableHead>
                    <TableHead>Open Rate</TableHead>
                    <TableHead>Click Rate</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {campaigns.map((campaign) => (
                    <TableRow key={campaign.id}>
                      <TableCell className="font-medium">{campaign.name}</TableCell>
                      <TableCell className="text-muted-foreground">{campaign.subject}</TableCell>
                      <TableCell>{campaign.sentCount.toLocaleString()}</TableCell>
                      <TableCell>
                        {campaign.openRate > 0 ? `${campaign.openRate}%` : "-"}
                      </TableCell>
                      <TableCell>
                        {campaign.clickRate > 0 ? `${campaign.clickRate}%` : "-"}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            campaign.status === "sent"
                              ? "default"
                              : campaign.status === "scheduled"
                              ? "secondary"
                              : "outline"
                          }
                        >
                          {campaign.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {campaign.sentAt || campaign.scheduledFor || "-"}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                          {campaign.status === "draft" && (
                            <Button variant="ghost" size="icon">
                              <Play className="h-4 w-4" />
                            </Button>
                          )}
                          {campaign.status === "scheduled" && (
                            <Button variant="ghost" size="icon">
                              <Pause className="h-4 w-4" />
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
        </TabsContent>

        <TabsContent value="subscribers" className="mt-6">
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search subscribers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Subscribed</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSubscribers.map((subscriber) => (
                    <TableRow key={subscriber.id}>
                      <TableCell className="font-medium">{subscriber.email}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {subscriber.subscribedAt}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={subscriber.status === "active" ? "default" : "secondary"}
                        >
                          {subscriber.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Open Rate Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-center justify-center text-muted-foreground">
                  Chart visualization would appear here
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Click Rate Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-center justify-center text-muted-foreground">
                  Chart visualization would appear here
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Create Campaign Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create Email Campaign</DialogTitle>
            <DialogDescription>
              Create a new newsletter campaign
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Campaign Name</label>
              <Input placeholder="e.g., Monthly Newsletter" className="mt-1" />
            </div>
            <div>
              <label className="text-sm font-medium">Subject Line</label>
              <Input placeholder="Email subject" className="mt-1" />
            </div>
            <div>
              <label className="text-sm font-medium">Preview Text</label>
              <Input placeholder="Preview text" className="mt-1" />
            </div>
            <div>
              <label className="text-sm font-medium">Content</label>
              <textarea
                className="w-full mt-1 p-3 rounded-md border min-h-[200px]"
                placeholder="Email content..."
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                Cancel
              </Button>
              <Button variant="outline">Save as Draft</Button>
              <Button onClick={() => {
                setShowCreateDialog(false);
                toast.success("Campaign created successfully");
              }}>
                Create Campaign
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
