"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/components/providers/auth-provider";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Globe,
  Linkedin,
  Github,
  Twitter,
  Save,
  Camera,
  Shield,
  Bell,
  Key,
  Smartphone,
} from "lucide-react";
import { toast } from "react-hot-toast";

const countries = [
  "United States", "United Kingdom", "Canada", "Australia", "Germany",
  "France", "India", "China", "Japan", "South Korea", "Brazil", "Mexico",
  "Spain", "Italy", "Netherlands", "Singapore", "Other"
];

const genders = ["Male", "Female", "Non-binary", "Prefer not to say", "Other"];

export default function ProfilePage() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  
  const [profile, setProfile] = useState({
    fullName: user?.user_metadata?.full_name || "",
    username: user?.user_metadata?.username || "",
    email: user?.email || "",
    phone: user?.user_metadata?.phone || "",
    bio: user?.user_metadata?.bio || "",
    country: user?.user_metadata?.country || "",
    state: user?.user_metadata?.state || "",
    city: user?.user_metadata?.city || "",
    gender: user?.user_metadata?.gender || "",
    linkedin: user?.user_metadata?.social_links?.linkedin || "",
    github: user?.user_metadata?.social_links?.github || "",
    twitter: user?.user_metadata?.social_links?.twitter || "",
    academicInterests: user?.user_metadata?.academic_interests || "",
  });

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  const getUserInitials = () => {
    const name = profile.fullName || profile.email || "U";
    return name
      .split(" ")
      .map((n: string) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Profile Settings</h1>
        <p className="text-muted-foreground">
          Manage your profile information and preferences.
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile" className="gap-2">
            <User className="h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2">
            <Shield className="h-4 w-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>Profile Photo</CardTitle>
                <CardDescription>
                  Update your profile picture
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <div className="relative mb-4">
                  <Avatar className="h-32 w-32">
                    <AvatarImage src={user?.user_metadata?.avatar_url} />
                    <AvatarFallback className="text-2xl bg-gradient-to-br from-brand-purple-500 to-brand-blue-500 text-white">
                      {getUserInitials()}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="absolute bottom-0 right-0 rounded-full"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground text-center">
                  JPG, PNG or GIF. Max size 2MB.
                </p>
              </CardContent>
            </Card>

            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>
                    Update your personal details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        value={profile.fullName}
                        onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        value={profile.username}
                        onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                        placeholder="Choose a username"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      disabled
                    />
                    <p className="text-xs text-muted-foreground">
                      Contact support to change your email address
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={profile.phone}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="gender">Gender</Label>
                      <Select
                        value={profile.gender}
                        onValueChange={(value) => setProfile({ ...profile, gender: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          {genders.map((g) => (
                            <SelectItem key={g} value={g.toLowerCase()}>
                              {g}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={profile.bio}
                      onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                      placeholder="Tell us about yourself..."
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Location</CardTitle>
                  <CardDescription>
                    Your location helps us personalize your experience
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <Select
                        value={profile.country}
                        onValueChange={(value) => setProfile({ ...profile, country: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          {countries.map((c) => (
                            <SelectItem key={c} value={c.toLowerCase()}>
                              {c}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State/Province</Label>
                      <Input
                        id="state"
                        value={profile.state}
                        onChange={(e) => setProfile({ ...profile, state: e.target.value })}
                        placeholder="State or province"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={profile.city}
                        onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                        placeholder="City"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Academic Interests</CardTitle>
                  <CardDescription>
                    Help us recommend relevant courses
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="academicInterests">Areas of Interest</Label>
                    <Textarea
                      id="academicInterests"
                      value={profile.academicInterests}
                      onChange={(e) => setProfile({ ...profile, academicInterests: e.target.value })}
                      placeholder="e.g., Computational Chemistry, Machine Learning, Drug Discovery..."
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Social Links</CardTitle>
                  <CardDescription>
                    Connect your professional profiles
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="linkedin" className="flex items-center gap-2">
                      <Linkedin className="h-4 w-4" /> LinkedIn
                    </Label>
                    <Input
                      id="linkedin"
                      value={profile.linkedin}
                      onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })}
                      placeholder="https://linkedin.com/in/username"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="github" className="flex items-center gap-2">
                      <Github className="h-4 w-4" /> GitHub
                    </Label>
                    <Input
                      id="github"
                      value={profile.github}
                      onChange={(e) => setProfile({ ...profile, github: e.target.value })}
                      placeholder="https://github.com/username"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="twitter" className="flex items-center gap-2">
                      <Twitter className="h-4 w-4" /> Twitter
                    </Label>
                    <Input
                      id="twitter"
                      value={profile.twitter}
                      onChange={(e) => setProfile({ ...profile, twitter: e.target.value })}
                      placeholder="https://twitter.com/username"
                    />
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end">
                <Button onClick={handleSave} disabled={isLoading}>
                  <Save className="h-4 w-4 mr-2" />
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="security">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="h-5 w-5" />
                  Change Password
                </CardTitle>
                <CardDescription>
                  Update your password to keep your account secure
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input id="currentPassword" type="password" placeholder="Enter current password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" placeholder="Enter new password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input id="confirmPassword" type="password" placeholder="Confirm new password" />
                </div>
                <Button>Update Password</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5" />
                  Two-Factor Authentication
                </CardTitle>
                <CardDescription>
                  Add an extra layer of security to your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-brand-purple-500/20 flex items-center justify-center">
                      <Smartphone className="h-5 w-5 text-brand-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium">Authenticator App</p>
                      <p className="text-sm text-muted-foreground">
                        Use an app like Google Authenticator
                      </p>
                    </div>
                  </div>
                  <Badge>Not Enabled</Badge>
                </div>
                <Button variant="outline" className="w-full">
                  Enable 2FA
                </Button>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Active Sessions</CardTitle>
                <CardDescription>
                  Manage your active sessions across devices
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { device: "Chrome on MacOS", location: "San Francisco, CA", current: true },
                    { device: "Safari on iPhone", location: "San Francisco, CA", current: false },
                    { device: "Firefox on Windows", location: "New York, NY", current: false },
                  ].map((session, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg border">
                      <div>
                        <p className="font-medium flex items-center gap-2">
                          {session.device}
                          {session.current && (
                            <Badge variant="secondary">Current Session</Badge>
                          )}
                        </p>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {session.location}
                        </p>
                      </div>
                      {!session.current && (
                        <Button variant="ghost" size="sm">
                          Revoke
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Choose what notifications you want to receive
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                {
                  title: "Course Updates",
                  description: "Get notified when your enrolled courses are updated",
                  enabled: true,
                },
                {
                  title: "New Course Announcements",
                  description: "Be the first to know about new course releases",
                  enabled: true,
                },
                {
                  title: "Learning Reminders",
                  description: "Receive reminders to continue learning",
                  enabled: true,
                },
                {
                  title: "Certificate Issued",
                  description: "Get notified when you earn a new certificate",
                  enabled: true,
                },
                {
                  title: "Marketing Emails",
                  description: "Receive promotional and marketing communications",
                  enabled: false,
                },
                {
                  title: "Weekly Progress Report",
                  description: "Get a weekly summary of your learning progress",
                  enabled: false,
                },
              ].map((notification, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg border">
                  <div>
                    <p className="font-medium">{notification.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {notification.description}
                    </p>
                  </div>
                  <Button
                    variant={notification.enabled ? "default" : "outline"}
                    size="sm"
                  >
                    {notification.enabled ? "Enabled" : "Disabled"}
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
