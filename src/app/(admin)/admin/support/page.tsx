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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
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
  Headphones,
  Search,
  Filter,
  Plus,
  Mail,
  Phone,
  MessageSquare,
  Clock,
  CheckCircle,
  AlertCircle,
  User,
  ChevronRight,
  Send,
  FileText,
} from "lucide-react";
import { toast } from "react-hot-toast";

const tickets = [
  {
    id: "1",
    subject: "Cannot access certificate download",
    requester: { name: "Sarah Chen", email: "sarah@example.com", avatar: "" },
    priority: "high",
    status: "open",
    category: "Certificates",
    createdAt: "2026-06-24 10:30",
    lastReply: "2 hours ago",
    messages: 3,
  },
  {
    id: "2",
    subject: "Payment not processed correctly",
    requester: { name: "Michael Rodriguez", email: "michael@example.com", avatar: "" },
    priority: "urgent",
    status: "pending",
    category: "Payments",
    createdAt: "2026-06-24 09:15",
    lastReply: "4 hours ago",
    messages: 5,
  },
  {
    id: "3",
    subject: "Video not loading on mobile",
    requester: { name: "Emily Zhang", email: "emily@example.com", avatar: "" },
    priority: "medium",
    status: "resolved",
    category: "Technical",
    createdAt: "2026-06-23 16:45",
    lastReply: "1 day ago",
    messages: 8,
  },
  {
    id: "4",
    subject: "Request for bulk enrollment",
    requester: { name: "James Park", email: "james@example.com", avatar: "" },
    priority: "low",
    status: "open",
    category: "Enterprise",
    createdAt: "2026-06-24 08:00",
    lastReply: "1 hour ago",
    messages: 2,
  },
  {
    id: "5",
    subject: "Course content suggestion",
    requester: { name: "Lisa Wang", email: "lisa@example.com", avatar: "" },
    priority: "low",
    status: "closed",
    category: "Feedback",
    createdAt: "2026-06-20 14:20",
    lastReply: "4 days ago",
    messages: 4,
  },
];

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "urgent":
      return "bg-red-500/20 text-red-600";
    case "high":
      return "bg-orange-500/20 text-orange-600";
    case "medium":
      return "bg-yellow-500/20 text-yellow-600";
    case "low":
      return "bg-green-500/20 text-green-600";
    default:
      return "bg-gray-500/20 text-gray-600";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "open":
      return AlertCircle;
    case "pending":
      return Clock;
    case "resolved":
      return CheckCircle;
    case "closed":
      return CheckCircle;
    default:
      return MessageSquare;
  }
};

export default function SupportPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [selectedTicket, setSelectedTicket] = useState<typeof tickets[0] | null>(null);

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.requester.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || ticket.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || ticket.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const stats = {
    open: tickets.filter((t) => t.status === "open").length,
    pending: tickets.filter((t) => t.status === "pending").length,
    resolved: tickets.filter((t) => t.status === "resolved").length,
    avgResponseTime: "2.5 hours",
  };

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Support Center</h1>
          <p className="text-muted-foreground">
            Manage support tickets and customer inquiries.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <FileText className="h-4 w-4 mr-2" />
            View Reports
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Ticket
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Open Tickets", value: stats.open, icon: AlertCircle, color: "text-orange-600" },
          { label: "Pending", value: stats.pending, icon: Clock, color: "text-blue-600" },
          { label: "Resolved Today", value: stats.resolved, icon: CheckCircle, color: "text-green-600" },
          { label: "Avg Response", value: stats.avgResponseTime, icon: Headphones, color: "text-brand-purple-600" },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-4 flex items-center gap-4">
                <div className={`h-12 w-12 rounded-lg bg-muted flex items-center justify-center ${stat.color}`}>
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

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search tickets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-full md:w-[150px]">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tickets Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ticket</TableHead>
                <TableHead>Requester</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Reply</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTickets.map((ticket) => {
                const StatusIcon = getStatusIcon(ticket.status);
                return (
                  <TableRow
                    key={ticket.id}
                    className="cursor-pointer"
                    onClick={() => setSelectedTicket(ticket)}
                  >
                    <TableCell>
                      <div>
                        <p className="font-medium">{ticket.subject}</p>
                        <p className="text-xs text-muted-foreground">
                          {ticket.id} • {ticket.createdAt}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={ticket.requester.avatar} />
                          <AvatarFallback className="text-xs">
                            {getInitials(ticket.requester.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{ticket.requester.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {ticket.requester.email}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getPriorityColor(ticket.priority)}>
                        {ticket.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{ticket.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          ticket.status === "open"
                            ? "default"
                            : ticket.status === "resolved"
                            ? "default"
                            : "secondary"
                        }
                        className="gap-1"
                      >
                        <StatusIcon className="h-3 w-3" />
                        {ticket.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {ticket.lastReply}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Mail className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <ChevronRight className="h-4 w-4" />
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

      {/* Ticket Detail Dialog */}
      <Dialog open={!!selectedTicket} onOpenChange={() => setSelectedTicket(null)}>
        <DialogContent className="max-w-2xl">
          {selectedTicket && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedTicket.subject}</DialogTitle>
                <DialogDescription>
                  Ticket #{selectedTicket.id} • {selectedTicket.createdAt}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                  <Avatar>
                    <AvatarImage src={selectedTicket.requester.avatar} />
                    <AvatarFallback>
                      {getInitials(selectedTicket.requester.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium">{selectedTicket.requester.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {selectedTicket.requester.email}
                    </p>
                  </div>
                  <Badge className={getPriorityColor(selectedTicket.priority)}>
                    {selectedTicket.priority}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">
                    Hi Support Team,
                  </div>
                  <p className="text-sm">
                    I need help with accessing my certificate download. I completed the course 
                    but the download button is not working properly. Can you please assist?
                  </p>
                </div>

                <div className="border-t pt-4">
                  <div className="flex gap-2 mb-4">
                    <Button variant="outline" size="sm">
                      <Phone className="h-4 w-4 mr-2" />
                      Call
                    </Button>
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4 mr-2" />
                      Add Note
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Reply</label>
                    <textarea
                      className="w-full p-3 rounded-md border min-h-[100px]"
                      placeholder="Type your reply..."
                    />
                  </div>
                </div>

                <div className="flex justify-between">
                  <Select defaultValue={selectedTicket.status}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="open">Open</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setSelectedTicket(null)}>
                      Cancel
                    </Button>
                    <Button onClick={() => {
                      setSelectedTicket(null);
                      toast.success("Reply sent successfully");
                    }}>
                      <Send className="h-4 w-4 mr-2" />
                      Send Reply
                    </Button>
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
