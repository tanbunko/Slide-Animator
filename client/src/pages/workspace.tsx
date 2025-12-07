import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Check, Download, Play, Upload, Save, FileText, Music, MonitorPlay } from "lucide-react";
import { useLocation } from "wouter";
import { Separator } from "@/components/ui/separator";

export default function WorkspacePage() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b sticky top-0 z-20">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => setLocation("/dashboard")}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <div className="font-semibold text-lg leading-none">Translation Material Workspace</div>
              <div className="text-xs text-gray-500 mt-1">Project: Compliance Training 2024</div>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={() => setLocation("/dashboard")}>
            Return to Dashboard
          </Button>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-6 py-8 grid gap-8 max-w-5xl">
        
        {/* Section 1: Subtitles */}
        <Card className="border-0 shadow-sm overflow-hidden">
          <CardHeader className="bg-gray-50/50 border-b py-4 flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-primary" />
              <CardTitle className="text-base">Subtitles</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="check-subtitles" />
              <label htmlFor="check-subtitles" className="text-sm font-medium leading-none cursor-pointer">
                Mark as Confirmed
              </label>
            </div>
          </CardHeader>
          <CardContent className="p-6 grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Original (Preview)</div>
              <div className="p-4 bg-gray-50 rounded-lg text-sm text-gray-600 h-[200px] overflow-y-auto border border-gray-100">
                ユーザー機能と管理機能についてはプロトタイプを作成し、それをベースにFPの計測を実施した。
                画面遷移
                見積手法：プロトタイプ（ユーザ機能）
                機能イメージ
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Translated (Post-Edit)</div>
              <Textarea 
                className="h-[200px] resize-none font-medium"
                defaultValue="We created a prototype for user functions and management functions, and performed FP measurement based on it.
Screen transitions
Estimation method: Prototype (User function)
Function image"
              />
              <div className="flex justify-end">
                <Button size="sm" variant="ghost" className="text-primary hover:text-primary/80 h-8">
                  <Save className="w-3 h-3 mr-1.5" /> Save Changes
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 2: Audio */}
        <Card className="border-0 shadow-sm overflow-hidden">
          <CardHeader className="bg-gray-50/50 border-b py-4 flex flex-row items-center justify-between">
             <div className="flex items-center gap-2">
              <Music className="w-4 h-4 text-primary" />
              <CardTitle className="text-base">Audio</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="check-audio" />
              <label htmlFor="check-audio" className="text-sm font-medium leading-none cursor-pointer">
                Mark as Confirmed
              </label>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="bg-gray-900 rounded-xl p-4 flex items-center gap-4 text-white max-w-2xl">
              <Button size="icon" variant="ghost" className="text-white hover:bg-white/20 rounded-full h-10 w-10">
                <Play className="w-5 h-5 fill-current" />
              </Button>
              <div className="flex-1 space-y-1">
                <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full w-1/3 bg-primary rounded-full" />
                </div>
                <div className="flex justify-between text-xs text-gray-400">
                  <span>0:14</span>
                  <span>1:45</span>
                </div>
              </div>
              <div className="text-xs font-medium bg-primary/20 text-primary px-2 py-1 rounded">
                Female A (English)
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 3: Material */}
        <Card className="border-0 shadow-sm overflow-hidden">
           <CardHeader className="bg-gray-50/50 border-b py-4 flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <MonitorPlay className="w-4 h-4 text-primary" />
              <CardTitle className="text-base">Presentation Material</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="check-material" />
              <label htmlFor="check-material" className="text-sm font-medium leading-none cursor-pointer">
                Mark as Confirmed
              </label>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="aspect-video bg-gray-100 rounded-xl border-2 border-dashed border-gray-200 flex items-center justify-center relative overflow-hidden group">
              <div className="text-center space-y-2 z-10">
                <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mx-auto text-gray-400">
                  <FileText className="w-8 h-8" />
                </div>
                <p className="text-sm text-gray-500 font-medium">PPT Preview (Page 1/12)</p>
              </div>
              {/* Overlay for hover */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                 <Button variant="secondary">
                   <Play className="w-4 h-4 mr-2" /> Preview Animation
                 </Button>
              </div>
            </div>

            <div className="flex gap-4 border-t pt-6">
              <Button variant="outline" className="flex-1">
                <Download className="w-4 h-4 mr-2" /> Download PPTX
              </Button>
              <Button variant="outline" className="flex-1">
                <Upload className="w-4 h-4 mr-2" /> Upload Replacement
              </Button>
              <Button className="flex-1 bg-primary hover:bg-primary/90 text-white">
                <Check className="w-4 h-4 mr-2" /> Finalize File
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end pt-4 pb-12">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/25">
            Save & Return to Dashboard
          </Button>
        </div>
      </main>
    </div>
  );
}
