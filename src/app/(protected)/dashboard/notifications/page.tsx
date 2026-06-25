"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Bell,
  BookOpen,
  Award,
  MessageSquare,
  CheckCircle,
  Trash2,
  Check,
  Mail,
  Settings,
  AlertCircle,
  Clock,
} from "lucide-react";
import { toast } from "react-hot-toast";

const notifications = [
  {
    id: "1",
    type: "course",
    title: "New Lesson Available",
    message: "A new lesson 'Quantum Mechanics Basics' has been added to Computational Chemistry.",
    course: "Introduction to Computational Chemistry",
    timestamp: "2 hours ago",
    read: false,
    icon: BookOpen,
    color: "text-brand-purple-600 bg-brand-purple-500/20",
  },
  {
    id: "2",
    type: "certificate",
    title: "Certificate Earned!",
    message: "Congratulations! You've earned a certificate for 'Python Programming Basics'.",
    course: "Python Programming Basics",
    timestamp: "1 day ago",
    read: false,
    icon: Award,
    color: "text-yellow-600 bg-yellow-500/20",
  },
  {
    id: "3",
    type: "reminder",
    title: "Learning Reminder",
    message: "It's been a while since you last studied. Continue where you left off!",
    course: "Machine Learning for Scientists",
    timestamp: "2 days ago",
    read: true,
    icon: Clock,
    color: "text-brand-blue-600 bg-brand-blue-500/20",
  },
  {
    id: "4",
    type: "course",
    title: "Course Completed",
    message: "You've completed 'Data Analysis with R'. Great job!",
    course: "Data Analysis with R",
    timestamp: "3 days ago",
    read: true,
    icon: CheckCircle,
    color: "text-green-600 bg-green-500/20",
  },
  {
    id: "5",
    type: "announcement",
    title: "New Course Announcement",
    message: "A new course 'Advanced AI for Science' is now available!",
    course: "Advanced AI for Science",
    timestamp: "4 days ago",
    read: true,
    icon: MessageSquare,
    color: "text-brand-teal-600 bg-brand-teal-500/20",
  },
  {
    id: "6",
    type: "system",
    title: "Profile Updated",
    message: "Your profile information has been successfully updated.",
    timestamp: "5 days ago",
    read: true,
    icon: Settings,
    color: "text-gray-600 bg-gray-500/20",
  },
];

export default function NotificationsPage() {
  const [notifs, setNotifs] = useState(notifications);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const unreadCount = notifs.filter((n) => !n.read).length;
  
  const filteredNotifs = notifs.filter((n) => 
    filter === "all" || (filter === "unread" && !n.read)
  );

  const markAsRead = (id: string) => {
    setNotifs(notifs.map((n) => (n.id === id ? { ...n, read: true } : n)));
    toast.success("Marked as read");
  };

  const markAllAsRead = () => {
    setNotifs(notifs.map((n) => ({ ...n, read: true })));
    toast.success("All notifications marked as read");
  };

  const deleteNotification = (id: string) => {
    setNotifs(notifs.filter((n) => n.id !== id));
    toast.success("Notification deleted");
  };

  const clearAll = () => {
    setNotifs([]);
    toast.success("All notifications cleared");
  };

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Notifications</h1>
          <p className="text-muted-foreground">
            Stay updated with your learning activities.
          </p>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" onClick={markAllAsRead}>
            <Check className="h-4 w-4 mr-2" />
            Mark All as Read
          </Button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="h-12 w-12 rounded-lg bg-brand-purple-500/20 flex items-center justify-center">
              <Bell className="h-6 w-6 text-brand-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{notifs.length}</p>
              <p className="text-sm text-muted-foreground">Total Notifications</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="h-12 w-12 rounded-lg bg-red-500/20 flex items-center justify-center">
              <AlertCircle className="h-6 w-6 text-red-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{unreadCount}</p>
              <p className="text-sm text-muted-foreground">Unread</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="h-12 w-12 rounded-lg bg-green-500/20 flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{notifs.length - unreadCount}</p>
              <p className="text-sm text-muted-foreground">Read</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all" className="space-y-6">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger
              value="all"
              onClick={() => setFilter("all")}
              className="gap-2"
            >
              All
              <Badge variant="secondary">{notifs.length}</Badge>
            </TabsTrigger>
            <TabsTrigger
              value="unread"
              onClick={() => setFilter("unread")}
              className="gap-2"
            >
              Unread
              {unreadCount > 0 && (
                <Badge variant="destructive">{unreadCount}</Badge>
              )}
            </TabsTrigger>
          </TabsList>
          <Button variant="ghost" size="sm" onClick={clearAll}>
            <Trash2 className="h-4 w-4 mr-2" />
            Clear All
          </Button>
        </div>

        <TabsContent value="all" className="space-y-4">
          {filteredNotifs.length > 0 ? (
            filteredNotifs.map((notification, index) => {
              const Icon = notification.icon;
              return (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className={notification.read ? "" : "border-l-4 border-l-primary"}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className={`h-10 w-10 rounded-lg flex items-center justify-center flex-shrink-0 ${notification.color}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className={`font-semibold ${!notification.read ? "text-foreground" : "text-muted-foreground"}`}>
                                  {notification.title}
                                </h4>
                                {!notification.read && (
                                  <Badge variant="default" className="h-2 w-2 p-0 rounded-full" />
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground mb-1">
                                {notification.message}
                              </p>
                              {notification.course && (
                                <p className="text-xs text-muted-foreground">
                                  Course: {notification.course}
                                </p>
                              )}
                              <p className="text-xs text-muted-foreground mt-1">
                                {notification.timestamp}
                              </p>
                            </div>
                            <div className="flex items-center gap-2 flex-shrink-0">
                              {!notification.read && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => markAsRead(notification.id)}
                                >
                                  <Check className="h-4 w-4" />
                                </Button>
                              )}
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => deleteNotification(notification.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })
          ) : (
            <div className="text-center py-12">
              <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No notifications</h3>
              <p className="text-muted-foreground">
                {filter === "unread" 
                  ? "All notifications have been read."
                  : "You're all caught up!"}
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="unread" className="space-y-4">
          {filteredNotifs.length > 0 ? (
            filteredNotifs.map((notification, index) => {
              const Icon = notification.icon;
              return (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="border-l-4 border-l-primary">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className={`h-10 w-10 rounded-lg flex items-center justify-center flex-shrink-0 ${notification.color}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-semibold">{notification.title}</h4>
                                <Badge variant="default" className="h-2 w-2 p-0 rounded-full" />
                              </div>
                              <p className="text-sm text-muted-foreground mb-1">
                                {notification.message}
                              </p>
                              {notification.course && (
                                <p className="text-xs text-muted-foreground">
                                  Course: {notification.course}
                                </p>
                              )}
                              <p className="text-xs text-muted-foreground mt-1">
                                {notification.timestamp}
                              </p>
                            </div>
                            <div className="flex items-center gap-2 flex-shrink-0">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => markAsRead(notification.id)}
                              >
                                <Check className="h-4 w-4 mr-1" />
                                Mark Read
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => deleteNotification(notification.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })
          ) : (
            <div className="text-center py-12">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">All caught up!</h3>
              <p className="text-muted-foreground">
                You have no unread notifications.
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
