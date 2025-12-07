import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Languages, Wand2, MonitorPlay } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface VideoSettingsProps {
  file: File | null;
  onStartProcessing: (settings: any) => void;
  onCancel: () => void;
}

export function VideoSettings({ file, onStartProcessing, onCancel }: VideoSettingsProps) {
  if (!file) return null;

  return (
    <div className="w-full max-w-xl mx-auto space-y-6">
      <div className="flex items-center justify-between p-4 bg-white/60 backdrop-blur-md rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-primary/10 rounded-xl text-primary">
            <MonitorPlay className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-gray-900">{file.name}</span>
            <span className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={onCancel} className="text-gray-400 hover:text-red-500 hover:bg-red-50">
          Remove
        </Button>
      </div>

      <Card className="border-0 shadow-2xl shadow-purple-900/5 bg-white/80 backdrop-blur-xl">
        <CardContent className="p-8 space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-wider text-xs">
              <Languages className="w-4 h-4" />
              <span>Translation Settings</span>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="language" className="text-base font-medium">Target Language</Label>
              <Select defaultValue="ja">
                <SelectTrigger id="language" className="h-12 bg-gray-50/50 border-gray-200 rounded-xl">
                  <SelectValue placeholder="Select Language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ja">Japanese (日本語)</SelectItem>
                  <SelectItem value="en">English (English)</SelectItem>
                  <SelectItem value="zh">Chinese (中文)</SelectItem>
                  <SelectItem value="es">Spanish (Español)</SelectItem>
                  <SelectItem value="fr">French (Français)</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-400">The subtitles will be translated to this language automatically.</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-wider text-xs">
              <Wand2 className="w-4 h-4" />
              <span>Animation Style</span>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="style" className="text-base font-medium">Visual Style</Label>
              <Select defaultValue="corporate">
                <SelectTrigger id="style" className="h-12 bg-gray-50/50 border-gray-200 rounded-xl">
                  <SelectValue placeholder="Select Style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="corporate">Corporate Clean</SelectItem>
                  <SelectItem value="dynamic">Dynamic & Bold</SelectItem>
                  <SelectItem value="minimal">Minimalist</SelectItem>
                  <SelectItem value="tech">High-Tech Futuristic</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="pt-4">
             <Button 
                className="w-full h-14 text-lg font-semibold rounded-xl bg-gradient-to-r from-primary to-purple-600 hover:opacity-90 transition-opacity shadow-lg shadow-primary/25"
                onClick={() => onStartProcessing({})}
             >
                Generate Animation
             </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
