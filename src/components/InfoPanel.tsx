import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Info, Lightbulb, Zap } from 'lucide-react';

export function InfoPanel() {
  const tips = [
    "Use high-contrast images for best results",
    "Ensure good lighting when capturing handwritten math",
    "Crop images to focus on the equation",
    "Avoid shadows and reflections",
  ];

  return (
    <Card variant="glass" className="animate-fade-up" style={{ animationDelay: '0.2s' }}>
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-accent">
            <Info className="w-4 h-4 text-accent-foreground" />
          </div>
          <div>
            <CardTitle className="text-base">About</CardTitle>
            <CardDescription className="text-xs">Math OCR to LaTeX</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start gap-3 p-3 rounded-xl bg-secondary">
          <Zap className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
          <p className="text-sm text-foreground leading-relaxed">
            Convert handwritten or printed mathematical expressions into clean, formatted LaTeX code instantly.
          </p>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Tips for best results</span>
          </div>
          <ul className="space-y-1.5 pl-6">
            {tips.map((tip, index) => (
              <li
                key={index}
                className="text-xs text-muted-foreground list-disc"
              >
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
