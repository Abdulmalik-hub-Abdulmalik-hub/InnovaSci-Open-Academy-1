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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Database,
  Search,
  Download,
  Copy,
  Eye,
  Table2,
  FileJson,
  FileSpreadsheet,
  RefreshCw,
  AlertCircle,
  Key,
  Link,
} from "lucide-react";
import { toast } from "react-hot-toast";

const tables = [
  { name: "profiles", rows: 12458, size: "2.4 MB", lastUpdated: "2026-06-24" },
  { name: "courses", rows: 156, size: "1.2 MB", lastUpdated: "2026-06-23" },
  { name: "lessons", rows: 1248, size: "890 KB", lastUpdated: "2026-06-23" },
  { name: "enrollments", rows: 45231, size: "4.5 MB", lastUpdated: "2026-06-24" },
  { name: "certificates", rows: 3892, size: "1.8 MB", lastUpdated: "2026-06-22" },
  { name: "payments", rows: 8745, size: "3.2 MB", lastUpdated: "2026-06-24" },
  { name: "notifications", rows: 34567, size: "5.1 MB", lastUpdated: "2026-06-24" },
  { name: "wishlists", rows: 8765, size: "1.1 MB", lastUpdated: "2026-06-23" },
  { name: "learning_progress", rows: 156789, size: "12.4 MB", lastUpdated: "2026-06-24" },
  { name: "audit_logs", rows: 234567, size: "18.9 MB", lastUpdated: "2026-06-24" },
];

const tableSchemas: Record<string, Array<{ column: string; type: string; nullable: boolean; key: string }>> = {
  profiles: [
    { column: "id", type: "uuid", nullable: false, key: "PK" },
    { column: "full_name", type: "text", nullable: true, key: "" },
    { column: "username", type: "text", nullable: true, key: "UQ" },
    { column: "email", type: "text", nullable: true, key: "" },
    { column: "phone", type: "text", nullable: true, key: "" },
    { column: "avatar_url", type: "text", nullable: true, key: "" },
    { column: "role", type: "text", nullable: false, key: "" },
    { column: "status", type: "text", nullable: false, key: "" },
    { column: "created_at", type: "timestamptz", nullable: false, key: "" },
    { column: "updated_at", type: "timestamptz", nullable: false, key: "" },
  ],
  courses: [
    { column: "id", type: "uuid", nullable: false, key: "PK" },
    { column: "title", type: "text", nullable: false, key: "" },
    { column: "slug", type: "text", nullable: false, key: "UQ" },
    { column: "code", type: "text", nullable: true, key: "UQ" },
    { column: "category", type: "text", nullable: true, key: "" },
    { column: "price", type: "numeric", nullable: false, key: "" },
    { column: "is_free", type: "boolean", nullable: false, key: "" },
    { column: "status", type: "text", nullable: false, key: "" },
    { column: "instructor_id", type: "uuid", nullable: true, key: "FK" },
    { column: "created_at", type: "timestamptz", nullable: false, key: "" },
  ],
};

const sampleData = {
  profiles: [
    { id: "uuid-1", full_name: "Sarah Chen", username: "sarahc", role: "STUDENT", status: "ACTIVE" },
    { id: "uuid-2", full_name: "Michael Rodriguez", username: "michaelr", role: "STUDENT", status: "ACTIVE" },
    { id: "uuid-3", full_name: "Emily Zhang", username: "emilyz", role: "INSTRUCTOR", status: "ACTIVE" },
  ],
  courses: [
    { id: "uuid-4", title: "Introduction to Python", slug: "intro-python", status: "PUBLISHED", price: 0 },
    { id: "uuid-5", title: "Machine Learning Basics", slug: "ml-basics", status: "PUBLISHED", price: 49.99 },
    { id: "uuid-6", title: "Data Science Fundamentals", slug: "ds-fundamentals", status: "DRAFT", price: 79.99 },
  ],
};

