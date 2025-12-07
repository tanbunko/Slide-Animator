import { useState } from 'react';
import { FileUploader } from '@/components/ichi-geki/FileUploader';
import { VideoSettings } from '@/components/ichi-geki/VideoSettings';
import { ProcessingView } from '@/components/ichi-geki/ProcessingView';
import { ResultView } from '@/components/ichi-geki/ResultView';
import { motion, AnimatePresence } from 'framer-motion';
import generatedImage from '@assets/generated_images/abstract_modern_tech_background_with_subtle_geometric_shapes_in_blue_and_purple_gradients.png';

type AppState = 'upload' | 'settings' | 'processing' | 'result';

export default function Dashboard() {
  const [state, setState] = useState<AppState>('upload');
  const [file, setFile] = useState<File | null>(null);

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    setState('settings');
  };

  const handleStartProcessing = () => {
    setState('processing');
  };

  const handleProcessingComplete = () => {
    setState('result');
  };

  const handleReset = () => {
    setFile(null);
    setState('upload');
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden font-sans text-foreground selection:bg-primary/20">
      {/* Background with abstract generated image overlay */}
      <div 
        className="absolute inset-0 opacity-40 pointer-events-none mix-blend-multiply"
        style={{
          backgroundImage: `url(${generatedImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Decorative gradient blobs */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2 pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 w-full border-b border-white/20 bg-white/30 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-primary/30">
              I
            </div>
            <span className="font-bold text-xl tracking-tight text-gray-900">ICHI-GEKI</span>
          </div>
          
          <nav className="flex items-center gap-6 text-sm font-medium text-gray-600">
            <a href="#" className="hover:text-primary transition-colors">Documentation</a>
            <a href="#" className="hover:text-primary transition-colors">Pricing</a>
            <div className="w-8 h-8 rounded-full bg-gray-200" />
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[calc(100vh-64px)]">
        
        {/* Dynamic Title */}
        <AnimatePresence mode="wait">
          {state === 'upload' && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center mb-12 space-y-4"
            >
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900">
                Transform Docs to <span className="text-primary gradient-text">Motion</span>
              </h1>
              <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                Instantly convert your PDFs and PowerPoint slides into engaging videos with automated multilingual subtitles.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dynamic Content Card */}
        <div className="w-full">
          <AnimatePresence mode="wait">
            {state === 'upload' && (
              <motion.div
                key="upload"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <FileUploader onFileSelect={handleFileSelect} />
              </motion.div>
            )}

            {state === 'settings' && (
              <motion.div
                key="settings"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <VideoSettings 
                  file={file} 
                  onStartProcessing={handleStartProcessing} 
                  onCancel={handleReset} 
                />
              </motion.div>
            )}

            {state === 'processing' && (
              <motion.div
                key="processing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ProcessingView onComplete={handleProcessingComplete} />
              </motion.div>
            )}

            {state === 'result' && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <ResultView onReset={handleReset} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </main>
    </div>
  );
}
