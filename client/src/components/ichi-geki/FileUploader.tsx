import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { Upload, FileText, FileBarChart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
}

export function FileUploader({ onFileSelect }: FileUploaderProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileSelect(acceptedFiles[0]);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.ms-powerpoint': ['.ppt', '.pptx'],
      'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx']
    },
    maxFiles: 1
  });

  return (
    <div className="w-full max-w-xl mx-auto">
      <div {...getRootProps()}>
        <motion.div
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className={cn(
            "relative group cursor-pointer overflow-hidden rounded-3xl border-2 border-dashed transition-all duration-300 ease-in-out p-12 text-center",
            isDragActive 
              ? "border-primary bg-primary/5 shadow-2xl shadow-primary/20" 
              : "border-gray-200 hover:border-primary/50 hover:bg-white/80 bg-white/50"
          )}
        >
          <input {...getInputProps()} />
          
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative z-10 flex flex-col items-center gap-6">
            <div className="relative">
              <div className={cn(
                "p-4 rounded-2xl bg-white shadow-xl shadow-purple-500/10 transition-all duration-300",
                isDragActive ? "scale-110 rotate-3" : "group-hover:scale-110 group-hover:-rotate-3"
              )}>
                <Upload className="w-10 h-10 text-primary" />
              </div>
              
              {/* Decorative icons */}
              <motion.div 
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
                className="absolute -right-6 -top-2 p-2 rounded-xl bg-red-50 text-red-500 shadow-sm"
              >
                <FileText className="w-4 h-4" />
              </motion.div>
              <motion.div 
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 2.5, delay: 0 }}
                className="absolute -left-6 -bottom-2 p-2 rounded-xl bg-orange-50 text-orange-500 shadow-sm"
              >
                <FileBarChart className="w-4 h-4" />
              </motion.div>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-gray-900 font-sans tracking-tight">
                {isDragActive ? "Drop your file here" : "Upload your Document"}
              </h3>
              <p className="text-gray-500 max-w-xs mx-auto text-sm leading-relaxed">
                Drag & drop your PDF or PowerPoint file here, or click to browse.
              </p>
            </div>

            <div className="flex items-center gap-3 text-xs font-medium text-gray-400 uppercase tracking-wider">
              <span className="bg-gray-100 px-2 py-1 rounded">PDF</span>
              <span className="bg-gray-100 px-2 py-1 rounded">PPTX</span>
              <span className="bg-gray-100 px-2 py-1 rounded">PPT</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
