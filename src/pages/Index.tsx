import { useState, useCallback } from 'react';
import { Header } from '@/components/Header';
import { UploadCard } from '@/components/UploadCard';
import { ResultPanel } from '@/components/ResultPanel';
import { HistoryPanel } from '@/components/HistoryPanel';
import { SettingsPanel } from '@/components/SettingsPanel';
import { LoggingPanel } from '@/components/LoggingPanel';
import { InfoPanel } from '@/components/InfoPanel';
import { toast } from '@/hooks/use-toast';

interface HistoryItem {
  id: string;
  latex: string;
  timestamp: Date;
  thumbnail?: string;
}

interface LogEntry {
  id: string;
  timestamp: Date;
  type: 'info' | 'success' | 'warning' | 'error';
  message: string;
}

const Index = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [latex, setLatex] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  
  // Settings state
  const [model, setModel] = useState('mathpix-v3');
  const [confidence, setConfidence] = useState(85);
  const [preprocessing, setPreprocessing] = useState(true);

  const addLog = useCallback((type: LogEntry['type'], message: string) => {
    setLogs(prev => [...prev, {
      id: crypto.randomUUID(),
      timestamp: new Date(),
      type,
      message,
    }]);
  }, []);

  const handleImageUpload = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageUrl = e.target?.result as string;
      setUploadedImage(imageUrl);
      addLog('info', `Image uploaded: ${file.name}`);
      
      // Simulate OCR processing
      setIsProcessing(true);
      addLog('info', `Starting OCR with ${model}...`);
      
      if (preprocessing) {
        addLog('info', 'Applying image preprocessing...');
      }
      
      setTimeout(() => {
        addLog('info', 'Analyzing mathematical structures...');
      }, 500);
      
      setTimeout(() => {
        addLog('info', `Confidence threshold: ${confidence}%`);
      }, 1000);
      
      setTimeout(() => {
        // Simulated LaTeX output
        const sampleLatex = [
          '\\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}',
          '\\int_{0}^{\\infty} e^{-x^2} dx = \\frac{\\sqrt{\\pi}}{2}',
          '\\sum_{n=1}^{\\infty} \\frac{1}{n^2} = \\frac{\\pi^2}{6}',
          'E = mc^2',
          '\\nabla \\times \\vec{E} = -\\frac{\\partial \\vec{B}}{\\partial t}',
        ];
        const result = sampleLatex[Math.floor(Math.random() * sampleLatex.length)];
        
        setLatex(result);
        setIsProcessing(false);
        addLog('success', 'LaTeX extraction complete');
        
        // Add to history
        setHistory(prev => [{
          id: crypto.randomUUID(),
          latex: result,
          timestamp: new Date(),
          thumbnail: imageUrl,
        }, ...prev].slice(0, 10));
        
        toast({
          title: "Conversion Complete",
          description: "LaTeX has been extracted successfully.",
        });
      }, 2000);
    };
    reader.readAsDataURL(file);
  }, [model, confidence, preprocessing, addLog]);

  const handleClear = useCallback(() => {
    setUploadedImage(null);
    setLatex('');
    addLog('info', 'Cleared current image');
  }, [addLog]);

  const handleHistorySelect = useCallback((item: HistoryItem) => {
    setLatex(item.latex);
    if (item.thumbnail) {
      setUploadedImage(item.thumbnail);
    }
    addLog('info', 'Loaded from history');
  }, [addLog]);

  const handleHistoryDelete = useCallback((id: string) => {
    setHistory(prev => prev.filter(item => item.id !== id));
    addLog('info', 'Removed from history');
  }, [addLog]);

  const handleCopy = useCallback((text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied",
      description: "LaTeX copied to clipboard.",
    });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container px-4 md:px-6 py-6 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Tools - Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <UploadCard
              onImageUpload={handleImageUpload}
              uploadedImage={uploadedImage}
              onClear={handleClear}
            />
            
            <ResultPanel
              latex={latex}
              isProcessing={isProcessing}
            />
            
            <HistoryPanel
              history={history}
              onSelect={handleHistorySelect}
              onDelete={handleHistoryDelete}
              onCopy={handleCopy}
            />
          </div>
          
          {/* Controls Sidebar - Right Column */}
          <div className="space-y-6">
            <SettingsPanel
              model={model}
              onModelChange={setModel}
              confidence={confidence}
              onConfidenceChange={setConfidence}
              preprocessing={preprocessing}
              onPreprocessingChange={setPreprocessing}
            />
            
            <LoggingPanel logs={logs} />
            
            <InfoPanel />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
