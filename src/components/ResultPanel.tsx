import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, Check, Code2, Eye, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LatencyInfo {
  uploadTime: number;
  processingTime: number;
  totalTime: number;
}

interface ResultPanelProps {
  latex: string;
  isProcessing: boolean;
  latency?: LatencyInfo | null;
}

export function ResultPanel({ latex, isProcessing, latency }: ResultPanelProps) {
  const [copied, setCopied] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(latex);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderLatexPreview = (tex: string) => {
    return tex
      .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '($1)/($2)')
      .replace(/\\sqrt\{([^}]+)\}/g, '√($1)')
      .replace(/\\sum/g, 'Σ')
      .replace(/\\int/g, '∫')
      .replace(/\\alpha/g, 'α')
      .replace(/\\beta/g, 'β')
      .replace(/\\pi/g, 'π')
      .replace(/\\theta/g, 'θ')
      .replace(/\^(\{[^}]+\}|\w)/g, (_, p1) => `^${p1.replace(/[{}]/g, '')}`)
      .replace(/_(\{[^}]+\}|\w)/g, (_, p1) => `_${p1.replace(/[{}]/g, '')}`)
      .replace(/\\\\/g, '\n')
      .replace(/\\[a-z]+/gi, '');
  };

  return (
    <Card variant="elevated" className="animate-fade-up" style={{ animationDelay: '0.1s' }}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-accent">
              <Code2 className="w-5 h-5 text-accent-foreground" />
            </div>
            <div>
              <CardTitle>LaTeX Result</CardTitle>
              <CardDescription>Extracted mathematical expression</CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowPreview(!showPreview)}
              className={cn(showPreview && "bg-accent")}
            >
              <Eye className="w-4 h-4 mr-1.5" />
              Preview
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              disabled={!latex}
            >
              {copied ? (
                <Check className="w-4 h-4 mr-1.5 text-green-500" />
              ) : (
                <Copy className="w-4 h-4 mr-1.5" />
              )}
              {copied ? 'Copied!' : 'Copy'}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isProcessing ? (
          <div className="h-32 rounded-xl bg-secondary flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 rounded-full border-2 border-primary/20" />
                <div className="absolute inset-0 rounded-full border-2 border-primary border-t-transparent animate-spin" />
              </div>
              <p className="text-sm text-muted-foreground animate-pulse-soft">Processing image...</p>
            </div>
          </div>
        ) : latex ? (
          <div className="space-y-3">
            <div className="relative">
              <pre className="p-4 rounded-xl bg-secondary overflow-x-auto text-sm font-mono text-foreground">
                <code>{latex}</code>
              </pre>
            </div>
            {showPreview && (
              <div className="p-4 rounded-xl bg-accent/50 border border-border">
                <p className="text-xs text-muted-foreground mb-2">Math Preview</p>
                <p className="text-lg font-medium text-foreground">
                  {renderLatexPreview(latex)}
                </p>
              </div>
            )}
            {latency && (
              <div className="p-3 rounded-xl bg-muted/50 border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-xs font-medium text-muted-foreground">Performance Metrics</span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground text-xs">Upload Time</p>
                    <p className="font-mono font-semibold text-foreground">{latency.uploadTime} ms</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Processing Time</p>
                    <p className="font-mono font-semibold text-foreground">{latency.processingTime} ms</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Total Response</p>
                    <p className="font-mono font-semibold text-primary">{latency.totalTime} ms</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="h-32 rounded-xl bg-secondary flex items-center justify-center">
            <p className="text-sm text-muted-foreground">
              Upload an image to see the LaTeX result
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
