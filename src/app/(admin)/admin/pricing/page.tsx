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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DollarSign,
  Plus,
  Edit,
  Trash2,
  Check,
  Star,
  Users,
  BookOpen,
  Zap,
  Crown,
} from "lucide-react";
import { toast } from "react-hot-toast";

const plans = [
  {
    id: "1",
    name: "Free",
    price: 0,
    interval: "forever",
    description: "Access to free courses and basic features",
    features: [
      "Access to free courses",
      "Basic progress tracking",
      "Community forum access",
      "Email support",
    ],
    notIncluded: [
      "Certificate issuance",
      "Priority support",
      "Offline viewing",
      "Mentorship access",
    ],
    users: 8542,
    popular: false,
    color: "border-gray-200",
  },
  {
    id: "2",
    name: "Pro",
    price: 29,
    interval: "month",
    description: "For serious learners who want the full experience",
    features: [
      "Access to all courses",
      "Certificate issuance",
      "Priority support",
      "Offline viewing",
      "Learning analytics",
      "Downloadable resources",
    ],
    notIncluded: [
      "Mentorship access",
      "Career coaching",
    ],
    users: 3245,
    popular: true,
    color: "border-brand-purple-500",
  },
  {
    id: "3",
    name: "Enterprise",
    price: 99,
    interval: "month",
    description: "For teams and organizations",
    features: [
      "Everything in Pro",
      "Unlimited team members",
      "Custom learning paths",
      "Dedicated account manager",
      "API access",
      "SSO integration",
      "Advanced analytics",
      "Priority support",
    ],
    notIncluded: [],
    users: 156,
    color: "border-brand-teal-500",
  },
];

const pricingHistory = [
  { id: "1", date: "2026-06-01", plan: "Pro", amount: 29, status: "Active" },
  { id: "2", date: "2026-05-01", plan: "Pro", amount: 29, status: "Active" },
  { id: "3", date: "2026-04-01", plan: "Pro", amount: 29, status: "Active" },
  { id: "4", date: "2026-03-01", plan: "Free", amount: 0, status: "Cancelled" },
];

export default function PricingPage() {
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<typeof plans[0] | null>(null);

  const handleEdit = (plan: typeof plans[0]) => {
    setSelectedPlan(plan);
    setShowEditDialog(true);
  };

  const handleSave = () => {
    toast.success("Plan updated successfully");
    setShowEditDialog(false);
  };

  const stats = {
    totalMRR: plans.reduce((sum, p) => sum + p.price * p.users, 0),
    activeSubscriptions: 3401,
    trialConversions: 156,
    churnRate: "2.3%",
  };

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Pricing & Plans</h1>
          <p className="text-muted-foreground">
            Manage subscription plans and pricing.
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Plan
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Monthly Recurring Revenue", value: `$${stats.totalMRR.toLocaleString()}`, icon: DollarSign },
          { label: "Active Subscriptions", value: stats.activeSubscriptions.toLocaleString(), icon: Users },
          { label: "Trial Conversions", value: stats.trialConversions, icon: Star },
          { label: "Churn Rate", value: stats.churnRate, icon: Zap },
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

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className={`relative overflow-hidden ${plan.color} border-2`}>
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-brand-purple-600 to-brand-blue-600 text-white px-4 py-1 text-sm font-medium rounded-bl-lg">
                  Most Popular
                </div>
              )}
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl flex items-center gap-2">
                    {plan.name === "Enterprise" && <Crown className="h-5 w-5 text-brand-teal-600" />}
                    {plan.name}
                  </CardTitle>
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(plan)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className="text-muted-foreground">/{plan.interval}</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-6">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-600" />
                      <span>{feature}</span>
                    </div>
                  ))}
                  {plan.notIncluded.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="h-4 w-4 flex items-center justify-center">×</span>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-4 border-t">
                  <span className="text-sm text-muted-foreground">
                    <Users className="h-4 w-4 inline mr-1" />
                    {plan.users.toLocaleString()} subscribers
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Pricing History */}
      <Card>
        <CardHeader>
          <CardTitle>Pricing History</CardTitle>
          <CardDescription>
            Recent subscription changes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Date</th>
                  <th className="text-left py-3 px-4 font-medium">Plan</th>
                  <th className="text-left py-3 px-4 font-medium">Amount</th>
                  <th className="text-left py-3 px-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {pricingHistory.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="py-3 px-4">{item.date}</td>
                    <td className="py-3 px-4">
                      <Badge variant="outline">{item.plan}</Badge>
                    </td>
                    <td className="py-3 px-4">${item.amount}</td>
                    <td className="py-3 px-4">
                      <Badge
                        variant={item.status === "Active" ? "default" : "secondary"}
                      >
                        {item.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Plan</DialogTitle>
            <DialogDescription>
              Update pricing for {selectedPlan?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Plan Name</label>
              <Input defaultValue={selectedPlan?.name} className="mt-1" />
            </div>
            <div>
              <label className="text-sm font-medium">Price (USD)</label>
              <Input type="number" defaultValue={selectedPlan?.price} className="mt-1" />
            </div>
            <div>
              <label className="text-sm font-medium">Billing Interval</label>
              <select className="w-full p-2 mt-1 rounded-md border bg-background">
                <option value="month">Monthly</option>
                <option value="year">Yearly</option>
                <option value="forever">One-time</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Description</label>
              <Input defaultValue={selectedPlan?.description} className="mt-1" />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowEditDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave}>Save Changes</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
