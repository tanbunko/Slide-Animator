import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { FileUploader } from "@/components/ichi-geki/FileUploader";
import { ArrowLeft, Check, ChevronRight } from "lucide-react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";

export default function CreateProjectPage() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState(1);
  const [file, setFile] = useState<File | null>(null);

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    // Auto advance after a brief pause
    setTimeout(() => setStep(2), 500);
  };

  const handleCreate = () => {
    // Simulate creation
    setLocation("/workspace/new");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b sticky top-0 z-20">
        <div className="container mx-auto px-6 h-16 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => setLocation("/dashboard")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="font-semibold text-lg">Create Translation Material</div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-6 py-8 max-w-4xl">
        <div className="mb-8">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-gray-200 -z-10" />
            
            <div className={`flex items-center gap-3 bg-gray-50 pr-4 ${step >= 1 ? 'text-primary' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 1 ? 'bg-primary text-white border-primary' : 'bg-white border-gray-300'}`}>
                1
              </div>
              <span className="font-medium">Upload File</span>
            </div>

            <div className={`flex items-center gap-3 bg-gray-50 pl-4 ${step >= 2 ? 'text-primary' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 2 ? 'bg-primary text-white border-primary' : 'bg-white border-gray-300'}`}>
                2
              </div>
              <span className="font-medium">Material Settings</span>
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <Card className="border-0 shadow-sm">
                <CardContent className="pt-6">
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">Step 1: Upload File</h2>
                    <p className="text-gray-500 text-sm">Drag and drop your PowerPoint (PPT/PPTX) or PDF file here.</p>
                  </div>
                  <FileUploader onFileSelect={handleFileSelect} />
                </CardContent>
              </Card>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Card className="border-0 shadow-sm">
                <CardContent className="pt-6 space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-2">Step 2: Material Settings</h2>
                    <p className="text-gray-500 text-sm mb-6">Configure how you want to generate your animation materials.</p>
                  </div>

                  <div className="grid gap-6">
                    <div className="space-y-2">
                      <Label>Video Title</Label>
                      <Input placeholder="e.g., Compliance Training 2024" defaultValue={file?.name?.split('.')[0]} />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label>Source Language</Label>
                        <Select defaultValue="ja">
                          <SelectTrigger>
                            <SelectValue placeholder="Select language" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ja">Japanese</SelectItem>
                            <SelectItem value="en">English</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Video Template</Label>
                        <Select defaultValue="business">
                          <SelectTrigger>
                            <SelectValue placeholder="Select template" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="business">Business</SelectItem>
                            <SelectItem value="creative">Creative</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Voice Style</Label>
                      <Select defaultValue="female-a">
                        <SelectTrigger>
                          <SelectValue placeholder="Select voice" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="female-a">Female A (Professional)</SelectItem>
                          <SelectItem value="male-a">Male A (Narrator)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 pt-4 border-t">
                      <div className="space-y-2">
                        <Label className="text-xs uppercase tracking-wider text-gray-500">Target Subtitles</Label>
                        <Select defaultValue="en">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="zh">Chinese</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-xs uppercase tracking-wider text-gray-500">Target Audio</Label>
                         <Select defaultValue="en">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="zh">Chinese</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-xs uppercase tracking-wider text-gray-500">Target Material</Label>
                         <Select defaultValue="en">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="zh">Chinese</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-6">
                    <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
                    <Button onClick={handleCreate} className="bg-primary hover:bg-primary/90 min-w-[150px]">
                      Create Material
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
