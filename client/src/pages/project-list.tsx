import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, MoreVertical, Play, FileEdit, Trash2, Download } from "lucide-react";
import { useLocation } from "wouter";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";

const projects = [
  {
    id: 1,
    title: "Compliance Training 2024",
    date: "2024-11-01",
    status: "Post-Editing",
    statusColor: "bg-blue-100 text-blue-700",
    languages: ["JA", "EN"],
  },
  {
    id: 2,
    title: "Product Demo (Sales)",
    date: "2024-10-15",
    status: "Completed",
    statusColor: "bg-green-100 text-green-700",
    languages: ["JA", "ZH"],
  },
  {
    id: 3,
    title: "Onboarding Materials",
    date: "2024-10-10",
    status: "Processing",
    statusColor: "bg-yellow-100 text-yellow-700",
    languages: ["JA"],
  },
  {
    id: 4,
    title: "Q4 Financial Report",
    date: "2024-09-28",
    status: "Draft",
    statusColor: "bg-gray-100 text-gray-700",
    languages: ["EN"],
  },
];

export default function ProjectListPage() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gray-50/50">
      <header className="bg-white border-b sticky top-0 z-20">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-bold text-xl text-primary flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-primary text-white flex items-center justify-center text-sm">IG</div>
            <span>My Dashboard</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-gray-200" />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input placeholder="Search projects..." className="pl-10 bg-white" />
          </div>
          <Button onClick={() => setLocation("/create")} className="bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20">
            <Plus className="w-4 h-4 mr-2" />
            Create New Material
          </Button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50/50 hover:bg-gray-50/50">
                <TableHead className="w-[400px]">Project Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Languages</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project, index) => (
                <motion.tr
                  key={project.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group hover:bg-gray-50/30 transition-colors"
                >
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center text-primary">
                        <Play className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{project.title}</div>
                        <div className="text-xs text-gray-500">ID: {project.id}00234</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={`${project.statusColor} border-0`}>
                      {project.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {project.languages.map(lang => (
                        <span key={lang} className="px-1.5 py-0.5 rounded bg-gray-100 text-xs font-mono text-gray-600 border border-gray-200">
                          {lang}
                        </span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-500 text-sm">{project.date}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setLocation(`/workspace/${project.id}`)}>
                        <FileEdit className="w-4 h-4 text-gray-500 hover:text-primary" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Download className="w-4 h-4 text-gray-500 hover:text-primary" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="w-4 h-4 text-gray-500" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Duplicate</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  );
}
