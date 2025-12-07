import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, Share2, Play, RefreshCw, Subtitles, FileText } from "lucide-react";
import { motion } from "framer-motion";

interface ResultViewProps {
  onReset: () => void;
}

export function ResultView({ onReset }: ResultViewProps) {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Animation Ready!</h2>
        <p className="text-gray-500">Your document has been successfully converted.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Video Player Area */}
        <div className="lg:col-span-2 space-y-4">
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl group cursor-pointer">
            {/* Mock Video Placeholder */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Play className="w-6 h-6 text-white ml-1" />
                </div>
                <p className="text-white/50 text-sm font-medium">Preview Animation</p>
              </div>
            </div>
            
            {/* Subtitle Overlay Mockup */}
            <div className="absolute bottom-8 left-0 right-0 text-center px-8">
              <span className="inline-block bg-black/60 backdrop-blur-md text-white px-4 py-2 rounded-lg text-lg font-medium shadow-lg">
                ユーザー機能と管理機能についてはプロトタイプを作成し...
              </span>
            </div>
          </div>
          
          <div className="flex gap-3">
             <Button className="flex-1 bg-primary hover:bg-primary/90 text-white h-12 rounded-xl shadow-lg shadow-primary/20">
               <Download className="w-4 h-4 mr-2" /> Download Video
             </Button>
             <Button variant="outline" className="flex-1 h-12 rounded-xl border-gray-200">
               <Share2 className="w-4 h-4 mr-2" /> Share Link
             </Button>
          </div>
        </div>

        {/* Sidebar Actions */}
        <div className="space-y-4">
           <Card className="p-4 border-0 shadow-lg bg-white/80 backdrop-blur">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Download className="w-4 h-4 text-primary" />
                Assets
              </h3>
              <div className="space-y-2">
                <Button variant="ghost" className="w-full justify-start text-gray-600 h-10">
                  <Subtitles className="w-4 h-4 mr-2 text-blue-500" />
                  Subtitles (.srt)
                </Button>
                <Button variant="ghost" className="w-full justify-start text-gray-600 h-10">
                  <FileText className="w-4 h-4 mr-2 text-orange-500" />
                  Transcript (.txt)
                </Button>
                <Button variant="ghost" className="w-full justify-start text-gray-600 h-10">
                  <Download className="w-4 h-4 mr-2 text-green-500" />
                  Thumbnail (.jpg)
                </Button>
              </div>
           </Card>

           <Card className="p-6 border-0 bg-primary/5 border-primary/10">
             <h3 className="font-semibold text-primary mb-2">Project Stats</h3>
             <div className="space-y-2 text-sm text-gray-600">
               <div className="flex justify-between">
                 <span>Duration</span>
                 <span className="font-mono font-bold">02:14</span>
               </div>
               <div className="flex justify-between">
                 <span>Words</span>
                 <span className="font-mono font-bold">452</span>
               </div>
               <div className="flex justify-between">
                 <span>Language</span>
                 <span className="font-mono font-bold">Japanese</span>
               </div>
             </div>
           </Card>

           <Button onClick={onReset} variant="ghost" className="w-full text-gray-400 hover:text-gray-600">
             <RefreshCw className="w-4 h-4 mr-2" /> Start New Project
           </Button>
        </div>
      </div>
    </div>
  );
}
