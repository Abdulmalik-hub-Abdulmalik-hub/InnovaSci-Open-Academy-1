"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Settings,
  User,
  Bell,
  Palette,
  Globe,
  Shield,
  Key,
  Database,
  Moon,
  Sun,
  Monitor,
  Languages,
  Eye,
  EyeOff,
  Download,
  Trash2,
  AlertTriangle,
} from "lucide-react";
import { toast } from "react-hot-toast";

export default function SettingsPage() {
  const [theme, setTheme] = useState("system");
  const [language, setLanguage] = useState("en");
  const [compactMode, setCompactMode] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const preferences = [
    {
      id: "email_notifications",
      label: "Email Notifications",
      description: "Receive notifications via email",
      enabled: true,
    },
    {
      id: "push_notifications",
      label: "Push Notifications",
      description: "Receive push notifications in browser",
      enabled: false,
    },
    {
      id: "course_updates",
      label: "Course Updates",
      description: "Get notified when courses you follow are updated",
      enabled: true,
    },
    {
      id: "marketing_emails",
      label: "Marketing Emails",
      description: "Receive promotional and marketing emails",
      enabled: false,
    },
    {
      id: "weekly_digest",
      label: "Weekly Digest",
      description: "Get a weekly summary of your learning progress",
      enabled: true,
    },
  ];

  const [settings, setSettings] = useState(preferences);

  const toggleSetting = (id: string) => {
    setSettings(
      settings.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s))
    );
    toast.success("Setting updated");
  };

  const handleExportData = () => {
    toast.success("Your data export has been initiated. You'll receive an email when it's ready.");
  };

  const handleDeleteAccount = () => {
    toast.error("Please contact support to delete your account.");
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </div>

      <Tabs defaultValue="appearance" className="space-y-6">
        <TabsList>
          <TabsTrigger value="appearance" className="gap-2">
            <Palette className="h-4 w-4" />
            Appearance
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="privacy" className="gap-2">
            <Shield className="h-4 w-4" />
            Privacy
          </TabsTrigger>
          <TabsTrigger value="data" className="gap-2">
            <Database className="h-4 w-4" />
            Data & Storage
          </TabsTrigger>
        </TabsList>

        {/* Appearance Tab */}
        <TabsContent value="appearance">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Theme
                </CardTitle>
                <CardDescription>
                  Choose your preferred color theme
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { value: "light", label: "Light", icon: Sun },
                    { value: "dark", label: "Dark", icon: Moon },
                    { value: "system", label: "System", icon: Monitor },
                  ].map((option) => {
                    const Icon = option.icon;
                    return (
                      <button
                        key={option.value}
                        onClick={() => {
                          setTheme(option.value);
                          toast.success(`Theme changed to ${option.label}`);
                        }}
                        className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
                          theme === option.value
                            ? "border-primary bg-primary/10"
                            : "border-transparent hover:border-muted"
                        }`}
                      >
                        <Icon className="h-6 w-6" />
                        <span className="text-sm font-medium">{option.label}</span>
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Language & Region
                </CardTitle>
                <CardDescription>
                  Choose your preferred language
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <select
                    id="language"
                    value={language}
                    onChange={(e) => {
                      setLanguage(e.target.value);
                      toast.success("Language updated");
                    }}
                    className="w-full p-2 rounded-lg border bg-background"
                  >
                    <option value="en">English</option>
                    <option value="es">Español</option>
                    <option value="fr">Français</option>
                    <option value="de">Deutsch</option>
                    <option value="zh">中文</option>
                    <option value="ja">日本語</option>
                  </select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Accessibility</CardTitle>
                <CardDescription>
                  Adjust accessibility settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Compact Mode</p>
                    <p className="text-sm text-muted-foreground">
                      Use a more compact layout
                    </p>
                  </div>
                  <Switch
                    checked={compactMode}
                    onCheckedChange={setCompactMode}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Reduced Motion</p>
                    <p className="text-sm text-muted-foreground">
                      Minimize animations and transitions
                    </p>
                  </div>
                  <Switch
                    checked={reducedMotion}
                    onCheckedChange={setReducedMotion}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Control what notifications you receive
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {settings.map((setting) => (
                <div key={setting.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{setting.label}</p>
                    <p className="text-sm text-muted-foreground">
                      {setting.description}
                    </p>
                  </div>
                  <Switch
                    checked={setting.enabled}
                    onCheckedChange={() => toggleSetting(setting.id)}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Privacy Tab */}
        <TabsContent value="privacy">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Profile Visibility
                </CardTitle>
                <CardDescription>
                  Control who can see your profile
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="visibility">Profile Visibility</Label>
                  <select
                    id="visibility"
                    className="w-full p-2 rounded-lg border bg-background"
                  >
                    <option value="public">Public - Everyone can see</option>
                    <option value="registered">Registered Users Only</option>
                    <option value="private">Private - Only you</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Show Learning Activity</p>
                    <p className="text-sm text-muted-foreground">
                      Let others see your enrolled courses
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Show Certificates</p>
                    <p className="text-sm text-muted-foreground">
                      Display your earned certificates publicly
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Data Privacy
                </CardTitle>
                <CardDescription>
                  Manage your data and privacy settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Analytics Tracking</p>
                    <p className="text-sm text-muted-foreground">
                      Help us improve by sharing usage data
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Personalized Recommendations</p>
                    <p className="text-sm text-muted-foreground">
                      Get course recommendations based on your activity
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Data & Storage Tab */}
        <TabsContent value="data">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="h-5 w-5" />
                  Export Your Data
                </CardTitle>
                <CardDescription>
                  Download a copy of your data
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  You can download a copy of all your data including profile information,
                  enrolled courses, certificates, and learning progress.
                </p>
                <Button onClick={handleExportData}>
                  <Download className="h-4 w-4 mr-2" />
                  Request Data Export
                </Button>
              </CardContent>
            </Card>

            <Card className="border-destructive/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-destructive">
                  <AlertTriangle className="h-5 w-5" />
                  Danger Zone
                </CardTitle>
                <CardDescription>
                  Irreversible actions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-lg bg-destructive/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Delete Account</p>
                      <p className="text-sm text-muted-foreground">
                        Permanently delete your account and all data
                      </p>
                    </div>
                    <Button variant="destructive" onClick={handleDeleteAccount}>
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
