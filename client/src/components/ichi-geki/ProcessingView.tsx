import { motion } from 'framer-motion';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { useEffect, useState } from 'react';

const steps = [
  { id: 1, label: "Uploading Document" },
  { id: 2, label: "Analyzing Content Structure" },
  { id: 3, label: "Generating Animation Scenes" },
  { id: 4, label: "Translating Subtitles" },
  { id: 5, label: "Finalizing Render" },
];

interface ProcessingViewProps {
  onComplete: () => void;
}

export function ProcessingView({ onComplete }: ProcessingViewProps) {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= steps.length - 1) {
          clearInterval(interval);
          setTimeout(onComplete, 1000);
          return prev;
        }
        return prev + 1;
      });
    }, 1500); // Simulate processing time

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="w-full max-w-md mx-auto py-12">
      <div className="text-center mb-10">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="inline-block p-4 rounded-full bg-primary/10 text-primary mb-4"
        >
          <Loader2 className="w-8 h-8" />
        </motion.div>
        <h2 className="text-2xl font-bold mb-2">Processing Your Video</h2>
        <p className="text-gray-500">Our AI is working its magic...</p>
      </div>

      <div className="space-y-6 relative">
        {/* Connection Line */}
        <div className="absolute left-[19px] top-2 bottom-4 w-0.5 bg-gray-100 -z-10" />

        {steps.map((step, index) => {
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;

          return (
            <motion.div 
              key={step.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4 bg-white/50 backdrop-blur-sm p-3 rounded-xl border border-transparent data-[active=true]:border-primary/10 data-[active=true]:bg-white data-[active=true]:shadow-lg transition-all duration-300"
              data-active={isActive}
            >
              <div className={`
                relative z-10 w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors duration-300
                ${isCompleted ? 'bg-green-500 border-green-500 text-white' : ''}
                ${isActive ? 'bg-white border-primary text-primary' : ''}
                ${!isActive && !isCompleted ? 'bg-gray-50 border-gray-200 text-gray-300' : ''}
              `}>
                {isCompleted ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  <span className="text-sm font-bold">{step.id}</span>
                )}
              </div>
              
              <div className="flex-1">
                <p className={`font-medium transition-colors ${isActive ? 'text-gray-900' : 'text-gray-500'}`}>
                  {step.label}
                </p>
                {isActive && (
                   <motion.div 
                     layoutId="progress-bar"
                     className="h-1 bg-primary/20 rounded-full mt-2 overflow-hidden"
                   >
                     <motion.div 
                        className="h-full bg-primary"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 1.5 }}
                     />
                   </motion.div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
