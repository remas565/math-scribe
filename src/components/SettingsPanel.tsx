import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Settings, Sparkles } from 'lucide-react';

interface SettingsPanelProps {
  model: string;
  onModelChange: (model: string) => void;
  confidence: number;
  onConfidenceChange: (value: number) => void;
  preprocessing: boolean;
  onPreprocessingChange: (enabled: boolean) => void;
}

export function SettingsPanel({
  model,
  onModelChange,
  confidence,
  onConfidenceChange,
  preprocessing,
  onPreprocessingChange,
}: SettingsPanelProps) {
  return (
    <Card variant="glass" className="animate-fade-up">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-accent">
            <Settings className="w-4 h-4 text-accent-foreground" />
          </div>
          <div>
            <CardTitle className="text-base">Model Settings</CardTitle>
            <CardDescription className="text-xs">Configure OCR parameters</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="space-y-2.5">
          <Label className="text-sm font-medium">Model</Label>
          <Select value={model} onValueChange={onModelChange}>
            <SelectTrigger className="h-10 rounded-xl">
              <SelectValue placeholder="Select model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mathpix-v3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-primary" />
                  MathPix v3
                </div>
              </SelectItem>
              <SelectItem value="latex-ocr">LaTeX OCR</SelectItem>
              <SelectItem value="mathml-converter">MathML Converter</SelectItem>
              <SelectItem value="custom-model">Custom Model</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Confidence Threshold</Label>
            <span className="text-sm font-mono text-muted-foreground">{confidence}%</span>
          </div>
          <Slider
            value={[confidence]}
            onValueChange={([value]) => onConfidenceChange(value)}
            max={100}
            min={50}
            step={5}
            className="py-1"
          />
        </div>

        <div className="flex items-center justify-between py-1">
          <div className="space-y-0.5">
            <Label className="text-sm font-medium">Image Preprocessing</Label>
            <p className="text-xs text-muted-foreground">Enhance image quality</p>
          </div>
          <Switch
            checked={preprocessing}
            onCheckedChange={onPreprocessingChange}
          />
        </div>
      </CardContent>
    </Card>
  );
}
