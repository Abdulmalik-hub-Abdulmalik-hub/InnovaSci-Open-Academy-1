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
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Settings,
  Globe,
  Mail,
  Shield,
  Palette,
  Database,
  Key,
  Bell,
  Save,
  Upload,
  Building,
  MapPin,
  Phone,
} from "lucide-react";
import { toast } from "react-hot-toast";

export default function AdminSettingsPage() {
  const [generalSettings, setGeneralSettings] = useState({
    siteName: "InnovaSci Open Academy",
    siteDescription: "Democratizing high-quality scientific education",
    contactEmail: "support@innovasci.com",
    maintenanceMode: false,
    allowRegistrations: true,
  });

  const [emailSettings, setEmailSettings] = useState({
    smtpHost: "smtp.resend.com",
    smtpPort: "587",
    smtpUser: "resend",
    smtpFrom: "InnovaSci Open Academy <noreply@innovasci.com>",
  });

  const handleSave = (section: string) => {
    toast.success(`${section} settings saved successfully`);
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your platform settings and configurations.
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general" className="gap-2">
            <Globe className="h-4 w-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="email" className="gap-2">
            <Mail className="h-4 w-4" />
            Email
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2">
            <Shield className="h-4 w-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="appearance" className="gap-2">
            <Palette className="h-4 w-4" />
            Appearance
          </TabsTrigger>
          <TabsTrigger value="integrations" className="gap-2">
            <Key className="h-4 w-4" />
            Integrations
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Site Information
                </CardTitle>
                <CardDescription>
                  Basic information about your platform
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input
                    id="siteName"
                    value={generalSettings.siteName}
                    onChange={(e) =>
                      setGeneralSettings({ ...generalSettings, siteName: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="siteDescription">Site Description</Label>
                  <Input
                    id="siteDescription"
                    value={generalSettings.siteDescription}
                    onChange={(e) =>
                      setGeneralSettings({ ...generalSettings, siteDescription: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Contact Email</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={generalSettings.contactEmail}
                    onChange={(e) =>
                      setGeneralSettings({ ...generalSettings, contactEmail: e.target.value })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Maintenance Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Temporarily disable the site
                    </p>
                  </div>
                  <Switch
                    checked={generalSettings.maintenanceMode}
                    onCheckedChange={(checked) =>
                      setGeneralSettings({ ...generalSettings, maintenanceMode: checked })
                    }
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Allow Registrations</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow new users to sign up
                    </p>
                  </div>
                  <Switch
                    checked={generalSettings.allowRegistrations}
                    onCheckedChange={(checked) =>
                      setGeneralSettings({ ...generalSettings, allowRegistrations: checked })
                    }
                  />
                </div>
                <Button onClick={() => handleSave("General")}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Company Information
                </CardTitle>
                <CardDescription>
                  Your company details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Company Name</Label>
                  <Input defaultValue="InnovaSci AI Labs" />
                </div>
                <div className="space-y-2">
                  <Label>Address</Label>
                  <Input defaultValue="123 Tech Avenue" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>City</Label>
                    <Input defaultValue="San Francisco" />
                  </div>
                  <div className="space-y-2">
                    <Label>State</Label>
                    <Input defaultValue="CA" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Zip Code</Label>
                    <Input defaultValue="94105" />
                  </div>
                  <div className="space-y-2">
                    <Label>Country</Label>
                    <Input defaultValue="United States" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Phone Number</Label>
                  <Input defaultValue="+1 (555) 123-4567" />
                </div>
                <Button onClick={() => handleSave("Company")}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Email Configuration
              </CardTitle>
              <CardDescription>
                Configure your email sending settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="smtpHost">SMTP Host</Label>
                  <Input
                    id="smtpHost"
                    value={emailSettings.smtpHost}
                    onChange={(e) =>
                      setEmailSettings({ ...emailSettings, smtpHost: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtpPort">SMTP Port</Label>
                  <Input
                    id="smtpPort"
                    value={emailSettings.smtpPort}
                    onChange={(e) =>
                      setEmailSettings({ ...emailSettings, smtpPort: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="smtpUser">SMTP Username</Label>
                <Input
                  id="smtpUser"
                  value={emailSettings.smtpUser}
                  onChange={(e) =>
                    setEmailSettings({ ...emailSettings, smtpUser: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="smtpPassword">SMTP Password</Label>
                <Input id="smtpPassword" type="password" placeholder="Enter password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="smtpFrom">From Address</Label>
                <Input
                  id="smtpFrom"
                  value={emailSettings.smtpFrom}
                  onChange={(e) =>
                    setEmailSettings({ ...emailSettings, smtpFrom: e.target.value })
                  }
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline">Send Test Email</Button>
                <Button onClick={() => handleSave("Email")}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security Settings
              </CardTitle>
              <CardDescription>
                Configure security and authentication settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">
                    Require 2FA for all admin users
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label>Session Timeout</Label>
                  <p className="text-sm text-muted-foreground">
                    Auto logout after inactivity
                  </p>
                </div>
                <Input className="w-[100px]" defaultValue="30" type="number" /> minutes
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label>Password Requirements</Label>
                  <p className="text-sm text-muted-foreground">
                    Enforce strong password policies
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label>Login Rate Limiting</Label>
                  <p className="text-sm text-muted-foreground">
                    Prevent brute force attacks
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Button onClick={() => handleSave("Security")}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Appearance Settings
              </CardTitle>
              <CardDescription>
                Customize the look and feel of your platform
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Logo Upload</Label>
                <div className="border-2 border-dashed rounded-lg p-6 text-center">
                  <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Upload your logo (PNG, JPG, SVG)
                  </p>
                  <Button variant="outline" className="mt-2">
                    Upload Logo
                  </Button>
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <Label>Favicon Upload</Label>
                <div className="border-2 border-dashed rounded-lg p-6 text-center">
                  <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Upload favicon (16x16, 32x32, ico)
                  </p>
                  <Button variant="outline" className="mt-2">
                    Upload Favicon
                  </Button>
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <Label>Primary Color</Label>
                <div className="flex gap-2">
                  <Input type="color" defaultValue="#7c3aed" className="w-[60px]" />
                  <Input defaultValue="#7c3aed" className="flex-1" />
                </div>
              </div>
              <Button onClick={() => handleSave("Appearance")}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { name: "Supabase", description: "Database and authentication", connected: true },
              { name: "Stripe", description: "Payment processing", connected: true },
              { name: "Resend", description: "Email delivery", connected: true },
              { name: "Cloudflare", description: "CDN and security", connected: false },
              { name: "Paystack", description: "African payment processing", connected: false },
              { name: "Flutterwave", description: "African payment processing", connected: false },
            ].map((integration) => (
              <Card key={integration.name}>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>{integration.name}</CardTitle>
                    <CardDescription>{integration.description}</CardDescription>
                  </div>
                  <Button
                    variant={integration.connected ? "outline" : "default"}
                  >
                    {integration.connected ? "Configure" : "Connect"}
                  </Button>
                </CardHeader>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