export default function DatabasePage() {
  const [selectedTable, setSelectedTable] = useState<string>("profiles");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"schema" | "data">("schema");

  const filteredTables = tables.filter((table) =>
    table.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleExport = (format: string) => {
    toast.success(`Exporting ${selectedTable} as ${format}...`);
  };

  const handleCopyQuery = () => {
    navigator.clipboard.writeText(`SELECT * FROM ${selectedTable};`);
    toast.success("Query copied to clipboard");
  };

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Database Explorer</h1>
          <p className="text-muted-foreground">
            View and manage your database tables.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => handleExport("CSV")}>
            <FileSpreadsheet className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
          <Button variant="outline" onClick={() => handleExport("JSON")}>
            <FileJson className="h-4 w-4 mr-2" />
            Export JSON
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Tables", value: tables.length },
          { label: "Total Rows", value: tables.reduce((sum, t) => sum + t.rows, 0).toLocaleString() },
          { label: "Storage Used", value: "52.5 MB" },
          { label: "Last Backup", value: "2 hours ago" },
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
                  <Database className="h-6 w-6 text-brand-purple-600" />
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

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Tables Sidebar */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Tables</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search tables..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="max-h-[500px] overflow-y-auto">
              {filteredTables.map((table) => (
                <button
                  key={table.name}
                  onClick={() => setSelectedTable(table.name)}
                  className={`w-full px-4 py-3 text-left hover:bg-muted transition-colors flex items-center justify-between ${
                    selectedTable === table.name ? "bg-primary/10 text-primary" : ""
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Table2 className="h-4 w-4" />
                    <span className="font-medium">{table.name}</span>
                  </div>
                  <Badge variant="secondary">{table.rows.toLocaleString()}</Badge>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Table Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Table Info */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5" />
                    {selectedTable}
                  </CardTitle>
                  <CardDescription>
                    {tables.find((t) => t.name === selectedTable)?.rows.toLocaleString()} rows •{" "}
                    {tables.find((t) => t.name === selectedTable)?.size} • Last updated:{" "}
                    {tables.find((t) => t.name === selectedTable)?.lastUpdated}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleCopyQuery}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Query
                  </Button>
                  <Button variant="outline" size="sm">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* View Toggle */}
          <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as "schema" | "data")}>
            <TabsList>
              <TabsTrigger value="schema" className="gap-2">
                <Table2 className="h-4 w-4" />
                Schema
              </TabsTrigger>
              <TabsTrigger value="data" className="gap-2">
                <Database className="h-4 w-4" />
                Data
              </TabsTrigger>
            </TabsList>

            <TabsContent value="schema" className="mt-6">
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Column</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Nullable</TableHead>
                        <TableHead>Key</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {(tableSchemas[selectedTable] || tableSchemas.profiles).map((col) => (
                        <TableRow key={col.column}>
                          <TableCell className="font-mono">{col.column}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{col.type}</Badge>
                          </TableCell>
                          <TableCell>
                            {col.nullable ? (
                              <span className="text-green-600">YES</span>
                            ) : (
                              <span className="text-red-600">NO</span>
                            )}
                          </TableCell>
                          <TableCell>
                            {col.key && (
                              <div className="flex gap-1">
                                {col.key.includes("PK") && (
                                  <Badge variant="default">
                                    <Key className="h-3 w-3 mr-1" />
                                    PK
                                  </Badge>
                                )}
                                {col.key.includes("FK") && (
                                  <Badge variant="secondary">
                                    <Link className="h-3 w-3 mr-1" />
                                    FK
                                  </Badge>
                                )}
                                {col.key.includes("UQ") && (
                                  <Badge variant="outline">UQ</Badge>
                                )}
                              </div>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="data" className="mt-6">
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        {(sampleData[selectedTable as keyof typeof sampleData]?.[0] || 
                          sampleData.profiles[0]) && 
                          Object.keys(
                            sampleData[selectedTable as keyof typeof sampleData]?.[0] || sampleData.profiles[0]
                          ).map((col) => (
                            <TableHead key={col}>{col}</TableHead>
                          ))
                        }
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {(sampleData[selectedTable as keyof typeof sampleData] || sampleData.profiles).map(
                        (row, idx) => (
                          <TableRow key={idx}>
                            {Object.values(row).map((val, i) => (
                              <TableCell key={i} className="font-mono text-sm">
                                {String(val)}
                              </TableCell>
                            ))}
                          </TableRow>
                        )
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* SQL Query */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">SQL Query</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted rounded-lg p-4 font-mono text-sm">
                <code>SELECT * FROM {selectedTable} LIMIT 100;</code>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
